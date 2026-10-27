import Link from "next/link";
import type { Metadata } from "next";
import { Globe2, Pencil, Plus, TriangleAlert } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Note, PageHead, Status } from "@/components/dash/kit";
import { DataList, Dialog } from "@/components/dash/interactive";
import { Field, Segmented, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Global Watch" };
const ROWS = [["Yemen", "Crisis", "Red Sea shipping attacks continue", "9 Oct 2026", "16 Oct 2026", 4, true, "Middle East"], ["Afghanistan", "Elevated", "Border crossings partly reopened", "14 Oct 2026", "21 Oct 2026", 7, false, "South Asia"], ["Iran", "Elevated", "Sanctions talks stalled", "12 Oct 2026", "19 Oct 2026", 3, false, "Middle East"], ["India", "Watch", "Monsoon session ends", "10 Oct 2026", "24 Oct 2026", 5, false, "South Asia"], ["Sudan", "Crisis", "Humanitarian corridor talks", "15 Oct 2026", "22 Oct 2026", 2, false, "Africa"], ["China", "Stable", "CPEC phase two review", "1 Oct 2026", "31 Oct 2026", 6, false, "East Asia"]] as const;

function Edit({ c, level, head }: { c: string; level: string; head: string }) {
  return (
    <Dialog side triggerClass="h-9 px-3.5 rounded-full ring-1 ring-line text-[13px] font-semibold inline-flex items-center gap-1.5 hover:bg-canvas" trigger={<><Pencil className="size-3.5" />Edit</>} title={`Edit status: ${c}`} confirm={{ label: "Save and mark reviewed", toast: `${c} updated. The globe refreshes now.` }}>
      <Field label="Level" required><Segmented name="lvl" options={["Stable", "Watch", "Elevated", "Crisis"]} defaultValue={level} /></Field>
      <Field label="Headline" required hint="Up to 80 characters. Shown in the globe drawer." htmlFor="gw-h"><TextInput id="gw-h" maxLength={80} defaultValue={head} required /></Field>
      <Field label="Summary" required htmlFor="gw-s"><TextArea id="gw-s" rows={4} required defaultValue="Attacks on commercial shipping continue near the Bab el-Mandeb strait. Insurers have raised premiums for Pakistan-bound cargo." /></Field>
      <Field label="Next review" required htmlFor="gw-r"><TextInput id="gw-r" type="date" defaultValue="2026-10-23" required /></Field>
      <Field label="Linked content" hint="Articles and reports shown in the drawer" htmlFor="gw-l"><TextInput id="gw-l" placeholder="Search content to link" /></Field>
    </Dialog>
  );
}

export default function AdminGlobalWatch() {
  return (
    <DashShell kind="admin" active="global-watch" title="Global Watch">
      <PageHead title="Global Watch" desc="42 tracked countries · globe updates on save" actions={<><Link href="/global-watch" className={btn("secondary", "md", "rounded-full")}><Globe2 className="size-4" />View globe</Link><Dialog side triggerClass={btn("primary", "md", "rounded-full")} trigger={<><Plus className="size-4" />Track country</>} title="Track a country" confirm={{ label: "Start tracking", toast: "Country added to the globe" }}><Field label="Country" required htmlFor="gw-c"><TextInput id="gw-c" required /></Field><Field label="Level" required><Segmented name="lv2" options={["Stable", "Watch", "Elevated", "Crisis"]} defaultValue="Watch" /></Field><Field label="Headline" required htmlFor="gw-h2"><TextInput id="gw-h2" required maxLength={80} /></Field></Dialog></>} />
      <div className="mb-5"><Note icon={TriangleAlert} tone="red" title="1 entry is past its review date">Yemen was due for review on 16 Oct 2026.</Note></div>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-ink-600">{["Stable", "Watch", "Elevated", "Crisis"].map((l) => <Status key={l} s={l} />)}<span className="ml-1">Levels are editorial judgement, not official travel advice.</span></div>
      <DataList noun="tracked countries" total={42} search="Search countries" sorts={["Review due first", "Level", "A to Z"]}
        selects={[{ key: "level", label: "Level", options: ["Stable", "Watch", "Elevated", "Crisis"] }, { key: "region", label: "Region", options: ["South Asia", "Middle East", "East Asia", "Africa"] }]}
        cols={[{ key: "c", label: "Country" }, { key: "l", label: "Level" }, { key: "h", label: "Headline" }, { key: "r", label: "Last reviewed" }, { key: "d", label: "Review due" }, { key: "n", label: "Linked", align: "right" }, { key: "e", label: "", className: "text-right" }]}
        mobile={{ title: "c", meta: ["l", "d"], end: "e" }}
        rows={ROWS.map(([c, l, h, r, d, n, od, reg]) => ({ id: c, text: c + h, f: { level: l, region: reg }, cells: { c: <span><span className="block font-semibold">{c}</span><span className="block md:hidden text-[13px] text-ink-500">{h}</span></span>, l: <Status s={l} />, h: <span className="text-ink-700">{h}</span>, r: <span className="text-ink-600 whitespace-nowrap">{r}</span>, d: <span className={od ? "font-semibold text-danger-700 whitespace-nowrap" : "text-ink-600 whitespace-nowrap"}>{d}</span>, n: <span className="tabular-nums">{n}</span>, e: <Edit c={c} level={l} head={h} /> } }))} />
    </DashShell>
  );
}
