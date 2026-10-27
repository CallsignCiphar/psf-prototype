import Link from "next/link";
import type { Metadata } from "next";
import { EyeOff, Send } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Note, PageHead, Status } from "@/components/dash/kit";
import { DataList } from "@/components/dash/interactive";
import { MY_RESEARCH } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "My Research" };

export default function MyResearch() {
  return (
    <DashShell kind="portal" active="research" title="My Research">
      <PageHead title="My Research" desc="5 submissions" actions={<Link href="/portal/research/new" className={btn("primary", "md", "rounded-full")}><Send className="size-4" />New submission</Link>} />
      <DataList noun="submissions" pages={1} search="Search by title or ID" sorts={["Last updated", "Stage"]}
        tabs={[["All", 5], ["Drafts", 1], ["In progress", 2], ["Published", 2], ["Rejected", 0], ["Withdrawn", 0]]}
        selects={[{ key: "cat", label: "Category", options: ["Climate and Resource Security", "Urban Security", "Strategic Stability"] }]}
        cols={[{ key: "id", label: "ID", className: "w-40" }, { key: "title", label: "Title" }, { key: "stage", label: "Stage" }, { key: "round", label: "Round", align: "right" }, { key: "updated", label: "Last updated" }, { key: "act", label: "", className: "w-28 text-right" }]}
        mobile={{ title: "title", meta: ["id", "stage", "updated"], end: "act" }}
        rows={MY_RESEARCH.map((r) => ({
          id: r.id + r.title, href: r.href, text: `${r.id} ${r.title}`, tabs: [r.stage === "Draft" ? "Drafts" : r.stage === "Published" ? "Published" : "In progress"],
          cells: {
            id: <span className="font-mono text-[12.5px] font-semibold text-ink-600">{r.id}</span>,
            title: <span className="block min-w-0"><span className="block font-semibold text-[14.5px] leading-snug">{r.title}</span><span className="block text-[12.5px] text-ink-500 mt-0.5">{r.sub}</span></span>,
            stage: <Status s={r.stage} />, round: <span className="tabular-nums">{r.round}</span>, updated: <span className="text-ink-600 whitespace-nowrap">{r.updated}</span>,
            act: r.action ? <Link href={r.href} className="h-9 px-3.5 rounded-full bg-brand-800 text-white text-[13px] font-semibold inline-flex items-center hover:bg-brand-700">{r.action}</Link> : null,
          },
        }))} />
      <div className="mt-6"><Note icon={EyeOff} title="Peer review is double-blind">Reviewers never see your name. Keep identifying details out of the anonymised manuscript.</Note></div>
    </DashShell>
  );
}
