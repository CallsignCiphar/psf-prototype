import Link from "next/link";
import type { Metadata } from "next";
import clsx from "clsx";
import { AlarmClock, ArrowRight, CalendarClock, ClipboardList, Eye, FileClock, Globe2, GraduationCap, Inbox, MousePointerClick, Radio, ScrollText, Star, Timer, UserPlus, Users } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { BarList, Card, PageHead, Stat, Status } from "@/components/dash/kit";
import { AreaChart, ChartRange, Heatmap } from "@/components/dash/interactive";
import { Choropleth } from "@/components/dash/Choropleth";
import { HEAT, PAGEVIEWS_30, VISITORS_30, days30 } from "@/components/dash/data";

export const metadata: Metadata = { title: "Admin overview" };

const ACTIONS: [number, string, string, typeof Users, string?][] = [
  [6, "Pending applications", "/admin/applications", UserPlus, "Oldest waiting 4 days"], [4, "Articles pending review", "/admin/articles", ClipboardList], [1, "Reports pending review", "/admin/reports", ScrollText],
  [2, "Research, new submissions", "/admin/research", GraduationCap], [1, "Research, editor decision needed", "/admin/research/RES-2026-00048", GraduationCap], [1, "Research, awaiting final approval", "/admin/research", GraduationCap],
  [2, "Overdue reviews", "/admin/research", AlarmClock], [9, "Unread inbox", "/admin/inbox", Inbox], [1, "Featured slot holding an expired item", "/admin/featured", Star],
  [2, "Campaigns ending in 7 days", "/admin/ads", CalendarClock], [1, "Globe status entries past review date", "/admin/global-watch", Globe2],
];

export default function AdminOverview() {
  return (
    <DashShell kind="admin" active="overview" title="Overview">
      <PageHead title="Overview" desc="Friday, 16 October 2026 · all times PKT" actions={<ChartRange options={["Today", "7d", "Last 30 days", "Custom"]} />} />

      <section className="rounded-[28px] bg-brand-900 text-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><h2 className="font-semibold text-[17px] flex items-center gap-2">Action centre<span className="h-6 px-2 rounded-full bg-mint-500 text-brand-950 text-[12px] font-bold grid place-items-center">{ACTIONS.reduce((a, b) => a + b[0], 0)}</span></h2></div>
        <ul className="mt-4 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
          {ACTIONS.map(([n, l, h, I, sub]) => (
            <li key={l}><Link href={h} className="group h-full flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 rounded-2xl bg-white/6 ring-1 ring-white/10 p-3 hover:bg-white/12 transition">
              <span className={clsx("size-11 rounded-xl grid place-items-center font-serif text-[20px] font-semibold tabular-nums shrink-0", /Overdue|expired|past/.test(l) ? "bg-danger-700 text-white" : "bg-white text-brand-900")}>{n}</span>
              <span className="min-w-0 flex-1"><span className="block text-[13px] sm:text-[14px] font-semibold leading-snug">{l}</span>{sub && <span className="block text-[12px] text-white/60">{sub}</span>}</span>
              <I className="hidden sm:block size-4 text-white/40 group-hover:text-mint-300 shrink-0" />
            </Link></li>
          ))}
        </ul>
      </section>

      <div className="mt-5 grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Visitors" value="3,412" delta="+12%" sub="vs last Friday" icon={Users} />
        <Stat label="Page views" value="9,870" delta="+8%" icon={Eye} />
        <Stat label="Reads" value="2,145" delta="+15%" icon={MousePointerClick} />
        <Stat label="Avg. time on page" value="3m 12s" delta="−4%" icon={Timer} />
      </div>

      <div className="mt-5 grid xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2" title="Visitors and page views" desc="17 Sep to 16 Oct 2026, PKT" action={<Link href="/admin/analytics" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">Analytics<ArrowRight className="size-4" /></Link>}>
          <AreaChart labels={days30} series={[{ name: "Page views", values: PAGEVIEWS_30 }, { name: "Visitors", values: VISITORS_30 }]} />
          <p className="mt-2 text-[12px] text-ink-400">Source: Pakistan Strategic Forum first-party analytics</p>
        </Card>
        <Card title="Live now" desc="Visitors in the last 5 minutes" action={<span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700"><span className="size-2 rounded-full bg-mint-500 animate-pulse-dot" />Live</span>}>
          <p className="font-serif text-[48px] font-semibold leading-none tabular-nums">48</p>
          <ul className="mt-5 space-y-2.5">{[["/articles/air-defence-in-depth", 17], ["/", 11], ["/global-watch", 8], ["/newsroom", 6], ["/reports/annual-outlook-2027", 4]].map(([p, n]) => <li key={p as string} className="flex items-center gap-3 text-[13.5px]"><Radio className="size-4 text-brand-500 shrink-0" /><span className="flex-1 truncate font-mono text-[12.5px] text-ink-700">{p}</span><span className="font-semibold tabular-nums">{n}</span></li>)}</ul>
        </Card>
      </div>

      <div className="mt-5 grid xl:grid-cols-5 gap-5">
        <Card className="xl:col-span-3" title="Geography" desc="Visitors, last 30 days"><Choropleth /></Card>
        <Card className="xl:col-span-2" title="Top countries and cities">
          <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-6">
            <BarList rows={[["Pakistan", 61204], ["United States", 7830], ["United Kingdom", 4112], ["United Arab Emirates", 3605], ["Saudi Arabia", 2240], ["India", 1980]]} />
            <BarList rows={[["Islamabad", 14880], ["Karachi", 13402], ["Lahore", 11977], ["Rawalpindi", 6214], ["Peshawar", 3810], ["London", 2105]]} />
          </div>
        </Card>
      </div>

      <div className="mt-5 grid xl:grid-cols-5 gap-5">
        <Card className="xl:col-span-3" title="Visitors by hour and day" desc="Last 4 weeks, PKT"><Heatmap rows={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} cols={24} values={HEAT} /></Card>
        <Card className="xl:col-span-2" title="Publishing">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl bg-mint-100 p-4"><p className="text-[13px] text-ink-600">Published this month</p><p className="font-serif text-[34px] font-semibold tabular-nums leading-tight">64</p><p className="text-[12.5px] text-ink-600">41 articles · 6 reports · 3 research · 14 newsroom</p></div>
            {[["Total live items", "1,842"], ["Active contributors", "137"], ["Approval rate", "72%"], ["Submissions this month", "58"]].map(([l, v]) => <div key={l} className="rounded-2xl bg-canvas p-4"><p className="text-[12.5px] text-ink-500">{l}</p><p className="font-serif text-[24px] font-semibold tabular-nums">{v}</p></div>)}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid xl:grid-cols-2 gap-5">
        <Card title="Top content, last 7 days" action={<Link href="/admin/analytics" className="text-sm font-semibold text-brand-700">Analytics</Link>} pad={false}>
          <ul className="px-3 pb-3 pt-1">{[["Inside the recruitment pipeline", "Hamza Qureshi", "Article", "8,412"], ["Air defence in depth", "Ayesha Rahman", "Article", "5,730"], ["Annual Outlook 2027", "Analysis Desk", "Report", "3,118"], ["Deterrence stability and hypersonics", "S. Haider, R. Khan", "Research", "1,204"]].map(([t, a, ty, r], i) => (
            <li key={t} className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-canvas"><span className="size-8 rounded-full bg-canvas grid place-items-center text-[13px] font-bold text-ink-500 tabular-nums">{i + 1}</span><span className="flex-1 min-w-0"><span className="block font-semibold text-[14.5px] truncate">{t}</span><span className="block text-[12.5px] text-ink-500">{a} · {ty}</span></span><span className="font-semibold tabular-nums">{r}</span></li>
          ))}</ul>
        </Card>
        <Card title="Recent submissions" action={<Link href="/admin/articles" className="text-sm font-semibold text-brand-700">View all</Link>} pad={false}>
          <ul className="px-3 pb-3 pt-1">{[["Civil-military coordination in flood relief", "ART-2026-00131 · Article · 16 Oct, 13:58 · PK", "In review", "/admin/articles/water-security"], ["Maritime domain awareness in the Arabian Sea", "RES-2026-00047 · Research · 16 Oct, 10:12 · PK", "Submitted", "/admin/research"], ["The case for a national cyber command", "ART-2026-00130 · Article · 15 Oct, 19:40 · GB", "Published", "/admin/articles"], ["Annual Outlook 2027", "REP-2026-00012 · Report · 14 Oct, 11:05 · PK", "Scheduled", "/admin/reports"], ["Gwadar after the attacks", "ART-2026-00128 · Article · 13 Oct, 08:20 · AE", "Rejected", "/admin/articles"]].map(([t, m, s, h]) => (
            <li key={t}><Link href={h} className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-canvas"><FileClock className="size-5 text-brand-600 shrink-0" /><span className="flex-1 min-w-0"><span className="block font-semibold text-[14.5px] truncate">{t}</span><span className="block text-[12px] text-ink-500 truncate">{m}</span></span><Status s={s} /></Link></li>
          ))}</ul>
        </Card>
      </div>
    </DashShell>
  );
}
