"use client";

import { useState } from "react";
import clsx from "clsx";
import { Cookie, X } from "lucide-react";
import { btn } from "./ui";

const CATS = [
  { k: "essential", t: "Essential", d: "Keep the site working: sign-in, security checks and your cookie choice. Always on.", locked: true },
  { k: "preferences", t: "Preferences", d: "Remember settings such as text size." },
  { k: "analytics", t: "Analytics", d: "Anonymous statistics about which pages are read." },
];

export function CookieSettings() {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState<Record<string, boolean>>({ essential: true, preferences: true, analytics: false });
  const save = () => { try { localStorage.setItem("psf-cookies", JSON.stringify(on)); } catch {} setOpen(false); };
  return (
    <>
      <button onClick={() => setOpen(true)} className={btn("primary", "md", "rounded-full")}><Cookie className="size-4" />Change cookie settings</button>
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Cookie settings">
          <div className="absolute inset-0 bg-ink-900/50 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:max-w-[560px] bg-white rounded-t-[28px] sm:rounded-3xl shadow-pop p-5 sm:p-6 animate-fade-in">
            <div className="flex items-center justify-between"><h2 className="font-semibold text-lg">Cookie settings</h2><button onClick={() => setOpen(false)} aria-label="Close" className="size-10 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button></div>
            <ul className="mt-4 divide-y divide-line">
              {CATS.map((c) => (
                <li key={c.k} className="flex items-start justify-between gap-4 py-4">
                  <div><p className="font-semibold">{c.t}</p><p className="text-sm text-ink-600 mt-0.5">{c.d}</p></div>
                  <button role="switch" aria-checked={on[c.k]} aria-label={c.t} disabled={c.locked} onClick={() => setOn({ ...on, [c.k]: !on[c.k] })}
                    className={clsx("relative w-12 h-7 rounded-full shrink-0 transition", on[c.k] ? "bg-brand-700" : "bg-ink-300", c.locked && "opacity-60")}>
                    <span className={clsx("absolute top-1 size-5 rounded-full bg-white shadow transition-all", on[c.k] ? "left-6" : "left-1")} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => { setOn({ essential: true, preferences: false, analytics: false }); }} className={btn("secondary", "md")}>Essential only</button>
              <button onClick={save} className={btn("primary", "md")}>Save choices</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
