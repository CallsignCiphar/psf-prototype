import type { Metadata } from "next";
import { Save } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Initials, PageHead, Tag } from "@/components/dash/kit";
import { ActionButton, Switch } from "@/components/dash/interactive";
import { SignInSecurity } from "@/components/dash/Security";
import { Field, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "My account" };

export default function AdminAccount() {
  return (
    <DashShell kind="admin" active="" title="My account">
      <PageHead title="My account" desc="usman.tariq@psf.org.pk" actions={<><button className={btn("ghost", "md", "rounded-full")}>Discard</button><ActionButton msg="Changes saved" className={btn("primary", "md", "rounded-full")}><Save className="size-4" />Save changes</ActionButton></>} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Profile"><div className="flex items-center gap-4 mb-5"><Initials i="UT" size={64} tone="brand" /><button className={btn("secondary", "sm", "rounded-full")}>Change photo</button></div><div className="grid sm:grid-cols-2 gap-5"><Field label="Name" required htmlFor="ac-n"><TextInput id="ac-n" defaultValue="Usman Tariq" /></Field><Field label="Job title" htmlFor="ac-t"><TextInput id="ac-t" defaultValue="Managing Editor" /></Field></div></Card>
          <SignInSecurity email="usman.tariq@psf.org.pk" changed="1 Sep 2026" twofa="Authenticator app · required for your role" sessions={[["Chrome on macOS", "Islamabad, PK", "Active now", true], ["Safari on iPhone", "Islamabad, PK", "Today, 07:58"]]} />
        </div>
        <aside className="space-y-5 min-w-0">
          <Card title="Dashboard notifications"><ul className="divide-y divide-line">{[["New applications", "Daily digest at 09:00", true], ["Overdue reviews", "", true], ["Featured slot expiries", "", true], ["Inbox messages", "Only those assigned to me", true]].map(([t, d, on]) => <li key={t as string} className="flex items-center justify-between gap-4 py-3.5"><div><p className="font-semibold text-[14.5px]">{t as string}</p>{d && <p className="text-[13px] text-ink-500">{d as string}</p>}</div><Switch on={on as boolean} label={t as string} /></li>)}</ul></Card>
          <Card title="Role"><Tag tone="dark">Super Admin</Tag><p className="mt-2 text-[13.5px] text-ink-500">Roles are changed by another Super Admin.</p></Card>
        </aside>
      </div>
    </DashShell>
  );
}
