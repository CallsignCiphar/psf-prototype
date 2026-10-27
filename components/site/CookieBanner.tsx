"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { btn } from "@/components/ui";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { setShow(!localStorage.getItem("psf-cookies")); } catch { setShow(true); } }, []);
  const choose = (v: string) => { try { localStorage.setItem("psf-cookies", v); } catch {} setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md z-50 card shadow-pop ring-1 ring-line p-5 animate-fade-in" role="dialog" aria-label="Cookie preferences">
      <div className="flex gap-3">
        <span className="size-10 shrink-0 rounded-xl bg-mint-100 text-brand-800 grid place-items-center"><Cookie className="size-5" /></span>
        <div>
          <p className="font-semibold text-ink-900">We use cookies</p>
          <p className="text-sm text-ink-600 mt-1 leading-relaxed">Essential cookies keep the site working. With your consent we also use analytics to understand what readers find useful. <Link href="/cookies" className="text-brand-700 font-medium underline underline-offset-2">Cookie policy</Link></p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button onClick={() => choose("essential")} className={btn("secondary", "sm", "w-full")}>Essential</button>
        <Link href="/cookies" className={btn("ghost", "sm", "w-full")}>Settings</Link>
        <button onClick={() => choose("all")} className={btn("primary", "sm", "w-full")}>Accept all</button>
      </div>
    </div>
  );
}
