// lib/auth.ts
import { redirect } from "next/navigation";
import { apiRequest } from "./api";

export async function requireAuth(): Promise<string> {
  try {
    const { shop } = await apiRequest<{ shop: string }>({
      url: "/shops/me",
      method: "get",
    });
    return shop;
  } catch (err) {
    // on any error (incl. 401) reroute to login
    // redirect("/login");
    redirect("/");
  }
}
