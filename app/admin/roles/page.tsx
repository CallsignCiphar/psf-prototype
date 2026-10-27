import Link from "next/link";
import type { Metadata } from "next";
import { Lock, Plus } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Status } from "@/components/dash/kit";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Roles and permissions" };
const ROLES = [["Super Admin", "Everything, including Settings and Roles", 2, "System"], ["Admin", "All modules except Settings and Roles", 3, "System"], ["Editor", "Review and publish articles, reports and newsroom", 4, "System"], ["Research Editor", "Handle research papers and assign reviewers", 2, "Custom"], ["Ad Manager", "Campaigns, slot calendar and Advertise inbox", 1, "Custom"], ["Approver", "Portal role: peer review", 18, "System"], ["Expert", "Portal role: listed expert", 7, "System"], ["Research Writer", "Portal role", 61, "System"], ["Article Writer", "Portal role", 142, "System"]] as const;

export default function Roles() {
  return (
    <DashShell kind="admin" active="roles" title="Roles and permissions">
      <PageHead title="Roles and permissions" desc="System roles can be viewed but not deleted" actions={<Link href="/admin/roles/new" className={btn("primary", "md", "rounded-full")}><Plus className="size-4" />Create role</Link>} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {ROLES.map(([n, d, u, t]) => (
          <Link key={n} href={`/admin/roles/${n.toLowerCase().replace(/ /g, "-")}`} className="group bg-white rounded-[22px] shadow-soft p-5 hover:shadow-lift hover:-translate-y-0.5 transition flex flex-col">
            <div className="flex items-start justify-between gap-3"><p className="font-semibold text-[17px]">{n}</p><Status s={t} /></div>
            <p className="mt-1 text-[14px] text-ink-600 flex-1">{d}</p>
            <div className="mt-5 flex items-center justify-between text-[13px]"><span className="text-ink-500"><span className="font-semibold text-ink-900 tabular-nums">{u}</span> users</span><span className="font-semibold text-brand-700 inline-flex items-center gap-1">{t === "System" ? <><Lock className="size-3.5" />View</> : "Edit"}</span></div>
          </Link>
        ))}
      </div>
    </DashShell>
  );
}
