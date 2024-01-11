"use client";
import React from "react";
import EmptyState from "../components/EmptyState";
import useConvertion from "../Hooks/useConversation";
import clsx from "clsx";

export default function Home() {
  const { isOpen } = useConvertion();
  return (
    <div
      className={clsx(
        `
    lg:pl-80 h-full lg:block
    `,
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
}
