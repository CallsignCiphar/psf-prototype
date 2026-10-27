import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, ChevronDown, FileCheck2, GraduationCap, HandCoins, Newspaper, Radar, Scale, SearchCheck, ShieldCheck, UsersRound } from "lucide-react";
import { AUTHORS, TOPICS } from "@/lib/data";
import { PageHero, StatTiles } from "@/components/page";
import { Avatar, ButtonLink, Cover, SectionHeader, TOPIC_ICONS } from "@/components/ui";

export const metadata: Metadata = { title: "About us" };

const JOURNEY = [
  { year: "2019", title: "Founded in Islamabad", text: "A small group of researchers starts publishing long-form analysis on defence and policy." },
  { year: "2021", title: "Peer-reviewed research", text: "Double-blind review introduced for research papers, with an external pool of approvers." },
  { year: "2023", title: "Global Watch launched", text: "An interactive globe tracks the places that matter to Pakistan's security." },
  { year: "2025", title: "Contributor portal", text: "Writers and researchers submit, track and revise their work in one place." },
  { year: "2026", title: "Islamabad Security Dialogue", text: "Our annual dialogue brings officials, scholars and journalists together." },
];

const FAQ = [
  ["Who writes for Pakistan Strategic Forum?", "Scholars, practitioners, retired officers, students and journalists. Every contributor applies and is approved by our editors."],
  ["How do you decide what to publish?", "Editors look for evidence, originality and relevance to Pakistan's security. Opinion is labelled as opinion."],
  ["How do I report a mistake?", "Use the corrections form. We review every request and log published corrections on the corrections page."],
  ["Can I republish your work?", "Short extracts with a link are welcome. For full republication, contact the editorial team first."],
];

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About us" }]}
        eyebrow="About us"
        title="Independent analysis of the forces shaping Pakistan's security"
        desc="Pakistan Strategic Forum is a platform for evidence-led writing on defence, geopolitics and national affairs, edited to a public standard and open to correction."
        actions={<><ButtonLink href="/policies/editorial" variant="light" className="rounded-full">Our editorial policy<ArrowRight className="size-4" /></ButtonLink><ButtonLink href="/contact" variant="outline-light" className="rounded-full">Contact us</ButtonLink></>}
        aside={<StatTiles onDark items={[["401", "Articles published"], ["48", "Peer-reviewed papers"], ["230+", "Approved contributors"], ["212", "Locations on Global Watch"]]} />}
      />

      {/* WHO WE ARE */}
      <section className="container-site mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <p className="eyebrow text-brand-600">Who we are</p>
          <h2 className="mt-3 font-serif text-[28px] sm:text-[38px] leading-tight font-semibold">A forum, not a faction</h2>
          <div className="mt-4 space-y-4 text-[17px] text-ink-600 leading-relaxed">
            <p>We publish people who know their subject, whatever their background, and we hold them to the same editorial standard. Analysis has to show its evidence. Opinion has to say it is opinion.</p>
            <p>Our readers are officials, officers, students, journalists and citizens who want more than headlines. We write for all of them in plain language.</p>
          </div>
        </div>
        <div className="lg:col-span-6 relative rounded-[28px] overflow-hidden min-h-[320px] bg-brand-900 p-8 flex items-end">
          <Cover seed={52} dark kind="radar" className="absolute inset-0" />
          <div className="relative flex items-center gap-4 rounded-2xl bg-white/95 p-4 shadow-pop max-w-sm">
            <span className="size-16 shrink-0"><Image src="/psf-logo.png" alt="Pakistan Strategic Forum crest" width={64} height={64} className="size-full object-contain" /></span>
            <p className="text-sm text-ink-700 leading-relaxed">Based in Islamabad, writing on Pakistan and the region since 2019.</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="What we do" title="Four ways we serve readers" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Newspaper, t: "Analysis", d: "Edited articles, explainers, interviews and opinion.", href: "/topics" },
            { icon: GraduationCap, t: "Research", d: "Papers reviewed double-blind by subject experts.", href: "/research" },
            { icon: UsersRound, t: "Newsroom", d: "Verified updates, statements and events.", href: "/newsroom" },
            { icon: Radar, t: "Global Watch", d: "A live globe of the places that matter.", href: "/global-watch" },
          ].map((x) => (
            <Link key={x.t} href={x.href} className="group card card-hover p-6 flex flex-col">
              <span className="size-12 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><x.icon className="size-6" /></span>
              <h3 className="mt-5 font-serif text-xl font-semibold">{x.t}</h3>
              <p className="mt-1.5 text-ink-600 leading-relaxed">{x.d}</p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Explore<ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* DESKS */}
      <section className="container-site mt-14 sm:mt-20">
        <div className="rounded-[28px] sm:rounded-[32px] bg-mint-100 p-5 sm:p-10">
          <SectionHeader eyebrow="Our desks" title="Where our coverage comes from" href="/topics" linkLabel="All topics" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map((t) => { const I = TOPIC_ICONS[t.icon]; return (
              <Link key={t.slug} href={`/topics/${t.slug}`} className="group card card-hover p-5">
                <div className="flex items-center justify-between"><span className="size-11 rounded-2xl bg-brand-800 text-white grid place-items-center"><I className="size-5" /></span><span className="text-sm text-ink-500 tabular-nums">{t.count} pieces</span></div>
                <h3 className="mt-4 font-semibold text-lg group-hover:text-brand-700">{t.name}</h3>
                <p className="mt-1 text-sm text-ink-600 leading-relaxed">{t.blurb}</p>
                <p className="mt-3 text-[13px] text-ink-500">{t.subs.map((s) => s.name).join(" · ")}</p>
              </Link>
            ); })}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="Our journey" title="From a reading group to a national forum" />
        <ol className="relative grid md:grid-cols-5 gap-4">
          <span aria-hidden className="hidden md:block absolute left-0 right-0 top-[22px] h-px bg-brand-200" />
          {JOURNEY.map((j) => (
            <li key={j.year} className="relative">
              <span className="relative z-10 inline-flex items-center h-11 px-4 rounded-full bg-brand-800 text-white font-semibold tabular-nums">{j.year}</span>
              <div className="mt-4 card p-5"><h3 className="font-semibold">{j.title}</h3><p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{j.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* HOW WE WORK */}
      <section className="container-site mt-14 sm:mt-20 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 card p-6 sm:p-8">
          <p className="eyebrow text-brand-600">How we work</p>
          <h2 className="mt-2 font-serif text-[26px] sm:text-[32px] font-semibold">Every piece goes through the same checks</h2>
          <ol className="mt-6 grid sm:grid-cols-2 gap-3">
            {[
              { i: FileCheck2, t: "Commissioned or pitched", d: "Writers apply once, then pitch or submit through the portal." },
              { i: SearchCheck, t: "Edited and fact-checked", d: "Editors check sources, claims and labels before publication." },
              { i: ShieldCheck, t: "Security review", d: "Sensitive operational details are removed under our policy." },
              { i: BadgeCheck, t: "Published and correctable", d: "Readers can request corrections. We log every one." },
            ].map((s, n) => (
              <li key={s.t} className="rounded-2xl bg-canvas p-4 flex gap-3">
                <span className="size-10 shrink-0 rounded-xl bg-white text-brand-800 grid place-items-center shadow-soft"><s.i className="size-5" /></span>
                <div><p className="font-semibold"><span className="text-brand-400 mr-1.5 tabular-nums">{n + 1}.</span>{s.t}</p><p className="text-sm text-ink-600 mt-0.5 leading-relaxed">{s.d}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/policies/editorial" variant="secondary" size="sm" className="rounded-full">Editorial policy</ButtonLink>
            <ButtonLink href="/corrections" variant="secondary" size="sm" className="rounded-full">Corrections</ButtonLink>
            <ButtonLink href="/policies/peer-review" variant="secondary" size="sm" className="rounded-full">Peer review</ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-brand-800 text-white p-6 sm:p-8 flex flex-col">
          <Cover seed={61} dark kind="waves" className="absolute inset-0 opacity-70" />
          <span className="relative size-12 rounded-2xl bg-white/12 grid place-items-center text-mint-300"><HandCoins className="size-6" /></span>
          <h2 className="relative mt-5 font-serif text-[26px] font-semibold">Independence and funding</h2>
          <p className="relative mt-3 text-white/80 leading-relaxed">We do not accept funding that comes with editorial conditions. Advertising is clearly labelled and kept separate from editorial decisions. Contributors declare conflicts of interest before publication.</p>
          <Link href="/policies/disclaimer" className="relative mt-auto pt-6 inline-flex items-center gap-1.5 font-semibold text-mint-300 hover:text-white"><Scale className="size-4" />Read our disclaimer</Link>
        </div>
      </section>

      {/* PEOPLE */}
      <section className="container-site mt-14 sm:mt-20">
        <SectionHeader eyebrow="People" title="Editors and contributors" />
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {AUTHORS.map((a) => (
            <li key={a.slug}>
              <Link href={`/authors/${a.slug}`} className="group card card-hover p-5 flex flex-col items-center text-center h-full">
                <Avatar initials={a.initials} size={64} />
                <span className="mt-3 font-semibold text-ink-900 group-hover:text-brand-700">{a.name}</span>
                <span className="mt-1 text-[13px] text-ink-500 leading-snug">{a.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="container-site mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <p className="eyebrow text-brand-600">Questions</p>
          <h2 className="mt-2 font-serif text-[28px] sm:text-[32px] font-semibold">Frequently asked</h2>
          <p className="mt-3 text-ink-600">Can't find what you need? <Link href="/contact" className="text-brand-700 font-semibold underline underline-offset-4">Get in touch</Link>.</p>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group card px-5 sm:px-6">
              <summary className="flex items-center justify-between gap-4 min-h-16 py-4 cursor-pointer list-none font-semibold text-[17px] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-brand-700 transition-transform group-open:rotate-180" /></summary>
              <p className="pb-5 -mt-1 text-ink-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
