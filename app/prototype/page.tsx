import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, CircleCheck, Clock3 } from "lucide-react";
import { GROUPS } from "@/lib/routes";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Prototype index" };

export default function PrototypeIndex() {
  const all = GROUPS.flatMap((g) => g.screens);
  const done = all.filter((s) => s.done).length;
  return (
    <div className="min-h-screen bg-canvas">
      <header className="bg-brand-900 text-white rounded-b-[32px]">
        <div className="container-site py-10 sm:py-14">
          <div className="flex items-center gap-3">
            <span className="size-14 rounded-2xl bg-white p-1.5"><Image src="/psf-logo.png" alt="" width={52} height={52} className="size-full object-contain" /></span>
            <span className="font-serif text-xl font-semibold">Pakistan Strategic Forum</span>
          </div>
          <p className="mt-8 eyebrow text-mint-300">Clickable prototype · responsive · sample content</p>
          <h1 className="mt-2 font-serif text-[34px] sm:text-5xl font-semibold leading-tight">Every screen, in one place</h1>
          <p className="mt-3 text-white/75 max-w-2xl text-[17px]">Open any screen below, or start at an entry point and click through. {done} of {all.length} screens are built, plus {all.reduce((n, x) => n + (x.states?.length ?? 0), 0)} alternative states. Every button and form leads to the next step of its flow.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className={btn("light", "md", "rounded-full")}>Start at the homepage<ArrowRight className="size-4" /></Link>
            <Link href="/join" className={btn("outline-light", "md", "rounded-full")}>Contributor signup</Link>
            <Link href="/portal" className={btn("outline-light", "md", "rounded-full")}>Contributor portal</Link>
            <Link href="/admin" className={btn("outline-light", "md", "rounded-full")}>Admin dashboard</Link>
          </div>
        </div>
      </header>
      <nav aria-label="Jump to section" className="sticky top-0 z-20 bg-canvas/90 backdrop-blur border-b border-line">
        <div className="container-site flex gap-2 overflow-x-auto no-scrollbar py-3">
          {GROUPS.map((g) => <a key={g.key} href={`#${g.key}`} className="shrink-0 h-10 px-4 rounded-full bg-white shadow-soft text-sm font-semibold text-ink-700 hover:text-brand-800 inline-flex items-center gap-2">{g.title}<span className="text-xs text-ink-400 tabular-nums">{g.screens.length}</span></a>)}
        </div>
      </nav>
      <main className="container-site py-10 sm:py-14 space-y-12">
        {GROUPS.map((g) => (
          <section key={g.key} id={g.key} className="scroll-mt-20">
            <div className="flex items-end justify-between gap-4 pb-4 mb-5 border-b border-line">
              <div><h2 className="font-serif text-2xl sm:text-[28px] font-semibold">{g.title}</h2><p className="text-ink-500 mt-1">{g.desc}</p></div>
              <span className="text-sm text-ink-500 shrink-0">{g.screens.filter((s) => s.done).length} / {g.screens.length} done</span>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {g.screens.map((s) => (
                <li key={s.path} className="card p-4 flex flex-col gap-3">
                  <Link href={s.path} className="group flex items-start justify-between gap-3">
                    <span><span className="block font-semibold text-ink-900 group-hover:text-brand-700">{s.title}</span><span className="block text-[13px] text-ink-400 font-mono mt-0.5 break-all">{s.path}</span></span>
                    {s.done ? <CircleCheck className="size-5 text-brand-500 shrink-0" aria-label="Redesigned" /> : <Clock3 className="size-5 text-ink-300 shrink-0" aria-label="In progress" />}
                  </Link>
                  {s.states && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-ink-500 mr-1 self-center">States:</span>
                      {s.states.map((st) => <Link key={st.query} href={`${s.path}${st.query}`} className="h-7 px-2.5 inline-flex items-center rounded-full bg-brand-50 text-brand-800 text-xs font-medium hover:bg-brand-100">{st.label}</Link>)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
