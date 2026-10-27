import Link from "next/link";
import type { Metadata } from "next";
import { Download, UserPlus } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Person, Status, Tag } from "@/components/dash/kit";
import { ActionButton, DataList } from "@/components/dash/interactive";
import { USERS } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Users" };

export default function Users() {
  return (
    <DashShell kind="admin" active="users" title="Users">
      <PageHead title="Users" desc="Writers, approvers, experts and staff" actions={<><ActionButton msg="Export started" className={btn("secondary", "md", "rounded-full")}><Download className="size-4" />Export</ActionButton><Link href="/admin/users/invite" className={btn("primary", "md", "rounded-full")}><UserPlus className="size-4" />Invite user</Link></>} />
      <DataList noun="users" total={248} selectable bulk={["Change role", "Send email", "Deactivate"]} search="Search name or email" sorts={["Last active", "Joined", "Name"]}
        tabs={[["All", 248], ["Article Writers", 142], ["Research Writers", 61], ["Approvers", 18], ["Staff and admins", 9], ["Invited", 4], ["Deactivated", 11], ["Banned", 3]]}
        selects={[{ key: "role", label: "Role", options: ["Article Writer", "Research Writer", "Approver", "Expert", "Editor"] }, { key: "status", label: "Status", options: ["Active", "Invited", "Deactivated", "Banned"] }, { key: "joined", label: "Joined", options: ["Last 30 days", "Last 12 months", "Over a year ago"] }]}
        cols={[{ key: "u", label: "User" }, { key: "roles", label: "Roles" }, { key: "status", label: "Status" }, { key: "joined", label: "Joined" }, { key: "last", label: "Last active" }, { key: "items", label: "Items", align: "right" }]}
        mobile={{ title: "u", meta: ["status", "roles"], end: "items" }}
        rows={USERS.map((u) => ({
          id: u.slug, href: `/admin/users/${u.slug}`, text: u.name + u.email, f: { role: u.roles[0], status: u.status },
          tabs: [...u.roles.map((r) => (r === "Editor" ? "Staff and admins" : `${r}s`)), u.status],
          cells: { u: <Person i={u.i} name={u.name} sub={u.email} />, roles: <span className="flex flex-wrap gap-1">{u.roles.map((r) => <Tag key={r} tone={r === "Editor" ? "dark" : "grey"}>{r}</Tag>)}</span>, status: <Status s={u.status} />, joined: <span className="text-ink-600 whitespace-nowrap">{u.joined}</span>, last: <span className="text-ink-600 whitespace-nowrap">{u.last}</span>, items: <span className="font-semibold tabular-nums">{u.items}</span> },
        }))} />
    </DashShell>
  );
}
