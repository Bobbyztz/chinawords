import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

// Define an interface for the update data
interface UserUpdateData {
  displayName?: string;
  language?: string;
}

export async function PUT(req: NextRequest) {
  try {
    // Get the user token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract user ID from token
    const userId = token.id as string;

    // Parse request body
    const body = await req.json();
    const { name, language } = body;

    // Validate fields - Check if both fields are undefined
    if (name === undefined && language === undefined) {
      return NextResponse.json(
        { error: "At least one field is required" },
        { status: 400 }
      );
    }

    // Prepare update data - Check for undefined specifically, allow empty strings
    const updateData: UserUpdateData = {};
    if (name !== undefined) updateData.displayName = name;
    if (language !== undefined) updateData.language = language;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        language: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
