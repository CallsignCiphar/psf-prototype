import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Download, FileText } from "lucide-react";
import { REPORTS, REPORT_CATEGORIES } from "@/lib/data";
import { PageHero } from "@/components/page";
import { ButtonLink, Cover, Pill, SectionHeader } from "@/components/ui";
import { ReportList } from "@/components/lists/ReportList";

export const metadata: Metadata = { title: "Reports" };
const catSlug = (c: string) => c.toLowerCase().replace(/ /g, "-");
const CAT_DESC: Record<string, string> = {
  "Annual Outlook": "Our yearly assessment of the security environment.", "Special Reports": "In-depth investigations built on original data.",
  Conference: "Readouts and papers from our conferences.", "Policy brief": "Short, practical recommendations.", Roundtable: "Closed-door discussions, summarised.", Seminar: "Talks and seminar proceedings.",
};

export default function ReportsHub() {
  const f = REPORTS[0];
  return (
    <>
      <PageHero crumbs={[{ label: "Reports" }]} eyebrow="In depth" title="Reports" art={21}
        desc="Annual outlooks, special investigations, conference readouts and policy briefs, each with a downloadable PDF."
        aside={
          <Link href={`/reports/${f.slug}`} className="group block rounded-3xl bg-white text-ink-900 p-4 shadow-pop">
            <div className="flex gap-4">
              <Cover seed={f.art} kind="grid" dark className="w-28 aspect-[3/4] rounded-2xl shrink-0" />
              <div className="min-w-0">
                <Pill tone="mint">Featured · {f.category}</Pill>
                <h2 className="mt-2 font-serif text-xl leading-snug font-semibold group-hover:text-brand-700">{f.title}</h2>
                <p className="mt-1 text-[13px] text-ink-500 flex items-center gap-1.5"><FileText className="size-3.5" />{f.pages} pages · {f.date}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <span className="h-10 rounded-xl bg-brand-800 text-white text-sm font-semibold grid place-items-center">Read</span>
              <span className="h-10 rounded-xl ring-1 ring-line-strong text-sm font-semibold grid place-items-center gap-1.5 inline-flex justify-center"><Download className="size-4" />Download PDF</span>
            </div>
          </Link>
        } />

      <section className="container-site mt-12 sm:mt-16">
        <SectionHeader eyebrow="Browse" title="Categories" />
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {REPORT_CATEGORIES.map((c, i) => (
            <Link key={c} href={`/reports/category/${catSlug(c)}`} className="group snap-start shrink-0 w-[62%] sm:w-auto card card-hover p-5 flex flex-col">
              <span className="font-serif text-3xl font-semibold text-brand-300 tabular-nums">{String(REPORTS.filter((r) => r.category === c).length + (i % 3) * 4).padStart(2, "0")}</span>
              <span className="mt-3 font-semibold text-ink-900 group-hover:text-brand-700">{c}</span>
              <span className="mt-1 text-[13px] text-ink-500 leading-snug">{CAT_DESC[c]}</span>
              <ArrowRight className="mt-4 size-4 text-brand-700 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="container-site mt-12 sm:mt-16">
        <SectionHeader eyebrow="Library" title="Latest reports" />
        <ReportList />
      </section>

      <section className="container-site mt-14">
        <div className="rounded-3xl bg-mint-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div><h2 className="font-serif text-2xl font-semibold">Ran an event or briefing worth recording?</h2><p className="mt-1 text-ink-600">Approved writers can submit reports from their portal.</p></div>
          <ButtonLink href="/publish-with-us" className="rounded-full shrink-0">Publish with us<ArrowRight className="size-4" /></ButtonLink>
        </div>
      </section>
    </>
  );
}
