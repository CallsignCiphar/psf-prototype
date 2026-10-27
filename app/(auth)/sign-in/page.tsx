import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, LogIn } from "lucide-react";
import { Alert, AuthCard, AuthShell, AuthTitle, Turnstile } from "@/components/auth/AuthShell";
import { NavForm } from "@/components/auth/widgets";
import { Check, Field, PasswordInput, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Sign in" };
const STATES = ["default", "error", "locked", "invited", "deactivated", "unavailable", "ready"] as const;

export default async function SignIn({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state = "default" } = await searchParams;
  const turnstile = state === "error" || state === "locked";
  return (
    <AuthShell aside="signin" states={STATES.map((s) => ({ label: s, href: s === "default" ? "/sign-in" : `/sign-in?state=${s}`, active: s === state }))}>
      <AuthCard>
        <AuthTitle title="Sign in" desc="Use the email you registered with Pakistan Strategic Forum." />
        {state === "error" && <Alert tone="danger">Email or password is incorrect.</Alert>}
        {state === "locked" && <Alert tone="attn">Too many attempts. Sign-in is locked for 15 minutes. We have emailed you.</Alert>}
        {state === "invited" && <Alert tone="info" action={<button type="button">Resend link</button>}>Check your email for your invitation link.</Alert>}
        {state === "deactivated" && <Alert tone="danger" action={<Link href="/contact">Contact us</Link>}>Your account has been deactivated. Contact Pakistan Strategic Forum if you think this is a mistake.</Alert>}
        {state === "unavailable" && <Alert tone="danger">This account is not available.</Alert>}
        {state === "ready" && <Alert tone="success">Your account is ready. Please sign in.</Alert>}
        <NavForm to="/sign-in/two-factor" className="space-y-5">
          <Field label="Email" htmlFor="si-em"><TextInput id="si-em" type="email" autoComplete="email" required defaultValue={state === "default" ? "" : "sara.haider@qau.edu.pk"} invalid={state === "error"} /></Field>
          <Field label="Password" htmlFor="si-pw"><PasswordInput id="si-pw" autoComplete="current-password" required /></Field>
          <div className="flex items-center justify-between gap-3">
            <Check defaultChecked>Keep me signed in</Check>
            <Link href="/forgot-password" className="text-[15px] font-semibold text-brand-700 hover:underline shrink-0">Forgot password?</Link>
          </div>
          {turnstile && <Turnstile />}
          <button disabled={state === "locked"} className={btn("primary", "lg", "w-full rounded-full h-13")}><LogIn className="size-5" />Sign in</button>
        </NavForm>
      </AuthCard>
      <Link href="/join" className="mt-5 flex items-center justify-between gap-3 rounded-[22px] bg-mint-100 px-5 py-4 group">
        <span><span className="block text-sm text-ink-600">New to Pakistan Strategic Forum?</span><span className="block font-semibold text-brand-800">Write for us</span></span>
        <span className="size-10 rounded-full bg-white text-brand-800 grid place-items-center shadow-soft transition group-hover:translate-x-0.5"><ArrowRight className="size-5" /></span>
      </Link>
    </AuthShell>
  );
}
