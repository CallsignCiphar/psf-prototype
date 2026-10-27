"use client";

import { useState } from "react";
import clsx from "clsx";
import { Clock, Play, RefreshCw, X } from "lucide-react";
import { Cover } from "@/components/ui";

const VIDS = [
  { id: "v1", title: "Air defence in depth, explained in 6 minutes", cat: "Explainers", length: "6:12", date: "16 Oct 2026", art: 31 },
  { id: "v2", title: "Islamabad Security Dialogue 2026: opening panel", cat: "Events", length: "48:30", date: "10 Oct 2026", art: 32 },
  { id: "v3", title: "The Hangor submarine programme in context", cat: "Explainers", length: "9:45", date: "3 Oct 2026", art: 33 },
  { id: "v4", title: "Reading the defence budget with Bilal Ahmed", cat: "Interviews", length: "12:08", date: "26 Sep 2026", art: 34 },
  { id: "v5", title: "Map brief: the Red Sea in five minutes", cat: "Map briefs", length: "5:02", date: "20 Sep 2026", art: 35 },
  { id: "v6", title: "A former envoy on Riyadh and Islamabad", cat: "Interviews", length: "22:40", date: "12 Sep 2026", art: 36 },
  { id: "v7", title: "Map brief: the Afghan border crossings", cat: "Map briefs", length: "4:18", date: "1 Sep 2026", art: 37 },
  { id: "v8", title: "Youth dialogue on national security", cat: "Events", length: "35:10", date: "19 Jan 2026", art: 38 },
];
const CATS = ["All", "Explainers", "Interviews", "Events", "Map briefs"];

export function VideoBrowser() {
  const [cat, setCat] = useState("All");
  const [play, setPlay] = useState<(typeof VIDS)[number] | null>(null);
  const list = VIDS.filter((v) => cat === "All" || v.cat === cat);
  return (
    <div>
      <div role="tablist" aria-label="Video categories" className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATS.map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={clsx("shrink-0 h-11 px-5 rounded-full text-[15px] font-semibold transition", cat === c ? "bg-brand-800 text-white shadow-lift" : "bg-white text-ink-700 shadow-soft hover:text-brand-800")}>{c}</button>)}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((v) => (
          <button key={v.id} id={v.id} onClick={() => setPlay(v)} className="group text-left">
            <span className="relative block aspect-video rounded-2xl overflow-hidden shadow-soft">
              <Cover seed={v.art} kind="waves" dark className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center"><span className="size-14 rounded-full bg-white/95 text-brand-800 grid place-items-center shadow-lift transition group-hover:scale-110"><Play className="size-6 translate-x-0.5" fill="currentColor" /></span></span>
              <span className="absolute left-3 top-3 h-6 px-2.5 rounded-full bg-white/90 text-brand-800 text-xs font-semibold grid place-items-center">{v.cat}</span>
              <span className="absolute right-3 bottom-3 h-6 px-2 rounded-md bg-brand-950/80 text-white text-xs font-semibold grid place-items-center tabular-nums">{v.length}</span>
            </span>
            <span className="mt-3 block font-semibold text-[16px] leading-snug group-hover:text-brand-700">{v.title}</span>
            <span className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-500"><Clock className="size-3.5" />{v.date}</span>
          </button>
        ))}
      </div>
      <div className="mt-10 text-center"><button className="h-12 px-6 rounded-full bg-white shadow-soft font-semibold text-brand-800 inline-flex items-center gap-2 hover:shadow-lift"><RefreshCw className="size-4" />Load more</button></div>
      {play && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={play.title}>
          <div className="absolute inset-0 bg-ink-900/80 animate-fade-in" onClick={() => setPlay(null)} />
          <div className="relative w-full max-w-5xl animate-fade-in">
            <button onClick={() => setPlay(null)} aria-label="Close video" className="absolute -top-12 right-0 size-11 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"><X className="size-5" /></button>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black grid place-items-center">
              <Cover seed={play.art} kind="waves" dark className="absolute inset-0 opacity-70" />
              <p className="relative text-white/80 text-sm">YouTube player loads here</p>
            </div>
            <p className="mt-4 text-white font-semibold text-lg">{play.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
