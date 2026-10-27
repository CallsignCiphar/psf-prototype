import Link from "next/link";
import type { Metadata } from "next";
import { Send } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { NavForm } from "@/components/auth/widgets";
import { InviteRole } from "@/components/dash/InviteRole";
import { Field, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Invite user" };

export default function Invite() {
  return (
    <DashShell kind="admin" active="users" title="Invite user">
      <PageHead crumbs={[{ label: "Users", href: "/admin/users" }, { label: "Invite user" }]} title="Invite user" desc="Invited users set their own password. Writers apply through the public signup instead." />
      <NavForm to="/admin/users?status=Invited" className="max-w-3xl bg-white rounded-[28px] shadow-soft p-5 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" required htmlFor="cu-name"><TextInput id="cu-name" required /></Field>
          <Field label="Email" required htmlFor="cu-em" hint="The invitation goes here. It expires after 72 hours."><TextInput id="cu-em" type="email" required /></Field>
        </div>
        <InviteRole />
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Designation" htmlFor="cu-des"><TextInput id="cu-des" /></Field>
          <Field label="Institution" htmlFor="cu-inst"><TextInput id="cu-inst" /></Field>
        </div>
        <Field label="Personal message" hint="Optional. Added to the invitation email." htmlFor="cu-msg"><TextArea id="cu-msg" rows={4} /></Field>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2 border-t border-line"><Link href="/admin/users" className={btn("ghost", "lg", "rounded-full")}>Cancel</Link><button className={btn("primary", "lg", "rounded-full")}><Send className="size-4" />Send invitation</button></div>
      </NavForm>
    </DashShell>
  );
}
