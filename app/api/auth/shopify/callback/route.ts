// app/api/auth/shopify/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop")!;
  const code = url.searchParams.get("code")!;
  const state = url.searchParams.get("state")!;
  const hmac = url.searchParams.get("hmac")!;

  // validate our one-time state cookie
  const cookieState = request.cookies.get("shopify_state")?.value;
  if (!cookieState || cookieState !== state) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // build the response early so we can delete the state cookie
  const response = NextResponse.redirect(new URL("/onboarding", request.url));

  // correctly delete by passing a single object
  response.cookies.delete({
    name: "shopify_state",
    path: "/api/auth/shopify",
  });

  // proxy to NestJS, etc...
  const proxy = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/shopify/callback-proxy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify({ shop, code, state, hmac }),
    }
  );
  if (!proxy.ok) {
    console.error("Callback-proxy error:", await proxy.text());
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { jwt } = await proxy.json();
  response.cookies.set("jwt", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
