import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/lists/SearchResults";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <section className="container-site pt-8 sm:pt-12">
      <p className="eyebrow text-brand-600">Search</p>
      <h1 className="mt-2 font-serif text-[34px] sm:text-[48px] font-semibold tracking-[-0.02em]">Find analysis, reports and research</h1>
      <div className="mt-6 sm:mt-8"><Suspense fallback={<div className="h-16 rounded-2xl bg-white shadow-soft" />}><SearchResults /></Suspense></div>
    </section>
  );
}
