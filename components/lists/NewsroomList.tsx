"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Megaphone, Newspaper, RefreshCw } from "lucide-react";
import { COUNTRIES, NEWSROOM, REGIONS, TOPICS } from "@/lib/data";
import { FilterBar, useFilters } from "@/components/filters";
import { Pill } from "@/components/ui";

const TYPE_ICON: Record<string, typeof Newspaper> = { Update: Newspaper, Event: CalendarDays, "Press release": Megaphone };

export function NewsroomList() {
  const [f, setF] = useFilters({ seg: "7 days" });
  const [more, setMore] = useState(false);
  const items = useMemo(() => NEWSROOM.filter((n) => {
    if (f.q && !n.title.toLowerCase().includes(f.q.toLowerCase())) return false;
    if (f.sel.region?.length && !f.sel.region.includes(n.region)) return false;
    if (f.sel.country?.length && !f.sel.country.includes(n.country)) return false;
    if (f.sel.topic?.length && !f.sel.topic.includes(n.topic)) return false;
    if (f.sel.type?.length && !f.sel.type.includes(n.type)) return false;
    if (f.tog.breaking && !n.breaking) return false;
    if (f.seg === "Today" && n.day !== "Today") return false;
    return true;
  }), [f]);
  const days = [...new Set(items.map((i) => i.day))];

  return (
    <div>
      <FilterBar state={f} setState={setF} search="Search the newsroom" count={items.length} noun="updates"
        selects={[
          { key: "region", label: "Region", options: REGIONS, multi: true },
          { key: "country", label: "Country", options: COUNTRIES, multi: true, searchable: true },
          { key: "topic", label: "Topic", options: TOPICS.map((t) => t.name), multi: true },
          { key: "type", label: "Type", options: ["Update", "Press release", "Event"], multi: true },
        ]}
        segments={{ label: "Date range", options: ["Today", "7 days", "30 days", "Custom"] }}
        toggles={[{ key: "breaking", label: "Breaking only" }]} />

      <div className="mt-8 space-y-10">
        {days.map((d) => (
          <section key={d} aria-labelledby={`d-${d}`}>
            <h2 id={`d-${d}`} className="sticky top-[72px] lg:top-[84px] z-10 inline-flex items-center gap-2 h-9 px-4 rounded-full bg-white shadow-soft text-sm font-semibold text-ink-800">{d}</h2>
            <ol className="mt-4 relative border-l-2 border-brand-100 ml-4 space-y-4">
              {items.filter((i) => i.day === d).map((n) => { const I = TYPE_ICON[n.type] ?? Newspaper; return (
                <li key={n.id} className="relative pl-6 sm:pl-8">
                  <span className={`absolute -left-[9px] top-6 size-4 rounded-full ring-4 ring-canvas ${n.breaking ? "bg-danger-700" : "bg-brand-500"}`} aria-hidden />
                  <Link href={`/newsroom/${n.id}`} className="group card card-hover p-5 sm:p-6 block">
                    <div className="flex items-center gap-2 flex-wrap text-[13px] text-ink-500">
                      <span className="font-semibold text-ink-800 tabular-nums">{n.time} PKT</span>
                      {n.breaking && <Pill tone="danger" className="uppercase tracking-wider text-[10px]">Breaking</Pill>}
                      <Pill tone="neutral"><I className="size-3" />{n.type}</Pill>
                      <span>{n.region}, {n.country}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl sm:text-[22px] leading-snug font-semibold text-ink-900 group-hover:text-brand-700">{n.title}</h3>
                    <p className="mt-2 text-ink-600 leading-relaxed">{n.summary}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Read update<ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
                  </Link>
                </li>
              ); })}
            </ol>
          </section>
        ))}
        {items.length === 0 && (
          <div className="card p-10 text-center"><p className="font-semibold text-lg">No updates match these filters</p><p className="text-ink-500 mt-1">Try a wider date range or clear a filter.</p></div>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-10 text-center">
          <button onClick={() => setMore(true)} className="h-12 px-6 rounded-full bg-white shadow-soft font-semibold text-brand-800 inline-flex items-center gap-2 hover:shadow-lift"><RefreshCw className="size-4" />{more ? "No older updates in this range" : "Load older updates"}</button>
        </div>
      )}
    </div>
  );
}
