import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const userId = session.user.id;
    const { assetId } = await req.json();

    if (!assetId) {
      return NextResponse.json({ error: "缺少资源ID" }, { status: 400 });
    }

    // Use a transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already liked this asset
      const existingLike = await tx.userLikeAsset.findUnique({
        where: {
          userId_assetId: {
            userId,
            assetId,
          },
        },
      });

      if (existingLike) {
        // User already liked this asset, let's unlike it
        await tx.userLikeAsset.delete({
          where: {
            userId_assetId: {
              userId,
              assetId,
            },
          },
        });

        // Decrement the liked count
        await tx.asset.update({
          where: { id: assetId },
          data: {
            liked: {
              decrement: 1,
            },
          },
        });

        return { action: "unliked" };
      } else {
        // Create a new like record
        await tx.userLikeAsset.create({
          data: {
            userId,
            assetId,
          },
        });

        // Increment the liked count
        await tx.asset.update({
          where: { id: assetId },
          data: {
            liked: {
              increment: 1,
            },
          },
        });

        return { action: "liked" };
      }
    });

    // Revalidate relevant paths
    revalidatePath("/api/assets/liked");
    revalidatePath("/food");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error toggling like status:", error);
    return NextResponse.json({ error: "处理操作时出错" }, { status: 500 });
  }
}
