"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { LayoutGrid, List } from "lucide-react";
import { ARTICLES, COUNTRIES, LABELS, subName, topicBySlug } from "@/lib/data";
import { FilterBar, useFilters } from "@/components/filters";
import { ArticleCard, ArticleRow } from "@/components/cards";
import { Pagination } from "@/components/page";

export function ArticleGrid({ topic, sub }: { topic: string; sub?: string }) {
  const t = topicBySlug(topic);
  const [f, setF] = useFilters({ sort: sub ? "Most read, 30 days" : "Latest" });
  const [view, setView] = useState<"grid" | "list">("grid");
  const pool = ARTICLES.filter((a) => a.topic === topic && (!sub || a.sub === sub));
  const items = useMemo(() => pool.filter((a) => {
    if (f.q && !a.title.toLowerCase().includes(f.q.toLowerCase())) return false;
    if (f.sel.sub?.length && !f.sel.sub.includes(subName(a.topic, a.sub))) return false;
    if (f.sel.label?.length && !f.sel.label.includes(a.label)) return false;
    return true;
  }), [f, pool]);
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <FilterBar state={f} setState={setF} search={`Search ${sub ? subName(topic, sub) : t.name}`} count={items.length} noun="pieces"
            selects={[
              ...(sub ? [] : [{ key: "sub", label: "Subtopic", options: t.subs.map((s) => s.name), multi: true }]),
              { key: "type", label: "Content type", options: ["Articles", "Reports", "Research"], multi: true },
              { key: "label", label: "Label", options: LABELS, multi: true },
              { key: "date", label: "Date range", options: ["Last 7 days", "Last 30 days", "Last 12 months", "Any time"] },
              { key: "country", label: "Country", options: COUNTRIES, multi: true, searchable: true },
            ]}
            sorts={["Latest", "Most read, 30 days", "Most read, all time", "Oldest"]} />
        </div>
        <div role="group" aria-label="Layout" className="hidden md:flex card p-1 gap-1">
          <button onClick={() => setView("grid")} aria-pressed={view === "grid"} aria-label="Grid view" className={clsx("size-10 grid place-items-center rounded-xl", view === "grid" ? "bg-brand-800 text-white" : "text-ink-600 hover:bg-brand-50")}><LayoutGrid className="size-4" /></button>
          <button onClick={() => setView("list")} aria-pressed={view === "list"} aria-label="List view" className={clsx("size-10 grid place-items-center rounded-xl", view === "list" ? "bg-brand-800 text-white" : "text-ink-600 hover:bg-brand-50")}><List className="size-4" /></button>
        </div>
      </div>
      {items.length ? (
        view === "grid" ? (
          <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{items.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        ) : (
          <div className="mt-6 card p-5 sm:p-6 space-y-6">{items.map((a) => <ArticleRow key={a.slug} a={a} />)}</div>
        )
      ) : (
        <div className="mt-6 card p-10 text-center"><p className="font-semibold text-lg">Nothing matches these filters</p><p className="text-ink-500 mt-1">Clear a filter to see more.</p></div>
      )}
      <Pagination pages={4} label={`Showing ${items.length} of ${t.count}`} />
    </div>
  );
}
