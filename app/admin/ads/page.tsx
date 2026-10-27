import Link from "next/link";
import type { Metadata } from "next";
import { CalendarDays, Megaphone, MousePointerClick, Percent, Plus, Eye, CalendarCheck } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Stat, Status } from "@/components/dash/kit";
import { DataList } from "@/components/dash/interactive";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Campaigns" };
const C = [["Habib Bank: Digital Banking", "HBL Marketing", "Leaderboard, Sidebar", "1 Oct to 31 Oct", "Active", "142,300", "1,204", "0.85%"], ["NUST admissions 2027", "NUST", "Sidebar 300x600", "10 Oct to 9 Nov", "Active", "61,020", "488", "0.80%"], ["Islamabad Security Dialogue", "House campaign", "In-article", "1 Oct to 20 Oct", "Active", "88,410", "702", "0.79%"], ["Engro: Clean energy", "Engro Corp", "Leaderboard", "15 Sep to 22 Oct", "Active", "96,550", "540", "0.56%"], ["Jazz Business", "Jazz", "Sidebar 300x600", "20 Oct to 20 Nov", "Scheduled", "0", "0", "0.00%"], ["LUMS executive education", "LUMS", "In-article", "1 Aug to 30 Sep", "Ended", "118,700", "1,010", "0.85%"]];

export default function Campaigns() {
  return (
    <DashShell kind="admin" active="ads" title="Campaigns">
      <PageHead title="Campaigns" desc="Ad management" actions={<><Link href="/admin/ads/calendar" className={btn("secondary", "md", "rounded-full")}><CalendarDays className="size-4" />Slot calendar</Link><Link href="/admin/ads/new" className={btn("primary", "md", "rounded-full")}><Plus className="size-4" />New campaign</Link></>} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        <Stat label="Active campaigns" value="5" icon={Megaphone} tone="brand" /><Stat label="Impressions, 30 days" value="412,880" delta="+7%" icon={Eye} /><Stat label="Clicks, 30 days" value="3,104" delta="+3%" icon={MousePointerClick} /><Stat label="CTR" value="0.75%" icon={Percent} /><Stat label="Slots booked this month" value="68%" icon={CalendarCheck} />
      </div>
      <DataList noun="campaigns" total={23} search="Search campaigns" sorts={["Newest", "Impressions", "CTR"]}
        selects={[{ key: "status", label: "Status", options: ["Active", "Scheduled", "Ended"] }, { key: "slot", label: "Slot", options: ["Leaderboard", "Sidebar 300x600", "In-article"] }]}
        cols={[{ key: "c", label: "Campaign" }, { key: "s", label: "Slots" }, { key: "d", label: "Dates" }, { key: "st", label: "Status" }, { key: "i", label: "Impressions", align: "right" }, { key: "k", label: "Clicks", align: "right" }, { key: "ctr", label: "CTR", align: "right" }]}
        mobile={{ title: "c", meta: ["st", "d", "ctr"], end: "i" }}
        rows={C.map(([c, a, s, d, st, i, k, ctr]) => ({ id: c, href: "/admin/ads/hbl", text: c + a, f: { status: st, slot: s.split(",")[0] }, cells: { c: <span><span className="block font-semibold text-[14.5px]">{c}</span><span className="block text-[12.5px] text-ink-500">{a}</span></span>, s: <span className="text-ink-600">{s}</span>, d: <span className="text-ink-600 whitespace-nowrap">{d}</span>, st: <Status s={st} />, i: <span className="font-semibold tabular-nums">{i}</span>, k: <span className="tabular-nums">{k}</span>, ctr: <span className="tabular-nums">{ctr}</span> } }))} />
    </DashShell>
  );
}
