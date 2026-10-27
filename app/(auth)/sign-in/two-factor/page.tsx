import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, KeyRound, Smartphone } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, IconBadge } from "@/components/auth/AuthShell";
import { NavForm, OtpInput } from "@/components/auth/widgets";
import { Field, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Two-factor check" };

export default async function TwoFactor({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode = "totp" } = await searchParams;
  const backup = mode === "backup";
  return (
    <AuthShell aside="signin" states={[{ label: "authenticator", href: "/sign-in/two-factor", active: !backup }, { label: "backup code", href: "/sign-in/two-factor?mode=backup", active: backup }]}>
      <AuthCard>
        <AuthTitle icon={<IconBadge icon={backup ? KeyRound : Smartphone} />} title="Enter your code"
          desc={backup ? "Enter one of the backup codes you saved when you set up two-factor authentication." : "Open your authenticator app and enter the 6-digit code for Pakistan Strategic Forum."} />
        <NavForm to="/portal" className="space-y-6">
          {backup ? (
            <Field label="Backup code" htmlFor="tf-b" hint="Each backup code works once."><TextInput id="tf-b" placeholder="xxxx-xxxx" required autoComplete="one-time-code" className="h-14 text-lg tracking-[0.2em] font-semibold text-center uppercase" /></Field>
          ) : <OtpInput label="Authenticator code" autoFocus />}
          <button className={btn("primary", "lg", "w-full rounded-full")}>Verify</button>
        </NavForm>
        <div className="mt-6 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[15px]">
          <Link href={backup ? "/sign-in/two-factor" : "/sign-in/two-factor?mode=backup"} className="font-semibold text-brand-700 hover:underline inline-flex items-center gap-2">{backup ? <Smartphone className="size-4" /> : <KeyRound className="size-4" />}{backup ? "Use your authenticator app" : "Use a backup code instead"}</Link>
          <Link href="/sign-in" className="text-ink-600 hover:text-ink-900 inline-flex items-center gap-1.5"><ArrowLeft className="size-4" />Back to sign in</Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
