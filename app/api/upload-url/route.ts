import { handleUpload, type HandleUploadBody } from '@vercel/blob/server';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = session.user.id;
    
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Parse client payload which contains the alt text and prompt
        const { altText, prompt } = JSON.parse(clientPayload || '{}');
        
        if (!altText) {
          throw new Error('Alt text is required');
        }
        
        return {
          tokenPayload: JSON.stringify({
            userId,
            altText,
            prompt,
          }),
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          maxSize: 10 * 1024 * 1024, // 10MB limit
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          // Parse the token payload to get user data
          const { userId, altText, prompt } = JSON.parse(tokenPayload || '{}');
          
          // Save metadata to database
          const asset = await prisma.asset.create({
            data: {
              ownerId: userId,
              title: altText,
              prompt: prompt || null,
              mediaType: 0, // 0 for image
              fileUri: blob.url,
              // Using the fields defined in your Prisma schema
            },
          });
          
          console.log('Image upload completed and saved to database', asset.id);
        } catch (error) {
          console.error('Failed to save asset to database', error);
          throw new Error('Could not save image details');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error handling upload:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
