"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, Facebook, Link2, Linkedin, MessageCircle, Send, Twitter } from "lucide-react";

const NETS = [
  { key: "x", label: "Share on X", icon: Twitter },
  { key: "facebook", label: "Share on Facebook", icon: Facebook },
  { key: "whatsapp", label: "Share on WhatsApp", icon: MessageCircle },
  { key: "linkedin", label: "Share on LinkedIn", icon: Linkedin },
  { key: "telegram", label: "Share on Telegram", icon: Send },
];

export function ShareBar({ vertical, className }: { vertical?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(window.location.href); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <div className={clsx("flex gap-2", vertical ? "flex-col" : "flex-wrap items-center", className)} aria-label="Share">
      {!vertical && <span className="text-sm font-medium text-ink-500 mr-1">Share</span>}
      {NETS.map((n) => (
        <a key={n.key} href="#" aria-label={n.label} className="size-10 grid place-items-center rounded-full bg-white ring-1 ring-line text-ink-700 hover:ring-brand-300 hover:text-brand-800 hover:bg-brand-50"><n.icon className="size-[18px]" /></a>
      ))}
      <button onClick={copy} aria-label="Copy link" className={clsx("h-10 grid place-items-center rounded-full ring-1 transition", vertical ? "size-10" : "px-3.5 inline-flex items-center gap-1.5 text-sm font-medium",
        copied ? "bg-brand-800 text-white ring-brand-800" : "bg-white ring-line text-ink-700 hover:ring-brand-300 hover:text-brand-800")}>
        {copied ? <Check className="size-[18px]" /> : <Link2 className="size-[18px]" />}{!vertical && (copied ? "Copied" : "Copy link")}
      </button>
    </div>
  );
}
