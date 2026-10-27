import type { Metadata } from "next";
import { Download, Eye, MousePointerClick, Timer, UserPlus, Users } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { BarList, Card, PageHead, Stat, Tag } from "@/components/dash/kit";
import { ActionButton, AreaChart, ChartRange, DataList } from "@/components/dash/interactive";
import { PAGEVIEWS_30, VISITORS_30, days30 } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Analytics" };
const TOP = [["Signalling through tests", "Sara Haider", "Article", 3880, "4m 02s"], ["Deterrence stability and hypersonics", "Sara Haider, Dr Imran Siddiqui", "Research", 3412, "7m 48s"], ["Budget 2026-27: what defence gets", "Bilal Ahmed", "Article", 2970, "3m 15s"], ["Crisis hotlines in South Asia", "Sara Haider", "Article", 2615, "3m 40s"], ["Future warfare conference readout", "Events team", "Report", 1522, "5m 10s"], ["Global Watch: Red Sea shipping", "News Desk", "Global Watch", 1388, "2m 05s"]] as const;

export default function Analytics() {
  return (
    <DashShell kind="admin" active="analytics" title="Analytics">
      <PageHead title="Analytics" desc="17 Sep to 16 Oct 2026 · PKT · compared with the previous 30 days" actions={<><ChartRange options={["Today", "7 days", "30 days", "90 days", "Custom"]} /><ActionButton msg="CSV export started" className={btn("secondary", "md", "rounded-full")}><Download className="size-4" />Export CSV</ActionButton></>} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Stat label="Visitors" value="86,410" delta="+14%" icon={Users} tone="brand" />
        <Stat label="Page views" value="241,905" delta="+9%" icon={Eye} />
        <Stat label="Reads" value="58,322" delta="+11%" icon={MousePointerClick} />
        <Stat label="Avg. time on page" value="3m 12s" delta="+6%" icon={Timer} />
        <Stat label="New contributors" value="23" delta="−4%" icon={UserPlus} />
      </div>
      <Card className="mt-5" title="Traffic" action={<ChartRange options={["Daily", "Weekly"]} />}>
        <AreaChart height={280} labels={days30} series={[{ name: "Page views", values: PAGEVIEWS_30 }, { name: "Visitors", values: VISITORS_30 }]} />
      </Card>
      <div className="mt-5">
        <h2 className="font-semibold text-[18px] mb-3">Top content</h2>
        <DataList noun="items" pages={1} search="Search content" selects={[{ key: "type", label: "Type", options: ["Article", "Research", "Report", "Global Watch"] }]} sorts={["Reads", "Avg. time"]}
          cols={[{ key: "t", label: "Title" }, { key: "type", label: "Type" }, { key: "r", label: "Reads", align: "right" }, { key: "time", label: "Avg. time", align: "right" }]}
          mobile={{ title: "t", meta: ["type", "time"], end: "r" }}
          rows={TOP.map(([t, a, ty, r, tm]) => ({ id: t, text: t + a, f: { type: ty }, cells: { t: <span><span className="block font-semibold text-[14.5px]">{t}</span><span className="block text-[12.5px] text-ink-500">{a}</span></span>, type: <Tag>{ty}</Tag>, r: <span className="font-semibold tabular-nums">{r.toLocaleString("en-GB")}</span>, time: <span className="tabular-nums text-ink-600">{tm}</span> } }))} />
      </div>
      <div className="mt-5 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card title="Traffic sources"><BarList rows={[["Search", 38120], ["Direct", 21400], ["Social", 14890], ["Referral", 8210], ["Email", 3790]]} /></Card>
        <Card title="Top countries"><BarList rows={[["Pakistan", 51210], ["United States", 8902], ["United Kingdom", 6110], ["UAE", 4380], ["India", 3170]]} /></Card>
        <Card title="Reads by type"><BarList rows={[["Articles", 34110], ["Research", 12940], ["Reports", 6480], ["Newsroom", 3010], ["Global Watch", 1782]]} /></Card>
        <Card title="Devices"><BarList total={100} rows={[["Mobile", 61], ["Desktop", 35], ["Tablet", 4]]} /><p className="mt-3 text-[12.5px] text-ink-500">Share of visitors, per cent.</p></Card>
      </div>
      <p className="mt-5 text-[12.5px] text-ink-500">Reads count once per IP per item per 24 hours. Visitors are unique per day.</p>
    </DashShell>
  );
}
