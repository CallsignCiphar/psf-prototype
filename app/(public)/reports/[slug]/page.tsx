import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Download, FileText, Layers } from "lucide-react";
import { REPORTS } from "@/lib/data";
import { Breadcrumbs, Prose } from "@/components/page";
import { Cover, Pill, SectionHeader, btn } from "@/components/ui";
import { ShareBar } from "@/components/ShareBar";
import { CiteButton } from "@/components/CiteButton";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() { return REPORTS.map((r) => ({ slug: r.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; return { title: REPORTS.find((r) => r.slug === slug)?.title ?? "Report" };
}
const TOC = ["Executive summary", "Key findings", "1. The deterrence picture", "2. The western border", "3. The economy and security", "Recommendations"];
const FINDINGS = [
  ["Deterrence holds, but crisis time is shrinking", "New delivery systems compress decision windows on both sides."],
  ["The western border is the main source of risk", "Most security incidents in 2026 were within 50 km of the Afghan border."],
  ["Fiscal pressure is a security issue", "Debt service now exceeds the defence budget for the second year running."],
];

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = REPORTS.find((x) => x.slug === slug);
  if (!r) notFound();
  const related = REPORTS.filter((x) => x.slug !== r.slug).slice(0, 3);
  const id = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <>
      <ReadingProgress />
      <section className="sm:container-site sm:pt-5">
        <div className="relative overflow-hidden sm:rounded-[32px] bg-brand-900 text-white">
          <Cover seed={r.art} kind="radar" dark className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/20" />
          <div className="relative px-5 sm:px-10 py-10 sm:py-14 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Breadcrumbs onDark items={[{ label: "Reports", href: "/reports" }, { label: r.category, href: `/reports/category/${r.category.toLowerCase().replace(/ /g, "-")}` }]} />
              <Pill tone="dark" className="mt-6">{r.category}</Pill>
              <h1 className="mt-3 font-serif text-[32px] sm:text-[48px] leading-[1.08] font-semibold tracking-[-0.02em] text-balance">{r.title}</h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl">{r.summary}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" />{r.date}</span>
                <span className="inline-flex items-center gap-1.5"><FileText className="size-4" />{r.pages} pages</span>
                <span className="inline-flex items-center gap-1.5"><Layers className="size-4" />Pakistan Strategic Forum research team</span>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a href="#" className={btn("light", "lg", "w-full rounded-full")}><Download className="size-5" />Download PDF · 6.2 MB</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site mt-6 flex flex-wrap items-center justify-between gap-4">
        <ShareBar />
        <CiteButton title={r.title} authors="Pakistan Strategic Forum" year={r.date.slice(-4)} />
      </div>

      <div className="container-site mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <aside className="lg:col-span-3">
          <nav aria-label="Contents" className="lg:sticky lg:top-24 card p-5">
            <p className="eyebrow text-ink-500">Contents</p>
            <ol className="mt-3 space-y-1">
              {TOC.map((t, i) => <li key={t}><a href={`#${id(t)}`} className={`block rounded-xl px-3 py-2 text-sm font-medium ${i === 0 ? "bg-brand-50 text-brand-800" : "text-ink-600 hover:bg-canvas hover:text-ink-900"}`}>{t}</a></li>)}
            </ol>
          </nav>
        </aside>
        <div id="article-body" className="lg:col-span-9 xl:col-span-8 min-w-0">
          <section id={id(TOC[0])} className="rounded-3xl bg-mint-100 p-6 sm:p-8">
            <h2 className="font-serif text-[26px] font-semibold">Executive summary</h2>
            <p className="mt-3 font-serif text-[18px] leading-relaxed text-ink-700">Pakistan enters 2027 with a stable strategic deterrent, a volatile western border and an economy that limits its choices. This outlook sets out the risks we think matter most and what policymakers can do about them.</p>
          </section>
          <section id={id(TOC[1])} className="mt-10">
            <h2 className="font-serif text-[26px] sm:text-[30px] font-semibold">Key findings</h2>
            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              {FINDINGS.map(([t, d], i) => (
                <div key={t} className="card p-5"><span className="size-9 rounded-xl bg-brand-800 text-white grid place-items-center font-semibold">{i + 1}</span><p className="mt-4 font-semibold leading-snug">{t}</p><p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{d}</p></div>
              ))}
            </div>
          </section>
          <Prose className="mt-10">
            <h2 id={id(TOC[2])}>1. The deterrence picture</h2>
            <p>Both sides have added delivery systems that shorten warning times. Neither has changed its declared doctrine. The risk is less a deliberate decision than a misread signal in the first hours of a crisis.</p>
            <h2 id={id(TOC[3])}>2. The western border</h2>
            <p>Militant activity has concentrated in the districts closest to the Afghan border. Fencing has reduced crossings but not attacks launched from inside Pakistan.</p>
            <h2 id={id(TOC[4])}>3. The economy and security</h2>
            <p>Fiscal space shapes every security choice. Procurement now competes directly with debt service and development spending.</p>
            <h2 id={id(TOC[5])}>Recommendations</h2>
            <ul><li>Establish a standing crisis communication channel with a tested protocol.</li><li>Pair border security with a political track in the tribal districts.</li><li>Publish a multi-year defence spending framework.</li></ul>
          </Prose>
          <div className="mt-10 card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="size-12 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center shrink-0"><FileText className="size-6" /></span>
            <div className="flex-1"><p className="font-semibold">Read the full report</p><p className="text-sm text-ink-600">{r.pages} pages with charts, data tables and sources.</p></div>
            <a href="#" className={btn("primary", "md", "rounded-full")}><Download className="size-4" />Download PDF</a>
          </div>
        </div>
      </div>

      <section className="container-site mt-16">
        <SectionHeader title="Related reports" href="/reports" />
        <div className="grid sm:grid-cols-3 gap-5">
          {related.map((x) => (
            <Link key={x.slug} href={`/reports/${x.slug}`} className="group card card-hover overflow-hidden">
              <Cover seed={x.art} kind="grid" className="aspect-[16/9]" />
              <div className="p-5"><Pill tone="mint">{x.category}</Pill><h3 className="mt-2 font-serif text-lg font-semibold leading-snug group-hover:text-brand-700">{x.title}</h3><p className="mt-1 text-[13px] text-ink-500">{x.date} · {x.pages} pages</p></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
