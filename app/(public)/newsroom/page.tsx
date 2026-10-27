import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Radio } from "lucide-react";
import { LIVE_UPDATES } from "@/lib/data";
import { PageHero } from "@/components/page";
import { NewsroomList } from "@/components/lists/NewsroomList";
import { AdSlot } from "@/components/site/Footer";
import { SITE } from "@/lib/data";

export const metadata: Metadata = { title: "Newsroom" };

const ACTIVE = [["Pakistan", 34], ["Afghanistan", 18], ["Iran", 11], ["India", 9], ["Saudi Arabia", 6]] as const;

export default function Newsroom() {
  return (
    <>
      <PageHero compact variant="mint" crumbs={[{ label: "Newsroom" }]}
        eyebrow={<span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-mint-500 animate-pulse-dot" />Updated continuously</span>}
        title="Newsroom" desc="Verified updates, statements and events, with the time and place of every report." />

      <div className="container-site mt-8 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Link href="/newsroom/n1" className="group block rounded-3xl bg-brand-900 text-white p-5 sm:p-6 mb-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm"><span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-danger-700 font-semibold text-xs uppercase tracking-wider"><Radio className="size-3.5" />Live</span><span className="text-white/70">Updated 15:42 PKT</span></div>
            <h2 className="mt-3 font-serif text-2xl sm:text-[28px] leading-tight font-semibold group-hover:underline decoration-mint-300 underline-offset-4">Live updates: National Security Committee meets on western border situation</h2>
            <ol className="mt-4 space-y-2.5">
              {LIVE_UPDATES.map((u) => <li key={u.time} className="flex gap-3 text-[15px] text-white/85"><span className="font-semibold text-mint-300 tabular-nums shrink-0">{u.time}</span>{u.text}</li>)}
            </ol>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-300">Follow live<ArrowRight className="size-4" /></span>
          </Link>
          <NewsroomList />
        </div>
        <aside className="lg:col-span-4 space-y-6">
          <section className="card p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold text-[17px]">Most active regions this week</h2>
            <ul className="mt-4 space-y-3.5">
              {ACTIVE.map(([c, n]) => (
                <li key={c} className="text-sm">
                  <div className="flex justify-between"><span className="font-medium text-ink-800">{c}</span><span className="tabular-nums text-ink-500">{n} updates</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-brand-50"><div className="h-2 rounded-full bg-brand-500" style={{ width: `${(n / 34) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
            <Link href="/global-watch" className="mt-5 flex items-center justify-between h-11 px-4 rounded-xl bg-canvas text-sm font-semibold text-brand-800 hover:bg-brand-50">See them on Global Watch<ArrowRight className="size-4" /></Link>
          </section>
          <AdSlot size="rectangle" enabled={SITE.adsEnabled} />
        </aside>
      </div>
    </>
  );
}
