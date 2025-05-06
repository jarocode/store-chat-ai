// app/api/auth/shopify/start-OßAuth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get("shop");
  if (!shop) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 1. generate a random state
  const state = uuid();

  // 2. set it in an httpOnly cookie on your domain
  console.log("Redirecting to shopify's '/oauth/authorize' endpoint");
  const res = NextResponse.redirect(
    `https://${shop}/admin/oauth/authorize?${new URLSearchParams({
      client_id: process.env.SHOPIFY_CLIENT_ID!,
      scope: process.env.SHOPIFY_SCOPES!,
      redirect_uri: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/shopify/callback`,
      state,
    }).toString()}`
  );
  console.log("setting httpOnly cookie for state verification");
  res.cookies.set("shopify_state", state, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "strict",
    path: "/api/auth/shopify",
    maxAge: 60 * 15, // 15 minutes
  });

  return res;
}
