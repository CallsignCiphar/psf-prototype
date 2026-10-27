import Link from "next/link";
import type { Metadata } from "next";
import { Check, EyeOff, Mail, X } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Note, PageHead, Stat, Status, Tag } from "@/components/dash/kit";
import { Dialog } from "@/components/dash/interactive";
import { Field, Segmented, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Reviews" };

export default function Reviews() {
  return (
    <DashShell kind="portal" active="reviews" title="Reviews">
      <PageHead title="Reviews" desc="Research papers assigned to you as an Approver" />
      <section className="rounded-[28px] bg-brand-900 text-white p-5 sm:p-7">
        <div className="flex items-center gap-2"><Mail className="size-4 text-mint-300" /><p className="eyebrow text-mint-300">Review invitation</p></div>
        <h2 className="mt-3 font-serif text-[24px] sm:text-[28px] font-semibold leading-tight">Cyber norms for nuclear command and control</h2>
        <p className="mt-2 text-white/70 text-[14.5px]">RES-2026-00049 · Round 1 · Policy paper · 7,400 words · respond by 18 Oct 2026</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Dialog triggerClass={btn("light", "md", "rounded-full")} trigger={<><Check className="size-4" />Accept, due 1 Nov</>} title="Accept review of RES-2026-00049" confirm={{ label: "Accept review", toast: "Review accepted. It is now in progress." }}>
            <dl className="rounded-2xl bg-canvas divide-y divide-line">{[["Title", "Cyber norms for nuclear command and control"], ["Length", "7,400 words"], ["Due", "1 Nov 2026, 21 days from today"]].map(([a, b]) => <div key={a} className="flex justify-between gap-4 px-4 py-3 text-[14.5px]"><dt className="text-ink-500">{a}</dt><dd className="font-semibold text-right">{b}</dd></div>)}</dl>
            <label className="flex gap-3 text-[15px]"><input type="checkbox" required className="mt-0.5 size-5 accent-[#04411f]" />I have no conflict of interest with this work.</label>
            <label className="flex gap-3 text-[15px]"><input type="checkbox" required className="mt-0.5 size-5 accent-[#04411f]" />I will keep the manuscript confidential.</label>
          </Dialog>
          <Dialog triggerClass={btn("outline-light", "md", "rounded-full")} trigger="Read abstract" title="Abstract" cancel="Close">
            <p className="font-serif text-[17px] leading-relaxed text-ink-800">Nuclear command and control systems increasingly depend on digital networks. This paper asks which cyber norms could reduce the risk that an intrusion is mistaken for preparation for a first strike, and proposes three confidence-building measures suited to South Asia.</p>
          </Dialog>
          <Dialog triggerClass="h-11 px-5 rounded-full text-white/80 font-semibold inline-flex items-center gap-2 hover:bg-white/10" trigger={<><X className="size-4" />Decline</>} title="Decline this review?" confirm={{ label: "Decline", tone: "danger", toast: "Invitation declined" }}>
            <Field label="Reason"><Segmented name="dr" options={["Not enough time", "Outside my expertise", "Conflict of interest", "Other"]} /></Field>
            <Field label="Suggest another reviewer" hint="Optional" htmlFor="m-sr"><TextInput id="m-sr" placeholder="Name and email" /></Field>
          </Dialog>
        </div>
      </section>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Invitations" value="1" /><Stat label="In progress" value="1" tone="mint" /><Stat label="Completed" value="6" /><Stat label="Declined" value="1" />
      </div>
      <Card className="mt-5" title="In progress" pad={false}>
        <div className="p-3 sm:p-4">
          <Link href="/portal/reviews/RES-2026-00045" className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl p-3 sm:p-4 hover:bg-canvas">
            <span className="font-mono text-[12.5px] font-semibold text-ink-500 sm:w-36">RES-2026-00045</span>
            <span className="flex-1 min-w-0"><span className="block font-semibold text-[15px]">Hybrid threats and information operations in South Asia</span><span className="block text-[13px] text-ink-500">Original research · Round 1 · accepted 28 Sep 2026 · due 19 Oct 2026</span></span>
            <Status s="Due soon" /><span className={btn("primary", "sm", "rounded-full")}>Continue review</span>
          </Link>
        </div>
      </Card>
      <Card className="mt-5" title="Recently completed" action={<button className="text-sm font-semibold text-brand-700">View all 6</button>} pad={false}>
        <ul className="divide-y divide-line">
          {[["RES-2026-00031", "Pakistan-Iran border trade", "2", "12 Aug 2026", "Accept"], ["RES-2026-00031", "Pakistan-Iran border trade", "1", "2 Jul 2026", "Minor revisions"], ["RES-2026-00022", "Space situational awareness for small states", "1", "20 May 2026", "Major revisions"]].map(([id, t, r, d, rec]) => (
            <li key={id + r} className="flex flex-wrap items-center gap-x-5 gap-y-1 px-5 sm:px-6 py-4"><span className="font-mono text-[12.5px] font-semibold text-ink-500 w-36">{id}</span><span className="flex-1 min-w-[160px] font-semibold text-[14.5px]">{t}</span><Tag>Round {r}</Tag><span className="text-[13px] text-ink-500 w-28">{d}</span><Status s={rec} /></li>
          ))}
        </ul>
      </Card>
      <div className="mt-6"><Note icon={EyeOff} title="Reviews are double-blind">Authors are hidden from you and you are hidden from them. If you recognise the work, tell the editor before you start.</Note></div>
    </DashShell>
  );
}
