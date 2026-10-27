import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, KeyRound, MailCheck } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, IconBadge, Turnstile } from "@/components/auth/AuthShell";
import { NavForm } from "@/components/auth/widgets";
import { Field, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Reset your password" };

export default async function Forgot({ searchParams }: { searchParams: Promise<{ sent?: string }> }) {
  const sent = (await searchParams).sent === "true";
  return (
    <AuthShell states={[{ label: "form", href: "/forgot-password", active: !sent }, { label: "sent", href: "/forgot-password?sent=true", active: sent }]}>
      <AuthCard>
        {sent ? (
          <AuthTitle icon={<IconBadge icon={MailCheck} tone="mint" />} title="Check your email" desc="If an account exists for that email, we've sent a reset link. It's valid for 60 minutes." />
        ) : (
          <>
            <AuthTitle icon={<IconBadge icon={KeyRound} />} title="Reset your password" desc="Enter the email you use for Pakistan Strategic Forum and we'll send you a link to reset your password." />
            <NavForm to="/forgot-password?sent=true" className="space-y-5">
              <Field label="Email" htmlFor="fp-em"><TextInput id="fp-em" type="email" required autoComplete="email" /></Field>
              <Turnstile />
              <button className={btn("primary", "lg", "w-full rounded-full")}>Send reset link</button>
            </NavForm>
          </>
        )}
        <Link href="/sign-in" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 hover:underline"><ArrowLeft className="size-4" />Back to sign in</Link>
        {sent && <p className="mt-4 text-sm text-ink-500">Prototype: <Link href="/reset-password" className="underline">open the reset link</Link></p>}
      </AuthCard>
    </AuthShell>
  );
}
