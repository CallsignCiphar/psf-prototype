import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { ChartRange } from "@/components/dash/interactive";
import { Gantt } from "@/components/dash/Gantt";

export const metadata: Metadata = { title: "Slot timeline" };

export default function Timeline() {
  return (
    <DashShell kind="admin" active="featured" title="Slot timeline">
      <PageHead crumbs={[{ label: "Featured and Top Stories", href: "/admin/featured" }, { label: "Timeline" }]} title="Slot timeline" desc="12 to 25 October 2026 · today is 16 October" actions={<ChartRange options={["2 weeks", "Month"]} />} />
      <Gantt days={14} start={12} today={16} legend={[["live", "Live"], ["scheduled", "Scheduled"], ["expired", "Expired, still in slot"], ["ended", "Ended"]]} rows={[
        { name: "Homepage hero", bars: [{ label: "Budget 2026-27", from: 12, to: 14, kind: "ended" }, { label: "Deterrence stability and hypersonics", from: 15, to: 23, kind: "live" }, { label: "Security Dialogue", from: 24, to: 25, kind: "scheduled" }] },
        { name: "Top Stories 1", bars: [{ label: "Signalling through tests", from: 12, to: 20, kind: "live" }, { label: "Kashmir and UNGA", from: 21, to: 25, kind: "scheduled" }] },
        { name: "Top Stories 2", bars: [{ label: "Budget 2026-27", from: 12, to: 18, kind: "live" }, { label: "Maritime doctrine", from: 19, to: 25, kind: "scheduled" }] },
        { name: "Top Stories 3", bars: [{ label: "Afghan transit trade", from: 12, to: 15, kind: "ended" }, { label: "Afghan transit trade", from: 16, to: 16, kind: "expired" }] },
        { name: "Top Stories 4", bars: [{ label: "Future warfare readout", from: 12, to: 25, kind: "live" }] },
        { name: "Editor's pick 1", bars: [{ label: "Crisis hotlines in South Asia", from: 12, to: 25, kind: "live" }] },
        { name: "Editor's pick 2", bars: [{ label: "Strategic culture", from: 12, to: 25, kind: "live" }] },
        { name: "Editor's pick 3", bars: [] },
      ]} />
    </DashShell>
  );
}
