import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, BookOpenCheck, EyeOff, FileSearch, GraduationCap, LockKeyhole, Microscope, Scale, Send, Sprout, UsersRound } from "lucide-react";
import { RESEARCH, RESEARCH_CATEGORIES } from "@/lib/data";
import { PageHero } from "@/components/page";
import { ButtonLink, Cover, SectionHeader, btn } from "@/components/ui";
import { PaperCard } from "@/components/PaperCard";

export const metadata: Metadata = { title: "Research" };
const CAT_ICON = [Microscope, BookOpenCheck, Sprout];

export default function ResearchHub() {
  return (
    <>
      <PageHero crumbs={[{ label: "Research" }]} eyebrow="Peer-reviewed" title="Research" art={17}
        desc="Original research on Pakistan's security, reviewed double-blind by two subject experts before it is published."
        actions={<><ButtonLink href="/research/all" variant="light" className="rounded-full">Browse research<ArrowRight className="size-4" /></ButtonLink><ButtonLink href="/research/submit" variant="outline-light" className="rounded-full">Submit a paper</ButtonLink></>}
        aside={
          <div className="grid grid-cols-3 gap-3">
            {[[EyeOff, "Double-blind"], [UsersRound, "Two reviewers"], [Scale, "Open standards"]].map(([I, l]) => { const Icon = I as typeof EyeOff; return (
              <div key={l as string} className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4 text-center backdrop-blur-sm"><Icon className="size-6 mx-auto text-mint-300" /><p className="mt-2 text-sm font-medium">{l as string}</p></div>
            ); })}
          </div>
        } />

      <section className="container-site mt-12 sm:mt-16">
        <SectionHeader eyebrow="New" title="Latest research" href="/research/all" linkLabel="All research" />
        <div className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7"><PaperCard p={RESEARCH[0]} big /></div>
          <div className="lg:col-span-5 grid gap-5">{RESEARCH.slice(1).map((p) => <PaperCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <section className="container-site mt-12 sm:mt-16">
        <SectionHeader eyebrow="Browse" title="Research categories" />
        <div className="grid md:grid-cols-3 gap-4">
          {RESEARCH_CATEGORIES.map((c, i) => { const I = CAT_ICON[i]; return (
            <Link key={c.name} href={`/research/all?category=${encodeURIComponent(c.name)}`} className="group relative overflow-hidden rounded-3xl bg-brand-900 text-white p-6 min-h-[220px] flex flex-col card-hover">
              <Cover seed={100 + i} dark kind={(["contour", "waves", "grid"] as const)[i]} className="absolute inset-0 opacity-90" />
              <span className="relative size-12 rounded-2xl bg-white/12 text-mint-300 grid place-items-center"><I className="size-6" /></span>
              <span className="relative mt-auto"><span className="block font-serif text-2xl font-semibold">{c.name}</span><span className="block mt-1 text-white/75 text-[15px]">{c.desc}</span><span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-300">{c.count} papers<ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span></span>
            </Link>
          ); })}
        </div>
      </section>

      <section className="container-site mt-12 sm:mt-16">
        <div className="rounded-[28px] sm:rounded-[32px] bg-mint-100 p-5 sm:p-10">
          <SectionHeader eyebrow="For authors" title="How to publish with us" href="/policies/peer-review" linkLabel="Peer review guide" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: GraduationCap, t: "Apply as a researcher", d: "Create an account and tell us about your work. Editors approve applications." },
              { i: Send, t: "Submit your paper", d: "Upload an anonymised manuscript, title page and declarations in three steps." },
              { i: FileSearch, t: "Screening and review", d: "Editors screen for scope, then two experts review double-blind." },
              { i: BadgeCheck, t: "Decision and publication", d: "Revise if asked. Accepted papers are published with a reference number." },
            ].map((s, n) => (
              <li key={s.t} className="card p-5">
                <div className="flex items-center justify-between"><span className="size-11 rounded-2xl bg-brand-800 text-white grid place-items-center"><s.i className="size-5" /></span><span className="font-serif text-3xl font-semibold text-brand-200">{n + 1}</span></div>
                <h3 className="mt-4 font-semibold text-lg">{s.t}</h3><p className="mt-1 text-sm text-ink-600 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site mt-12 sm:mt-16 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 card p-6 sm:p-8">
          <p className="eyebrow text-brand-600">Our standards</p>
          <h2 className="mt-2 font-serif text-[26px] sm:text-[30px] font-semibold">What every paper is held to</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {[
              [EyeOff, "Anonymity", "Reviewers and authors never see each other's names."],
              [Scale, "Independence", "Reviewers declare conflicts and recuse when needed."],
              [LockKeyhole, "Confidentiality", "Manuscripts under review are never shared."],
              [BookOpenCheck, "Transparency", "Declarations on funding, ethics and data are published with the paper."],
            ].map(([I, t, d]) => { const Icon = I as typeof EyeOff; return (
              <li key={t as string} className="rounded-2xl bg-canvas p-4 flex gap-3"><span className="size-10 shrink-0 rounded-xl bg-white text-brand-800 grid place-items-center shadow-soft"><Icon className="size-5" /></span><div><p className="font-semibold">{t as string}</p><p className="text-sm text-ink-600 mt-0.5">{d as string}</p></div></li>
            ); })}
          </ul>
        </div>
        <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-brand-800 text-white p-6 sm:p-8 flex flex-col">
          <Cover seed={111} dark kind="radar" className="absolute inset-0 opacity-70" />
          <h2 className="relative font-serif text-[28px] font-semibold">Ready to submit?</h2>
          <p className="relative mt-2 text-white/80">You need a Research Writer account to submit. It takes a few minutes to apply.</p>
          <div className="relative mt-auto pt-8 flex flex-wrap gap-3">
            <Link href="/join" className={btn("light", "md", "rounded-full")}>Sign up<ArrowRight className="size-4" /></Link>
            <Link href="/sign-in" className={btn("outline-light", "md", "rounded-full")}>Sign in</Link>
          </div>
        </div>
      </section>
    </>
  );
}
