import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { PutBlobResult } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Log all headers
    console.log('[/api/upload-url] Incoming request headers:', JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2));
    // Log cookies specifically if available
    const cookieHeader = request.headers.get('cookie');
    console.log('[/api/upload-url] Cookie header:', cookieHeader || 'No cookie header found');

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onBeforeGenerateToken: async (pathname: string, clientPayload: string | null, _multipart: boolean) => {
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
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB limit
        };
      },
      onUploadCompleted: async (options: { blob: PutBlobResult; tokenPayload?: string | null | undefined }) => {
        const { blob, tokenPayload } = options;
        try {
          console.log('Starting DB save operation for blob:', blob.pathname);
          // Parse the token payload to get user data
          const { userId, altText, prompt } = JSON.parse(tokenPayload || '{}');
          
          console.log('Parsed payload data:', { userId, altText, prompt: prompt || '(none)' });
          
          // Validate required fields
          if (!userId) {
            throw new Error('User ID is required');
          }
          if (!altText) { 
            throw new Error('Alt text is required (used as title for the asset)');
          }
          if (!blob.url) {
            throw new Error('File URL is required');
          }
          
          // Create the asset with only the required fields we know exist in TypeScript types
          const asset = await prisma.asset.create({
            data: {
              ownerId: userId,
              title: altText, // Explicitly using altText as the title (required field)
              prompt: prompt || null, // Optional field
              mediaType: 0, // 0 for image (required field)
              fileUri: blob.url, // Required field with the Blob URL
              // Only include fields that exist in the generated Prisma client types
            },
          });
          
          console.log('Image upload completed and saved to database', asset.id);
        } catch (error) {
          // More detailed error logging
          console.error('Failed to save asset to database');
          if (error instanceof Error) {
            console.error(`Error message: ${error.message}`);
            console.error(`Error stack: ${error.stack}`);
          } else {
            console.error('Unknown error type:', error);
          }
          
          // Check if this is a Prisma error
          if (error && typeof error === 'object' && 'code' in error) {
            const typedError = error as { code: string; meta?: Record<string, unknown> };
            console.error(`Prisma error code: ${typedError.code}`);
            if (typedError.meta) { 
              console.error('Prisma error metadata:', typedError.meta);
            }
          }
          
          throw new Error('Could not save image details: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
