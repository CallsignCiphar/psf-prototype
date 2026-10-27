import type { Metadata } from "next";
import { AlarmClock } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Stat, Status } from "@/components/dash/kit";
import { DataList } from "@/components/dash/interactive";
import { ADMIN_RESEARCH } from "@/components/dash/data";

export const metadata: Metadata = { title: "Research papers" };

export default function AdminResearch() {
  const counts: [string, number][] = [["New submissions", 2], ["Under review", 5], ["Revisions requested", 3], ["Editor decision needed", 1], ["Awaiting final approval", 1], ["Overdue reviews", 2]];
  return (
    <DashShell kind="admin" active="research" title="Research papers">
      <PageHead title="Research papers" desc="12 active submissions · reviews due 21 days after acceptance" />
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">{counts.map(([l, n]) => <Stat key={l} label={l} value={n} tone={l === "Editor decision needed" ? "brand" : "white"} icon={l === "Overdue reviews" ? AlarmClock : undefined} />)}</div>
      <DataList noun="active" total={12} search="Search title, ID or author" sorts={["Longest in stage", "Newest"]}
        selects={[{ key: "stage", label: "Stage", options: ["Submitted", "Under review", "Revisions requested", "Editor decision needed", "Awaiting final approval"] }, { key: "cat", label: "Category", options: Array.from(new Set(ADMIN_RESEARCH.map((r) => r.cat))) }, { key: "editor", label: "Editor", options: ["Dr Faisal Qureshi", "Hina Shah", "Unassigned"] }]}
        cols={[{ key: "id", label: "ID" }, { key: "t", label: "Title" }, { key: "stage", label: "Stage" }, { key: "round", label: "Round", align: "right" }, { key: "rev", label: "Reviews" }, { key: "in", label: "In stage" }, { key: "ed", label: "Editor" }]}
        mobile={{ title: "t", meta: ["id", "stage", "in"] }}
        rows={ADMIN_RESEARCH.map((r) => ({
          id: r.id, href: `/admin/research/${r.id}`, text: r.id + r.title + r.by, f: { stage: r.stage, cat: r.cat, editor: r.editor },
          cells: {
            id: <span className="font-mono text-[12.5px] font-semibold text-ink-600 whitespace-nowrap">{r.id}</span>,
            t: <span><span className="block font-semibold text-[14.5px] leading-snug">{r.title}</span><span className="block text-[12.5px] text-ink-500">{r.by} · {r.cat}</span></span>,
            stage: <Status s={r.stage} />, round: r.round, rev: <span className="text-ink-600 whitespace-nowrap">{r.reviews}</span>,
            in: <span className={r.overdue ? "font-semibold text-danger-700 whitespace-nowrap" : "text-ink-600 whitespace-nowrap"}>{r.inStage}{r.overdue && " · overdue"}</span>, ed: <span className={r.editor === "Unassigned" ? "text-attn-700 font-semibold" : "text-ink-600"}>{r.editor}</span>,
          },
        }))} />
    </DashShell>
  );
}
