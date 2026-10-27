import Link from "next/link";
import type { Metadata } from "next";
import { BadgeCheck, IdCard, MailCheck } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Person, Tag } from "@/components/dash/kit";
import { DataList } from "@/components/dash/interactive";
import { APPLICATIONS } from "@/components/dash/data";

export const metadata: Metadata = { title: "Pending applications" };

export default function Applications() {
  return (
    <DashShell kind="admin" active="users" title="Applications">
      <PageHead crumbs={[{ label: "Users", href: "/admin/users" }, { label: "Pending applications" }]} title="Pending applications" desc="Target: decide within 5 working days" />
      <DataList noun="applications" pages={1} search="Search applicants" sorts={["Oldest first", "Newest first"]}
        tabs={[["Pending", 6], ["More info requested", 1], ["Approved", 212], ["Rejected", 37], ["Permanently rejected", 4]]}
        selects={[{ key: "role", label: "Role", options: ["Article Writer", "Research Writer"] }]}
        cols={[{ key: "a", label: "Applicant" }, { key: "role", label: "Role" }, { key: "inst", label: "Institution" }, { key: "sub", label: "Submitted" }, { key: "wait", label: "Waiting" }, { key: "ver", label: "Verification" }, { key: "act", label: "", className: "text-right" }]}
        mobile={{ title: "a", meta: ["role", "wait", "ver"], end: "act" }}
        rows={APPLICATIONS.map((a, i) => ({
          id: a.email, href: "/admin/applications/APP-2026-0318", text: a.name + a.email + a.inst, f: { role: a.role }, tabs: ["Pending"],
          cells: {
            a: <Person i={a.i} name={a.name} sub={a.email} />, role: <Tag>{a.role}</Tag>, inst: <span className="text-ink-600">{a.inst}</span>, sub: <span className="text-ink-600 whitespace-nowrap">{a.sub}</span>,
            wait: <span className={i === 0 ? "font-semibold text-attn-700 whitespace-nowrap" : "text-ink-600 whitespace-nowrap"}>{a.wait}</span>,
            ver: <span className="flex gap-1"><span title="Email verified" className="size-7 rounded-lg bg-mint-100 text-brand-800 grid place-items-center"><MailCheck className="size-4" /></span><span title={a.role === "Research Writer" ? "ID card uploaded" : "No ID card"} className={a.role === "Research Writer" ? "size-7 rounded-lg bg-mint-100 text-brand-800 grid place-items-center" : "size-7 rounded-lg bg-canvas text-ink-300 grid place-items-center"}><IdCard className="size-4" /></span></span>,
            act: <Link href="/admin/applications/APP-2026-0318" className="h-9 px-4 rounded-full bg-brand-800 text-white text-[13px] font-semibold inline-flex items-center gap-1.5 hover:bg-brand-700"><BadgeCheck className="size-4" />Review</Link>,
          },
        }))} />
    </DashShell>
  );
}
