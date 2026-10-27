"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { FileText, GraduationCap, Newspaper, ScrollText, Search, X } from "lucide-react";
import { ARTICLES, NEWSROOM, REPORTS, RESEARCH_ALL, TOPICS, authorBySlug, topicBySlug } from "@/lib/data";
import { FilterBar, useFilters } from "@/components/filters";
import { Pagination } from "@/components/page";

type R = { type: "Articles" | "Reports" | "Research" | "Newsroom"; title: string; meta: string; body: string; href: string; topic?: string };
const ALL: R[] = [
  ...ARTICLES.map((a) => ({ type: "Articles" as const, title: a.title, meta: `${a.label} · ${authorBySlug(a.author).name} · ${a.date}`, body: a.standfirst, href: `/articles/${a.slug}`, topic: topicBySlug(a.topic).name })),
  ...REPORTS.map((r) => ({ type: "Reports" as const, title: r.title, meta: `${r.category} · ${r.date} · ${r.pages} pages`, body: r.summary, href: `/reports/${r.slug}` })),
  ...RESEARCH_ALL.map((p) => ({ type: "Research" as const, title: p.title, meta: `Peer-reviewed · ${p.authors} · ${p.date}`, body: p.abstract, href: `/research/${p.slug}` })),
  ...NEWSROOM.map((n) => ({ type: "Newsroom" as const, title: n.title, meta: `${n.time} PKT · ${n.country}`, body: n.summary, href: `/newsroom/${n.id}`, topic: n.topic })),
];
const ICON = { Articles: FileText, Reports: ScrollText, Research: GraduationCap, Newsroom: Newspaper };

function hl(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark className="bg-mint-200 text-ink-900 rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export function SearchResults() {
  const sp = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [type, setType] = useState<string>(sp.get("type") ? { articles: "Articles", reports: "Reports", research: "Research", newsroom: "Newsroom" }[sp.get("type")!] ?? "All" : "All");
  const [f, setF] = useFilters({ sort: "Relevance" });
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const base = useMemo(() => ALL.filter((r) => words.every((w) => (r.title + " " + r.body + " " + r.meta).toLowerCase().includes(w)) || words.length === 0), [q]); // eslint-disable-line react-hooks/exhaustive-deps
  const results = base.filter((r) => (type === "All" || r.type === type) && (!f.sel.topic?.length || (r.topic && f.sel.topic.includes(r.topic))));
  const counts = (t: string) => base.filter((r) => t === "All" || r.type === t).length;

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); router.replace(`/search?q=${encodeURIComponent(q)}`); }} className="relative">
        <label htmlFor="s-q" className="sr-only">Search Pakistan Strategic Forum</label>
        <Search className="size-6 absolute left-5 top-1/2 -translate-y-1/2 text-brand-700" />
        <input id="s-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, reports, research and news" className="w-full h-16 pl-14 pr-28 rounded-2xl bg-white shadow-lift ring-1 ring-line text-lg outline-none focus:ring-2 focus:ring-brand-400" />
        {q && <button type="button" onClick={() => setQ("")} aria-label="Clear" className="absolute right-24 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button>}
        <button className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-5 rounded-xl bg-brand-800 text-white font-semibold">Search</button>
      </form>
      <div role="tablist" aria-label="Content type" className="mt-5 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {["All", "Articles", "Reports", "Research", "Newsroom"].map((t) => (
          <button key={t} role="tab" aria-selected={type === t} onClick={() => setType(t)} className={clsx("shrink-0 h-10 px-4 rounded-full text-sm font-semibold inline-flex items-center gap-2", type === t ? "bg-brand-800 text-white" : "bg-white shadow-soft text-ink-700")}>
            {t}<span className={clsx("text-xs tabular-nums", type === t ? "text-white/70" : "text-ink-400")}>{counts(t)}</span>
          </button>
        ))}
      </div>
      <div className="mt-4"><FilterBar state={f} setState={setF} count={results.length} noun={`results${q ? ` for "${q}"` : ""}`}
        selects={[{ key: "topic", label: "Topic", options: TOPICS.map((t) => t.name), multi: true }, { key: "time", label: "Any time", options: ["Past week", "Past month", "Past year"] }, { key: "author", label: "Author", options: ["Ayesha Rahman", "Sara Haider", "Bilal Ahmed", "Rehan Khan"], multi: true }]}
        sorts={["Relevance", "Newest", "Oldest", "Most read"]} /></div>
      {results.length ? (
        <ul className="mt-6 space-y-3">
          {results.map((r) => { const I = ICON[r.type]; return (
            <li key={r.href}>
              <Link href={r.href} className="group card card-hover p-5 sm:p-6 flex gap-4">
                <span className="size-11 shrink-0 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><I className="size-5" /></span>
                <span className="min-w-0">
                  <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">{r.type}</span>
                  <span className="mt-1 block font-serif text-lg sm:text-xl leading-snug font-semibold group-hover:text-brand-700">{hl(r.title, words[0] ?? "")}</span>
                  <span className="mt-1 block text-[15px] text-ink-600 line-clamp-2">{hl(r.body, words[0] ?? "")}</span>
                  <span className="mt-2 block text-[13px] text-ink-500">{r.meta}</span>
                </span>
              </Link>
            </li>
          ); })}
        </ul>
      ) : (
        <div className="mt-6 card p-10 text-center">
          <p className="font-serif text-2xl font-semibold">No results for "{q}"</p>
          <p className="mt-2 text-ink-600">Check the spelling, use fewer words, or try one of these:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">{["Defence budget", "Indus", "Afghanistan", "Deterrence"].map((s) => <button key={s} onClick={() => setQ(s)} className="h-9 px-4 rounded-full ring-1 ring-line text-sm font-medium hover:bg-brand-50">{s}</button>)}</div>
        </div>
      )}
      {results.length > 0 && <Pagination pages={2} label={`${results.length} results`} />}
    </div>
  );
}
