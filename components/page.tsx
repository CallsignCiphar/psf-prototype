import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { Cover } from "./ui";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, onDark }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={clsx("flex items-center gap-1.5 text-[13px] flex-wrap", onDark ? "text-white/70" : "text-ink-500")}>
      <Link href="/" aria-label="Home" className={clsx("size-7 grid place-items-center rounded-full", onDark ? "hover:bg-white/10 hover:text-white" : "hover:bg-brand-50 hover:text-brand-800")}><House className="size-3.5" /></Link>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 opacity-60" aria-hidden />
          {c.href ? <Link href={c.href} className={clsx("font-medium", onDark ? "hover:text-white" : "hover:text-brand-800")}>{c.label}</Link>
            : <span aria-current="page" className={clsx("font-medium", onDark ? "text-white" : "text-ink-800")}>{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/* Hero for inner pages. Dark (brand art), mint (light) or plain. */
export function PageHero({ eyebrow, title, desc, crumbs, actions, aside, variant = "dark", art = 3, children, compact }: {
  eyebrow?: ReactNode; title: ReactNode; desc?: ReactNode; crumbs?: Crumb[]; actions?: ReactNode; aside?: ReactNode;
  variant?: "dark" | "mint" | "plain"; art?: number; children?: ReactNode; compact?: boolean;
}) {
  const dark = variant === "dark";
  return (
    <section className="sm:container-site sm:pt-5">
      <div className={clsx("relative overflow-hidden sm:rounded-[32px]", dark ? "bg-brand-900 text-white" : variant === "mint" ? "bg-mint-100" : "bg-white shadow-soft")}>
        {dark && (
          <>
            <Cover seed={art} dark kind="contour" className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/50 to-brand-950/10" />
          </>
        )}
        {variant === "mint" && <Cover seed={art} kind="contour" className="absolute inset-0 opacity-[0.12]" />}
        <div className={clsx("relative px-5 sm:px-10", compact ? "py-8 sm:py-10" : "py-10 sm:py-14")}>
          {crumbs && <Breadcrumbs items={crumbs} onDark={dark} />}
          <div className={clsx("grid gap-8 lg:grid-cols-12 items-end", crumbs && "mt-6 sm:mt-8")}>
            <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
              {eyebrow && <div className={clsx("eyebrow mb-3", dark ? "text-mint-300" : "text-brand-600")}>{eyebrow}</div>}
              <h1 className={clsx("font-serif font-semibold tracking-[-0.02em] leading-[1.08] text-balance", compact ? "text-[32px] sm:text-[44px]" : "text-[36px] sm:text-[52px]")}>{title}</h1>
              {desc && <div className={clsx("mt-4 text-[17px] sm:text-lg leading-relaxed max-w-2xl", dark ? "text-white/80" : "text-ink-600")}>{desc}</div>}
              {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
            </div>
            {aside && <div className="lg:col-span-5">{aside}</div>}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export function StatTiles({ items, onDark }: { items: [string, string][]; onDark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {items.map(([n, l]) => (
        <div key={l} className={clsx("rounded-2xl p-4", onDark ? "bg-white/10 ring-1 ring-white/15 backdrop-blur-sm" : "bg-white shadow-soft")}>
          <dt className={clsx("text-[13px]", onDark ? "text-white/70" : "text-ink-500")}>{l}</dt>
          <dd className="font-serif text-3xl font-semibold tabular-nums mt-1">{n}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Pagination({ page = 1, pages = 5, label }: { page?: number; pages?: number; label?: string }) {
  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      {label && <p className="text-sm text-ink-500">{label}</p>}
      <div className="flex items-center gap-1.5">
        <button disabled className="size-10 grid place-items-center rounded-full ring-1 ring-line text-ink-400" aria-label="Previous page"><ChevronLeft className="size-4" /></button>
        {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map((n) => (
          <button key={n} aria-current={n === page ? "page" : undefined} className={clsx("size-10 rounded-full text-sm font-semibold tabular-nums", n === page ? "bg-brand-800 text-white" : "ring-1 ring-line text-ink-700 hover:ring-brand-300 hover:bg-brand-50")}>{n}</button>
        ))}
        <button className="size-10 grid place-items-center rounded-full ring-1 ring-line text-ink-700 hover:ring-brand-300 hover:bg-brand-50" aria-label="Next page"><ChevronRight className="size-4" /></button>
      </div>
    </nav>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("font-serif text-[18px] sm:text-[19px] leading-[1.7] text-ink-700 [&_p]:mb-6 [&_h2]:font-serif [&_h2]:text-[26px] sm:[&_h2]:text-[30px] [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:text-ink-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:mb-2 [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4", className)}>
      {children}
    </div>
  );
}

export function Panel({ title, action, children, className, pad = true }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={clsx("card", className)}>
      {title && <div className="flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 sm:pt-6"><h2 className="font-semibold text-ink-900 text-[17px]">{title}</h2>{action}</div>}
      <div className={clsx(pad && "p-5 sm:p-6", title && pad && "pt-4 sm:pt-4")}>{children}</div>
    </section>
  );
}
