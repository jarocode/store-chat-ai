// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dto = {
    shop: searchParams.get("shop")!,
    code: searchParams.get("code")!,
    state: searchParams.get("state")!,
    hmac: searchParams.get("hmac")!,
  };

  // 1. Forward to NestJS
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/shopify/callback-proxy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward NestJS session cookie so state can be validated:
        Cookie: req.headers.get("cookie")!,
      },
      body: JSON.stringify(dto),
    }
  );
  const { jwt } = await resp.json();

  // 2. Set our own httpOnly cookie
  const nextRes = NextResponse.redirect(new URL("/onboarding", req.url));
  nextRes.cookies.set("jwt", jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return nextRes;
}
