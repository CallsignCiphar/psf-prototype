import type { Metadata } from "next";
import { Play, Youtube } from "lucide-react";
import { PageHero } from "@/components/page";
import { Cover } from "@/components/ui";
import { VideoBrowser } from "@/components/lists/VideoBrowser";
import { SITE } from "@/lib/data";

export const metadata: Metadata = { title: "Videos" };

export default function VideosPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Videos" }]} eyebrow="Watch" title="Videos" art={31}
        desc="Explainers, interviews, event recordings and short map briefs from Pakistan Strategic Forum."
        actions={<a href={SITE.social.find((s) => s.key === "youtube")?.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-brand-900 font-semibold shadow-lift hover:bg-mint-100"><Youtube className="size-5" />Subscribe on YouTube</a>} />
      <section className="container-site mt-8 sm:mt-10">
        <a href="#v1" className="group grid lg:grid-cols-12 gap-0 rounded-[28px] overflow-hidden bg-brand-900 text-white shadow-lift">
          <span className="relative lg:col-span-8 aspect-video block">
            <Cover seed={30} kind="waves" dark className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 grid place-items-center"><span className="size-20 rounded-full bg-white text-brand-800 grid place-items-center shadow-pop transition group-hover:scale-110"><Play className="size-8 translate-x-0.5" fill="currentColor" /></span></span>
          </span>
          <span className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center">
            <span className="eyebrow text-mint-300">Featured</span>
            <span className="mt-3 font-serif text-[26px] sm:text-[30px] leading-tight font-semibold">Air defence in depth, explained in 6 minutes</span>
            <span className="mt-3 text-white/75">How radar coverage, interceptor basing and ground systems fit together, with the gaps that remain.</span>
            <span className="mt-5 text-sm text-white/60">Explainer · 6:12 · 16 Oct 2026</span>
          </span>
        </a>
      </section>
      <section className="container-site mt-12"><VideoBrowser /></section>
    </>
  );
}
