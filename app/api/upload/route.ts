import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user ID from session (as string for UUID compatibility)
    const userId = session.user.id; // 保留为字符串UUID

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const prompt = formData.get("prompt") as string;
    const altText = formData.get("altText") as string;

    // Validate inputs
    if (!file || !altText) {
      return NextResponse.json(
        { error: "File and alt text are required" },
        { status: 400 }
      );
    }

    // Generate a unique filename to avoid collisions
    const uniqueFilename = `${crypto.randomUUID()}-${file.name}`;
    
    let fileUrl = '';
    
    try {
      // Try to upload to Vercel Blob
      const blob = await put(uniqueFilename, file, {
        access: "public",
        contentType: file.type,
      });
      fileUrl = blob.url;
    } catch (error) {
      console.error('Vercel Blob upload error:', error);
      
      // Fallback: In development, we'll use a data URL from the file itself
      // In production, you would need to set up the BLOB_READ_WRITE_TOKEN
      if (process.env.NODE_ENV === 'development') {
        // Create a data URL from the file for development purposes only
        // This is not suitable for production as it stores the image in the database directly
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          fileUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
          console.log('Using data URL in development mode');
        } catch (dataUrlError) {
          console.error('Error creating data URL:', dataUrlError);
          // Fallback to a placeholder if data URL fails
          fileUrl = `https://placeholder.co/600x400?text=${encodeURIComponent(file.name)}`;
        }
      } else {
        throw new Error('Failed to upload file to storage. Please check BLOB_READ_WRITE_TOKEN environment variable.');
      }
    }

    // Save metadata to database with updated schema
    const asset = await prisma.asset.create({
      data: {
        ownerId: userId, // 字符串UUID
        title: altText,
        description: null, // 新增可选字段
        prompt: prompt || null,
        mediaType: 0, // 0 for image, 1 for video
        fileUri: fileUrl,
        altText: altText, // 新增替代文本字段
        isPublic: true, // 默认公开
        // metadata和updatedAt字段由Prisma自动处理
      },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      asset: {
        id: asset.id,
        url: fileUrl,
        title: asset.title,
        prompt: asset.prompt,
        altText: asset.altText,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// Set the maximum file size limit (10MB)
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "10mb",
  },
};
