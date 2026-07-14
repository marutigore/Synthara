import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Synthara AI Engine'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59'
      }
    }
  );
}
