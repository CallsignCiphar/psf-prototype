import Link from "next/link";
import type { Metadata } from "next";
import { Send } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { RolePicker } from "@/components/dash/RolePicker";
import { CountedArea, NavForm } from "@/components/auth/widgets";
import { Field, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Apply for another role" };

export default function ApplyRole() {
  return (
    <DashShell kind="portal" active="account" title="Apply for a role">
      <PageHead crumbs={[{ label: "Account", href: "/portal/account" }, { label: "Apply for a role" }]} title="Apply for another role" desc="Editors review role applications within 3 to 5 working days. Your current roles are not affected." />
      <NavForm to="/application-status" className="max-w-3xl space-y-5">
        <RolePicker />
        <section className="bg-white rounded-[24px] shadow-soft p-5 sm:p-7 space-y-5">
          <h2 className="font-semibold text-[17px]">Research Writer details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Institution / University" required htmlFor="ar-inst" hint="From your profile"><TextInput id="ar-inst" readOnly value="Quaid-i-Azam University" /></Field>
            <Field label="Designation" required htmlFor="ar-des" hint="From your profile"><TextInput id="ar-des" readOnly value="MPhil candidate" /></Field>
            <Field label="Programme / Degree" required htmlFor="ar-prog"><TextInput id="ar-prog" required /></Field>
            <Field label="ORCID iD" htmlFor="ar-orcid"><TextInput id="ar-orcid" /></Field>
          </div>
          <CountedArea id="ar-int" label="Research interests" required min={50} max={1000} rows={4} />
          <CountedArea id="ar-why" label="Why do you want this role?" required min={50} max={1000} rows={4} />
          <Field label="Previous publications" hint="Citations or links, up to 2000 characters" htmlFor="ar-pub"><TextArea id="ar-pub" rows={4} maxLength={2000} /></Field>
        </section>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2"><Link href="/portal/account" className={btn("ghost", "lg", "rounded-full")}>Cancel</Link><button className={btn("primary", "lg", "rounded-full")}><Send className="size-4" />Submit application</button></div>
      </NavForm>
    </DashShell>
  );
}
