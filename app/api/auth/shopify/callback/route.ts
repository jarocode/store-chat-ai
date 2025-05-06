// app/api/auth/shopify/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  // collect all Shopify’s callback params
  const dto: Record<string, string> = {};
  for (const [key, value] of url.searchParams) {
    dto[key] = value;
  }

  const { state } = dto;

  // validate our one-time state cookie
  const cookieState = request.cookies.get("shopify_state")?.value;
  if (!cookieState || cookieState !== state) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // build the response early so we can delete the state cookie
  const response = NextResponse.redirect(new URL("/onboarding", request.url));

  // correctly delete by passing a single object
  response.cookies.delete({
    name: "shopify_state",
    path: "/api/auth/shopify",
  });

  // proxy to NestJS, etc...
  console.log("fetching jwt from Nestjs server");
  const proxy = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/shopify/callback-proxy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(dto),
    }
  );
  if (!proxy.ok) {
    console.error("Callback-proxy error:", await proxy.text());
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("jwt retrieved from Nestjs server! ");

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
