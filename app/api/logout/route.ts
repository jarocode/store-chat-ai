// app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    // proxy logout to NestJS
    await apiRequest({
      url: "/auth/logout",
      method: "post",
    });
  } catch (err) {
    console.error("Logout failed:", err);
  }
  // clear cookie & redirect to login
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.set("jwt", "", { maxAge: 0, path: "/" });
  return res;
}
