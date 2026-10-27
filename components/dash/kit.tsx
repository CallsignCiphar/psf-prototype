import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, CircleX, Clock, type LucideIcon } from "lucide-react";

export function PageHead({ title, desc, crumbs, actions, badge }: { title: ReactNode; desc?: ReactNode; crumbs?: { label: string; href?: string }[]; actions?: ReactNode; badge?: ReactNode }) {
  return (
    <div className="mb-6 sm:mb-8">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[13px] text-ink-500 mb-3 flex-wrap">
          {crumbs.map((c, i) => <span key={i} className="flex items-center gap-1">{i > 0 && <ChevronRight className="size-3.5 opacity-60" />}{c.href ? <Link href={c.href} className="hover:text-brand-800 font-medium">{c.label}</Link> : <span className="text-ink-800 font-medium">{c.label}</span>}</span>)}
        </nav>
      )}
      {(title || actions) && <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap"><h1 className="font-serif text-[28px] sm:text-[34px] leading-tight font-semibold tracking-[-0.02em] text-balance">{title}</h1>{badge}</div>
          {desc && <p className="mt-1.5 text-[15px] text-ink-500">{desc}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
      </div>}
    </div>
  );
}

export function Card({ title, desc, action, children, className, pad = true }: { title?: ReactNode; desc?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={clsx("bg-white rounded-[22px] shadow-soft min-w-0", className)}>
      {title && (
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-5">
          <div className="min-w-0"><h2 className="font-semibold text-[16.5px] text-ink-900">{title}</h2>{desc && <p className="text-[13px] text-ink-500 mt-0.5">{desc}</p>}</div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={clsx(pad && "p-5 sm:p-6", title && pad && "pt-4")}>{children}</div>
    </section>
  );
}

export function Stat({ label, value, delta, sub, icon: I, tone = "white", href }: { label: string; value: ReactNode; delta?: string; sub?: ReactNode; icon?: LucideIcon; tone?: "white" | "brand" | "mint"; href?: string }) {
  const up = delta?.startsWith("+");
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className={clsx("text-[13px] font-medium", tone === "brand" ? "text-white/70" : "text-ink-500")}>{label}</p>
        {I && <span className={clsx("size-9 rounded-xl grid place-items-center shrink-0", tone === "brand" ? "bg-white/12 text-mint-300" : "bg-mint-100 text-brand-800")}><I className="size-[18px]" /></span>}
      </div>
      <p className="mt-2 font-serif text-[30px] sm:text-[32px] leading-none font-semibold tabular-nums">{value}</p>
      <div className="mt-2.5 flex items-center gap-2 text-[13px] min-h-5">
        {delta && <span className={clsx("inline-flex items-center gap-0.5 h-6 px-2 rounded-full font-semibold", up ? (tone === "brand" ? "bg-white/12 text-mint-300" : "bg-mint-100 text-brand-800") : "bg-danger-50 text-danger-700")}>{up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}{delta}</span>}
        {sub && <span className={tone === "brand" ? "text-white/60" : "text-ink-500"}>{sub}</span>}
      </div>
    </>
  );
  const cls = clsx("block rounded-[22px] p-5 min-w-0 transition", tone === "brand" ? "bg-brand-800 text-white shadow-lift" : tone === "mint" ? "bg-mint-100" : "bg-white shadow-soft", href && "hover:-translate-y-0.5 hover:shadow-lift");
  return href ? <Link href={href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

const TONES: Record<string, string> = {
  green: "bg-mint-100 text-brand-800", blue: "bg-info-50 text-info-700", violet: "bg-attn-50 text-attn-700", red: "bg-danger-50 text-danger-700", grey: "bg-canvas text-ink-600 ring-1 ring-line", dark: "bg-brand-800 text-white",
};
const STATUS_TONE: Record<string, string> = {
  Live: "green", Published: "green", Active: "green", Approved: "green", Issued: "green", Completed: "green", Connected: "green", Accept: "green", Verified: "green", On: "green", Shown: "green", Stable: "green",
  "Pending review": "blue", "In review": "blue", "Under review": "blue", Submitted: "blue", Scheduled: "blue", Pending: "blue", Screening: "blue", Invited: "blue", "In progress": "blue", Open: "blue", Watch: "blue",
  "Changes requested": "violet", "Revisions requested": "violet", "More info requested": "violet", "Editor decision needed": "violet", "Awaiting final approval": "violet", "Due soon": "violet", "Minor revisions": "violet", "Major revisions": "violet", Elevated: "violet", "Invite pending": "violet",
  Rejected: "red", Banned: "red", Revoked: "red", Overdue: "red", Crisis: "red", Reject: "red", "Permanently rejected": "red",
  Draft: "grey", Drafts: "grey", Deactivated: "grey", Expired: "grey", Ended: "grey", Archived: "grey", Withdrawn: "grey", Unassigned: "grey", Hidden: "grey", "Not connected": "grey", Off: "grey", System: "grey", Custom: "blue",
};
export function Status({ s, className }: { s: string; className?: string }) {
  const tone = TONES[STATUS_TONE[s] ?? "grey"];
  return <span className={clsx("inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap", tone, className)}><span className="size-1.5 rounded-full bg-current opacity-70" />{s}</span>;
}
export function Tag({ children, tone = "grey" }: { children: ReactNode; tone?: keyof typeof TONES }) {
  return <span className={clsx("inline-flex items-center h-6 px-2 rounded-md text-[12px] font-semibold whitespace-nowrap", TONES[tone])}>{children}</span>;
}

export function KV({ items, cols = 1 }: { items: [string, ReactNode][]; cols?: 1 | 2 }) {
  return (
    <dl className={clsx("grid gap-x-6", cols === 2 ? "sm:grid-cols-2" : "")}>
      {items.map(([k, v]) => <div key={k} className="flex justify-between sm:block gap-4 py-2.5 border-b border-line last:border-0 sm:last:border-b min-w-0"><dt className="text-[13px] text-ink-500 shrink-0">{k}</dt><dd className="text-[14.5px] font-medium text-ink-900 sm:mt-0.5 text-right sm:text-left break-words min-w-0">{v}</dd></div>)}
    </dl>
  );
}

export type Step = { t: string; d?: string; s: "done" | "now" | "todo" | "bad" };
export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative">
      {steps.map((s, i) => (
        <li key={s.t + i} className="relative flex gap-3.5 pb-5 last:pb-0">
          {i < steps.length - 1 && <span className={clsx("absolute left-[15px] top-8 bottom-0 w-0.5", s.s === "done" ? "bg-brand-500" : "bg-line")} aria-hidden />}
          <span className={clsx("relative z-10 size-8 shrink-0 rounded-full grid place-items-center", { done: "bg-brand-700 text-white", now: "bg-mint-100 text-brand-800 ring-4 ring-mint-100/60", todo: "bg-white ring-1 ring-line-strong", bad: "bg-danger-50 text-danger-700" }[s.s])}>
            {s.s === "done" ? <Check className="size-4" strokeWidth={2.5} /> : s.s === "bad" ? <CircleX className="size-4" /> : s.s === "now" ? <Clock className="size-4" /> : <span className="size-1.5 rounded-full bg-ink-300" />}
          </span>
          <div className="pt-1 min-w-0"><p className={clsx("font-semibold text-[14.5px]", s.s === "todo" && "text-ink-500")}>{s.t}</p>{s.d && <p className="text-[13px] text-ink-500">{s.d}</p>}</div>
        </li>
      ))}
    </ol>
  );
}

export function Empty({ icon: I, title, desc, action }: { icon: LucideIcon; title: string; desc: string; action?: ReactNode }) {
  return (
    <div className="py-14 px-6 text-center">
      <span className="mx-auto size-16 rounded-3xl bg-mint-100 text-brand-800 grid place-items-center"><I className="size-8" /></span>
      <p className="mt-5 font-serif text-[24px] font-semibold">{title}</p>
      <p className="mt-1.5 text-ink-600 max-w-sm mx-auto">{desc}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Note({ icon: I, title, children, tone = "mint" }: { icon: LucideIcon; title: string; children: ReactNode; tone?: "mint" | "violet" | "red" | "blue" }) {
  return (
    <div className={clsx("flex gap-3.5 rounded-[20px] p-4 sm:p-5", { mint: "bg-mint-100 text-brand-900", violet: "bg-attn-50 text-ink-800", red: "bg-danger-50 text-ink-800", blue: "bg-info-50 text-ink-800" }[tone])}>
      <span className={clsx("size-10 rounded-xl grid place-items-center shrink-0 bg-white", { mint: "text-brand-700", violet: "text-attn-700", red: "text-danger-700", blue: "text-info-700" }[tone])}><I className="size-5" /></span>
      <div className="min-w-0"><p className="font-semibold">{title}</p><div className="text-[14.5px] mt-0.5 leading-relaxed opacity-90">{children}</div></div>
    </div>
  );
}

export function Initials({ i, size = 36, tone = "mint" }: { i: string; size?: number; tone?: "mint" | "brand" | "grey" }) {
  return <span style={{ width: size, height: size, fontSize: size * 0.36 }} className={clsx("rounded-full grid place-items-center font-bold shrink-0", { mint: "bg-mint-100 text-brand-800", brand: "bg-brand-800 text-white", grey: "bg-canvas text-ink-600 ring-1 ring-line" }[tone])}>{i}</span>;
}

export function Person({ i, name, sub }: { i: string; name: ReactNode; sub?: ReactNode }) {
  return <span className="flex items-center gap-3 min-w-0"><Initials i={i} /><span className="min-w-0"><span className="block font-semibold text-[14.5px] truncate">{name}</span>{sub && <span className="block text-[13px] text-ink-500 truncate">{sub}</span>}</span></span>;
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <section className="mt-8 first:mt-0"><div className="flex items-center justify-between gap-3 mb-4"><h2 className="font-semibold text-[18px]">{title}</h2>{action}</div>{children}</section>;
}

/* Static horizontal bars, sequential single hue. Each row carries its value as text. */
export function BarList({ rows, total }: { rows: [string, number][]; total?: number }) {
  const max = total ?? Math.max(...rows.map((r) => r[1]));
  return (
    <ul className="space-y-3">
      {rows.map(([l, v]) => (
        <li key={l} title={`${l}: ${v.toLocaleString("en-GB")}`}>
          <div className="flex justify-between gap-3 text-[14px]"><span className="text-ink-700 truncate">{l}</span><span className="font-semibold tabular-nums text-ink-900">{v.toLocaleString("en-GB")}</span></div>
          <div className="mt-1.5 h-2 rounded-full bg-canvas overflow-hidden"><div className="h-full rounded-full bg-brand-600" style={{ width: `${Math.max(3, (v / max) * 100)}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}
