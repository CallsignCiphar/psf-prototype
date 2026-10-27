import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, IconBadge, Stepper } from "@/components/auth/AuthShell";
import { Countdown, NavForm, OtpInput } from "@/components/auth/widgets";
import { trackOf } from "@/components/auth/trackHelpers";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Verify your email" };

export default async function VerifyEmail({ searchParams }: { searchParams: Promise<{ track?: string; error?: string }> }) {
  const sp = await searchParams;
  const t = trackOf(sp.track);
  const err = sp.error === "true";
  return (
    <AuthShell aside={t === "research" ? "research" : "join"} states={[{ label: "default", href: `/join/verify-email?track=${t}`, active: !err }, { label: "wrong code", href: `/join/verify-email?track=${t}&error=true`, active: err }]}>
      <Stepper current={1} />
      <AuthCard>
        <AuthTitle icon={<IconBadge icon={MailCheck} tone="mint" />} title="Check your email" desc={<>We sent a 6-digit code to <span className="font-semibold text-ink-900">s***@qau.edu.pk</span>. It expires in 10 minutes.</>} />
        <NavForm to={`/join/profile?track=${t}`} className="space-y-4">
          <OtpInput invalid={err} autoFocus />
          {err && <p role="alert" className="text-[14px] text-danger-700 font-medium">That code is not correct. 3 attempts left.</p>}
          <div className="flex items-center justify-between text-[15px]"><Countdown /><Link href={`/join/details?track=${t}`} className="font-semibold text-brand-700 hover:underline">Use a different email</Link></div>
          <button className={btn("primary", "lg", "w-full rounded-full mt-2")}>Verify email</button>
        </NavForm>
        <p className="mt-6 text-sm text-ink-500">Can't find it? Check your spam or promotions folder.</p>
      </AuthCard>
    </AuthShell>
  );
}
