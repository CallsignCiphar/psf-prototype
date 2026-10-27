import Link from "next/link";
import type { Metadata } from "next";
import clsx from "clsx";
import { Check, CircleCheck, CircleX, Clock, LogIn, MessageSquareText, Send } from "lucide-react";
import { AuthCard, AuthShell } from "@/components/auth/AuthShell";
import { Field, FileDrop, ProtoForm, TextArea } from "@/components/form";
import { Pill, btn } from "@/components/ui";

export const metadata: Metadata = { title: "Application status" };
const S = {
  pending: { pill: "Under review", tone: "info" as const },
  info: { pill: "More info requested", tone: "attn" as const },
  approved: { pill: "Approved", tone: "mint" as const },
  rejected: { pill: "Rejected", tone: "danger" as const },
};

export default async function Status({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state: raw = "pending" } = await searchParams;
  const state = (raw in S ? raw : "pending") as keyof typeof S;
  const steps: { t: string; d: string; s: "done" | "now" | "todo" | "bad" }[] = [
    { t: "Application submitted", d: "16 Oct 2026, 14:05", s: "done" },
    ...(state === "pending" ? [{ t: "Under review", d: "Usually 3 to 5 working days", s: "now" as const }, { t: "Decision", d: "We will email you", s: "todo" as const }] : []),
    ...(state === "info" ? [{ t: "More information requested", d: "17 Oct 2026, 10:20", s: "now" as const }, { t: "Decision", d: "We will email you", s: "todo" as const }] : []),
    ...(state === "approved" ? [{ t: "Reviewed", d: "18 Oct 2026", s: "done" as const }, { t: "Approved", d: "18 Oct 2026, 11:30", s: "done" as const }] : []),
    ...(state === "rejected" ? [{ t: "Not approved", d: "18 Oct 2026, 11:30", s: "bad" as const }] : []),
  ];
  return (
    <AuthShell aside="research" wide states={Object.keys(S).map((k) => ({ label: k, href: k === "pending" ? "/application-status" : `/application-status?state=${k}`, active: k === state }))}>
      <AuthCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-[30px] sm:text-[34px] font-semibold tracking-[-0.02em]">Application status</h1>
          <Pill tone={S[state].tone} className="h-8 px-3 text-sm">{S[state].pill}</Pill>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {[["Reference", "APP-2026-0318"], ["Role", "Research Writer"], ["Submitted", "16 Oct 2026, 14:05 PKT"], ["Email", "sara.haider@qau.edu.pk"]].map(([a, b]) => (
            <div key={a} className="rounded-2xl bg-canvas p-4 min-w-0"><dt className="text-[13px] text-ink-500">{a}</dt><dd className="mt-0.5 font-semibold text-[15px] break-words">{b}</dd></div>
          ))}
        </dl>
        <ol className="mt-8 relative">
          {steps.map((s, i) => (
            <li key={s.t} className="relative flex gap-4 pb-6 last:pb-0">
              {i < steps.length - 1 && <span className={clsx("absolute left-[19px] top-10 bottom-0 w-0.5", s.s === "done" ? "bg-brand-600" : "bg-line")} aria-hidden />}
              <span className={clsx("relative z-10 size-10 shrink-0 rounded-full grid place-items-center", { done: "bg-brand-700 text-white", now: "bg-mint-100 text-brand-800 ring-4 ring-mint-100/60", todo: "bg-white ring-1 ring-line-strong text-ink-400", bad: "bg-danger-50 text-danger-700" }[s.s])}>
                {s.s === "done" ? <Check className="size-5" strokeWidth={2.5} /> : s.s === "bad" ? <CircleX className="size-5" /> : s.s === "now" ? <Clock className="size-5" /> : <span className="size-2 rounded-full bg-ink-300" />}
              </span>
              <div className="pt-1.5"><p className="font-semibold">{s.t}</p><p className="text-sm text-ink-500">{s.d}</p></div>
            </li>
          ))}
        </ol>

        {state === "info" && (
          <div className="mt-8 pt-8 border-t border-line">
            <div className="rounded-2xl bg-attn-50 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-attn-700"><MessageSquareText className="size-4" />Message from Pakistan Strategic Forum</p>
              <p className="mt-2 text-[16px] text-ink-800 leading-relaxed">&ldquo;Please upload your student ID card or a letter from your department confirming enrolment.&rdquo;</p>
            </div>
            <ProtoForm className="mt-6 space-y-5" success={{ title: "Response sent", body: "Thank you. Our team will continue reviewing your application and email you with a decision." }}>
              <Field label="Your reply" required htmlFor="as-reply"><TextArea id="as-reply" rows={4} required /></Field>
              <Field label="Attachment"><FileDrop label="Drop file here or browse" hint="JPG, PNG or PDF, up to 5 MB" accept=".jpg,.jpeg,.png,.pdf" /></Field>
              <button className={btn("primary", "lg", "rounded-full w-full sm:w-auto")}><Send className="size-4" />Send response</button>
            </ProtoForm>
          </div>
        )}
        {state === "approved" && (
          <div className="mt-8 rounded-2xl bg-mint-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <CircleCheck className="size-8 text-brand-700 shrink-0" />
            <p className="flex-1 text-[16px] text-brand-900">Welcome to Pakistan Strategic Forum. You can now sign in and submit research.</p>
            <Link href="/sign-in?state=ready" className={btn("primary", "md", "rounded-full")}><LogIn className="size-4" />Sign in</Link>
          </div>
        )}
        {state === "rejected" && (
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-danger-50 p-5"><p className="text-sm font-semibold text-danger-700">Reason</p><p className="mt-1 text-[16px] text-ink-800">We could not verify your enrolment at the institution listed.</p></div>
            <p className="text-[15px] text-ink-600">You can submit a new application from 18 Jan 2027. <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-2">Contact us</Link> if you think this is a mistake.</p>
          </div>
        )}
      </AuthCard>
    </AuthShell>
  );
}
