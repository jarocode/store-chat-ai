// app/(protected)/layout.tsx
import { ReactNode } from "react";
import { requireAuth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const shop = await requireAuth(); // runs once for ALL nested routes
  return <div>{children}</div>;
}
