import type { Metadata } from "next";
import { Download, Pause, Pencil } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead, Stat, Status } from "@/components/dash/kit";
import { ActionButton, AreaChart, Dialog } from "@/components/dash/interactive";
import { IMPRESSIONS_16, days16 } from "@/components/dash/data";
import { btn } from "@/components/ui";
import Link from "next/link";

export const metadata: Metadata = { title: "Campaign analytics" };

export default function CampaignAnalytics() {
  return (
    <DashShell kind="admin" active="ads" title="Campaign">
      <PageHead crumbs={[{ label: "Campaigns", href: "/admin/ads" }, { label: "Habib Bank: Digital Banking" }]} title="Habib Bank: Digital Banking" badge={<Status s="Active" />} desc="HBL Marketing · 1 to 31 Oct 2026 · day 16 of 31"
        actions={<><ActionButton msg="Report exported as PDF" className={btn("secondary", "md", "rounded-full")}><Download className="size-4" />Export report</ActionButton><Dialog triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><Pause className="size-4" />Pause</>} title="Pause this campaign?" desc="Ads stop showing straight away. Booked slots are kept until the end date." confirm={{ label: "Pause campaign", tone: "danger", toast: "Campaign paused" }} /><Link href="/admin/ads/new" className={btn("primary", "md", "rounded-full")}><Pencil className="size-4" />Edit</Link></>} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Stat label="Impressions" value="142,300" tone="brand" /><Stat label="Clicks" value="1,204" /><Stat label="CTR" value="0.85%" /><Stat label="Viewable" value="71%" /><Stat label="Pacing" value="On track" tone="mint" />
      </div>
      <Card className="mt-5" title="Impressions per day" desc="Clicks shown in the table below"><AreaChart labels={days16} series={[{ name: "Impressions", values: IMPRESSIONS_16 }]} /></Card>
      <div className="mt-5 grid lg:grid-cols-2 gap-5">
        <Card title="By slot" pad={false}><div className="overflow-x-auto"><table className="w-full text-[14px] min-w-[340px]"><thead><tr className="text-left text-[12.5px] text-ink-500 border-b border-line"><th className="px-5 py-3 font-semibold">Slot</th><th className="px-3 py-3 font-semibold text-right">Impr.</th><th className="px-3 py-3 font-semibold text-right">Clicks</th><th className="px-5 py-3 font-semibold text-right">CTR</th></tr></thead><tbody>{[["Leaderboard 728x90", "96,110", "702", "0.73%"], ["Sidebar 300x600", "46,190", "502", "1.09%"]].map(([a, b, c, d]) => <tr key={a} className="border-b border-line last:border-0"><td className="px-5 py-3.5 font-semibold">{a}</td><td className="px-3 py-3.5 text-right tabular-nums">{b}</td><td className="px-3 py-3.5 text-right tabular-nums">{c}</td><td className="px-5 py-3.5 text-right tabular-nums">{d}</td></tr>)}</tbody></table></div></Card>
        <Card title="Top pages" pad={false}><div className="overflow-x-auto"><table className="w-full text-[14px] min-w-[340px]"><thead><tr className="text-left text-[12.5px] text-ink-500 border-b border-line"><th className="px-5 py-3 font-semibold">Page</th><th className="px-3 py-3 font-semibold text-right">Impr.</th><th className="px-5 py-3 font-semibold text-right">CTR</th></tr></thead><tbody>{[["Homepage", "58,200", "0.62%"], ["Economy topic", "12,940", "1.10%"], ["Budget 2026-27: what defence gets", "9,880", "1.21%"], ["Signalling through tests", "7,410", "0.94%"]].map(([a, b, d]) => <tr key={a} className="border-b border-line last:border-0"><td className="px-5 py-3.5 font-semibold">{a}</td><td className="px-3 py-3.5 text-right tabular-nums">{b}</td><td className="px-5 py-3.5 text-right tabular-nums">{d}</td></tr>)}</tbody></table></div></Card>
      </div>
      <p className="mt-5 text-[12.5px] text-ink-500">Impressions count when at least half the ad is on screen for one second. Advertisers receive this report as a PDF on request.</p>
    </DashShell>
  );
}
