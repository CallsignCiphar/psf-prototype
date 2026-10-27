import Link from "next/link";
import { FilePlus2, FileText, Pencil } from "lucide-react";
import { DataList } from "./interactive";
import { Empty, Status } from "./kit";
import type { MyItem } from "./data";
import { btn } from "@/components/ui";

export function MyList({ kind, items, empty }: { kind: "articles" | "reports"; items: MyItem[]; empty?: boolean }) {
  const art = kind === "articles";
  const base = `/portal/${kind}`;
  const statusParam = (s: string) => ({ "Changes requested": "changes", Live: "live", Rejected: "rejected" }[s] ?? "pending");
  const href = (it: MyItem) => (it.status === "Draft" || it.action === "Edit" ? `${base}/new${it.status === "Changes requested" ? "?state=changes" : ""}` : `${base}/${art ? "water-security" : "climate-finance-seminar"}?status=${statusParam(it.status)}`);
  const count = (s: string) => items.filter((i) => i.status === s).length;
  const tabs: [string, number][] = art
    ? [["All", 20], ["Drafts", 3], ["Pending review", 2], ["Changes requested", 1], ["Scheduled", 0], ["Live", 14], ["Rejected", 0]]
    : [["All", 5], ["Drafts", 1], ["Pending review", 1], ["Changes requested", 0], ["Live", count("Live")], ["Rejected", 0]];
  if (empty) return (
    <div className="bg-white rounded-[22px] shadow-soft">
      <Empty icon={FileText} title={art ? "No articles yet" : "No reports yet"} desc={art ? "Articles you write appear here with their review status. Drafts save automatically." : "Reports cover Pakistan Strategic Forum events and briefs. Each needs a PDF and a short summary."}
        action={<Link href={`${base}/new`} className={btn("primary", "lg", "rounded-full")}><FilePlus2 className="size-4" />{art ? "Write your first article" : "Write your first report"}</Link>} />
    </div>
  );
  return (
    <DataList noun={kind} total={art ? 20 : 5} pages={art ? 3 : 1} tabs={tabs} search={art ? "Search my articles" : "Search my reports"}
      selects={[art ? { key: "topic", label: "Topic", options: Array.from(new Set(items.map((i) => i.topic))) } : { key: "topic", label: "Category", options: Array.from(new Set(items.map((i) => i.topic))) }]}
      sorts={["Last updated", "Most read", "Title A to Z"]}
      cols={[{ key: "title", label: "Title" }, { key: "status", label: "Status" }, { key: "topic", label: art ? "Topic" : "Category" }, { key: "updated", label: "Last updated" }, { key: "reads", label: "Reads", align: "right" }, { key: "act", label: "", className: "w-24 text-right" }]}
      mobile={{ title: "title", meta: ["status", "updated", "reads"], end: "act" }}
      rows={items.map((it) => ({
        id: it.slug, href: href(it), text: it.title + " " + it.topic, f: { topic: it.topic },
        tabs: [it.status === "Draft" ? "Drafts" : it.status],
        cells: {
          title: <span className="block min-w-0"><span className="block font-semibold text-[14.5px] text-ink-900 leading-snug">{it.title}</span><span className="block text-[12.5px] text-ink-500 mt-0.5">{it.sub}</span></span>,
          status: <Status s={it.status} />, topic: <span className="text-ink-600">{it.topic}</span>, updated: <span className="text-ink-600 whitespace-nowrap">{it.updated}</span>,
          reads: <span className={it.reads === "Not live" ? "text-ink-400 whitespace-nowrap" : "font-semibold"}>{it.reads}</span>,
          act: it.action ? <Link href={href(it)} className="h-9 px-3.5 rounded-full bg-canvas ring-1 ring-line text-[13px] font-semibold inline-flex items-center gap-1.5 hover:bg-mint-100 hover:text-brand-800"><Pencil className="size-3.5" />{it.action}</Link> : null,
        },
      }))} />
  );
}
