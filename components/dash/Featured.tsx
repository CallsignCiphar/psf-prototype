"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowDown, ArrowUp, GripVertical, Plus, Search, TriangleAlert } from "lucide-react";
import { Dialog } from "./interactive";
import { toast } from "./Shell";
import { Field, TextInput } from "@/components/form";

type It = { t: string; m: string; until: string; expired?: boolean };
const INIT: Record<string, It[]> = {
  "Homepage hero": [{ t: "Deterrence stability and hypersonics", m: "Research · Sara Haider, Dr Imran Siddiqui", until: "Until 23 Oct 2026" }],
  "Top Stories": [{ t: "Signalling through tests", m: "Article · Sara Haider", until: "Until 20 Oct 2026" }, { t: "Budget 2026-27: what defence gets", m: "Article · Bilal Ahmed", until: "Until 18 Oct 2026" }, { t: "Afghan transit trade after the closures", m: "Article · Sara Haider", until: "Ended 15 Oct 2026", expired: true }, { t: "Future warfare conference readout", m: "Report · Events team", until: "No end date" }],
  "Editor's picks": [{ t: "Crisis hotlines in South Asia", m: "Article · Sara Haider", until: "No end date" }, { t: "Strategic culture in Pakistani military writing", m: "Research · Sara Haider", until: "No end date" }],
};
const META: Record<string, string> = { "Homepage hero": "1 item · article, report or research", "Top Stories": "Up to 4 items", "Editor's picks": "Up to 3 items" };

function Replace({ slot, n }: { slot: string; n: number }) {
  return (
    <Dialog size="lg" triggerClass="h-9 px-3.5 rounded-full ring-1 ring-line text-[13px] font-semibold hover:bg-canvas" trigger="Replace" title={`Replace ${slot} position ${n}`} confirm={{ label: "Place item", toast: "Item placed" }}>
      <div className="relative"><Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><TextInput placeholder="Search live content" aria-label="Search live content" className="pl-10" /></div>
      <ul className="space-y-2">{[["Kashmir and the 2026 UNGA session", "Article · Rehan Khan", "Live 16 Oct"], ["Budget 2026-27: what defence gets", "Article · Bilal Ahmed", "Already in slot 2"], ["Islamabad Security Dialogue 2026", "Newsroom", "Scheduled 20 Oct"]].map(([t, m, s], i) => (
        <li key={t}><label className="flex items-center gap-3 rounded-2xl ring-1 ring-line p-3.5 cursor-pointer has-[:checked]:ring-2 has-[:checked]:ring-brand-600 has-[:disabled]:opacity-50"><input type="radio" name="fp" defaultChecked={i === 0} disabled={i === 1} className="accent-[#04411f] size-5" /><span className="flex-1"><span className="block font-semibold">{t}</span><span className="text-[13px] text-ink-500">{m}</span></span><span className="text-[12.5px] text-ink-500">{s}</span></label></li>
      ))}</ul>
      <div className="grid grid-cols-2 gap-3"><Field label="Show from" htmlFor="m-ff"><TextInput id="m-ff" type="date" defaultValue="2026-10-16" /></Field><Field label="Show until" hint="Optional" htmlFor="m-fu"><TextInput id="m-fu" type="date" /></Field></div>
    </Dialog>
  );
}

export function FeaturedSlots() {
  const [slots, setSlots] = useState(INIT);
  const move = (k: string, i: number, d: number) => { const a = [...slots[k]]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setSlots({ ...slots, [k]: a }); };
  return (
    <div className="space-y-5">
      <div className="flex gap-3 rounded-[20px] bg-danger-50 p-4"><TriangleAlert className="size-5 text-danger-700 shrink-0 mt-0.5" /><div><p className="font-semibold text-danger-700">1 slot is holding an expired item</p><p className="text-[14px] text-ink-700">Top Stories position 3 ended on 15 Oct 2026, 23:59. Replace it or it will be removed at the next refresh.</p></div></div>
      {Object.entries(slots).map(([k, items]) => (
        <section key={k} className="bg-white rounded-[22px] shadow-soft p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4"><div><h2 className="font-semibold text-[16.5px]">{k}</h2><p className="text-[13px] text-ink-500">{META[k]}</p></div><button type="button" onClick={() => toast("Choose an item to add")} className="h-9 px-3.5 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1.5"><Plus className="size-4" />Add item</button></div>
          <ol className="space-y-2">{items.map((it, i) => (
            <li key={it.t} className={clsx("flex items-center gap-3 rounded-2xl p-3 ring-1", it.expired ? "ring-danger-700/40 bg-danger-50/50" : "ring-line bg-canvas/40")}>
              <GripVertical className="size-5 text-ink-300 hidden sm:block" />
              <span className="size-8 rounded-full bg-white ring-1 ring-line grid place-items-center text-[13px] font-bold tabular-nums shrink-0">{i + 1}</span>
              <span className="flex-1 min-w-0"><span className="block font-semibold text-[14.5px] truncate">{it.t}</span><span className="block text-[12.5px] text-ink-500 truncate">{it.m} · <span className={it.expired ? "text-danger-700 font-semibold" : ""}>{it.until}</span></span></span>
              <span className="hidden sm:flex gap-1"><button type="button" aria-label="Move up" onClick={() => move(k, i, -1)} className="size-8 grid place-items-center rounded-lg hover:bg-white"><ArrowUp className="size-4" /></button><button type="button" aria-label="Move down" onClick={() => move(k, i, 1)} className="size-8 grid place-items-center rounded-lg hover:bg-white"><ArrowDown className="size-4" /></button></span>
              <Replace slot={k} n={i + 1} />
            </li>
          ))}</ol>
        </section>
      ))}
    </div>
  );
}
