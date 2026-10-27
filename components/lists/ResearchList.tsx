"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { COUNTRIES, RESEARCH_ALL, RESEARCH_CATEGORIES, TOPICS } from "@/lib/data";
import { FilterBar, useFilters } from "@/components/filters";
import { PaperCard } from "@/components/PaperCard";
import { Pagination } from "@/components/page";

export function ResearchList() {
  const sp = useSearchParams();
  const initial = sp.get("category");
  const [f, setF] = useFilters({ sort: "Latest", sel: initial ? { type: [initial] } : {} });
  const items = useMemo(() => RESEARCH_ALL.filter((p) => {
    if (f.q && !(p.title + p.authors + p.abstract).toLowerCase().includes(f.q.toLowerCase())) return false;
    if (f.sel.type?.length && !f.sel.type.includes(p.type)) return false;
    if (f.sel.institution?.length && !f.sel.institution.includes(p.institution)) return false;
    if (f.sel.country?.length && !f.sel.country.includes(p.country)) return false;
    if (f.sel.year?.length && !f.sel.year.some((y) => p.date.endsWith(y))) return false;
    return true;
  }), [f]);
  return (
    <div>
      <FilterBar state={f} setState={setF} search="Search titles, authors and abstracts" count={items.length} noun="papers"
        selects={[
          { key: "type", label: "Category", options: RESEARCH_CATEGORIES.map((c) => c.name), multi: true },
          { key: "topic", label: "Topic", options: TOPICS.map((t) => t.name), multi: true },
          { key: "year", label: "Year", options: ["2026", "2025", "2024"], multi: true },
          { key: "country", label: "Country", options: COUNTRIES, multi: true, searchable: true },
          { key: "institution", label: "Institution", options: [...new Set(RESEARCH_ALL.map((p) => p.institution))], multi: true },
        ]}
        sorts={["Latest", "Oldest", "Most read", "Most cited"]} />
      <div className="mt-6 grid md:grid-cols-2 gap-5">{items.map((p) => <PaperCard key={p.slug} p={p} />)}</div>
      {items.length === 0 && <div className="mt-6 card p-10 text-center"><p className="font-semibold text-lg">No papers match</p><p className="text-ink-500 mt-1">Clear a filter to see more.</p></div>}
      <Pagination pages={3} label={`Showing ${items.length} of 48 papers`} />
    </div>
  );
}
