// lib/auth.ts
import { redirect } from "next/navigation";
import { apiRequest } from "./api";

export async function requireAuth(): Promise<string> {
  try {
    const { shop } = await apiRequest<{ shop: string }>({
      url: "/shop/me",
      method: "get",
    });
    return shop;
  } catch (err) {
    console.error("error accessing protected page:", err);
    // on any error (incl. 401) reroute to login
    // redirect("/login");
    redirect("/");
  }
}
