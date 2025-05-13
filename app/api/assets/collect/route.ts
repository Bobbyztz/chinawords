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
      // Check if user already collected this asset
      const existingCollection = await tx.userCollectionAsset.findUnique({
        where: {
          userId_assetId: {
            userId,
            assetId,
          },
        },
      });

      if (existingCollection) {
        // User already collected this asset, let's uncollect it
        await tx.userCollectionAsset.delete({
          where: {
            userId_assetId: {
              userId,
              assetId,
            },
          },
        });

        // Decrement the collected count
        await tx.asset.update({
          where: { id: assetId },
          data: {
            collected: {
              decrement: 1,
            },
          },
        });

        return { action: "uncollected" };
      } else {
        // Create a new collection record
        await tx.userCollectionAsset.create({
          data: {
            userId,
            assetId,
          },
        });

        // Increment the collected count
        await tx.asset.update({
          where: { id: assetId },
          data: {
            collected: {
              increment: 1,
            },
          },
        });

        return { action: "collected" };
      }
    });

    // Revalidate relevant paths
    revalidatePath("/api/assets/collected");
    revalidatePath("/food");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error toggling collection status:", error);
    return NextResponse.json({ error: "处理操作时出错" }, { status: 500 });
  }
}
