import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CircleCheck, Clock, Home, Mail, SearchCheck } from "lucide-react";
import { AuthCard, AuthShell, Stepper } from "@/components/auth/AuthShell";
import { trackOf } from "@/components/auth/trackHelpers";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Application submitted" };

export default async function Submitted({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  const t = trackOf((await searchParams).track);
  const [name, email] = t === "article" ? ["Bilal", "bilal.ahmed@example.com"] : ["Sara", "sara.haider@qau.edu.pk"];
  return (
    <AuthShell aside={t === "research" ? "research" : "join"}>
      <Stepper current={3} />
      <AuthCard className="text-center">
        <span className="mx-auto size-20 rounded-full bg-mint-100 text-brand-700 grid place-items-center ring-8 ring-mint-100/50"><CircleCheck className="size-10" /></span>
        <h1 className="mt-6 font-serif text-[32px] font-semibold">Application submitted!</h1>
        <p className="mt-3 text-[16px] text-ink-600 leading-relaxed">Thank you, {name}. Our team will review your application and email you at <span className="font-semibold text-ink-900 break-all">{email}</span> once a decision is made.</p>
        <ol className="mt-8 text-left space-y-3">
          {[[Mail, "Application submitted", "Reference APP-2026-0318"], [SearchCheck, "Under review", "This usually takes 3 to 5 working days"], [Clock, "Decision", "We will email you"]].map(([I, a, b], i) => { const Icon = I as typeof Mail; return (
            <li key={a as string} className="flex items-center gap-3 rounded-2xl bg-canvas p-3.5"><span className={`size-10 rounded-xl grid place-items-center ${i === 0 ? "bg-brand-800 text-white" : "bg-white text-ink-500"}`}><Icon className="size-5" /></span><span><span className="block font-semibold text-[15px]">{a as string}</span><span className="block text-sm text-ink-500">{b as string}</span></span></li>
          ); })}
        </ol>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <Link href="/" className={btn("secondary", "lg", "rounded-full")}><Home className="size-4" />Back to home</Link>
          <Link href="/application-status" className={btn("primary", "lg", "rounded-full")}>View application status<ArrowRight className="size-4" /></Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
