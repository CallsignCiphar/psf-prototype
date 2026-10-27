import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Archive, ArrowRight, Bookmark, CircleAlert, Clock, Eye, Hash, ListChecks, MapPin, Quote } from "lucide-react";
import { ARTICLES, AUTHOR_BIO, MOST_READ, SITE, articleBySlug, authorBySlug, subName, topicBySlug } from "@/lib/data";
import { Breadcrumbs, Prose } from "@/components/page";
import { Avatar, Cover, Label, Pill, SectionHeader } from "@/components/ui";
import { ArticleCard, ArticleRow } from "@/components/cards";
import { ShareBar } from "@/components/ShareBar";
import { ReadingProgress } from "@/components/ReadingProgress";
import { AdSlot } from "@/components/site/Footer";

export function generateStaticParams() { return ARTICLES.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; return { title: ARTICLES.find((a) => a.slug === slug)?.title ?? "Article" };
}

export default async function ArticlePage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ state?: string }> }) {
  const { slug } = await params;
  const { state } = await searchParams;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  const au = authorBySlug(a.author);
  const t = topicBySlug(a.topic);
  const related = ARTICLES.filter((x) => x.slug !== a.slug && x.topic === a.topic).slice(0, 3);
  const byAuthor = ARTICLES.filter((x) => x.slug !== a.slug && x.author === a.author).slice(0, 3);
  const archive = state === "archive" || a.label === "Archive";

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="container-site pt-6 sm:pt-10">
          <div className="max-w-4xl">
            <Breadcrumbs items={[{ label: t.name, href: `/topics/${t.slug}` }, { label: subName(a.topic, a.sub), href: `/topics/${t.slug}/${a.sub}` }]} />
            <div className="mt-6 flex items-center gap-3 flex-wrap"><Label label={a.label} />{archive && <Pill tone="neutral"><Archive className="size-3" />From the archive</Pill>}</div>
            <h1 className="mt-3 font-serif text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.07] font-semibold tracking-[-0.02em] text-balance">{a.title}</h1>
            <p className="mt-5 font-serif text-xl sm:text-[23px] leading-relaxed text-ink-600 max-w-3xl">{a.standfirst}</p>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
              <Link href={`/authors/${au.slug}`} className="group flex items-center gap-3">
                <Avatar initials={au.initials} size={48} />
                <span><span className="block font-semibold text-ink-900 group-hover:text-brand-700">{au.name}</span><span className="block text-sm text-ink-500">{au.role}</span></span>
              </Link>
              <div className="flex items-center gap-4 text-sm text-ink-500 flex-wrap">
                <span>{a.date}</span><span className="inline-flex items-center gap-1"><Clock className="size-4" />{a.read} min read</span>
                {a.place && <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{a.place}</span>}
                <span className="inline-flex items-center gap-1"><Eye className="size-4" />3,880 reads</span>
              </div>
            </div>
          </div>
        </header>

        {state === "correction" && (
          <div className="container-site mt-6"><div className="max-w-3xl flex gap-3 rounded-2xl bg-info-50 p-4 text-[15px] text-ink-700"><CircleAlert className="size-5 text-info-700 shrink-0 mt-0.5" /><p><span className="font-semibold text-info-700">Correction, 14 Oct 2026.</span> An earlier version gave the wrong year for the radar upgrade. It was completed in 2024. <Link href="/corrections" className="underline underline-offset-2 font-medium">Corrections log</Link></p></div></div>
        )}
        {archive && (
          <div className="container-site mt-6"><div className="max-w-3xl flex gap-3 rounded-2xl bg-canvas ring-1 ring-line p-4 text-[15px] text-ink-700"><Archive className="size-5 text-ink-500 shrink-0 mt-0.5" /><p>This piece is from our archive. Facts were correct at the time of publication and may have changed since.</p></div></div>
        )}

        <figure className="container-site mt-8">
          <Cover seed={a.art} dark className="aspect-[16/9] sm:aspect-[21/9] rounded-[28px]" label="Lead image" />
          <figcaption className="mt-2 text-[13px] text-ink-500">Caption and photo credit, set in the CMS.</figcaption>
        </figure>

        <div className="container-site mt-10 grid lg:grid-cols-12 gap-8 lg:gap-10">
          <aside className="hidden lg:block lg:col-span-1"><div className="sticky top-28"><ShareBar vertical /></div></aside>
          <div id="article-body" className="lg:col-span-7 min-w-0">
            <div className="rounded-3xl bg-mint-100 p-5 sm:p-6 mb-10">
              <p className="flex items-center gap-2 font-semibold text-brand-800"><ListChecks className="size-5" />Key takeaways</p>
              <ul className="mt-3 space-y-2 text-[16px] text-ink-700 list-disc pl-5 marker:text-brand-500">
                <li>Radar coverage of the western approaches is now continuous at medium altitude.</li>
                <li>Response times, not detection, are the limiting factor for interception.</li>
                <li>Integration across services matters more than new platforms.</li>
              </ul>
            </div>
            <Prose>
              <p>When the long-range surveillance radars at the western sector came online, the gap that had worried planners for a decade closed on paper. Every approach from the west is now covered at medium altitude, around the clock.</p>
              <p>Coverage is not the same as response. Detecting an aircraft or a drone is the first step in a chain that runs through identification, decision and interception, and each link takes time.</p>
              <h2>Coverage is continuous. Response is not.</h2>
              <p>The radars feed a sector operations centre that can see more than it can act on. Interceptor bases sit hundreds of kilometres to the east, and ground-based systems cover the main cities rather than the border.</p>
              <blockquote className="my-8 rounded-3xl bg-white shadow-soft p-6 sm:p-8 not-italic">
                <Quote className="size-8 text-brand-300" />
                <p className="mt-2 font-serif text-[24px] sm:text-[28px] leading-snug font-semibold text-ink-900 !mb-3">"We can watch the whole border. We cannot meet everything that crosses it in time."</p>
                <footer className="text-sm text-ink-500 font-sans">A former sector commander, speaking to the Forum</footer>
              </blockquote>
              <p>Closing that gap means moving decisions closer to the edge, accepting more risk in delegation, and investing in short-range systems that are cheap enough to deploy widely.</p>
              <h2>What to watch</h2>
              <ul>
                <li>Delivery of the next batch of short-range air defence systems.</li>
                <li>Changes to rules of engagement for sector commanders.</li>
                <li>Joint exercises between air and ground-based units in the west.</li>
              </ul>
            </Prose>
            <section className="mt-10 pt-6 border-t border-line">
              <h2 className="font-semibold text-ink-900">Sources and references</h2>
              <ol className="mt-3 space-y-2 text-sm text-ink-600 list-decimal pl-5">
                <li>Ministry of Defence, Year Book 2025, chapter 4.</li>
                <li>Interview with a former sector commander, Islamabad, September 2026.</li>
              </ol>
            </section>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Air defence", "Radar", subName(a.topic, a.sub), "Western border"].map((tag) => <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="h-9 px-3.5 inline-flex items-center gap-1 rounded-full bg-white shadow-soft text-sm font-medium text-ink-700 hover:text-brand-800"><Hash className="size-3.5 text-brand-400" />{tag}</Link>)}
            </div>
            <div className="mt-6 lg:hidden"><ShareBar /></div>
            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-canvas ring-1 ring-line p-4 text-sm">
              <span className="text-ink-600">Spotted an error?</span><Link href="/corrections" className="font-semibold text-brand-700 hover:underline">Request a correction</Link>
            </div>
            <section className="mt-10 card p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
              <Avatar initials={au.initials} size={72} />
              <div>
                <p className="eyebrow text-brand-600">About the author</p>
                <Link href={`/authors/${au.slug}`} className="mt-1 block font-serif text-xl font-semibold hover:text-brand-700">{au.name}</Link>
                <p className="mt-1.5 text-ink-600 leading-relaxed">{AUTHOR_BIO[au.slug] ?? au.role}</p>
                <Link href={`/authors/${au.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">All {au.articles} pieces<ArrowRight className="size-4" /></Link>
              </div>
            </section>
          </div>
          <aside className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              <AdSlot size="skyscraper" enabled={SITE.adsEnabled && state !== "archive"} className="hidden lg:block" />
              <section className="card p-5 sm:p-6">
                <h2 className="font-semibold text-[17px] flex items-center gap-2"><Bookmark className="size-4 text-brand-600" />Most read</h2>
                <ol className="mt-5 space-y-6">{MOST_READ.slice(0, 4).map((s, i) => <li key={s}><ArticleRow a={articleBySlug(s)} index={i + 1} /></li>)}</ol>
              </section>
            </div>
          </aside>
        </div>
      </article>

      <section className="container-site mt-16 sm:mt-20">
        <SectionHeader eyebrow="Keep reading" title="Related coverage" href={`/topics/${t.slug}`} linkLabel={`More ${t.name}`} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
      </section>
      {byAuthor.length > 0 && (
        <section className="container-site mt-14">
          <SectionHeader title={`More from ${au.name}`} href={`/authors/${au.slug}`} />
          <div className="card p-5 sm:p-6 grid md:grid-cols-3 gap-6">{byAuthor.map((r) => <ArticleRow key={r.slug} a={r} />)}</div>
        </section>
      )}
    </>
  );
}
