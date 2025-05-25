// app/(protected)/layout.tsx
import { ReactNode } from "react";

import { requireAuth } from "@/lib/auth";

import { ShopProvider } from "./context/shop-context";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const shop = await requireAuth(); // runs once for ALL nested routes

  return <ShopProvider shop={shop}>{children}</ShopProvider>;
}
