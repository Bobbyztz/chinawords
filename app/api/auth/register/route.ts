import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "用户名和密码不能为空" },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "用户名至少需要3个字符" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "密码至少需要6个字符" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "用户名已存在" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Create user with UUID
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        username,
        passwordHash,
        // updatedAt会由Prisma自动处理（@updatedAt装饰器）
      },
    });

    // Return success without exposing password hash
    return NextResponse.json(
      {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register endpoint:", error);
    return NextResponse.json(
      { error: "注册失败，请稍后再试" },
      { status: 500 }
    );
  }
}
