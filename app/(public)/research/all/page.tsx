import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/page";
import { ResearchList } from "@/components/lists/ResearchList";

export const metadata: Metadata = { title: "All research" };

export default function AllResearch() {
  return (
    <>
      <PageHero compact variant="mint" crumbs={[{ label: "Research", href: "/research" }, { label: "All research" }]} eyebrow="Library" title="All research"
        desc="Every peer-reviewed paper, policy brief and emerging scholar paper we have published." />
      <section className="container-site mt-8"><Suspense><ResearchList /></Suspense></section>
    </>
  );
}
