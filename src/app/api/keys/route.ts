import { NextRequest, NextResponse } from "next/server";
import { encryptKey, decryptKey } from "@/lib/utils/encryption";
import { cookies } from "next-headers"; // Wait, Next.js 15 cookies import is from 'next/headers'

// Let's import cookies correctly from next/headers
import { cookies as getCookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { geminiKey, serpapiKey } = body;

    const cookieStore = await getCookies();

    if (geminiKey !== undefined) {
      const encryptedGemini = encryptKey(geminiKey);
      cookieStore.set("synthara_enc_gemini", encryptedGemini, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    if (serpapiKey !== undefined) {
      const encryptedSerp = encryptKey(serpapiKey);
      cookieStore.set("synthara_enc_serp", encryptedSerp, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await getCookies();
    const geminiCookie = cookieStore.get("synthara_enc_gemini")?.value || "";
    const serpCookie = cookieStore.get("synthara_enc_serp")?.value || "";

    return NextResponse.json({
      hasGeminiKey: !!geminiCookie && decryptKey(geminiCookie).length > 0,
      hasSerpapiKey: !!serpCookie && decryptKey(serpCookie).length > 0
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
