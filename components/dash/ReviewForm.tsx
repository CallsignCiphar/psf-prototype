"use client";

import { useState } from "react";
import clsx from "clsx";

export function Scores() {
  const crit = ["Originality", "Methodological rigour", "Evidence and sourcing", "Clarity of writing", "Relevance to Pakistan Strategic Forum readers"];
  const [v, setV] = useState<Record<string, number>>({ Originality: 4, "Methodological rigour": 4, "Evidence and sourcing": 3, "Clarity of writing": 4 });
  return (
    <fieldset>
      <legend className="text-sm font-semibold mb-3">Scores<span className="text-danger-700">*</span> <span className="font-normal text-ink-500">1 low, 5 high</span></legend>
      <div className="space-y-3">
        {crit.map((c) => (
          <div key={c} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[14px] text-ink-700">{c}</span>
            <div role="radiogroup" aria-label={c} className="flex gap-1.5">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={v[c] === n} onClick={() => setV({ ...v, [c]: n })} className={clsx("size-10 rounded-xl text-[14px] font-bold tabular-nums transition", v[c] === n ? "bg-brand-800 text-white shadow-lift" : v[c] && n < v[c] ? "bg-mint-100 text-brand-800" : "bg-canvas text-ink-500 hover:bg-mint-100")}>{n}</button>)}</div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export function Recommendation() {
  const [v, setV] = useState("Major revisions");
  const opts = [["Accept as is", "bg-mint-100 text-brand-800 ring-brand-600"], ["Minor revisions", "bg-mint-100 text-brand-800 ring-brand-600"], ["Major revisions", "bg-attn-50 text-attn-700 ring-attn-700"], ["Reject", "bg-danger-50 text-danger-700 ring-danger-700"]];
  return (
    <fieldset>
      <legend className="text-sm font-semibold mb-3">Recommendation<span className="text-danger-700">*</span></legend>
      <div className="grid grid-cols-2 gap-2">{opts.map(([o, c]) => <label key={o} className={clsx("h-12 rounded-xl grid place-items-center text-[14px] font-semibold cursor-pointer ring-1 transition", v === o ? `${c} ring-2` : "bg-white ring-line-strong text-ink-700 hover:ring-brand-300")}><input type="radio" name="rec" className="sr-only" checked={v === o} onChange={() => setV(o)} />{o}</label>)}</div>
    </fieldset>
  );
}

export function PaperTabs({ children }: { children: React.ReactNode }) {
  const [t, setT] = useState("Paper");
  return (
    <div>
      <div className="flex gap-1 p-1 rounded-full bg-canvas w-fit max-w-full overflow-x-auto no-scrollbar">{["Paper", "PDF", "Files (2)", "Previous round"].map((x) => <button key={x} type="button" onClick={() => setT(x)} className={clsx("h-9 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap", t === x ? "bg-white shadow-soft text-brand-800" : "text-ink-500")}>{x}</button>)}</div>
      <div className="mt-4">{t === "Paper" ? children : <div className="rounded-2xl bg-canvas p-10 text-center text-ink-500">{t === "PDF" ? "The anonymised PDF opens in a secure viewer." : t === "Files (2)" ? "Supplementary data.xlsx · Figures.pdf" : "No previous round for this paper."}</div>}</div>
    </div>
  );
}
