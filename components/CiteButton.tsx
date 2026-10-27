"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, Copy, Quote, X } from "lucide-react";
import { btn } from "./ui";

export function CiteButton({ title, authors, year, kind = "report", reference }: { title: string; authors: string; year: string; kind?: string; reference?: string }) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<"APA" | "Chicago" | "BibTeX">("APA");
  const [copied, setCopied] = useState(false);
  const text = {
    APA: `${authors} (${year}). ${title}. Pakistan Strategic Forum.${reference ? ` ${reference}.` : ""}`,
    Chicago: `${authors}. "${title}." Pakistan Strategic Forum, ${year}.${reference ? ` ${reference}.` : ""}`,
    BibTeX: `@${kind === "research" ? "article" : "techreport"}{psf${year},\n  title = {${title}},\n  author = {${authors}},\n  institution = {Pakistan Strategic Forum},\n  year = {${year}}${reference ? `,\n  note = {${reference}}` : ""}\n}`,
  }[style];
  const copy = async () => { try { await navigator.clipboard.writeText(text); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <>
      <button onClick={() => setOpen(true)} className={btn("secondary", "md", "rounded-full")}><Quote className="size-4" />Cite</button>
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Cite this">
          <div className="absolute inset-0 bg-ink-900/50 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:max-w-[560px] bg-white rounded-t-[28px] sm:rounded-3xl shadow-pop p-5 sm:p-6 animate-fade-in">
            <div className="flex items-center justify-between"><h2 className="font-semibold text-lg">Cite this {kind}</h2><button onClick={() => setOpen(false)} aria-label="Close" className="size-10 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button></div>
            <div role="tablist" className="mt-4 flex gap-1 rounded-full bg-canvas p-1 w-fit">
              {(["APA", "Chicago", "BibTeX"] as const).map((s) => <button key={s} role="tab" aria-selected={style === s} onClick={() => setStyle(s)} className={clsx("h-9 px-4 rounded-full text-sm font-medium", style === s ? "bg-white shadow-soft text-brand-800" : "text-ink-600")}>{s}</button>)}
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-canvas p-4 text-sm text-ink-800 font-mono leading-relaxed">{text}</pre>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className={btn("ghost", "md")}>Close</button>
              <button onClick={copy} className={btn("primary", "md")}>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Copied" : "Copy citation"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
