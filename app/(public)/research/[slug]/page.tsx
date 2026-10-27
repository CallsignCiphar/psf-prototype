import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BadgeCheck, CircleAlert, Download, FileArchive, FileSpreadsheet, Scale } from "lucide-react";
import { RESEARCH_ALL } from "@/lib/data";
import { Breadcrumbs, Prose } from "@/components/page";
import { Avatar, Pill, SectionHeader, btn } from "@/components/ui";
import { PaperCard } from "@/components/PaperCard";
import { ShareBar } from "@/components/ShareBar";
import { CiteButton } from "@/components/CiteButton";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() { return RESEARCH_ALL.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; return { title: RESEARCH_ALL.find((p) => p.slug === slug)?.title ?? "Research" };
}
const TOC = ["Abstract", "1. Introduction", "2. Method", "3. Findings", "References", "Declarations", "Supplementary files", "Licence"];
const sid = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function PaperPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ state?: string }> }) {
  const { slug } = await params;
  const { state } = await searchParams;
  const p = RESEARCH_ALL.find((x) => x.slug === slug);
  if (!p) notFound();
  const retracted = state === "retracted";
  const authors = p.authors.split(", ");
  return (
    <>
      <ReadingProgress />
      <header className="container-site pt-6 sm:pt-10">
        <Breadcrumbs items={[{ label: "Research", href: "/research" }, { label: p.type, href: `/research/all?category=${encodeURIComponent(p.type)}` }]} />
        {retracted && (
          <div className="mt-6 flex gap-3 rounded-2xl bg-danger-50 p-4 text-[15px]"><CircleAlert className="size-5 text-danger-700 shrink-0 mt-0.5" /><p><span className="font-semibold text-danger-700">Retracted on 2 Oct 2026.</span> The editors retracted this paper after the authors reported an error in the dataset that changes its main finding. The text remains available for the record.</p></div>
        )}
        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 flex-wrap"><Pill tone="brand"><BadgeCheck className="size-3.5" />Peer-reviewed</Pill><Pill tone="neutral">{p.type}</Pill><span className="eyebrow text-ink-500 ml-1">{p.category}</span></div>
            <h1 className={`mt-4 font-serif text-[30px] sm:text-[44px] leading-[1.1] font-semibold tracking-[-0.015em] text-balance ${retracted ? "text-ink-500" : ""}`}>{p.title}</h1>
            <ul className="mt-6 flex flex-wrap gap-3">
              {authors.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-2xl bg-white shadow-soft pl-2 pr-4 py-2">
                  <Avatar initials={a.replace("Dr ", "").split(" ").map((w) => w[0]).join("").slice(0, 2)} size={36} />
                  <span><span className="block font-semibold text-sm">{a}</span><span className="block text-xs text-ink-500">{p.institution}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-4">
            <div className="card p-5">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {[["Received", "2 Mar 2026"], ["Accepted", "28 Aug 2026"], ["Published", p.date], ["Reference", p.ref], ["Volume, issue", "Vol. 7, No. 3"], ["Length", `${p.pages} pages`]].map(([k, v]) => (
                  <div key={k}><dt className="text-ink-500 text-[13px]">{k}</dt><dd className="font-semibold text-ink-900 mt-0.5 break-words">{v}</dd></div>
                ))}
              </dl>
              <a href="#" className={btn("primary", "md", "w-full mt-5 rounded-full")}><Download className="size-4" />Download PDF</a>
              <div className="mt-3 flex items-center justify-between gap-2"><CiteButton title={p.title} authors={p.authors} year={p.date.slice(-4)} kind="research" reference={p.ref} /></div>
            </div>
          </aside>
        </div>
        <div className="mt-6 pb-6 border-b border-line"><ShareBar /></div>
      </header>

      <div className="container-site mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <aside className="lg:col-span-3">
          <nav aria-label="Contents" className="lg:sticky lg:top-24 card p-5">
            <p className="eyebrow text-ink-500">Contents</p>
            <ol className="mt-3 space-y-1">{TOC.map((t, i) => <li key={t}><a href={`#${sid(t)}`} className={`block rounded-xl px-3 py-2 text-sm font-medium ${i === 0 ? "bg-brand-50 text-brand-800" : "text-ink-600 hover:bg-canvas"}`}>{t}</a></li>)}</ol>
          </nav>
        </aside>
        <div id="article-body" className="lg:col-span-9 xl:col-span-8 min-w-0">
          <section id="abstract" className="rounded-3xl bg-mint-100 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-semibold">Abstract</h2>
            <p className="mt-3 font-serif text-[18px] leading-relaxed text-ink-700">{p.abstract} The analysis draws on open-source data from 2016 to 2026 and interviews with eleven former officials. We find that early warning, not force posture, is the main lever for stability.</p>
            <p className="mt-4 text-sm text-ink-600"><span className="font-semibold">Keywords:</span> deterrence, crisis stability, early warning, South Asia</p>
          </section>
          <Prose className="mt-10">
            <h2 id={sid(TOC[1])}>1. Introduction</h2>
            <p>Decision times in a South Asian crisis have shortened with every new delivery system. This paper asks what that does to stability, and what either side can do about it without new treaties.</p>
            <h2 id={sid(TOC[2])}>2. Method</h2>
            <p>We model three crisis scenarios using a decision-tree approach, calibrated with timelines from past crises and with interviews.</p>
            <h2 id={sid(TOC[3])}>3. Findings</h2>
            <p>In all three scenarios, the probability of a misread signal rises sharply when warning time falls below ten minutes.</p>
          </Prose>
          <section id="references" className="mt-10">
            <h2 className="font-serif text-2xl font-semibold">References</h2>
            <ol className="mt-4 space-y-2 text-[15px] text-ink-600 list-decimal pl-5"><li>Khan, F. H. (2012). Eating Grass: The Making of the Pakistani Bomb. Stanford University Press.</li><li>Narang, V. (2014). Nuclear Strategy in the Modern Era. Princeton University Press.</li></ol>
          </section>
          <section id="declarations" className="mt-10 card p-5 sm:p-6">
            <h2 className="font-serif text-2xl font-semibold">Declarations</h2>
            <dl className="mt-4 grid sm:grid-cols-2 gap-4 text-[15px]">
              {[["Funding", "This research received no external funding."], ["Conflicts of interest", "None declared."], ["Data availability", "The dataset is available as a supplementary file."], ["Ethics", "Interviews were conducted with informed consent."]].map(([k, v]) => <div key={k}><dt className="font-semibold">{k}</dt><dd className="text-ink-600 mt-0.5">{v}</dd></div>)}
            </dl>
          </section>
          <section id="supplementary-files" className="mt-6 card p-5 sm:p-6">
            <h2 className="font-serif text-2xl font-semibold">Supplementary files</h2>
            <ul className="mt-4 space-y-2">
              {[[FileSpreadsheet, "Scenario dataset.xlsx", "182 KB"], [FileArchive, "Interview protocol.pdf", "96 KB"]].map(([I, n, s]) => { const Icon = I as typeof FileArchive; return (
                <li key={n as string}><a href="#" className="flex items-center gap-3 rounded-2xl p-3 ring-1 ring-line hover:ring-brand-300 hover:bg-brand-50"><span className="size-10 rounded-xl bg-mint-100 text-brand-800 grid place-items-center"><Icon className="size-5" /></span><span className="font-medium flex-1">{n as string}</span><span className="text-sm text-ink-500">{s as string}</span><Download className="size-4 text-brand-700" /></a></li>
              ); })}
            </ul>
          </section>
          <section id="licence" className="mt-6 rounded-2xl bg-canvas ring-1 ring-line p-5 flex gap-3 text-[15px] text-ink-600"><Scale className="size-5 text-brand-700 shrink-0 mt-0.5" /><p><span className="font-semibold text-ink-900">Licence.</span> Published under the Pakistan Strategic Forum contributor agreement. Short extracts may be quoted with attribution. <Link href="/policies/contributor-agreement" className="text-brand-700 underline underline-offset-2">Read the terms</Link></p></section>
        </div>
      </div>

      <section className="container-site mt-16">
        <SectionHeader title="Related research" href="/research/all" />
        <div className="grid md:grid-cols-3 gap-5">{RESEARCH_ALL.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => <PaperCard key={x.slug} p={x} />)}</div>
      </section>
    </>
  );
}
