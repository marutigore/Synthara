import { NextRequest, NextResponse } from 'next/server';
import { PrivacyFidelityService, PrivacyOptions } from '@/services/privacy-fidelity-service';
import Papa from 'papaparse';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  } as const;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { csv, rows: inputRows, maskPii = false, maskingToken = 'TAG' } = body;

    let rows: Array<Record<string, any>> = [];

    if (Array.isArray(inputRows) && inputRows.length > 0) {
      rows = inputRows;
    } else if (typeof csv === 'string' && csv.trim()) {
      const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
      rows = (parsed.data || []) as Array<Record<string, any>>;
    } else {
      return NextResponse.json(
        { error: 'Invalid input: either "rows" array or "csv" string must be provided.' },
        { status: 400, headers: corsHeaders() }
      );
    }

    const options: PrivacyOptions = {
      maskPii: Boolean(maskPii),
      maskingToken: maskingToken as PrivacyOptions['maskingToken'],
    };

    const result = PrivacyFidelityService.analyzeAndSanitize(rows, options);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error: any) {
    console.error('[PrivacyFidelityAPI] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while analyzing privacy and fidelity.' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
