import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, GraduationCap, Info, PenLine } from "lucide-react";
import { AuthShell, AuthTitle } from "@/components/auth/AuthShell";

export const metadata: Metadata = { title: "Write for us" };

const TRACKS = [
  { k: "article", i: PenLine, t: "Write articles and reports", d: "Analysis, explainers and opinion on defence, security and strategy. Reviewed by our editors.", pts: ["Analysis, explainer, opinion, interview", "Event and conference reports", "Editorial review, usually within days"], cta: "Apply as a writer" },
  { k: "research", i: GraduationCap, t: "Publish research", d: "Submit research papers and policy briefs for double-blind peer review.", pts: ["Research papers and policy briefs", "Emerging scholar papers", "Reviewed by two subject experts"], cta: "Apply as a researcher" },
];

export default function Join() {
  return (
    <AuthShell aside="join" wide>
      <AuthTitle eyebrow="Join" title="Write for Pakistan Strategic Forum" desc="Choose how you want to contribute. You can apply for the other role later from your account." />
      <div className="grid sm:grid-cols-2 gap-4">
        {TRACKS.map((t, k) => (
          <Link key={t.k} href={`/join/details?track=${t.k}`} className={`group rounded-[28px] p-6 flex flex-col transition hover:-translate-y-0.5 ${k === 0 ? "bg-brand-800 text-white shadow-lift" : "bg-white shadow-soft hover:shadow-lift"}`}>
            <span className={`size-12 rounded-2xl grid place-items-center ${k === 0 ? "bg-white/12 text-mint-300" : "bg-mint-100 text-brand-800"}`}><t.i className="size-6" /></span>
            <span className="mt-5 font-serif text-[24px] leading-tight font-semibold">{t.t}</span>
            <span className={`mt-2 text-[15px] leading-relaxed ${k === 0 ? "text-white/75" : "text-ink-600"}`}>{t.d}</span>
            <ul className="mt-5 space-y-2 flex-1">{t.pts.map((p) => <li key={p} className={`flex items-start gap-2 text-[14px] ${k === 0 ? "text-white/85" : "text-ink-700"}`}><Check className={`size-4 mt-0.5 shrink-0 ${k === 0 ? "text-mint-300" : "text-brand-600"}`} />{p}</li>)}</ul>
            <span className={`mt-6 h-12 rounded-full inline-flex items-center justify-center gap-2 font-semibold ${k === 0 ? "bg-white text-brand-900" : "bg-brand-800 text-white"}`}>{t.cta}<ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </div>
      <p className="mt-5 flex items-start gap-3 rounded-2xl bg-white/70 ring-1 ring-line p-4 text-sm text-ink-600"><Info className="size-5 shrink-0 text-info-700" />Approvers and Pakistan Strategic Forum Experts are invited by our team and cannot sign up here.</p>
      <p className="mt-6 text-center text-[15px] text-ink-600">Already have an account? <Link href="/sign-in" className="font-semibold text-brand-700 hover:underline">Sign in</Link></p>
    </AuthShell>
  );
}
