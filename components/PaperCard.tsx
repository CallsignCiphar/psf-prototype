import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { RESEARCH } from "@/lib/data";
import { Pill } from "./ui";

export function PaperCard({ p, big }: { p: (typeof RESEARCH)[number]; big?: boolean }) {
  return (
    <Link href={`/research/${p.slug}`} className={`group card card-hover flex flex-col ${big ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
      <div className="flex items-center justify-between gap-2"><Pill tone="brand" className="shrink-0"><BadgeCheck className="size-3.5" />Peer-reviewed</Pill><span className="text-xs text-ink-400 font-mono truncate min-w-0">{p.ref}</span></div>
      <p className="mt-4 eyebrow text-ink-500">{p.category}</p>
      <h3 className={`mt-1.5 font-serif leading-snug font-semibold text-ink-900 group-hover:text-brand-700 ${big ? "text-[26px] sm:text-[30px]" : "text-xl"}`}>{p.title}</h3>
      <p className="mt-2 text-[15px] text-ink-600 leading-relaxed line-clamp-3">{p.abstract}</p>
      <div className="mt-auto pt-5 flex items-center justify-between text-[13px] text-ink-500 border-t border-line"><span className="truncate pr-2">{p.authors}</span><span className="shrink-0">{p.date} · {p.pages} pp</span></div>
    </Link>
  );
}

