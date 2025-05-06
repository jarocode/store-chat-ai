// app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // --- (optional) tell NestJS to blacklist this JWT ---
  // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/revoke`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ /* maybe send the token or shop */ }),
  //   credentials: 'include'
  // });

  // --- clear the cookie on THIS domain ---
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.set("jwt", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "none",
  });

  return res;
}
