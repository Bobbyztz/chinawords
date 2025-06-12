import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({
        statuses: {},
        isAuthenticated: false,
      });
    }

    const userId = session.user.id;
    const { assetIds } = await req.json();

    if (!assetIds || !Array.isArray(assetIds) || assetIds.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid assetIds parameter" },
        { status: 400 }
      );
    }

    // Batch query for likes
    const likeRecords = await prisma.userLikeAsset.findMany({
      where: {
        userId,
        assetId: {
          in: assetIds,
        },
      },
      select: {
        assetId: true,
      },
    });

    // Batch query for collections
    const collectionRecords = await prisma.userCollectionAsset.findMany({
      where: {
        userId,
        assetId: {
          in: assetIds,
        },
      },
      select: {
        assetId: true,
      },
    });

    // Create lookup sets for O(1) access
    const likedAssetIds = new Set(likeRecords.map((record) => record.assetId));
    const collectedAssetIds = new Set(
      collectionRecords.map((record) => record.assetId)
    );

    // Build status map
    const statuses: Record<string, { isLiked: boolean; isCollected: boolean }> =
      {};

    for (const assetId of assetIds) {
      statuses[assetId] = {
        isLiked: likedAssetIds.has(assetId),
        isCollected: collectedAssetIds.has(assetId),
      };
    }

    return NextResponse.json({
      statuses,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Error fetching batch asset status:", error);
    return NextResponse.json(
      { error: "Failed to fetch batch asset status" },
      { status: 500 }
    );
  }
}
