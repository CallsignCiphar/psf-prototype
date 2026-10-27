import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Copy, Download, ShieldCheck } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, IconBadge } from "@/components/auth/AuthShell";
import { NavForm, NewPassword, OtpInput } from "@/components/auth/widgets";
import { Check } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Set up your account" };
const CODES = ["7GQK-2M4P", "Z9XR-81TD", "4HNC-6WBA", "P3VE-0LQS", "K8DF-5JRM", "T2YU-9ZXC", "B6QW-3NHE", "R1PL-7GKV", "M5SA-4TOD", "E9CJ-2RYF"];

function QR() {
  const cells = Array.from({ length: 21 * 21 }, (_, i) => { const x = i % 21, y = Math.floor(i / 21); const finder = (a: number, b: number) => x >= a && x < a + 7 && y >= b && y < b + 7 && (x === a || x === a + 6 || y === b || y === b + 6 || (x >= a + 2 && x <= a + 4 && y >= b + 2 && y <= b + 4)); if (finder(0, 0) || finder(14, 0) || finder(0, 14)) return true; if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) return false; return ((x * 7 + y * 13 + x * y) % 5) < 2; });
  return <svg viewBox="0 0 21 21" className="size-40 rounded-2xl bg-white p-3 ring-1 ring-line" role="img" aria-label="QR code for your authenticator app" shapeRendering="crispEdges">{cells.map((c, i) => c && <rect key={i} x={i % 21} y={Math.floor(i / 21)} width="1" height="1" fill="#022c15" />)}</svg>;
}

export default async function SetPassword({ searchParams }: { searchParams: Promise<{ step?: string }> }) {
  const { step = "password" } = await searchParams;
  const states = ["password", "twofa", "expired"].map((s) => ({ label: s, href: s === "password" ? "/set-password" : `/set-password?step=${s}`, active: s === step }));
  if (step === "expired") return (
    <AuthShell states={states}>
      <AuthCard className="text-center">
        <div className="flex justify-center"><IconBadge icon={Clock} tone="attn" /></div>
        <h1 className="mt-6 font-serif text-[30px] font-semibold">This invitation link has expired.</h1>
        <p className="mt-3 text-ink-600">Invitation links are valid for 72 hours. Request a new one and we&apos;ll email it to you.</p>
        <Link href="/sign-in?state=invited" className={btn("primary", "lg", "mt-8 w-full rounded-full")}>Request a new link</Link>
      </AuthCard>
    </AuthShell>
  );
  if (step === "twofa") return (
    <AuthShell wide states={states}>
      <AuthCard>
        <AuthTitle eyebrow="Step 2 of 2 · Required for approvers" title="Set up two-factor authentication" desc="This keeps peer review and editorial decisions secure." />
        <NavForm to="/sign-in?state=ready" className="space-y-8">
          <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center rounded-3xl bg-canvas p-5">
            <QR />
            <div>
              <p className="font-semibold">1. Scan with an authenticator app</p>
              <p className="mt-1 text-sm text-ink-600">Or enter this key:</p>
              <p className="mt-2 inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white ring-1 ring-line font-mono font-semibold tracking-wider">JBSW Y3DP EHPK 3PXP<Copy className="size-4 text-ink-400" /></p>
            </div>
          </div>
          <div><p className="font-semibold mb-3">2. Enter the 6-digit code from the app</p><OtpInput label="Code from the app" /></div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3"><p className="font-semibold">3. Save your backup codes</p>
              <div className="flex gap-2"><button type="button" className={btn("secondary", "sm", "rounded-full")}><Download className="size-4" />Download</button><button type="button" className={btn("secondary", "sm", "rounded-full")}><Copy className="size-4" />Copy</button></div></div>
            <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2">{CODES.map((c) => <li key={c} className="h-11 rounded-xl bg-canvas grid place-items-center font-mono text-[14px] font-semibold tracking-wide">{c}</li>)}</ul>
          </div>
          <div className="space-y-5 pt-6 border-t border-line">
            <Check required>I&apos;ve saved these backup codes</Check>
            <button className={btn("primary", "lg", "w-full rounded-full")}><ShieldCheck className="size-5" />Finish setup</button>
          </div>
        </NavForm>
      </AuthCard>
    </AuthShell>
  );
  return (
    <AuthShell states={states}>
      <AuthCard>
        <AuthTitle eyebrow="Step 1 of 2" title="Set up your account" desc="You have been invited to join Pakistan Strategic Forum." />
        <dl className="rounded-2xl bg-canvas divide-y divide-line mb-7">
          {[["Name", "Dr Imran Siddiqui"], ["Email", "i.siddiqui@ndu.edu.pk"], ["Role", "Approver"]].map(([a, b]) => <div key={a} className="flex justify-between gap-4 px-4 py-3 text-[15px]"><dt className="text-ink-500">{a}</dt><dd className="font-semibold text-right break-all">{b}</dd></div>)}
        </dl>
        <NavForm to="/set-password?step=twofa" className="space-y-5">
          <NewPassword idPrefix="sp" />
          <Check required>I agree to the <Link href="/policies/terms" className="font-semibold text-brand-700 underline underline-offset-2">Terms of Use</Link>, <Link href="/policies/privacy" className="font-semibold text-brand-700 underline underline-offset-2">Privacy Policy</Link> and <Link href="/policies/contributor-agreement" className="font-semibold text-brand-700 underline underline-offset-2">Contributor Agreement</Link>.</Check>
          <button className={btn("primary", "lg", "w-full rounded-full")}>Set password and continue</button>
        </NavForm>
      </AuthCard>
    </AuthShell>
  );
}
