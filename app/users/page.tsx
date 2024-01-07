"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return <button onClick={() => signOut()}>Logout</button>;
}
