import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const userId = session.user.id;
  const collectedAssets = await prisma.userCollectionAsset.findMany({
    where: { userId },
    include: { asset: true },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(collectedAssets.map((col) => col.asset));
}
