import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Hash } from "lucide-react";
import { ARTICLES, TOPICS } from "@/lib/data";
import { PageHero } from "@/components/page";
import { Cover, SectionHeader, TOPIC_ICONS } from "@/components/ui";

export const metadata: Metadata = { title: "Topics" };
const TAGS = ["Air defence", "CPEC", "Indus waters", "Afghanistan border", "Hypersonics", "Defence budget", "Gulf", "Submarines", "Deterrence", "1965 war", "Drones", "Floods"];

export default function TopicsHub() {
  const max = Math.max(...TOPICS.map((t) => t.count));
  return (
    <>
      <PageHero crumbs={[{ label: "Topics" }]} eyebrow="Browse" title="Topics" desc="Four desks cover the questions that shape Pakistan's security. Pick a topic, then narrow it down by subtopic." art={11}
        aside={
          <div className="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-5">
            <p className="text-sm font-semibold text-white">Items per topic</p>
            <ul className="mt-4 space-y-3">
              {TOPICS.map((t) => (
                <li key={t.slug} className="text-sm">
                  <div className="flex justify-between text-white/85"><span>{t.name}</span><span className="tabular-nums">{t.count}</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-mint-300" style={{ width: `${(t.count / max) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          </div>
        } />

      <section className="container-site mt-10 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-6">
        {TOPICS.map((t, i) => {
          const I = TOPIC_ICONS[t.icon];
          const latest = ARTICLES.filter((a) => a.topic === t.slug).slice(0, 2);
          return (
            <article key={t.slug} className="card overflow-hidden flex flex-col">
              <Link href={`/topics/${t.slug}`} className="group relative h-44 sm:h-52 flex items-end p-6">
                <Cover seed={80 + i} dark className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-950/90 to-brand-950/10" />
                <span className="relative flex items-center gap-3 text-white">
                  <span className="size-12 rounded-2xl bg-white/15 backdrop-blur grid place-items-center"><I className="size-6" /></span>
                  <span><span className="block font-serif text-[28px] font-semibold leading-none">{t.name}</span><span className="block mt-1.5 text-sm text-white/75">{t.count} pieces</span></span>
                </span>
              </Link>
              <div className="p-5 sm:p-6 flex flex-col gap-5 flex-1">
                <p className="text-ink-600">{t.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {t.subs.map((s) => <Link key={s.slug} href={`/topics/${t.slug}/${s.slug}`} className="h-9 px-3.5 inline-flex items-center rounded-full bg-brand-50 text-brand-800 text-sm font-medium hover:bg-brand-100">{s.name}</Link>)}
                </div>
                <ul className="divide-y divide-line">
                  {latest.map((a) => <li key={a.slug}><Link href={`/articles/${a.slug}`} className="block py-3 font-medium leading-snug hover:text-brand-700">{a.title}</Link></li>)}
                </ul>
                <Link href={`/topics/${t.slug}`} className="mt-auto inline-flex items-center justify-between h-12 px-4 rounded-xl bg-canvas font-semibold text-brand-800 hover:bg-brand-50">Go to {t.name}<ArrowRight className="size-4" /></Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="Popular" title="Trending tags" />
        <div className="flex flex-wrap gap-2.5">
          {TAGS.map((t) => <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-full bg-white shadow-soft text-[15px] font-medium text-ink-700 hover:text-brand-800 hover:shadow-lift"><Hash className="size-4 text-brand-400" />{t}</Link>)}
        </div>
      </section>
    </>
  );
}
