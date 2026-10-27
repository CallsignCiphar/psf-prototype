import Link from "next/link";
import type { Metadata } from "next";
import { Save, Trash2, UserPlus, X } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead, Person, Status } from "@/components/dash/kit";
import { ActionButton, Dialog } from "@/components/dash/interactive";
import { PermMatrix } from "@/components/dash/PermMatrix";
import { Field, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Role editor" };

export default async function RoleEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  const name = isNew ? "New role" : slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  const system = !isNew && !["research-editor", "ad-manager"].includes(slug);
  return (
    <DashShell kind="admin" active="roles" title="Role editor">
      <PageHead crumbs={[{ label: "Roles and permissions", href: "/admin/roles" }, { label: name }]} title={name} badge={<Status s={system ? "System" : "Custom"} />} desc={isNew ? "Choose what this role can do" : `${system ? "System" : "Custom"} role · 2 users · last changed 3 Oct 2026 by Usman Tariq`} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Role details"><div className="grid sm:grid-cols-2 gap-5"><Field label="Role name" required htmlFor="ro-n"><TextInput id="ro-n" defaultValue={isNew ? "" : name} readOnly={system} /></Field><Field label="Description" htmlFor="ro-d"><TextInput id="ro-d" defaultValue={isNew ? "" : "Handle research papers and assign reviewers"} readOnly={system} /></Field></div></Card>
          <Card title="Permissions"><PermMatrix locked={system} /></Card>
        </div>
        <aside className="space-y-5 min-w-0">
          <Card title="Assigned users" action={<Dialog triggerClass="text-sm font-semibold text-brand-700 inline-flex items-center gap-1" trigger={<><UserPlus className="size-4" />Assign</>} title="Assign users" confirm={{ label: "Assign", toast: "Users assigned" }}><Field label="Search staff" htmlFor="m-as"><TextInput id="m-as" placeholder="Name or email" /></Field></Dialog>}>
            <ul className="space-y-3">{[["FQ", "Dr Faisal Qureshi", "f.qureshi@psf.org.pk"], ["HS", "Hina Shah", "hina.shah@psf.org.pk"]].map(([i, n, e]) => <li key={n} className="flex items-center gap-2"><span className="flex-1 min-w-0"><Person i={i} name={n} sub={e} /></span>{!system && <button type="button" aria-label={`Remove ${n}`} className="size-8 grid place-items-center rounded-lg hover:bg-canvas"><X className="size-4" /></button>}</li>)}</ul>
          </Card>
          {!system && (
            <div className="flex flex-col gap-2">
              <ActionButton msg="Role saved and logged" href="/admin/roles" className={btn("primary", "lg", "rounded-full")}><Save className="size-4" />Save role</ActionButton>
              <Link href="/admin/roles" className={btn("ghost", "lg", "rounded-full")}>Cancel</Link>
              {!isNew && <Dialog triggerClass="h-12 rounded-full text-danger-700 font-semibold inline-flex items-center justify-center gap-2 hover:bg-danger-50" trigger={<><Trash2 className="size-4" />Delete role</>} title={`Delete ${name}?`} desc="The 2 users with this role lose its permissions straight away." confirm={{ label: "Delete role", tone: "danger", toast: "Role deleted" }} href="/admin/roles" />}
            </div>
          )}
        </aside>
      </div>
    </DashShell>
  );
}
