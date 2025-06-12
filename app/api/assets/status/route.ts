import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";

// Simple in-memory cache with TTL
interface CachedAssetStatus {
  isLiked: boolean;
  isCollected: boolean;
  isAuthenticated: boolean;
}

const statusCache = new Map<
  string,
  { data: CachedAssetStatus; expires: number }
>();
const CACHE_TTL = 30000; // 30 seconds

function getCacheKey(userId: string, assetId: string): string {
  return `${userId}:${assetId}`;
}

function getCachedStatus(cacheKey: string) {
  const cached = statusCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }
  statusCache.delete(cacheKey);
  return null;
}

function setCachedStatus(cacheKey: string, data: CachedAssetStatus) {
  statusCache.set(cacheKey, {
    data,
    expires: Date.now() + CACHE_TTL,
  });

  // Clean expired entries (simple cleanup)
  if (statusCache.size > 1000) {
    const now = Date.now();
    for (const [key, value] of statusCache.entries()) {
      if (value.expires <= now) {
        statusCache.delete(key);
      }
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({
        isLiked: false,
        isCollected: false,
        isAuthenticated: false,
      });
    }

    const userId = session.user.id;
    const assetId = req.nextUrl.searchParams.get("assetId");

    if (!assetId) {
      return NextResponse.json(
        { error: "Missing assetId parameter" },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = getCacheKey(userId, assetId);
    const cachedResult = getCachedStatus(cacheKey);
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // Get like status
    const likeRecord = await prisma.userLikeAsset.findUnique({
      where: {
        userId_assetId: {
          userId,
          assetId,
        },
      },
    });

    // Get collection status
    const collectionRecord = await prisma.userCollectionAsset.findUnique({
      where: {
        userId_assetId: {
          userId,
          assetId,
        },
      },
    });

    const result = {
      isLiked: !!likeRecord,
      isCollected: !!collectionRecord,
      isAuthenticated: true,
    };

    // Cache the result
    setCachedStatus(cacheKey, result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching asset status:", error);
    return NextResponse.json(
      { error: "Failed to fetch asset status" },
      { status: 500 }
    );
  }
}
