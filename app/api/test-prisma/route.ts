import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test the Prisma client with a simple query
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Prisma with Neon adapter is working!',
      userCount 
    });
  } catch (error) {
    console.error('Error testing Prisma with Neon adapter:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to database',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
