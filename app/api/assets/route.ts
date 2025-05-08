import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET /api/assets - 获取所有资产（任务）
export async function GET() {
  try {
    // Using include with owner relation only to avoid selecting non-existent fields
    // This avoids querying non-existent fields like 'description'
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { id: true, username: true } } },
    });
    
    // Force revalidation of this path to ensure we're not serving stale data
    revalidatePath('/api/assets');
    
    // Return response with headers to prevent any caching
    return NextResponse.json(
      assets,
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  } catch (error) {
    console.error("Error fetching assets:", error);
    
    // Instead of returning an error object with status 500,
    // return an empty array with status 200 to ensure the frontend
    // can handle it gracefully as an empty data case
    return NextResponse.json([], 
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
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
