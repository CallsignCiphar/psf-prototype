import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { ARTICLES, NEWSROOM } from "@/lib/data";
import { Breadcrumbs, Prose } from "@/components/page";
import { Cover, Pill, SectionHeader } from "@/components/ui";
import { ArticleCard } from "@/components/cards";
import { ShareBar } from "@/components/ShareBar";

export function generateStaticParams() { return NEWSROOM.map((n) => ({ id: n.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; const n = NEWSROOM.find((x) => x.id === id); return { title: n?.title ?? "Newsroom" };
}

export default async function NewsPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = NEWSROOM.find((x) => x.id === id);
  if (!n) notFound();
  const more = NEWSROOM.filter((x) => x.id !== id).slice(0, 4);
  const related = ARTICLES.filter((a) => a.topic === "national-affairs" || a.topic === "geopolitics").slice(0, 3);
  return (
    <>
      <article className="container-site pt-6 sm:pt-10">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Newsroom", href: "/newsroom" }, { label: n.type }]} />
          <div className="mt-6 flex items-center gap-2 flex-wrap">
            {n.breaking && <Pill tone="danger" className="uppercase tracking-wider text-[10px]">Breaking</Pill>}
            <Pill tone="mint">{n.type}</Pill><Pill tone="neutral">{n.topic}</Pill>
          </div>
          <h1 className="mt-4 font-serif text-[32px] sm:text-[44px] leading-[1.1] font-semibold tracking-[-0.015em] text-balance">{n.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-brand-600" />{n.day === "Today" ? "16 Oct 2026" : n.day === "Yesterday" ? "15 Oct 2026" : n.day}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-brand-600" />{n.time} PKT</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-brand-600" />{n.region}, {n.country}</span>
          </div>
          <div className="mt-6 pb-6 border-b border-line"><ShareBar /></div>
          <Cover seed={70 + Number(id.slice(1))} className="mt-8 aspect-[16/9] rounded-3xl" label="Image for this update" />
          <p className="mt-2 text-[13px] text-ink-500">Image caption and credit, set in the CMS.</p>
          <Prose className="mt-8">
            <p>{n.summary}</p>
            <p>Officials gave no timeline for the next update. The Forum's newsroom will add verified details here as they are confirmed, with the time of each change.</p>
            <p>This update was compiled from official statements and confirmed by two independent sources.</p>
          </Prose>
          <div className="mt-8 card p-5 flex items-center gap-4">
            <span className="size-14 rounded-2xl overflow-hidden shrink-0"><Cover seed={12} kind="grid" dark className="size-full" /></span>
            <div className="min-w-0"><p className="font-semibold">On Global Watch</p><p className="text-sm text-ink-600">{n.country} has 412 pieces of coverage and a status brief.</p></div>
            <Link href="/global-watch" className="ml-auto shrink-0 h-10 px-4 rounded-full bg-brand-800 text-white text-sm font-semibold inline-flex items-center">Open</Link>
          </div>
        </div>
      </article>

      <section className="container-site mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SectionHeader title="More from the Newsroom" href="/newsroom" />
          <ol className="card divide-y divide-line">
            {more.map((m) => (
              <li key={m.id}><Link href={`/newsroom/${m.id}`} className="group block p-4 sm:p-5"><span className="text-xs text-ink-500"><span className="font-semibold text-ink-700 tabular-nums">{m.time} PKT</span> · {m.country}</span><span className="mt-1 block font-semibold leading-snug group-hover:text-brand-700">{m.title}</span></Link></li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-8">
          <SectionHeader title={`Related coverage in ${n.country}`} href="/search" />
          <div className="grid sm:grid-cols-3 gap-5">{related.map((a) => <ArticleCard key={a.slug} a={a} showStandfirst={false} />)}</div>
        </div>
      </section>
      <div className="container-site mt-10"><Link href="/newsroom" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700"><ArrowLeft className="size-4" />Back to the newsroom</Link></div>
    </>
  );
}
