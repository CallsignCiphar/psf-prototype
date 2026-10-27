"use client";

import { useState } from "react";
import clsx from "clsx";
import { ARTICLES, REPORTS, RESEARCH_ALL } from "@/lib/data";
import { ArticleCard, ReportCard } from "@/components/cards";
import { PaperCard } from "@/components/PaperCard";

export function AuthorWorks({ articles, reports, papers }: { articles: string[]; reports: string[]; papers: string[] }) {
  const [tab, setTab] = useState("All");
  const arts = ARTICLES.filter((a) => articles.includes(a.slug));
  const reps = REPORTS.filter((r) => reports.includes(r.slug));
  const paps = RESEARCH_ALL.filter((p) => papers.includes(p.slug));
  const tabs: [string, number][] = [["All", arts.length + reps.length + paps.length], ["Articles", arts.length], ["Reports", reps.length], ["Research", paps.length]];
  const show = (t: string) => tab === "All" || tab === t;
  return (
    <div>
      <div role="tablist" aria-label="Work type" className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map(([t, n]) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={clsx("shrink-0 h-11 px-5 rounded-full text-[15px] font-semibold inline-flex items-center gap-2", tab === t ? "bg-brand-800 text-white shadow-lift" : "bg-white shadow-soft text-ink-700")}>{t}<span className={clsx("text-xs tabular-nums", tab === t ? "text-white/70" : "text-ink-400")}>{n}</span></button>)}
      </div>
      {show("Articles") && arts.length > 0 && <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{arts.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>}
      {show("Reports") && reps.length > 0 && <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{reps.map((r) => <ReportCard key={r.slug} r={r} />)}</div>}
      {show("Research") && paps.length > 0 && <div className="mt-6 grid md:grid-cols-2 gap-5">{paps.map((p) => <PaperCard key={p.slug} p={p} />)}</div>}
      {tab !== "All" && tabs.find(([t]) => t === tab)![1] === 0 && <div className="mt-6 card p-10 text-center text-ink-600">Nothing published in this category yet.</div>}
    </div>
  );
}
