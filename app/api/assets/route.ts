import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/assets - 获取所有资产（任务）
export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { id: true, username: true } } },
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Failed to fetch assets. See server logs for details." },
      { status: 500 }
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
