// app/(protected)/context/shop-context.ts
"use client";
import { createContext, useContext } from "react";

// defaultValue only used for type inference; won't actually be read
export const ShopContext = createContext<string | null>(null);

export function ShopProvider({
  children,
  shop,
}: {
  children: React.ReactNode;
  shop: string;
}) {
  return <ShopContext.Provider value={shop}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return shop;
}
