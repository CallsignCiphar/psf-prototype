import Link from "next/link";
import clsx from "clsx";
import { ARTICLES, MOST_READ, SITE, articleBySlug, subName, topicBySlug } from "@/lib/data";
import { PageHero } from "@/components/page";
import { TOPIC_ICONS } from "@/components/ui";
import { ArticleRow, FeatureCard } from "@/components/cards";
import { ArticleGrid } from "@/components/lists/ArticleGrid";
import { AdSlot } from "@/components/site/Footer";

export function TopicPage({ topic, sub }: { topic: string; sub?: string }) {
  const t = topicBySlug(topic);
  const I = TOPIC_ICONS[t.icon];
  const pool = ARTICLES.filter((a) => a.topic === topic && (!sub || a.sub === sub));
  const lead = pool[0] ?? ARTICLES[0];
  const name = sub ? subName(topic, sub) : t.name;
  const mostRead = MOST_READ.map(articleBySlug).filter((a) => a.topic === topic).concat(pool).slice(0, 5);
  return (
    <>
      <PageHero
        crumbs={sub ? [{ label: "Topics", href: "/topics" }, { label: t.name, href: `/topics/${t.slug}` }, { label: name }] : [{ label: "Topics", href: "/topics" }, { label: t.name }]}
        eyebrow={<span className="inline-flex items-center gap-2"><I className="size-4" />{sub ? t.name : "Topic"}</span>}
        title={name}
        desc={sub ? `Coverage of ${name.toLowerCase()} within our ${t.name.toLowerCase()} desk.` : t.blurb}
        art={90 + t.count}>
        <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {sub && <Link href={`/topics/${t.slug}`} className="shrink-0 h-10 px-4 inline-flex items-center rounded-full text-sm font-medium bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15">All {t.name}</Link>}
          {t.subs.map((s) => (
            <Link key={s.slug} href={`/topics/${t.slug}/${s.slug}`} aria-current={s.slug === sub ? "page" : undefined}
              className={clsx("shrink-0 h-10 px-4 inline-flex items-center rounded-full text-sm font-medium transition", s.slug === sub ? "bg-white text-brand-900" : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15")}>{s.name}</Link>
          ))}
        </div>
      </PageHero>

      <section className="container-site mt-8 sm:mt-10">
        <FeatureCard a={lead} />
      </section>

      <div className="container-site mt-12 sm:mt-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 xl:col-span-9">
          <h2 className="font-serif text-[26px] sm:text-[30px] font-semibold mb-5">Latest in {name}</h2>
          <ArticleGrid topic={topic} sub={sub} />
        </div>
        <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
          <section className="card p-5 sm:p-6">
            <h2 className="font-semibold text-[17px]">Most read in {name}</h2>
            <ol className="mt-5 space-y-6">{mostRead.map((a, i) => <li key={a.slug}><ArticleRow a={a} index={i + 1} /></li>)}</ol>
          </section>
          <AdSlot size="rectangle" enabled={SITE.adsEnabled} />
        </aside>
      </div>
    </>
  );
}
