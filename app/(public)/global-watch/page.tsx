import type { Metadata } from "next";
import { PageHero } from "@/components/page";
import { GlobalWatch } from "@/components/globe/GlobalWatch";

export const metadata: Metadata = { title: "Global Watch" };

export default function GlobalWatchPage() {
  return (
    <>
      <PageHero compact variant="mint" crumbs={[{ label: "Global Watch" }]}
        eyebrow={<span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-mint-500 animate-pulse-dot" />Live · 212 locations</span>}
        title="Global Watch" desc="Drag the globe, tap a country, and see its status brief alongside our latest articles, reports, research and newsroom updates." />
      <section className="container-site mt-8"><GlobalWatch /></section>
    </>
  );
}
