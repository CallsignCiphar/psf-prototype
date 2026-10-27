"use client";

import { useState } from "react";
import clsx from "clsx";
import { BookOpenText, FlaskConical, Landmark, Microscope, X } from "lucide-react";
import { Field, TextInput } from "@/components/form";

export function PaperType() {
  const [v, setV] = useState("Original research");
  const opts = [[Microscope, "Original research", "New findings with a stated method"], [BookOpenText, "Review article", "Synthesis of existing literature"], [Landmark, "Policy paper", "Evidence-based recommendations"], [FlaskConical, "Case study", "In-depth study of one event or actor"]] as const;
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink-800 mb-3">What are you submitting?<span className="text-danger-700">*</span></legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {opts.map(([I, t, d]) => (
          <label key={t} className={clsx("relative flex gap-3 rounded-2xl p-4 cursor-pointer ring-1 transition", v === t ? "ring-2 ring-brand-600 bg-mint-100/50" : "ring-line-strong hover:ring-brand-300")}>
            <input type="radio" name="pt" checked={v === t} onChange={() => setV(t)} className="sr-only" />
            <span className={clsx("size-10 rounded-xl grid place-items-center shrink-0", v === t ? "bg-brand-800 text-white" : "bg-canvas text-brand-700")}><I className="size-5" /></span>
            <span><span className="block font-semibold">{t}</span><span className="block text-[13px] text-ink-500">{d}</span></span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Abstract() {
  const [v, setV] = useState("Groundwater in the Lower Indus Basin is falling faster than recharge. Using GRACE satellite data and provincial well records from 2003 to 2025, this paper estimates depletion by district and argues that the decline is now a security issue: it shapes migration into Karachi, raises the cost of irrigation, and sharpens disputes between provinces over surface water. The paper sets out how water accounting could be built into provincial security planning, and what a basin-level early warning system would need. It closes with three steps the federal government could take within existing law and budgets.");
  const w = v.trim().split(/\s+/).filter(Boolean).length;
  const ok = w >= 150 && w <= 300;
  return (
    <Field label="Abstract" required htmlFor="rs-abs" hint={<span className={ok ? "text-brand-700 font-semibold" : "text-danger-700 font-semibold"}>{w} words. Between 150 and 300 words.</span>}>
      <textarea id="rs-abs" rows={7} value={v} onChange={(e) => setV(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white ring-1 ring-line-strong text-[15px] leading-relaxed outline-none focus:ring-2 focus:ring-brand-400" />
    </Field>
  );
}

export function Keywords() {
  const [k, setK] = useState(["Groundwater", "Sindh", "Water security", "GRACE"]);
  const [v, setV] = useState("");
  return (
    <Field label="Keywords" required hint="3 to 6 keywords" htmlFor="rs-kw">
      <div className="min-h-12 rounded-xl bg-white ring-1 ring-line-strong p-1.5 flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-brand-400">
        {k.map((x) => <span key={x} className="h-8 pl-3 pr-1 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1">{x}<button type="button" aria-label={`Remove ${x}`} onClick={() => setK(k.filter((y) => y !== x))} className="size-6 grid place-items-center rounded-full hover:bg-white"><X className="size-3.5" /></button></span>)}
        {k.length < 6 && <input id="rs-kw" value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && v.trim()) { e.preventDefault(); setK([...k, v.trim()]); setV(""); } }} placeholder="Add keyword" className="flex-1 min-w-28 px-2 outline-none text-[14px]" />}
      </div>
    </Field>
  );
}

export function CoAuthorRows() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-3">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="grid sm:grid-cols-3 gap-3 rounded-2xl bg-canvas p-4 relative">
          <Field label="Full name" required htmlFor={`ca${i}n`}><TextInput id={`ca${i}n`} required /></Field>
          <Field label="Email" required htmlFor={`ca${i}e`}><TextInput id={`ca${i}e`} type="email" required /></Field>
          <Field label="Institution" htmlFor={`ca${i}i`}><TextInput id={`ca${i}i`} /></Field>
          <button type="button" onClick={() => setN(n - 1)} aria-label="Remove co-author" className="absolute top-2 right-2 size-8 grid place-items-center rounded-lg hover:bg-white"><X className="size-4" /></button>
        </div>
      ))}
      {n < 6 && <button type="button" onClick={() => setN(n + 1)} className="h-11 px-4 rounded-full ring-1 ring-line-strong text-[14px] font-semibold hover:bg-brand-50">+ Add co-author</button>}
      <p className="text-[13px] text-ink-500">Up to 6 co-authors. Each receives an email to confirm authorship before review starts.</p>
    </div>
  );
}
