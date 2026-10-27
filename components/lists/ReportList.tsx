"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Download, FileText } from "lucide-react";
import { COUNTRIES, REPORTS, REPORT_CATEGORIES, TOPICS } from "@/lib/data";
import { FilterBar, useFilters } from "@/components/filters";
import { Cover, Pill } from "@/components/ui";
import { Pagination } from "@/components/page";

export function ReportList({ category }: { category?: string }) {
  const [f, setF] = useFilters({ sort: "Latest" });
  const pool = REPORTS.filter((r) => !category || r.category === category);
  const items = useMemo(() => pool.filter((r) => {
    if (f.q && !r.title.toLowerCase().includes(f.q.toLowerCase())) return false;
    if (f.sel.category?.length && !f.sel.category.includes(r.category)) return false;
    if (f.sel.year?.length && !f.sel.year.some((y) => r.date.endsWith(y))) return false;
    return true;
  }), [f, pool]);
  return (
    <div>
      <FilterBar state={f} setState={setF} search="Search reports" count={items.length} noun="reports"
        selects={[
          ...(category ? [] : [{ key: "category", label: "Category", options: REPORT_CATEGORIES, multi: true }]),
          { key: "topic", label: "Topic", options: TOPICS.map((t) => t.name), multi: true },
          { key: "year", label: "Year", options: ["2026", "2025", "2024"], multi: true },
          { key: "country", label: "Country", options: COUNTRIES, multi: true, searchable: true },
        ]}
        sorts={["Latest", "Oldest", "Most downloaded"]} />
      <ul className="mt-6 grid gap-4">
        {items.map((r) => (
          <li key={r.slug} className="card card-hover p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link href={`/reports/${r.slug}`} className="shrink-0"><Cover seed={r.art} kind="grid" className="w-full sm:w-40 aspect-[16/9] sm:aspect-[3/4] rounded-2xl" /></Link>
            <div className="min-w-0 flex-1 flex flex-col">
              <div className="flex items-center gap-2 flex-wrap"><Pill tone="mint">{r.category}</Pill><span className="text-[13px] text-ink-500">{r.date}</span></div>
              <Link href={`/reports/${r.slug}`} className="mt-2 font-serif text-xl sm:text-2xl leading-snug font-semibold hover:text-brand-700">{r.title}</Link>
              <p className="mt-1.5 text-ink-600 leading-relaxed">{r.summary}</p>
              <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
                <Link href={`/reports/${r.slug}`} className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-brand-800 text-white text-sm font-semibold hover:bg-brand-700">Read</Link>
                <a href="#" className="h-10 px-4 inline-flex items-center gap-2 rounded-full ring-1 ring-line-strong text-sm font-semibold text-ink-800 hover:bg-brand-50"><Download className="size-4" />PDF</a>
                <span className="text-[13px] text-ink-500 inline-flex items-center gap-1.5 ml-1"><FileText className="size-3.5" />{r.pages} pages</span>
              </div>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="card p-10 text-center"><p className="font-semibold text-lg">No reports match</p><p className="text-ink-500 mt-1">Clear a filter to see more.</p></li>}
      </ul>
      <Pagination pages={2} label={`Showing ${items.length} reports`} />
    </div>
  );
}
