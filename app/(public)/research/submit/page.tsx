import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookMarked, EyeOff, FileCheck2, FileText, FileType2, Ruler, ShieldCheck, UserPlus, LogIn } from "lucide-react";
import { PageHero } from "@/components/page";
import { ButtonLink, SectionHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Submit a paper" };

const REQ = [
  { i: FileType2, t: "Manuscript format", d: "DOCX or PDF, double-spaced, with numbered pages and headings." },
  { i: Ruler, t: "Word limits", d: "Research papers 6,000 to 10,000 words. Policy briefs 2,000 to 4,000 words. Abstract 150 to 300 words." },
  { i: BookMarked, t: "Referencing style", d: "Chicago author-date, with a full reference list." },
  { i: EyeOff, t: "Anonymisation", d: "Remove names, affiliations and self-citations that identify you from the manuscript and file metadata." },
  { i: FileText, t: "Files accepted", d: "Anonymised manuscript, a separate title page, and up to five supplementary files (50 MB in total)." },
  { i: ShieldCheck, t: "Declarations", d: "Originality, conflicts of interest, funding, ethics approval where human participants are involved." },
];

export default function SubmitPaper() {
  return (
    <>
      <PageHero crumbs={[{ label: "Research", href: "/research" }, { label: "Submit a paper" }]} eyebrow="For authors" title="Submit a paper" art={23}
        desc="We publish original research on defence, geopolitics and national affairs. Every paper is reviewed double-blind by two subject experts."
        actions={<><ButtonLink href="/join" variant="light" className="rounded-full"><UserPlus className="size-4" />Apply as a researcher</ButtonLink><ButtonLink href="/sign-in" variant="outline-light" className="rounded-full"><LogIn className="size-4" />Sign in to submit</ButtonLink></>} />

      <section className="container-site mt-12 sm:mt-16">
        <SectionHeader eyebrow="Before you start" title="Requirements" href="/policies/peer-review" linkLabel="How peer review works" />
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REQ.map((r) => (
            <div key={r.t} className="card p-5 sm:p-6">
              <span className="size-11 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><r.i className="size-5" /></span>
              <dt className="mt-4 font-semibold text-lg">{r.t}</dt>
              <dd className="mt-1 text-ink-600 leading-relaxed">{r.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-site mt-12 sm:mt-16 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 card p-6 sm:p-8">
          <h2 className="font-serif text-[26px] font-semibold">What happens after you submit</h2>
          <ol className="mt-6 space-y-4">
            {[["Screening", "Editors check scope, format and anonymisation."], ["Peer review", "Two reviewers assess the paper double-blind."], ["Decision", "Accept, minor revisions, major revisions or reject, with reviewer comments."], ["Publication", "Accepted papers get a reference number and go live on the site."]].map(([t, d], i) => (
              <li key={t} className="flex gap-4"><span className="size-9 shrink-0 rounded-full bg-brand-800 text-white grid place-items-center font-semibold text-sm">{i + 1}</span><div><p className="font-semibold">{t}</p><p className="text-ink-600 text-[15px]">{d}</p></div></li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-500">You can follow every stage, and upload revisions, from your contributor portal.</p>
        </div>
        <div className="lg:col-span-5 rounded-3xl bg-mint-100 p-6 sm:p-8 flex flex-col">
          <FileCheck2 className="size-10 text-brand-700" />
          <h2 className="mt-4 font-serif text-[26px] font-semibold">Already a Research Writer?</h2>
          <p className="mt-2 text-ink-600">Sign in and start a new submission from My Research. Your progress saves as you go.</p>
          <div className="mt-auto pt-6 flex flex-wrap gap-3">
            <ButtonLink href="/sign-in" className="rounded-full">Sign in to submit<ArrowRight className="size-4" /></ButtonLink>
            <Link href="/publish-with-us" className="h-11 px-4 inline-flex items-center text-[15px] font-semibold text-brand-700 hover:underline">Publish with us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
