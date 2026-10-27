import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { Gantt } from "@/components/dash/Gantt";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Slot calendar" };

export default function SlotCalendar() {
  return (
    <DashShell kind="admin" active="ads" title="Slot calendar">
      <PageHead crumbs={[{ label: "Campaigns", href: "/admin/ads" }, { label: "Slot calendar" }]} title="Slot calendar" desc="October 2026 · 68% of slot-days booked" actions={<Link href="/admin/ads/new" className={btn("primary", "md", "rounded-full")}><Plus className="size-4" />New campaign</Link>} />
      <Gantt days={31} start={1} today={16} legend={[["live", "Booked, live"], ["scheduled", "Booked, scheduled"], ["hold", "On hold"]]} rows={[
        { name: "Leaderboard, rotation 1", bars: [{ label: "Habib Bank: Digital Banking", from: 1, to: 31, kind: "live" }] },
        { name: "Leaderboard, rotation 2", bars: [{ label: "Engro: Clean energy", from: 1, to: 22, kind: "live" }] },
        { name: "Leaderboard, rotation 3", bars: [] },
        { name: "Sidebar, rotation 1", bars: [{ label: "Habib Bank", from: 1, to: 31, kind: "live" }] },
        { name: "Sidebar, rotation 2", bars: [{ label: "NUST admissions 2027", from: 10, to: 31, kind: "live" }] },
        { name: "Sidebar, rotation 3", bars: [{ label: "Jazz Business", from: 20, to: 31, kind: "scheduled" }] },
        { name: "In-article, rotation 1", bars: [{ label: "Islamabad Security Dialogue", from: 1, to: 20, kind: "live" }] },
        { name: "In-article, rotation 2", bars: [] },
        { name: "Mobile banner", bars: [{ label: "Hold: LUMS", from: 24, to: 31, kind: "hold" }] },
      ]} />
      <p className="mt-3 text-[13px] text-ink-500">Empty rows are free to book.</p>
    </DashShell>
  );
}
