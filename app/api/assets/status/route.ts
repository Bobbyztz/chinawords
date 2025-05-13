import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json({
      isLiked: !!likeRecord,
      isCollected: !!collectionRecord,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Error fetching asset status:", error);
    return NextResponse.json(
      { error: "Failed to fetch asset status" },
      { status: 500 }
    );
  }
}
