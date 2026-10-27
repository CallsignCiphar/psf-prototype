"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Clock, CornerDownLeft, FileText, GraduationCap, Newspaper, ScrollText, Search, TrendingUp, X } from "lucide-react";
import { ARTICLES, NEWS, REPORTS, RESEARCH, authorBySlug } from "@/lib/data";

const SCOPES = [
  { key: "all", label: "All" },
  { key: "articles", label: "Articles" },
  { key: "reports", label: "Reports" },
  { key: "research", label: "Research" },
  { key: "newsroom", label: "Newsroom" },
] as const;
type Scope = (typeof SCOPES)[number]["key"];
const TRENDING = ["Defence budget", "Indus waters", "Hangor submarine", "Afghanistan border", "Hypersonics"];

type Result = { kind: Scope; title: string; meta: string; href: string };

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => { input.current?.focus(); const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  const all: Result[] = useMemo(() => [
    ...ARTICLES.map((a) => ({ kind: "articles" as const, title: a.title, meta: `${a.label} · ${authorBySlug(a.author).name} · ${a.date}`, href: `/articles/${a.slug}` })),
    ...REPORTS.map((r) => ({ kind: "reports" as const, title: r.title, meta: `Report · ${r.category} · ${r.date}`, href: `/reports/${r.slug}` })),
    ...RESEARCH.map((p) => ({ kind: "research" as const, title: p.title, meta: `Peer-reviewed · ${p.authors}`, href: `/research/${p.slug}` })),
    ...NEWS.map((n) => ({ kind: "newsroom" as const, title: n.title, meta: `Newsroom · ${n.region} · ${n.time}`, href: `/newsroom/${n.id}` })),
  ], []);
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return all.filter((r) => (scope === "all" || r.kind === scope) && (!t || r.title.toLowerCase().includes(t) || r.meta.toLowerCase().includes(t))).slice(0, t ? 8 : 5);
  }, [q, scope, all]);
  const ICON = { articles: FileText, reports: ScrollText, research: GraduationCap, newsroom: Newspaper, all: FileText };

  const submit = () => { router.push(`/search?q=${encodeURIComponent(q)}${scope !== "all" ? `&type=${scope}` : ""}`); onClose(); };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative mx-auto mt-0 sm:mt-[8vh] w-full sm:max-w-2xl sm:px-4 h-full sm:h-auto animate-fade-in">
        <div className="bg-white sm:rounded-3xl shadow-pop overflow-hidden h-full sm:h-auto flex flex-col">
          <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex items-center gap-3 px-4 sm:px-5 h-16 border-b border-line">
            <Search className="size-5 text-brand-700 shrink-0" aria-hidden />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, reports, research and news" aria-label="Search"
              className="flex-1 min-w-0 h-full bg-transparent outline-none text-[17px] placeholder:text-ink-400" />
            {q && <button type="button" onClick={() => setQ("")} className="text-sm font-medium text-ink-500 hover:text-ink-900 px-2">Clear</button>}
            <button type="button" onClick={onClose} aria-label="Close search" className="size-10 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button>
          </form>
          <div className="flex gap-2 px-4 sm:px-5 py-3 overflow-x-auto no-scrollbar border-b border-line">
            {SCOPES.map((s) => (
              <button key={s.key} onClick={() => setScope(s.key)} aria-pressed={scope === s.key}
                className={clsx("h-8 px-3.5 rounded-full text-sm font-medium whitespace-nowrap transition", scope === s.key ? "bg-brand-800 text-white" : "bg-canvas text-ink-600 hover:text-brand-800")}>{s.label}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-2 sm:p-3 sm:max-h-[56vh]">
            {!q && (
              <div className="px-3 pt-2 pb-4">
                <p className="eyebrow text-ink-500 mb-3 flex items-center gap-1.5"><TrendingUp className="size-3.5" />Trending searches</p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => <button key={t} onClick={() => setQ(t)} className="h-9 px-3.5 rounded-full ring-1 ring-line text-sm text-ink-700 hover:ring-brand-300 hover:bg-brand-50 hover:text-brand-800">{t}</button>)}
                </div>
                <p className="eyebrow text-ink-500 mt-6 mb-1 flex items-center gap-1.5"><Clock className="size-3.5" />Latest</p>
              </div>
            )}
            {results.length ? (
              <ul>
                {results.map((r) => { const Icon = ICON[r.kind]; return (
                  <li key={r.href}>
                    <Link href={r.href} onClick={onClose} className="group flex items-center gap-3 rounded-2xl p-3 hover:bg-brand-50">
                      <span className="size-10 shrink-0 grid place-items-center rounded-xl bg-brand-100 text-brand-800"><Icon className="size-5" /></span>
                      <span className="min-w-0 flex-1"><span className="block font-medium text-ink-900 line-clamp-2 group-hover:text-brand-800">{r.title}</span><span className="block text-[13px] text-ink-500 truncate">{r.meta}</span></span>
                      <ArrowRight className="size-4 text-brand-700 opacity-0 group-hover:opacity-100 shrink-0" />
                    </Link>
                  </li>
                ); })}
              </ul>
            ) : (
              <p className="px-4 py-10 text-center text-ink-500">No matches for "{q}". Try fewer words or another section.</p>
            )}
          </div>
          {q && (
            <button onClick={submit} className="flex items-center justify-between gap-3 px-5 h-14 border-t border-line text-[15px] font-semibold text-brand-800 hover:bg-brand-50">
              See all results for "{q}"<span className="flex items-center gap-1 text-xs text-ink-500 font-medium"><CornerDownLeft className="size-3.5" />Enter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
