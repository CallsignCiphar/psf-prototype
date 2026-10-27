import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, CheckCircle2, ClipboardCheck, FilePenLine, FileText, Globe2, MessageSquareText, PenLine, Send, UserPlus } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { BarList, Card, Stat, Tag } from "@/components/dash/kit";
import { AreaChart, ChartRange, Dialog } from "@/components/dash/interactive";
import { READS_30, days30 } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Contributor portal" };

const TOP = [["Signalling through tests", "Article · 2 Sep 2026", "3,880"], ["Crisis hotlines in South Asia", "Article · 18 Aug 2026", "2,615"], ["Missile tests and the media cycle", "Article · 30 Jul 2026", "1,940"], ["Future warfare conference readout", "Report · 28 Apr 2026", "1,522"], ["Deterrence stability and hypersonics", "Research · 16 Oct 2026", "1,204"]];
const PIPE: [string, number][] = [["Submitted", 1], ["Screening", 0], ["Under review", 1], ["Revisions requested", 1], ["Awaiting final approval", 0], ["Published", 2]];

export default async function PortalOverview({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const { invite } = await searchParams;
  return (
    <DashShell kind="portal" active="overview" title="Overview">
      <section className="relative overflow-hidden rounded-[28px] bg-brand-900 text-white p-6 sm:p-8">
        <div className="absolute -right-16 -top-20 size-72 rounded-full bg-mint-500/15" aria-hidden />
        <div className="absolute right-24 -bottom-24 size-56 rounded-full bg-white/5" aria-hidden />
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-mint-300 text-sm font-semibold">Friday, 16 October 2026</p>
            <h1 className="mt-1 font-serif text-[30px] sm:text-[40px] font-semibold tracking-[-0.02em]">Welcome back, Sara.</h1>
            <div className="mt-3 flex flex-wrap gap-2">{["Research Writer", "Article Writer", "Approver"].map((r) => <span key={r} className="h-7 px-3 rounded-full bg-white/10 ring-1 ring-white/15 text-[13px] font-semibold grid place-items-center">{r}</span>)}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex">
            <Link href="/portal/articles/new" className="h-12 px-4 rounded-2xl bg-white text-brand-900 font-semibold inline-flex items-center justify-center gap-2 text-sm"><PenLine className="size-4" /><span>Article</span></Link>
            <Link href="/portal/reports/new" className="h-12 px-4 rounded-2xl bg-white/10 ring-1 ring-white/20 font-semibold inline-flex items-center justify-center gap-2 text-sm hover:bg-white/15"><FileText className="size-4" />Report</Link>
            <Link href="/portal/research/new" className="h-12 px-4 rounded-2xl bg-white/10 ring-1 ring-white/20 font-semibold inline-flex items-center justify-center gap-2 text-sm hover:bg-white/15"><Send className="size-4" />Paper</Link>
          </div>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Published" value="14" icon={CheckCircle2} href="/portal/articles" />
        <Stat label="In review" value="2" icon={BookOpenCheck} href="/portal/articles" />
        <Stat label="Drafts" value="3" icon={FilePenLine} href="/portal/articles" />
        <Stat label="Changes requested / Rejected" value="1 / 0" icon={MessageSquareText} href="/portal/articles/flood-relief?status=changes" />
      </div>

      <div className="mt-5 grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5 min-w-0">
        <Card title="Reads" desc="17 Sep to 16 Oct 2026, PKT" action={<ChartRange />}>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mb-4">
            <div><p className="text-[13px] text-ink-500">Total reads</p><p className="font-serif text-[34px] font-semibold tabular-nums leading-none mt-1">12,480</p></div>
            <p className="text-[14px] text-ink-600 pb-1"><span className="font-semibold text-ink-900">2,317</span> last 30 days <span className="ml-1 h-6 px-2 rounded-full bg-mint-100 text-brand-800 font-semibold text-[12.5px] inline-grid place-items-center">+18%</span></p>
          </div>
          <AreaChart labels={days30} series={[{ name: "Reads", values: READS_30 }]} />
          <p className="mt-2 text-[12px] text-ink-400">Source: Pakistan Strategic Forum read counts, 1 per IP per item per 24 hours</p>
        </Card>
        <Card className="xl:col-span-2" title="Research pipeline" action={<Link href="/portal/research" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">My Research<ArrowRight className="size-4" /></Link>}>
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PIPE.map(([l, n], i) => <li key={l} className={`rounded-2xl p-3.5 ${n ? "bg-mint-100" : "bg-canvas"}`}><span className="text-[11px] font-bold text-ink-400 tabular-nums">{i + 1}</span><p className="font-serif text-[28px] font-semibold tabular-nums leading-tight">{n}</p><p className="text-[12.5px] text-ink-600 leading-snug">{l}</p></li>)}
          </ol>
        </Card>
        </div>
        <Card title="Action needed" desc="3 items">
          <ul className="space-y-3">
            <li><Link href="/portal/articles/new?state=changes" className="block rounded-2xl bg-attn-50 p-4 hover:ring-2 hover:ring-attn-700/20"><Tag tone="violet">Changes requested</Tag><p className="mt-2 font-semibold">Civil-military coordination in flood relief</p><p className="text-[13px] text-ink-500 mt-0.5">Editor comment, 15 Oct 2026, 16:10 PKT</p><p className="mt-2 text-[13px] font-semibold text-attn-700">Due in 3 days</p></Link></li>
            <li><Link href="/portal/reviews/RES-2026-00045" className="block rounded-2xl bg-info-50 p-4 hover:ring-2 hover:ring-info-700/20"><Tag tone="blue">Review</Tag><p className="mt-2 font-semibold">Review RES-2026-00045, round 1</p><p className="text-[13px] text-ink-500 mt-0.5">Due 19 Oct 2026</p></Link></li>
            <li className="rounded-2xl bg-mint-100 p-4">
              <Tag tone="green">Co-author invite</Tag><p className="mt-2 font-semibold">Rehan Khan invited you to co-author a report</p><p className="text-[13px] text-ink-600 mt-0.5">14 Oct 2026 · Accept or decline</p>
              <Dialog openOnLoad={invite === "1"} triggerClass={btn("primary", "sm", "mt-3 rounded-full")} trigger={<><UserPlus className="size-4" />Respond</>}
                title="Rehan Khan invited you to co-author" confirm={{ label: "Accept", toast: "Invitation accepted. The report is in My Reports." }} cancel="Decline">
                <div className="rounded-2xl bg-canvas p-4"><p className="eyebrow text-brand-600">Report · Roundtable</p><p className="mt-1 font-semibold text-[16px]">Roundtable: Afghanistan after the transition</p></div>
                <p className="text-[14.5px] text-ink-600">Co-authors are named on the byline and can edit until it is submitted.</p>
              </Dialog>
            </li>
          </ul>
          <h3 className="mt-7 font-semibold text-[15px]">Recent activity</h3>
          <ol className="mt-3 space-y-3">
            {[["Published: Deterrence stability and hypersonics", "16 Oct, 09:00"], ["Changes requested: Flood relief coordination", "15 Oct, 16:10"], ["Comment received: Crisis hotlines in South Asia", "12 Oct, 11:24"], ["Submitted: Flood relief coordination", "10 Oct, 20:02"], ["Review assigned: RES-2026-00045", "28 Sep 2026"]].map(([t, d]) => (
              <li key={t} className="flex gap-3 text-[14px]"><span className="mt-1.5 size-2 rounded-full bg-brand-500 shrink-0" /><span className="min-w-0"><span className="block text-ink-800">{t}</span><span className="text-[12.5px] text-ink-500">{d}</span></span></li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="mt-5 grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3" title="Top content" action={<Link href="/portal/articles" className="text-sm font-semibold text-brand-700">View all</Link>} pad={false}>
          <ol className="px-2 sm:px-3 pb-3 pt-2">
            {TOP.map(([t, m, r], i) => (
              <li key={t}><Link href="/portal/articles/water-security?status=live" className="flex items-center gap-4 px-3 py-3 rounded-2xl hover:bg-canvas">
                <span className="size-8 rounded-full bg-canvas text-ink-500 grid place-items-center text-[13px] font-bold tabular-nums shrink-0">{i + 1}</span>
                <span className="min-w-0 flex-1"><span className="block font-semibold text-[14.5px] truncate">{t}</span><span className="block text-[12.5px] text-ink-500">{m}</span></span>
                <span className="font-semibold tabular-nums">{r}</span>
              </Link></li>
            ))}
          </ol>
        </Card>
        <Card className="lg:col-span-2" title="Where your readers are" desc="Top 5 countries, last 30 days" action={<Globe2 className="size-5 text-brand-600" />}>
          <BarList rows={[["Pakistan", 1412], ["United States", 318], ["United Kingdom", 201], ["UAE", 130], ["India", 97]]} />
        </Card>
      </div>
      <div className="mt-5"><Card><div className="flex items-center gap-4"><span className="size-11 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><ClipboardCheck className="size-5" /></span><div className="flex-1 min-w-0"><p className="font-semibold">You have a review due in 3 days</p><p className="text-[13.5px] text-ink-500">Hybrid threats and information operations in South Asia</p></div><Link href="/portal/reviews/RES-2026-00045" className={btn("secondary", "sm", "rounded-full")}>Continue<ArrowRight className="size-4" /></Link></div></Card></div>
    </DashShell>
  );
}
