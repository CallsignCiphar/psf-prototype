import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, ChevronRight, Facebook, FileSearch, FileText, GraduationCap, Instagram, Landmark,
  Newspaper, PenLine, Quote, Radar, Send, Twitter, UsersRound, Youtube,
} from "lucide-react";
import { ARTICLES, AUTHORS, HOTSPOTS, MOST_READ, NEWS, REPORTS, RESEARCH, SITE, TOPICS, VIDEOS, articleBySlug } from "@/lib/data";
import { Avatar, ButtonLink, Cover, Pill, SectionHeader, TOPIC_ICONS, btn } from "@/components/ui";
import { ArticleCard, ArticleRow, Byline, FeatureCard, TopicCrumb, VideoCard } from "@/components/cards";
import { AdSlot } from "@/components/site/Footer";
import { HeroArt } from "@/components/home/HeroArt";
import { TopicExplorer } from "@/components/home/TopicExplorer";

export default async function Home({ searchParams }: { searchParams: Promise<{ ads?: string }> }) {
  const sp = await searchParams;
  const ads = SITE.adsEnabled && sp.ads !== "off";
  const lead = ARTICLES[0];
  const top = ARTICLES.slice(1, 5);
  const latest = ARTICLES.slice(5, 9);
  const archive = ARTICLES.find((a) => a.slug === "operation-gibraltar")!;
  const SOC = { x: Twitter, facebook: Facebook, instagram: Instagram, youtube: Youtube } as const;

  return (
    <>
      {/* HERO */}
      <section className="sm:container-site sm:pt-5">
        <div className="relative overflow-hidden sm:rounded-[32px] bg-brand-900 text-white">
          <HeroArt />
          <div className="relative grid lg:grid-cols-12 gap-8 px-5 sm:px-10 pt-10 sm:pt-14 pb-8 sm:pb-10">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-end min-h-[380px] sm:min-h-[460px]">
              <TopicCrumb a={lead} onDark />
              <h1 className="mt-4 font-serif font-semibold text-[34px] sm:text-[48px] xl:text-[56px] leading-[1.06] tracking-[-0.02em] max-w-3xl text-balance">
                <Link href={`/articles/${lead.slug}`} className="hover:underline decoration-mint-300 decoration-2 underline-offset-[6px]">{lead.title}</Link>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl font-serif">{lead.standfirst}</p>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <Byline a={lead} onDark avatar />
                <ButtonLink href={`/articles/${lead.slug}`} variant="light" className="rounded-full sm:ml-auto lg:ml-0 self-start">Read the analysis<ArrowRight className="size-4" /></ButtonLink>
              </div>
            </div>

            <aside className="lg:col-span-5 xl:col-span-4 rounded-3xl bg-white text-ink-900 shadow-pop p-5 sm:p-6 self-end" aria-labelledby="nr-h">
              <div className="flex items-center justify-between">
                <h2 id="nr-h" className="flex items-center gap-2 font-serif text-xl font-semibold"><span className="size-2.5 rounded-full bg-mint-500 animate-pulse-dot" />Newsroom</h2>
                <Link href="/newsroom" className="text-sm font-semibold text-brand-700 hover:underline inline-flex items-center gap-1">All updates<ChevronRight className="size-4" /></Link>
              </div>
              <ol className="mt-4 divide-y divide-line">
                {NEWS.slice(0, 4).map((n) => (
                  <li key={n.id}>
                    <Link href={`/newsroom/${n.id}`} className="group block py-3.5">
                      <span className="flex items-center gap-2 text-xs text-ink-500">
                        {n.breaking && <Pill tone="danger" className="h-5 px-2 text-[10px] tracking-wider uppercase">Breaking</Pill>}
                        <span className="font-semibold text-ink-700 tabular-nums">{n.time}</span><span className="truncate">{n.region}</span>
                      </span>
                      <span className="mt-1 block font-semibold text-[15px] leading-snug group-hover:text-brand-700 line-clamp-2">{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {/* TOPIC STRIP, compact */}
      <section className="container-site mt-6 sm:mt-8" aria-label="Browse topics">
        <div className="flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto no-scrollbar snap-x -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {TOPICS.map((t) => {
            const Icon = TOPIC_ICONS[t.icon];
            return (
              <div key={t.slug} className="snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-auto card card-hover p-4 flex items-start gap-3.5">
                <span className="size-11 shrink-0 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><Icon className="size-5" /></span>
                <div className="min-w-0 flex-1">
                  <Link href={`/topics/${t.slug}`} className="flex items-center justify-between gap-2 font-semibold text-ink-900 hover:text-brand-700">
                    {t.name}<span className="text-xs font-medium text-ink-400 tabular-nums">{t.count} articles</span>
                  </Link>
                  <p className="mt-1 text-[13px] text-ink-500 truncate">
                    {t.subs.map((s, i) => (<span key={s.slug}>{i > 0 && <span className="mx-1 text-ink-300">·</span>}<Link href={`/topics/${t.slug}/${s.slug}`} className="hover:text-brand-700">{s.name}</Link></span>))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TOP STORIES */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="Editors' selection" title="Top stories" href="/search?sort=featured" />
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6">
          <FeatureCard a={top[0]} className="lg:col-span-7 lg:row-span-3" />
          {top.slice(1).map((a, i) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group lg:col-span-5 card card-hover p-4 flex gap-4 items-center">
              <Cover seed={a.art} className="w-28 sm:w-36 aspect-[4/3] rounded-2xl shrink-0" />
              <div className="min-w-0">
                <TopicCrumb a={a} />
                <h3 className="mt-1.5 font-serif text-[17px] sm:text-lg leading-snug font-semibold text-ink-900 group-hover:text-brand-700 line-clamp-3">{a.title}</h3>
                <p className="mt-1.5 text-[13px] text-ink-500">{a.date} · {a.read} min read</p>
              </div>
              <span className="sr-only">Story {i + 2}</span>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot size="leaderboard" enabled={ads} className="container-site mt-14" />

      {/* ABOUT */}
      <section className="container-site mt-14 sm:mt-20" aria-labelledby="about-h">
        <div className="card overflow-hidden grid lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
            <p className="eyebrow text-brand-600">About us</p>
            <h2 id="about-h" className="mt-3 font-serif text-[28px] sm:text-[38px] leading-[1.12] font-semibold tracking-[-0.01em] text-balance">Independent thinking on Pakistan's security, for readers who want the full picture.</h2>
            <p className="mt-4 text-[17px] text-ink-600 leading-relaxed max-w-2xl">Pakistan Strategic Forum publishes analysis, peer-reviewed research and reports from scholars, practitioners and journalists. Every piece is edited, sourced and open to correction.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                { icon: Newspaper, title: "Edited analysis", text: "Explainers, analysis and opinion on defence and policy." },
                { icon: GraduationCap, title: "Peer-reviewed research", text: "Papers assessed double-blind by subject experts." },
                { icon: Radar, title: "Global Watch", text: "A live picture of the places that matter to Pakistan." },
                { icon: UsersRound, title: "Dialogue and events", text: "Roundtables, seminars and the annual security dialogue." },
              ].map((p) => (
                <div key={p.title} className="flex gap-3.5 rounded-2xl bg-canvas p-4">
                  <span className="size-10 shrink-0 rounded-xl bg-white text-brand-800 grid place-items-center shadow-soft"><p.icon className="size-5" /></span>
                  <div><p className="font-semibold text-ink-900">{p.title}</p><p className="text-sm text-ink-600 mt-0.5 leading-relaxed">{p.text}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about" className="rounded-full">Who we are<ArrowRight className="size-4" /></ButtonLink>
              <ButtonLink href="/policies/editorial" variant="secondary" className="rounded-full">Our editorial standards</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 relative bg-brand-800 text-white p-6 sm:p-10 flex flex-col justify-between gap-8 min-h-[320px]">
            <Cover seed={41} kind="contour" dark className="absolute inset-0 opacity-70" />
            <div className="relative flex items-center gap-4">
              <span className="size-20 rounded-3xl bg-white p-2 shadow-lift"><Image src="/psf-logo.png" alt="Pakistan Strategic Forum crest" width={72} height={72} className="size-full object-contain" /></span>
              <p className="font-serif text-lg leading-snug text-white/90 max-w-[14rem]">Since 2019, writing on the questions that shape the country.</p>
            </div>
            <dl className="relative grid grid-cols-2 gap-3">
              {[["401", "Articles published"], ["212", "Locations on Global Watch"], ["48", "Peer-reviewed papers"], ["230+", "Contributors"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4 backdrop-blur-sm">
                  <dt className="text-[13px] text-white/70">{l}</dt><dd className="font-serif text-3xl font-semibold tabular-nums mt-1">{n}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* LATEST */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="Fresh from the desk" title="Latest coverage" href="/search?sort=latest" />
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {latest.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="card p-5 sm:p-6">
              <h3 className="font-semibold text-ink-900 flex items-center gap-2"><CalendarDays className="size-4 text-brand-600" />Just published</h3>
              <div className="mt-4 space-y-5">{ARTICLES.slice(9, 13).map((a) => <ArticleRow key={a.slug} a={a} />)}</div>
            </div>
            <AdSlot size="rectangle" enabled={ads} />
          </aside>
        </div>
      </section>

      {/* GLOBAL WATCH */}
      <section className="container-site mt-14 sm:mt-20">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-brand-900 text-white">
          <Cover seed={8} kind="contour" dark className="absolute inset-0" />
          <div className="relative grid lg:grid-cols-12 gap-8 p-6 sm:p-10">
            <div className="lg:col-span-5">
              <p className="eyebrow text-mint-300 flex items-center gap-2"><span className="size-2 rounded-full bg-mint-500 animate-pulse-dot" />Global Watch</p>
              <h2 className="mt-3 font-serif text-[28px] sm:text-[36px] leading-tight font-semibold">Where we are reporting right now</h2>
              <p className="mt-3 text-white/75 text-[17px] leading-relaxed">An interactive globe of {SITE.globalWatchCount} locations, each with a status, a short brief and our latest coverage.</p>
              <ButtonLink href="/global-watch" variant="light" className="mt-6 rounded-full">Open the globe<ArrowUpRight className="size-4" /></ButtonLink>
            </div>
            <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3 self-end">
              {HOTSPOTS.map((h) => (
                <li key={h.name}>
                  <Link href="/global-watch" className="group flex items-start gap-3 rounded-2xl bg-white/8 ring-1 ring-white/15 p-4 hover:bg-white/12 backdrop-blur-sm">
                    <span className={`mt-1 size-2.5 rounded-full shrink-0 ${h.level === "Crisis" ? "bg-[#ff8a80]" : h.level === "Elevated" ? "bg-mint-300" : "bg-white/60"}`} />
                    <span className="min-w-0"><span className="block font-semibold">{h.name}</span><span className="block text-sm text-white/70">{h.level} · {h.note}</span></span>
                    <ArrowUpRight className="size-4 ml-auto text-white/50 group-hover:text-white shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EXPLORE BY TOPIC */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="Explore" title="By topic" href="/topics" linkLabel="All topics" />
        <TopicExplorer />
      </section>

      {/* REPORTS */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="In depth" title="Reports" href="/reports" linkLabel="All reports" />
        <div className="grid lg:grid-cols-12 gap-6">
          <Link href={`/reports/${REPORTS[0].slug}`} className="group lg:col-span-6 relative overflow-hidden rounded-3xl bg-brand-800 text-white min-h-[340px] flex card-hover shadow-soft">
            <Cover seed={REPORTS[0].art} kind="radar" dark className="absolute inset-0" />
            <span className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/40 to-transparent" />
            <div className="relative mt-auto p-6 sm:p-8">
              <Pill tone="dark">{REPORTS[0].category} · {REPORTS[0].pages} pages</Pill>
              <h3 className="mt-3 font-serif text-[26px] sm:text-3xl font-semibold leading-tight group-hover:underline decoration-mint-300 underline-offset-4">{REPORTS[0].title}</h3>
              <p className="mt-2 text-white/80 max-w-lg">{REPORTS[0].summary}</p>
            </div>
          </Link>
          <ul className="lg:col-span-6 flex flex-col gap-4">
            {REPORTS.slice(1).map((r) => (
              <li key={r.slug}>
                <Link href={`/reports/${r.slug}`} className="group card card-hover p-4 flex gap-4 items-center">
                  <Cover seed={r.art} kind="grid" className="w-24 sm:w-32 aspect-[3/4] rounded-xl shrink-0" />
                  <div className="min-w-0">
                    <Pill tone="mint">{r.category}</Pill>
                    <h3 className="mt-2 font-serif text-lg sm:text-xl leading-snug font-semibold text-ink-900 group-hover:text-brand-700">{r.title}</h3>
                    <p className="mt-1 text-sm text-ink-600 line-clamp-2">{r.summary}</p>
                    <p className="mt-2 text-[13px] text-ink-500 flex items-center gap-1.5"><FileText className="size-3.5" />PDF · {r.pages} pages · {r.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="mt-14 sm:mt-20">
        <div className="container-site">
          <div className="rounded-[28px] sm:rounded-[32px] bg-mint-100 p-5 sm:p-10">
            <SectionHeader eyebrow="Peer-reviewed" title="Research" href="/research/all" linkLabel="All research">
              <p className="mt-2 text-ink-600 max-w-2xl">Original papers assessed double-blind by two subject experts before publication.</p>
            </SectionHeader>
            <div className="grid md:grid-cols-3 gap-5">
              {RESEARCH.map((p) => (
                <Link key={p.slug} href={`/research/${p.slug}`} className="group card card-hover p-5 sm:p-6 flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <Pill tone="brand"><BadgeCheck className="size-3.5" />Peer-reviewed</Pill>
                    <span className="text-xs text-ink-400 font-mono">{p.ref}</span>
                  </div>
                  <p className="mt-4 eyebrow text-ink-500">{p.category}</p>
                  <h3 className="mt-1.5 font-serif text-xl leading-snug font-semibold text-ink-900 group-hover:text-brand-700">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-600 leading-relaxed line-clamp-3">{p.abstract}</p>
                  <div className="mt-auto pt-5 flex items-center justify-between text-[13px] text-ink-500 border-t border-line mt-5">
                    <span className="truncate pr-2">{p.authors}</span><span className="shrink-0">{p.pages} pp</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 card p-5 sm:p-8 grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5">
                <h3 className="font-serif text-2xl font-semibold">Publish your research with us</h3>
                <p className="mt-2 text-ink-600">Submit original work for double-blind review by subject experts. You can follow every stage from your portal.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/research/submit" className="rounded-full">Submit a paper<Send className="size-4" /></ButtonLink>
                  <ButtonLink href="/policies/peer-review" variant="secondary" className="rounded-full">How peer review works</ButtonLink>
                </div>
              </div>
              <ol className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Send, t: "Submit", d: "Upload your anonymised manuscript" },
                  { icon: FileSearch, t: "Screening", d: "Editors check scope and format" },
                  { icon: UsersRound, t: "Peer review", d: "Two experts review double-blind" },
                  { icon: BadgeCheck, t: "Publish", d: "Accepted papers go live with a reference" },
                ].map((s, i) => (
                  <li key={s.t} className="relative rounded-2xl bg-canvas p-4">
                    <span className="flex items-center justify-between"><span className="size-9 rounded-xl bg-brand-800 text-white grid place-items-center"><s.icon className="size-4" /></span><span className="font-serif text-2xl text-brand-300 font-semibold">{i + 1}</span></span>
                    <p className="mt-3 font-semibold text-ink-900">{s.t}</p><p className="text-[13px] text-ink-600 mt-0.5 leading-relaxed">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <AdSlot size="leaderboard" enabled={ads} className="container-site mt-14" />

      {/* MOST READ + VIDEOS */}
      <section className="container-site mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="Readers' picks" title="Most read this week" />
          <ol className="card p-5 sm:p-6 space-y-6">
            {MOST_READ.map((s, i) => <li key={s}><ArticleRow a={articleBySlug(s)} index={i + 1} /></li>)}
          </ol>
        </div>
        <div className="lg:col-span-8">
          <SectionHeader eyebrow="Watch" title="Videos" href="/videos" />
          <div className="grid sm:grid-cols-2 gap-6">
            {VIDEOS.map((v) => <VideoCard key={v.id} v={v} />)}
          </div>
        </div>
      </section>

      {/* CONTRIBUTORS + ARCHIVE */}
      <section className="container-site mt-14 sm:mt-20 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 min-w-0 card p-5 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div><p className="eyebrow text-brand-600">The people behind the work</p><h2 className="mt-2 font-serif text-2xl sm:text-[28px] font-semibold">Our contributors</h2></div>
            <Link href="/join" className="text-sm font-semibold text-brand-700 hover:underline inline-flex items-center gap-1 shrink-0">Join them<ChevronRight className="size-4" /></Link>
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {AUTHORS.slice(0, 6).map((au) => (
              <li key={au.slug}>
                <Link href={`/authors/${au.slug}`} className="group flex items-center gap-3 rounded-2xl p-3 ring-1 ring-line hover:ring-brand-300 hover:bg-brand-50">
                  <Avatar initials={au.initials} size={44} />
                  <span className="min-w-0"><span className="block font-semibold text-ink-900 group-hover:text-brand-800 truncate">{au.name}</span><span className="block text-[13px] text-ink-500 truncate">{au.role}</span></span>
                  <span className="ml-auto text-xs text-ink-400 tabular-nums shrink-0">{au.articles} pieces</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/articles/${archive.slug}`} className="group lg:col-span-5 relative overflow-hidden rounded-3xl bg-brand-900 text-white p-6 sm:p-8 flex flex-col min-h-[320px] card-hover">
          <Cover seed={archive.art} kind="waves" dark className="absolute inset-0 opacity-90" />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-950 to-brand-950/20" />
          <span className="relative inline-flex items-center gap-2 eyebrow text-mint-300"><Landmark className="size-4" />From the archive</span>
          <span className="relative mt-auto">
            <Quote className="size-8 text-mint-300/70" />
            <span className="mt-2 block font-serif text-2xl sm:text-[28px] leading-tight font-semibold group-hover:underline decoration-mint-300 underline-offset-4">{archive.title}</span>
            <span className="mt-2 block text-white/75">{archive.standfirst}</span>
          </span>
        </Link>
      </section>

      {/* SOCIAL */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="Stay in touch" title="Follow Pakistan Strategic Forum" />
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SITE.social.map((s) => {
            const I = SOC[s.key as keyof typeof SOC];
            return (
              <li key={s.key}>
                <a href={s.href} className="group card card-hover p-4 sm:p-5 flex flex-col gap-4 h-full">
                  <span className="flex items-center justify-between"><span className="size-11 rounded-2xl bg-brand-800 text-white grid place-items-center"><I className="size-5" /></span><ArrowUpRight className="size-5 text-ink-300 group-hover:text-brand-700" /></span>
                  <span><span className="block font-semibold text-ink-900">{s.label}</span><span className="block text-[13px] text-ink-500 truncate">{s.handle}</span></span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* CTA */}
      <section className="container-site mt-14 sm:mt-20 grid md:grid-cols-2 gap-5">
        {[
          { icon: PenLine, eyebrow: "Contribute", title: "Write for us", text: "Analysis, explainers and opinion on defence, security and strategy, edited by our team.", href: "/join", cta: "Apply as a writer" },
          { icon: GraduationCap, eyebrow: "Research", title: "Publish research", text: "Submit original research for double-blind peer review and reach policy readers.", href: "/research/submit", cta: "Submit a paper" },
        ].map((c, i) => (
          <div key={c.title} className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 ${i === 0 ? "bg-brand-800 text-white" : "bg-white shadow-soft"}`}>
            <span className={`size-12 rounded-2xl grid place-items-center ${i === 0 ? "bg-white/12 text-mint-300" : "bg-mint-100 text-brand-800"}`}><c.icon className="size-6" /></span>
            <p className={`mt-5 eyebrow ${i === 0 ? "text-mint-300" : "text-brand-600"}`}>{c.eyebrow}</p>
            <h2 className="mt-2 font-serif text-[28px] font-semibold">{c.title}</h2>
            <p className={`mt-2 max-w-md ${i === 0 ? "text-white/80" : "text-ink-600"}`}>{c.text}</p>
            <Link href={c.href} className={btn(i === 0 ? "light" : "primary", "md", "mt-6 rounded-full")}>{c.cta}<ArrowRight className="size-4" /></Link>
          </div>
        ))}
      </section>
    </>
  );
}
