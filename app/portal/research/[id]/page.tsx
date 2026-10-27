import Link from "next/link";
import type { Metadata } from "next";
import clsx from "clsx";
import { CircleCheck, ExternalLink, FileText, Hourglass, Send, Undo2 } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, KV, PageHead, Status, Tag, Timeline } from "@/components/dash/kit";
import { Dialog } from "@/components/dash/interactive";
import { Field, FileDrop, TextArea } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Research detail" };
const STAGES = ["Submitted", "Screening", "Under review", "Revisions requested", "Awaiting final approval", "Published"];

export default async function ResearchDetail({ searchParams }: { searchParams: Promise<{ stage?: string }> }) {
  const raw = (await searchParams).stage;
  const stage = raw === "review" || raw === "published" || raw === "rejected" ? raw : "revisions";
  const label = { revisions: "Revisions requested", review: "Under review", published: "Published", rejected: "Rejected" }[stage];
  const at = { revisions: 3, review: 2, published: 5, rejected: 2 }[stage];
  const reviews = (
    <Card title="Reviewer comments" action={<Tag>Anonymised</Tag>}>
      <div className="space-y-3">
        <div className="rounded-2xl bg-canvas p-4"><div className="flex items-center justify-between gap-2"><p className="font-semibold">Reviewer 1</p><Status s="Major revisions" /></div><p className="mt-2 text-[14.5px] text-ink-700 leading-relaxed">The sampling of 40 wards needs justification. Why these wards and not a random sample? The discussion of the 2023 provincial plan is good but should engage with the NDMA guidelines.</p></div>
        <div className="rounded-2xl bg-canvas p-4"><div className="flex items-center justify-between gap-2"><p className="font-semibold">Reviewer 2</p><Status s="Minor revisions" /></div><p className="mt-2 text-[14.5px] text-ink-700 leading-relaxed">A useful case. Update the literature review to include work published since 2023 and clarify the method section.</p></div>
      </div>
    </Card>
  );
  return (
    <DashShell kind="portal" active="research" title="Research detail">
      <PageHead crumbs={[{ label: "My Research", href: "/portal/research" }, { label: "RES-2026-00041" }]} title="Civil defence planning in Karachi" badge={<Status s={label} />} desc="RES-2026-00041 · Round 1" />
      <div className="bg-white rounded-[22px] shadow-soft p-4 sm:p-5 mb-6 overflow-x-auto no-scrollbar">
        <ol className="flex items-center min-w-[640px]">
          {STAGES.map((s, i) => { const name = stage === "rejected" && i === 2 ? "Rejected" : s; const done = i < at || (stage === "published" && i === at); const now = i === at && stage !== "published"; const bad = stage === "rejected" && i === 2; return (
            <li key={s} className="flex-1 flex items-center gap-2 last:flex-none">
              <span className="flex items-center gap-2 shrink-0"><span className={clsx("size-7 rounded-full grid place-items-center text-[12px] font-bold", bad ? "bg-danger-700 text-white" : done ? "bg-brand-700 text-white" : now ? "bg-mint-500 text-brand-950 ring-4 ring-mint-100" : "bg-canvas text-ink-400")}>{i + 1}</span><span className={clsx("text-[13px] font-semibold whitespace-nowrap", bad ? "text-danger-700" : now || done ? "text-ink-900" : "text-ink-400")}>{name}</span></span>
              {i < STAGES.length - 1 && <span className={clsx("flex-1 h-0.5 mx-2 rounded-full", i < at ? "bg-brand-500" : "bg-line")} />}
            </li>
          ); })}
        </ol>
      </div>
      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          {stage === "revisions" && (<>
            <Card title="Decision letter" desc="Round 1 · Dr Faisal Qureshi, Handling editor · 11 Oct 2026">
              <div className="font-serif text-[17px] leading-relaxed text-ink-800 space-y-3"><p>Dear Ms Haider,</p><p>Both reviewers see real value in the Karachi case. They ask for a clearer method section and an updated literature review. Please address each comment in a response letter.</p><p className="font-sans font-semibold">Decision: Major revisions.</p></div>
            </Card>
            {reviews}
            <section className="bg-white rounded-[22px] shadow-soft ring-2 ring-mint-500 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3"><h2 className="font-semibold text-[17px]">Submit your revision</h2><Tag tone="violet">Due 30 Oct</Tag></div>
              <form className="mt-5 space-y-5">
                <Field label="Revised manuscript, anonymised" required><FileDrop label="Drop file here or browse" hint="DOCX or PDF, up to 20 MB" /></Field>
                <Field label="Response to reviewers" required><FileDrop label="Drop file here or browse" hint="Address each comment in turn" /></Field>
                <Field label="Note to editor" htmlFor="rv-note"><TextArea id="rv-note" rows={3} /></Field>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-2"><span className="text-[13px] text-ink-500">Due 30 Oct 2026 · 14 days left</span>
                  <Dialog triggerClass={btn("primary", "md", "rounded-full")} trigger={<><Send className="size-4" />Submit revision</>} title="Submit revision for round 2?" desc="The handling editor is notified and may send it back to the reviewers." confirm={{ label: "Submit revision", toast: "Revision submitted" }} href="/portal/research" /></div>
              </form>
            </section>
          </>)}
          {stage === "review" && <Card><div className="flex gap-4"><span className="size-12 rounded-2xl bg-info-50 text-info-700 grid place-items-center shrink-0"><Hourglass className="size-6" /></span><div><p className="font-semibold text-[17px]">With reviewers</p><p className="mt-1 text-ink-600">Two reviewers accepted on 18 Oct 2026. Reviews are due by 8 Nov 2026. We will email you when the editor makes a decision.</p></div></div></Card>}
          {stage === "published" && <div className="rounded-[24px] bg-brand-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5"><CircleCheck className="size-12 text-mint-300 shrink-0" /><div className="flex-1"><p className="font-serif text-[24px] font-semibold">Published on 16 Oct 2026</p><p className="mt-1 text-white/75">Your paper is live with DOI-style reference PSF.R.2026.017.</p></div><Link href="/research/deterrence-hypersonics" className={btn("light", "md", "rounded-full")}><ExternalLink className="size-4" />View paper</Link></div>}
          {stage === "rejected" && (<>
            <Card title="Decision letter" desc="Dr Faisal Qureshi, Handling editor · 11 Oct 2026"><p className="font-serif text-[17px] leading-relaxed text-ink-800">Thank you for submitting to Pakistan Strategic Forum. After review we are unable to publish this paper. Reviewer comments are included below to help with future work.</p></Card>
            {reviews}
          </>)}
        </div>
        <aside className="space-y-4 min-w-0">
          <Card title="Details"><KV items={[["Type", "Original research"], ["Category", "Urban Security"], ["Submitted", "2 Sep 2026"], ["Authors", "Sara Haider, Bilal Ahmed"], ["Editor", "Dr Faisal Qureshi"]]} /></Card>
          <Card title="Files"><ul className="space-y-2">{["Anonymised manuscript", "Title page", "Supplementary data"].map((f) => <li key={f}><button type="button" className="w-full flex items-center gap-3 rounded-xl bg-canvas p-3 text-left hover:bg-mint-100"><FileText className="size-5 text-brand-700" /><span className="flex-1 font-semibold text-[14px]">{f}</span><span className="text-[12px] text-ink-500">v1 · 2 Sep</span></button></li>)}</ul></Card>
          <Card title="Activity"><Timeline steps={[{ t: "Decision: major revisions", d: "11 Oct 2026", s: "done" }, { t: "Reviews completed", d: "9 Oct 2026", s: "done" }, { t: "Sent to reviewers", d: "14 Sep 2026", s: "done" }, { t: "Passed screening", d: "6 Sep 2026", s: "done" }, { t: "Submitted", d: "2 Sep 2026", s: "done" }]} /></Card>
          {stage !== "published" && stage !== "rejected" && (
            <Dialog triggerClass="w-full h-12 rounded-full text-danger-700 font-semibold inline-flex items-center justify-center gap-2 hover:bg-danger-50" trigger={<><Undo2 className="size-4" />Withdraw submission</>} title="Withdraw from review?" desc="Editors stop reviewing it and it returns to your drafts. You can submit again later." confirm={{ label: "Withdraw", tone: "danger", toast: "Submission withdrawn" }} href="/portal/research">
              <Field label="Reason" hint="Optional. Shared with editors." htmlFor="m-wd"><TextArea id="m-wd" rows={3} /></Field>
            </Dialog>
          )}
        </aside>
      </div>
    </DashShell>
  );
}
