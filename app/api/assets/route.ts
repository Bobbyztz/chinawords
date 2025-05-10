import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Define a type for the asset structure returned by the API
// This should ideally align with your Prisma model structure + included relations
type AssetOwner = {
  id: string;
  username: string | null; // Assuming username can be null
};

type AssetWithOwner = {
  id: string;
  // Add other asset fields here based on your Prisma schema, e.g.:
  title: string;
  prompt: string | null;
  mediaType: number;
  fileUri: string;
  createdAt: Date;
  ownerId: string;
  owner?: AssetOwner; // Make owner optional if it might not always be included or for flexibility
};

// GET /api/assets - 获取随机图片资产，支持分页和排除已加载ID
export async function GET(request: NextRequest): Promise<NextResponse<{ data: AssetWithOwner[]; hasMore: boolean; error?: string }>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const countParam = searchParams.get('count');
    const excludeIdsParam = searchParams.get('excludeIds');

    const count = countParam ? parseInt(countParam, 10) : 12; // Default to 12 images
    const excludeIdsArray = excludeIdsParam ? excludeIdsParam.split(',') : [];

    // 1. Fetch all relevant Asset IDs (e.g., mediaType: 0 for images)
    const allImageAssets = await prisma.asset.findMany({
      where: {
        mediaType: 0, // Assuming 0 is for images
        NOT: {
          id: { in: excludeIdsArray },
        },
      },
      select: { id: true },
    });

    const availableIds = allImageAssets.map(asset => asset.id);

    // 2. Shuffle available IDs (Fisher-Yates shuffle)
    for (let i = availableIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableIds[i], availableIds[j]] = [availableIds[j], availableIds[i]];
    }

    // 3. Select 'count' IDs
    const selectedIds = availableIds.slice(0, count);

    // 4. Fetch full data for selected IDs
    let assets: AssetWithOwner[] = [];
    if (selectedIds.length > 0) {
      const dbAssets = await prisma.asset.findMany({
        where: { id: { in: selectedIds } },
        include: { owner: { select: { id: true, username: true } } },
      });

      // Ensure the order matches the random selectedIds
      // And ensure the fetched data conforms to AssetWithOwner
      const assetsMap = new Map(dbAssets.map(asset => [asset.id, asset as unknown as AssetWithOwner]));
      assets = selectedIds.map(id => assetsMap.get(id)).filter(Boolean) as AssetWithOwner[];
    }

    // 5. Determine if there are more assets
    const hasMore = availableIds.length > count;

    // Force revalidation of this path (optional, but kept from original)
    revalidatePath('/api/assets');

    // Return response with headers to prevent any caching
    return NextResponse.json(
      { data: assets, hasMore },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { data: [], hasMore: false, error: "Failed to fetch assets" }, 
      {
        status: 500, // It's generally better to return 500 for server errors
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  }
}

// POST /api/assets - 新建资产（任务）
export async function POST(req: NextRequest) {
  const data = await req.json();
  // 简单校验
  const { ownerId, title, prompt, mediaType, fileUri } = data;
  if (!ownerId || !title || typeof mediaType !== 'number' || !fileUri) {
    return NextResponse.json({ error: '缺少必要字段' }, { status: 400 });
  }
  const asset = await prisma.asset.create({
    data: { ownerId, title, prompt, mediaType, fileUri },
  });
  return NextResponse.json(asset, { status: 201 });
}
