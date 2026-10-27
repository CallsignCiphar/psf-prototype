import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CircleCheck, Eye } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Submitted" };

export default async function Submitted({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const art = (await searchParams).kind === "article";
  const steps = art
    ? [["Editorial review", "Usually within 3 working days."], ["Decision", "The editor approves it, requests changes or declines it, with a note."], ["Publication", "Approved articles go live straight away or at a scheduled time."]]
    : [["Screening", "Editors check scope and anonymisation within 5 working days."], ["Peer review", "Two reviewers assess the paper double-blind."], ["Decision", "You receive the editor decision and reviewer comments by email and in My Research."]];
  return (
    <DashShell kind="portal" active={art ? "articles" : "research"} title="Submitted">
      <div className="max-w-2xl mx-auto bg-white rounded-[32px] shadow-soft p-6 sm:p-10 text-center">
        <span className="mx-auto size-20 rounded-full bg-mint-100 text-brand-700 grid place-items-center ring-8 ring-mint-100/50"><CircleCheck className="size-10" /></span>
        <h1 className="mt-6 font-serif text-[30px] sm:text-[36px] font-semibold">{art ? "Article submitted for review" : "Paper submitted"}</h1>
        <p className="mt-3 text-ink-600 text-[16px] leading-relaxed">{art ? <>Thank you. Our editors will review &ldquo;Water security and the Indus Waters Treaty&rdquo; and email you when there is a decision.</> : <>Thank you. We have emailed a copy of your submission to <span className="font-semibold text-ink-900">sara.haider@qau.edu.pk</span>.</>}</p>
        {!art && <p className="mt-4 inline-flex h-10 px-4 rounded-full bg-canvas font-mono font-semibold items-center">Reference RES-2026-00052</p>}
        <p className="mt-8 eyebrow text-ink-500 text-left">What happens next</p>
        <ol className="mt-3 space-y-3 text-left">{steps.map(([t, d], i) => <li key={t} className="flex gap-4 rounded-2xl bg-canvas p-4"><span className="size-9 rounded-full bg-brand-800 text-white grid place-items-center font-bold text-sm shrink-0">{i + 1}</span><span><span className="block font-semibold">{t}</span><span className="block text-[14px] text-ink-600">{d}</span></span></li>)}</ol>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <Link href={art ? "/portal/articles/water-security" : "/portal/research/RES-2026-00041?stage=review"} className={btn("primary", "lg", "rounded-full")}><Eye className="size-4" />View submission</Link>
          <Link href={art ? "/portal/articles" : "/portal/research"} className={btn("secondary", "lg", "rounded-full")}><ArrowLeft className="size-4" />Back to My {art ? "Articles" : "Research"}</Link>
        </div>
      </div>
    </DashShell>
  );
}
