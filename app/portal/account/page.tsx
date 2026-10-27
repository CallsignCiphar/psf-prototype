import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, UserX } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead } from "@/components/dash/kit";
import { Dialog, Switch } from "@/components/dash/interactive";
import { SignInSecurity } from "@/components/dash/Security";
import { Field, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Account" };

export default function Account() {
  return (
    <DashShell kind="portal" active="account" title="Account">
      <PageHead title="Account" desc="Signed in as sara.haider@qau.edu.pk" />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <SignInSecurity email="sara.haider@qau.edu.pk" changed="12 Aug 2026" twofa="Authenticator app · 8 of 10 backup codes left. Required for Approvers." sessions={[["Chrome on Windows", "Islamabad, PK", "Active now", true], ["Safari on iPhone", "Rawalpindi, PK", "15 Oct 2026, 22:14"], ["Firefox on macOS", "Lahore, PK", "2 Oct 2026, 09:41"]]} />
          <div id="email" className="scroll-mt-24"><Card title="Email notifications" desc="Security emails are always sent">
            <ul className="divide-y divide-line">
              {[["Submission decisions", "Approved, changes requested or rejected", true], ["Review invitations and reminders", "Approvers only", true], ["Comments from editors", "", true], ["Co-author invitations", "", true], ["Monthly reads summary", "First Monday of each month", false]].map(([t, d, on]) => (
                <li key={t as string} className="flex items-center justify-between gap-4 py-3.5"><div><p className="font-semibold text-[14.5px]">{t as string}</p>{d && <p className="text-[13px] text-ink-500">{d as string}</p>}</div><Switch on={on as boolean} label={t as string} /></li>
              ))}
            </ul>
          </Card></div>
        </div>
        <aside className="space-y-5 min-w-0">
          <Card title="Your roles">
            <div className="flex flex-wrap gap-2">{["Article Writer", "Research Writer", "Approver"].map((r) => <span key={r} className="h-8 px-3 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold grid place-items-center">{r}</span>)}</div>
            <div className="mt-5 rounded-2xl bg-canvas p-4"><p className="font-semibold">Want to contribute in another way?</p><Link href="/portal/apply-role" className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700">Apply for another role<ArrowRight className="size-4" /></Link></div>
          </Card>
          <section className="rounded-[22px] bg-white shadow-soft p-5 sm:p-6 ring-1 ring-danger-50">
            <h2 className="font-semibold text-[16.5px] text-danger-700">Deactivate account</h2>
            <p className="mt-1.5 text-[14px] text-ink-600">Your author page and published work stay online. You will not be able to sign in or submit until Pakistan Strategic Forum reactivates your account.</p>
            <Dialog triggerClass={btn("danger", "md", "mt-4 rounded-full")} trigger={<><UserX className="size-4" />Deactivate my account</>} title="Deactivate your account?" desc="Your published work stays online under your name. You will be signed out and cannot sign in until Pakistan Strategic Forum reactivates you." confirm={{ label: "Deactivate account", tone: "danger" }} href="/sign-in?state=deactivated">
              <Field label="Type DEACTIVATE to confirm" required htmlFor="m-da"><TextInput id="m-da" required pattern="DEACTIVATE" autoComplete="off" /></Field>
            </Dialog>
          </section>
        </aside>
      </div>
    </DashShell>
  );
}
