"use client";
import { SessionProvider } from "next-auth/react";

interface type {
  children: React.ReactNode;
}
export default function AuthContext({ children }: type) {
  return <SessionProvider>{children}</SessionProvider>;
}
