import type { Metadata } from "next";
import { Check, EyeOff, MessageSquare, Save, Send } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Tag } from "@/components/dash/kit";
import { ActionButton, Dialog } from "@/components/dash/interactive";
import { PaperTabs, Recommendation, Scores } from "@/components/dash/ReviewForm";
import { Field, FileDrop, TextArea } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Review workspace" };

export default function ReviewWorkspace() {
  return (
    <DashShell kind="portal" active="reviews" title="Review workspace">
      <PageHead crumbs={[{ label: "Reviews", href: "/portal/reviews" }, { label: "RES-2026-00045" }]} title="RES-2026-00045" badge={<Tag tone="violet">Due in 3 days · 19 Oct</Tag>} desc={<>Research article · Round 1 · <span className="inline-flex items-center gap-1"><Check className="size-3.5 text-brand-600" />Draft saved 14:20</span></>} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_420px] gap-6 items-start">
        <div className="bg-white rounded-[28px] shadow-soft p-5 sm:p-8 min-w-0">
          <PaperTabs>
            <p className="flex gap-2.5 rounded-2xl bg-info-50 text-info-700 p-3.5 text-[13.5px]"><EyeOff className="size-4 shrink-0 mt-0.5" />Double-blind: author names, institutions and the title page are hidden. Select text to add a comment.</p>
            <p className="mt-6 eyebrow text-ink-500">Anonymised manuscript</p>
            <h2 className="mt-2 font-serif text-[26px] sm:text-[32px] leading-tight font-semibold">Deterrence stability and hypersonic delivery systems in South Asia</h2>
            <div className="mt-6 font-serif text-[17px] sm:text-[18px] leading-[1.75] text-ink-800 space-y-5">
              <p className="text-[13px] font-sans font-bold uppercase tracking-wider text-ink-500">Abstract</p>
              <p>The introduction of hypersonic glide vehicles compresses the time available to decision-makers in a crisis. This paper examines how compressed warning times interact with command and control arrangements...</p>
              <h3 className="font-semibold text-[22px]">1. Introduction</h3>
              <p>Strategic stability in South Asia has rested on an assumption that both sides would have time to understand what was happening before they had to act. That assumption is now under pressure.</p>
              <p className="relative"><mark className="bg-mint-200 rounded px-0.5">Hypersonic systems do not change the arithmetic of deterrence. They change its tempo.</mark> This paper asks what happens to crisis decision-making when the window between detection and impact falls below the time needed to characterise a launch.</p>
              <aside className="font-sans rounded-2xl bg-mint-100 p-4 xl:ml-8">
                <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-brand-700"><MessageSquare className="size-4" />Comment · Section 1</p>
                <p className="mt-1.5 text-[14.5px] text-ink-800">This is the paper&apos;s central claim. State it in the abstract too, and support it with the warning-time data from section 3.</p>
                <div className="mt-2 flex gap-3 text-[13px] font-semibold"><button type="button" className="text-brand-700">Edit</button><button type="button" className="text-danger-700">Delete</button></div>
              </aside>
              <h3 className="font-semibold text-[22px]">2. Method</h3>
              <p>The study combines a structured review of declared doctrine with three crisis case studies. Each case is coded for warning time, decision layers and the channels used to communicate intent.</p>
              <p>The coding framework follows [Author, year], adapted for a dyadic context.</p>
            </div>
          </PaperTabs>
        </div>
        <aside className="bg-white rounded-[28px] shadow-soft p-5 sm:p-6 space-y-6 xl:sticky xl:top-24 min-w-0">
          <h2 className="font-semibold text-[17px]">Your review</h2>
          <Recommendation />
          <Scores />
          <Field label="Comments to author" required htmlFor="rv-auth" hint="Shared with the author anonymously as Reviewer 1 · 312 characters · min 100 · 2 anchored comments will be included"><TextArea id="rv-auth" rows={6} defaultValue="A clear and timely paper. The central claim about tempo is persuasive, but the case selection needs more justification and the warning-time data in section 3 should be brought forward. Please also engage with recent work on entanglement." /></Field>
          <Field label="Confidential comments to editor" hint="Never shared with the author" htmlFor="rv-conf"><TextArea id="rv-conf" rows={3} /></Field>
          <Field label="Annotated file" hint="Optional. Attach a PDF with your annotations, max 20MB."><FileDrop label="Drop a PDF or browse" accept=".pdf" /></Field>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <ActionButton msg="Draft review saved" className={btn("secondary", "md", "rounded-full")}><Save className="size-4" />Save draft</ActionButton>
            <Dialog triggerClass={btn("primary", "md", "rounded-full w-full")} trigger={<><Send className="size-4" />Submit review</>} title="Submit your review?" confirm={{ label: "Submit review", toast: "Review submitted. Thank you." }} cancel="Back to review" href="/portal/reviews">
              <dl className="rounded-2xl bg-canvas divide-y divide-line">{[["Recommendation", "Major revisions"], ["Comments to author", "1,240 words"], ["Comments to editor", "180 words, editors only"]].map(([a, b]) => <div key={a} className="flex justify-between gap-4 px-4 py-3 text-[14.5px]"><dt className="text-ink-500">{a}</dt><dd className="font-semibold text-right">{b}</dd></div>)}</dl>
              <p className="text-[14px] text-danger-700 font-medium">You cannot edit the review once it is submitted.</p>
            </Dialog>
          </div>
        </aside>
      </div>
    </DashShell>
  );
}
