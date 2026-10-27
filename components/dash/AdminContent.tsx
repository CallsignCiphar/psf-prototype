import Link from "next/link";
import { Download, Eye } from "lucide-react";
import { PageHead, Status, Tag } from "./kit";
import { ActionButton, DataList } from "./interactive";
import { ADMIN_ITEMS } from "./data";
import { btn } from "@/components/ui";

export function AdminContent({ type }: { type?: "Report" }) {
  const items = type ? ADMIN_ITEMS.filter((i) => i.type === type) : ADMIN_ITEMS;
  return (
    <>
      <PageHead title={type ? "Reports" : "Articles and reports"} desc="Oldest first in Pending review" actions={<ActionButton msg="Export started" className={btn("secondary", "md", "rounded-full")}><Download className="size-4" />Export</ActionButton>} />
      <DataList noun="items" total={type ? 96 : 1284} selectable bulk={["Assign editor", "Move to topic", "Delete"]} search="Search title or author" sorts={["Oldest first", "Newest first"]}
        tabs={type ? [["All", 96], ["Pending review", 1], ["Live", 88], ["Scheduled", 1], ["Changes requested", 0], ["Rejected", 3], ["Drafts", 3]] : [["All", 1284], ["Pending review", 4], ["Live", 1196], ["Scheduled", 3], ["Changes requested", 2], ["Rejected", 41], ["Drafts", 36], ["Deleted", 2]]}
        selects={[...(type ? [] : [{ key: "type", label: "Type", options: ["Article", "Report"] }]), { key: "topic", label: "Topic", options: Array.from(new Set(ADMIN_ITEMS.map((i) => i.topic))) }, { key: "editor", label: "Editor", options: ["Hina Shah", "Unassigned"] }, { key: "when", label: "Submitted", options: ["Last 7 days", "Last 30 days"] }]}
        cols={[{ key: "t", label: "Title" }, { key: "type", label: "Type" }, { key: "topic", label: "Topic" }, { key: "sub", label: "Submitted" }, { key: "ed", label: "Editor" }, { key: "s", label: "Status" }, { key: "act", label: "", className: "text-right" }]}
        mobile={{ title: "t", meta: ["s", "type", "ed"], end: "act" }}
        rows={items.map((i) => ({
          id: i.slug, href: `/admin/articles/${i.slug}`, text: i.title + i.by, f: { type: i.type, topic: i.topic, editor: i.editor }, tabs: [i.status],
          cells: {
            t: <span><span className="block font-semibold text-[14.5px] leading-snug">{i.title}</span><span className="block text-[12.5px] text-ink-500">{i.by}</span></span>, type: <Tag>{i.type}</Tag>, topic: <span className="text-ink-600">{i.topic}</span>,
            sub: <span className="text-ink-600 whitespace-nowrap">{i.sub}</span>, ed: <span className={i.editor === "Unassigned" ? "text-attn-700 font-semibold" : "text-ink-600"}>{i.editor}</span>, s: <Status s={i.status} />,
            act: <Link href={`/admin/articles/${i.slug}`} className={i.status === "Pending review" ? "h-9 px-4 rounded-full bg-brand-800 text-white text-[13px] font-semibold inline-flex items-center gap-1.5" : "h-9 px-4 rounded-full ring-1 ring-line text-[13px] font-semibold inline-flex items-center gap-1.5"}><Eye className="size-4" />{i.status === "Pending review" ? "Review" : "Open"}</Link>,
          },
        }))} />
    </>
  );
}
