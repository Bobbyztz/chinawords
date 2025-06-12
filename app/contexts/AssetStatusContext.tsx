"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AssetStatus {
  isLiked: boolean;
  isCollected: boolean;
  isAuthenticated: boolean;
}

interface AssetStatusContextType {
  getAssetStatus: (assetId: string) => AssetStatus | null;
  fetchAssetStatus: (assetId: string) => Promise<AssetStatus>;
  fetchBatchAssetStatus: (
    assetIds: string[]
  ) => Promise<Record<string, AssetStatus>>;
  updateAssetStatus: (assetId: string, updates: Partial<AssetStatus>) => void;
  invalidateAssetStatus: (assetId: string) => void;
  clearCache: () => void;
}

const AssetStatusContext = createContext<AssetStatusContextType | undefined>(
  undefined
);

// Cache with timestamps for TTL
interface CachedStatus extends AssetStatus {
  timestamp: number;
}

// In-flight requests to prevent duplicate API calls
const inflightRequests = new Map<string, Promise<AssetStatus>>();
const inflightBatchRequests = new Map<
  string,
  Promise<Record<string, AssetStatus>>
>();

const CACHE_TTL = 30000; // 30 seconds
const BATCH_SIZE = 50; // Maximum batch size

export function AssetStatusProvider({ children }: { children: ReactNode }) {
  const [statusCache, setStatusCache] = useState<Map<string, CachedStatus>>(
    new Map()
  );

  const isStatusValid = useCallback((cachedStatus: CachedStatus) => {
    return Date.now() - cachedStatus.timestamp < CACHE_TTL;
  }, []);

  const getAssetStatus = useCallback(
    (assetId: string): AssetStatus | null => {
      const cached = statusCache.get(assetId);
      if (cached && isStatusValid(cached)) {
        return {
          isLiked: cached.isLiked,
          isCollected: cached.isCollected,
          isAuthenticated: cached.isAuthenticated,
        };
      }
      return null;
    },
    [statusCache, isStatusValid]
  );

  const updateCache = useCallback((assetId: string, status: AssetStatus) => {
    setStatusCache((prev) => {
      const newCache = new Map(prev);
      newCache.set(assetId, {
        ...status,
        timestamp: Date.now(),
      });
      return newCache;
    });
  }, []);

  const updateBatchCache = useCallback(
    (statuses: Record<string, AssetStatus>) => {
      setStatusCache((prev) => {
        const newCache = new Map(prev);
        const timestamp = Date.now();

        Object.entries(statuses).forEach(([assetId, status]) => {
          newCache.set(assetId, {
            ...status,
            timestamp,
          });
        });

        return newCache;
      });
    },
    []
  );

  const fetchAssetStatus = useCallback(
    async (assetId: string): Promise<AssetStatus> => {
      // Check cache first
      const cached = getAssetStatus(assetId);
      if (cached) {
        return cached;
      }

      // Check if request is already in flight
      const existingRequest = inflightRequests.get(assetId);
      if (existingRequest) {
        return existingRequest;
      }

      // Create new request
      const requestPromise = (async () => {
        try {
          const response = await fetch(`/api/assets/status?assetId=${assetId}`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const status = await response.json();
          updateCache(assetId, status);
          return status;
        } catch (error) {
          console.error(`Error fetching status for asset ${assetId}:`, error);
          // Return default status on error
          const defaultStatus = {
            isLiked: false,
            isCollected: false,
            isAuthenticated: false,
          };
          updateCache(assetId, defaultStatus);
          return defaultStatus;
        } finally {
          inflightRequests.delete(assetId);
        }
      })();

      inflightRequests.set(assetId, requestPromise);
      return requestPromise;
    },
    [getAssetStatus, updateCache]
  );

  const fetchBatchAssetStatus = useCallback(
    async (assetIds: string[]): Promise<Record<string, AssetStatus>> => {
      if (assetIds.length === 0) return {};

      // Filter out already cached items
      const uncachedIds: string[] = [];
      const result: Record<string, AssetStatus> = {};

      assetIds.forEach((assetId) => {
        const cached = getAssetStatus(assetId);
        if (cached) {
          result[assetId] = cached;
        } else {
          uncachedIds.push(assetId);
        }
      });

      if (uncachedIds.length === 0) {
        return result;
      }

      // Split into batches if needed
      const batches: string[][] = [];
      for (let i = 0; i < uncachedIds.length; i += BATCH_SIZE) {
        batches.push(uncachedIds.slice(i, i + BATCH_SIZE));
      }

      // Process batches
      for (const batch of batches) {
        const batchKey = batch.sort().join(",");

        // Check if batch request is already in flight
        let batchPromise = inflightBatchRequests.get(batchKey);

        if (!batchPromise) {
          batchPromise = (async () => {
            try {
              const response = await fetch("/api/assets/status/batch", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ assetIds: batch }),
              });

              if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
              }

              const data = await response.json();
              const batchStatuses = data.statuses || {};

              updateBatchCache(batchStatuses);
              return batchStatuses;
            } catch (error) {
              console.error(`Error fetching batch status:`, error);
              // Return default statuses on error
              const defaultStatuses: Record<string, AssetStatus> = {};
              batch.forEach((assetId) => {
                defaultStatuses[assetId] = {
                  isLiked: false,
                  isCollected: false,
                  isAuthenticated: false,
                };
              });
              updateBatchCache(defaultStatuses);
              return defaultStatuses;
            } finally {
              inflightBatchRequests.delete(batchKey);
            }
          })();

          inflightBatchRequests.set(batchKey, batchPromise);
        }

        const batchResult = await batchPromise;
        Object.assign(result, batchResult);
      }

      return result;
    },
    [getAssetStatus, updateBatchCache]
  );

  const updateAssetStatus = useCallback(
    (assetId: string, updates: Partial<AssetStatus>) => {
      setStatusCache((prev) => {
        const newCache = new Map(prev);
        const current = newCache.get(assetId);

        if (current) {
          newCache.set(assetId, {
            ...current,
            ...updates,
            timestamp: Date.now(),
          });
        } else {
          newCache.set(assetId, {
            isLiked: false,
            isCollected: false,
            isAuthenticated: true,
            ...updates,
            timestamp: Date.now(),
          });
        }

        return newCache;
      });
    },
    []
  );

  const invalidateAssetStatus = useCallback((assetId: string) => {
    setStatusCache((prev) => {
      const newCache = new Map(prev);
      newCache.delete(assetId);
      return newCache;
    });
  }, []);

  const clearCache = useCallback(() => {
    setStatusCache(new Map());
    inflightRequests.clear();
    inflightBatchRequests.clear();
  }, []);

  const value = {
    getAssetStatus,
    fetchAssetStatus,
    fetchBatchAssetStatus,
    updateAssetStatus,
    invalidateAssetStatus,
    clearCache,
  };

  return (
    <AssetStatusContext.Provider value={value}>
      {children}
    </AssetStatusContext.Provider>
  );
}

export function useAssetStatus() {
  const context = useContext(AssetStatusContext);
  if (context === undefined) {
    throw new Error(
      "useAssetStatus must be used within an AssetStatusProvider"
    );
  }
  return context;
}
