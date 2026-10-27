"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";

/* Prototype-only shortcut back to the screen index. Not part of the product UI. */
export function ProtoNav() {
  const path = usePathname();
  if (path === "/prototype") return null;
  return (
    <Link href="/prototype" aria-label="All screens (prototype index)"
      className="fixed left-3 bottom-3 z-[55] inline-flex items-center gap-2 h-10 px-3.5 rounded-full bg-ink-900/90 text-white text-[13px] font-medium shadow-pop backdrop-blur hover:bg-ink-900">
      <LayoutGrid className="size-4" /><span className="hidden sm:inline">All screens</span>
    </Link>
  );
}
