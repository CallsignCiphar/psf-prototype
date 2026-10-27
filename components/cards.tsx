import Link from "next/link";
import clsx from "clsx";
import { Clock, FileText, Play } from "lucide-react";
import { type Article, type Report, authorBySlug, subName, topicBySlug } from "@/lib/data";
import { Avatar, Cover, Label, Pill } from "./ui";

export function Byline({ a, onDark, avatar = false }: { a: Article; onDark?: boolean; avatar?: boolean }) {
  const au = authorBySlug(a.author);
  return (
    <div className={clsx("flex items-center gap-2 text-[13px] flex-wrap", onDark ? "text-white/75" : "text-ink-500")}>
      {avatar && <Avatar initials={au.initials} size={26} className={onDark ? "bg-white/15 text-white" : undefined} />}
      <span className={clsx("font-medium", onDark ? "text-white" : "text-ink-700")}>{au.name}</span>
      <span aria-hidden>·</span><span>{a.date}</span>
      <span aria-hidden>·</span><span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden />{a.read} min</span>
    </div>
  );
}

export function TopicCrumb({ a, onDark }: { a: Article; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Label label={a.label} onDark={onDark} />
      <span className={clsx("text-xs", onDark ? "text-white/40" : "text-ink-300")} aria-hidden>/</span>
      <span className={clsx("eyebrow", onDark ? "text-white/70" : "text-ink-500")}>{topicBySlug(a.topic).name}, {subName(a.topic, a.sub)}</span>
    </div>
  );
}

/* Large card with text over cover art */
export function FeatureCard({ a, className, size = "lg" }: { a: Article; className?: string; size?: "lg" | "md" }) {
  return (
    <Link href={`/articles/${a.slug}`} className={clsx("group relative flex overflow-hidden rounded-3xl card-hover shadow-soft", size === "lg" ? "min-h-[380px] sm:min-h-[460px]" : "min-h-[260px]", className)}>
      <Cover seed={a.art} dark className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/0" />
      <div className={clsx("relative mt-auto w-full", size === "lg" ? "p-6 sm:p-8" : "p-5")}>
        <TopicCrumb a={a} onDark />
        <h3 className={clsx("mt-3 font-serif font-semibold text-white leading-[1.15] tracking-[-0.01em] group-hover:underline decoration-mint-300 decoration-2 underline-offset-4",
          size === "lg" ? "text-[26px] sm:text-[34px]" : "text-xl sm:text-2xl")}>{a.title}</h3>
        {size === "lg" && <p className="mt-3 text-white/80 text-[15px] sm:text-base leading-relaxed line-clamp-2 max-w-2xl">{a.standfirst}</p>}
        <div className="mt-4"><Byline a={a} onDark avatar={size === "lg"} /></div>
      </div>
    </Link>
  );
}

/* Standard vertical card */
export function ArticleCard({ a, className, showStandfirst = true }: { a: Article; className?: string; showStandfirst?: boolean }) {
  return (
    <Link href={`/articles/${a.slug}`} className={clsx("group card card-hover overflow-hidden flex flex-col", className)}>
      <Cover seed={a.art} className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]" />
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <TopicCrumb a={a} />
        <h3 className="font-serif text-[19px] sm:text-xl leading-snug font-semibold text-ink-900 group-hover:text-brand-700">{a.title}</h3>
        {showStandfirst && <p className="text-[15px] text-ink-600 leading-relaxed line-clamp-2">{a.standfirst}</p>}
        <div className="mt-auto pt-2"><Byline a={a} /></div>
      </div>
    </Link>
  );
}

/* Compact horizontal row */
export function ArticleRow({ a, index, className }: { a: Article; index?: number; className?: string }) {
  return (
    <Link href={`/articles/${a.slug}`} className={clsx("group flex gap-4 rounded-2xl p-2 -m-2 hover:bg-white/70", className)}>
      {index !== undefined ? (
        <span className="font-serif text-3xl font-semibold text-brand-300 w-8 shrink-0 tabular-nums leading-none pt-1">{index}</span>
      ) : (
        <Cover seed={a.art} className="size-20 sm:w-28 sm:h-20 rounded-xl shrink-0" />
      )}
      <div className="min-w-0">
        <Label label={a.label} />
        <h4 className="mt-1 font-semibold text-[15px] sm:text-base leading-snug text-ink-900 group-hover:text-brand-700 line-clamp-3">{a.title}</h4>
        <p className="mt-1 text-[13px] text-ink-500">{authorBySlug(a.author).name} · {a.read} min</p>
      </div>
    </Link>
  );
}

export function ReportCard({ r, className }: { r: Report; className?: string }) {
  return (
    <Link href={`/reports/${r.slug}`} className={clsx("group card card-hover overflow-hidden flex flex-col", className)}>
      <div className="relative aspect-[4/3]">
        <Cover seed={r.art} kind="grid" dark className="absolute inset-0" />
        <span className="absolute left-4 top-4"><Pill tone="dark">{r.category}</Pill></span>
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/95 text-brand-800 text-xs font-semibold"><FileText className="size-3.5" />PDF · {r.pages} pages</span>
      </div>
      <div className="p-5">
        <p className="text-[13px] text-ink-500">{r.date}</p>
        <h3 className="mt-1 font-serif text-lg leading-snug font-semibold text-ink-900 group-hover:text-brand-700">{r.title}</h3>
      </div>
    </Link>
  );
}

export function VideoCard({ v, className }: { v: { id: string; title: string; length: string; date: string; art: number }; className?: string }) {
  return (
    <Link href={`/videos#${v.id}`} className={clsx("group block", className)}>
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-soft">
        <Cover seed={v.art} kind="waves" dark className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 grid place-items-center"><span className="size-14 rounded-full bg-white/95 text-brand-800 grid place-items-center shadow-lift transition group-hover:scale-110"><Play className="size-6 translate-x-0.5" fill="currentColor" /></span></span>
        <span className="absolute right-3 bottom-3 h-6 px-2 rounded-md bg-brand-950/80 text-white text-xs font-semibold grid place-items-center tabular-nums">{v.length}</span>
      </div>
      <h4 className="mt-3 font-semibold text-[15px] leading-snug text-ink-900 group-hover:text-brand-700 line-clamp-2">{v.title}</h4>
      <p className="text-[13px] text-ink-500 mt-1">{v.date}</p>
    </Link>
  );
}
