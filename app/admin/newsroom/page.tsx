import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Status, Tag } from "@/components/dash/kit";
import { DataList, Dialog } from "@/components/dash/interactive";
import { Field, FileDrop, Segmented, Select, TextArea, TextInput } from "@/components/form";
import { REGIONS } from "@/lib/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Newsroom" };
const POSTS = [["Pakistan Strategic Forum hosts the 2026 Islamabad Security Dialogue", "Hina Shah", "Event", "Scheduled", "20 Oct 2026, 10:00", "0"], ["Statement on the Red Sea shipping disruption", "News Desk", "Press release", "Live", "14 Oct 2026", "1,388"], ["Research partnership signed with NDU", "Hina Shah", "Announcement", "Live", "7 Oct 2026", "904"], ["Call for papers: Strategic Studies Review 2027", "Dr Faisal Qureshi", "Announcement", "Live", "1 Oct 2026", "2,210"], ["Youth Fellows 2026 cohort announced", "Hina Shah", "Announcement", "Draft", "30 Sep 2026", "0"], ["Side event at the Munich Security Conference", "News Desk", "Event", "Archived", "16 Feb 2026", "3,021"]];

export default async function AdminNewsroom({ searchParams }: { searchParams: Promise<{ new?: string }> }) {
  const open = (await searchParams).new === "1";
  return (
    <DashShell kind="admin" active="newsroom" title="Newsroom">
      <PageHead title="Newsroom" desc="Press releases, events and announcements" actions={
        <Dialog side openOnLoad={open} triggerClass={btn("primary", "md", "rounded-full")} trigger={<><Plus className="size-4" />New post</>} title="New newsroom post" confirm={{ label: "Publish post", toast: "Post published" }}>
          <Field label="Type" required><Segmented name="nt" options={["Press release", "Update", "Event", "Announcement"]} /></Field>
          <Field label="Title" required htmlFor="np-t"><TextInput id="np-t" required /></Field>
          <Field label="Summary" required htmlFor="np-s"><TextArea id="np-s" rows={3} required /></Field>
          <Field label="Body" htmlFor="np-b"><TextArea id="np-b" rows={6} /></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="Region" htmlFor="np-r"><Select id="np-r" options={REGIONS} defaultValue="South Asia" /></Field><Field label="Publish" htmlFor="np-d"><TextInput id="np-d" type="datetime-local" /></Field></div>
          <label className="flex gap-3 text-[15px]"><input type="checkbox" className="size-5 accent-[#04411f]" />Mark as breaking</label>
          <Field label="Image"><FileDrop label="Drop an image or browse" hint="JPG or PNG, up to 5 MB" /></Field>
        </Dialog>} />
      <DataList noun="posts" total={186} search="Search posts" sorts={["Newest", "Most viewed"]}
        tabs={[["All", 186], ["Live", 171], ["Scheduled", 2], ["Drafts", 4], ["Archived", 9]]}
        selects={[{ key: "type", label: "Type", options: ["Press release", "Event", "Announcement", "Update"] }]}
        cols={[{ key: "t", label: "Title" }, { key: "type", label: "Type" }, { key: "s", label: "Status" }, { key: "d", label: "Publish date" }, { key: "v", label: "Views", align: "right" }]}
        mobile={{ title: "t", meta: ["s", "type", "d"], end: "v" }}
        rows={POSTS.map(([t, a, ty, s, d, v]) => ({ id: t, href: "/newsroom/n6", text: t + a, f: { type: ty }, tabs: [s === "Draft" ? "Drafts" : s], cells: { t: <span><span className="block font-semibold text-[14.5px] leading-snug">{t}</span><span className="block text-[12.5px] text-ink-500">{a}</span></span>, type: <Tag>{ty}</Tag>, s: <Status s={s} />, d: <span className="text-ink-600 whitespace-nowrap">{d}</span>, v: <span className="font-semibold tabular-nums">{v}</span> } }))} />
    </DashShell>
  );
}
