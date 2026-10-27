import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, Stepper, Turnstile } from "@/components/auth/AuthShell";
import { AvatarUpload, ExpertisePicker, NavForm, NewPassword } from "@/components/auth/widgets";
import { TRACK_LABEL, trackOf, trackStates } from "@/components/auth/trackHelpers";
import { Check, Field, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Create your account" };

export default async function Details({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  const t = trackOf((await searchParams).track);
  return (
    <AuthShell aside={t === "research" ? "research" : "join"} wide states={trackStates("/join/details", t)}>
      <Stepper current={0} />
      <AuthCard>
        <AuthTitle eyebrow={TRACK_LABEL[t]} title="Create your account" desc="This takes about three minutes. Fields marked * are required." />
        <NavForm to={`/join/verify-email?track=${t}`} className="space-y-8">
          <fieldset className="space-y-5">
            <legend className="text-[13px] font-semibold uppercase tracking-wider text-ink-500 mb-4">Your details</legend>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="First name" required htmlFor="s-fn"><TextInput id="s-fn" required autoComplete="given-name" /></Field>
              <Field label="Last name" required htmlFor="s-ln"><TextInput id="s-ln" required autoComplete="family-name" /></Field>
            </div>
            <Field label="Email" required htmlFor="s-em" hint="We will send a 6-digit code to verify it."><TextInput id="s-em" type="email" required autoComplete="email" /></Field>
            <div className="grid sm:grid-cols-2 gap-5 items-start"><NewPassword idPrefix="s" /></div>
          </fieldset>
          <fieldset className="space-y-5 pt-6 border-t border-line">
            <legend className="text-[13px] font-semibold uppercase tracking-wider text-ink-500 mb-4">Your work</legend>
            <ExpertisePicker />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Institution / University" htmlFor="s-inst"><TextInput id="s-inst" /></Field>
              <Field label="Designation" required htmlFor="s-des"><TextInput id="s-des" required placeholder="For example, Lecturer" /></Field>
            </div>
            <AvatarUpload />
          </fieldset>
          <div className="space-y-5 pt-6 border-t border-line">
            <Check required>I agree to the <Link href="/policies/terms" className="font-semibold text-brand-700 underline underline-offset-2">Terms of Use</Link>, <Link href="/policies/privacy" className="font-semibold text-brand-700 underline underline-offset-2">Privacy Policy</Link> and <Link href="/policies/contributor-agreement" className="font-semibold text-brand-700 underline underline-offset-2">Contributor Agreement</Link>.</Check>
            <Turnstile />
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <Link href="/join" className={btn("ghost", "lg", "rounded-full")}><ArrowLeft className="size-4" />Back to choose a track</Link>
              <button className={btn("primary", "lg", "rounded-full sm:px-8")}>Continue<ArrowRight className="size-4" /></button>
            </div>
          </div>
        </NavForm>
      </AuthCard>
    </AuthShell>
  );
}
