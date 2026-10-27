"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FilterBar, useFilters, type SelectDef } from "@/components/filters";
import { toast } from "./Shell";

/* ---------- Dialog / drawer ---------- */
export function Dialog({ trigger, triggerClass, title, desc, children, confirm, cancel = "Cancel", size = "md", side, href, openOnLoad }: {
  trigger: ReactNode; triggerClass?: string; title: ReactNode; desc?: ReactNode; children?: ReactNode;
  confirm?: { label: string; tone?: "primary" | "danger"; toast?: string }; cancel?: string | null; size?: "md" | "lg" | "xl"; side?: boolean; href?: string; openOnLoad?: boolean;
}) {
  const [open, setOpen] = useState(!!openOnLoad);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    ref.current?.querySelector<HTMLElement>("input,textarea,select,button[data-autofocus]")?.focus();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClass}>{trigger}</button>
      {open && (
        <div className={clsx("fixed inset-0 z-[70] flex", side ? "justify-end" : "items-end sm:items-center justify-center sm:p-4")} role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined}>
          <div className="absolute inset-0 bg-ink-900/50 animate-fade-in" onClick={() => setOpen(false)} />
          <div ref={ref} className={clsx("relative bg-white shadow-pop animate-fade-in flex flex-col max-h-[92dvh]",
            side ? "w-full sm:w-[480px] h-full max-h-none sm:rounded-l-[28px] rounded-t-[28px] sm:rounded-tr-none mt-auto sm:mt-0" : "w-full rounded-t-[28px] sm:rounded-[28px]",
            !side && { md: "sm:max-w-[560px]", lg: "sm:max-w-[880px]", xl: "sm:max-w-[1100px]" }[size])}>
            <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6">
              <div className="min-w-0"><h2 className="font-serif text-[22px] sm:text-[24px] leading-tight font-semibold">{title}</h2>{desc && <p className="mt-1.5 text-[14.5px] text-ink-600 leading-relaxed">{desc}</p>}</div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="size-10 -mr-2 shrink-0 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button>
            </div>
            <form className="flex flex-col min-h-0 flex-1" onSubmit={(e) => { e.preventDefault(); setOpen(false); if (confirm?.toast) toast(confirm.toast); if (href) window.location.assign(href); }}>
              {children ? <div className="px-5 sm:px-7 py-5 overflow-y-auto flex-1 space-y-4">{children}</div> : <div className="h-5" />}
              {(confirm || cancel) && (
                <div className="px-5 sm:px-7 py-4 border-t border-line flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  {cancel && <button type="button" onClick={() => setOpen(false)} className="h-11 px-5 rounded-full font-semibold text-ink-700 ring-1 ring-line-strong hover:bg-canvas">{cancel}</button>}
                  {confirm && <button className={clsx("h-11 px-6 rounded-full font-semibold text-white", confirm.tone === "danger" ? "bg-danger-700 hover:bg-[#9a1d14]" : "bg-brand-800 hover:bg-brand-700")}>{confirm.label}</button>}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* A button that just confirms with a toast. */
export function ActionButton({ children, className, msg, href }: { children: ReactNode; className?: string; msg: string; href?: string }) {
  return <button type="button" className={className} onClick={() => { toast(msg); if (href) setTimeout(() => window.location.assign(href), 600); }}>{children}</button>;
}

/* ---------- Pills / tabs ---------- */
export function Pills({ items, value, onChange, size = "md" }: { items: (string | [string, number | string])[]; value: string; onChange: (v: string) => void; size?: "sm" | "md" }) {
  return (
    <div role="tablist" className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      {items.map((it) => { const [l, n] = Array.isArray(it) ? it : [it, undefined]; const on = l === value; return (
        <button key={l} role="tab" aria-selected={on} type="button" onClick={() => onChange(l)} className={clsx("shrink-0 rounded-full font-semibold inline-flex items-center gap-2 transition", size === "sm" ? "h-9 px-3.5 text-[13px]" : "h-10 px-4 text-[14px]", on ? "bg-brand-800 text-white shadow-lift" : "bg-white text-ink-700 shadow-soft hover:text-brand-800")}>
          {l}{n !== undefined && <span className={clsx("min-w-6 h-5 px-1.5 rounded-full text-[11px] grid place-items-center tabular-nums", on ? "bg-white/20" : "bg-canvas text-ink-500")}>{n}</span>}
        </button>
      ); })}
    </div>
  );
}

export function TabPanels({ tabs, initial }: { tabs: { label: string; count?: number; content: ReactNode }[]; initial?: string }) {
  const [v, setV] = useState(initial ?? tabs[0].label);
  return <div><Pills items={tabs.map((t) => (t.count !== undefined ? [t.label, t.count] : t.label))} value={v} onChange={setV} /><div className="mt-5">{tabs.find((t) => t.label === v)?.content}</div></div>;
}

export function Switch({ on: init = false, label, disabled }: { on?: boolean; label: string; disabled?: boolean }) {
  const [on, setOn] = useState(init);
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} disabled={disabled} onClick={() => setOn(!on)} className={clsx("relative w-12 h-7 rounded-full shrink-0 transition", on ? "bg-brand-700" : "bg-ink-300", disabled && "opacity-60")}>
      <span className={clsx("absolute top-1 size-5 rounded-full bg-white shadow transition-all", on ? "left-6" : "left-1")} />
    </button>
  );
}

/* ---------- Data list: tabs + filters + table (cards on mobile) ---------- */
export type Col = { key: string; label: string; className?: string; align?: "right" };
export type Row = { id: string; cells: Record<string, ReactNode>; tabs?: string[]; text?: string; f?: Record<string, string>; href?: string };

export function DataList({ cols, rows, tabs, selects = [], sorts, search, selectable, bulk = [], noun = "items", mobile, total, pages = 3, empty }: {
  cols: Col[]; rows: Row[]; tabs?: [string, number | string][]; selects?: SelectDef[]; sorts?: string[]; search?: string; selectable?: boolean; bulk?: string[];
  noun?: string; mobile: { title: string; meta?: string[]; end?: string; lead?: string }; total?: number; pages?: number; empty?: ReactNode;
}) {
  const [tab, setTab] = useState(tabs?.[0][0] ?? "All");
  const [f, setF] = useFilters({ sort: sorts?.[0] ?? "" });
  const [sel, setSel] = useState<string[]>([]);
  const shown = useMemo(() => rows.filter((r) =>
    (!tabs || tab === tabs[0][0] || r.tabs?.includes(tab)) &&
    (!f.q || (r.text ?? "").toLowerCase().includes(f.q.toLowerCase())) &&
    Object.entries(f.sel).every(([k, v]) => !v.length || (r.f?.[k] && v.includes(r.f[k])))
  ), [rows, tab, f, tabs]);
  const all = shown.length > 0 && shown.every((r) => sel.includes(r.id));
  const go = (r: Row) => r.href && window.location.assign(r.href);
  return (
    <div className="min-w-0">
      {tabs && <Pills items={tabs} value={tab} onChange={(t) => { setTab(t); setSel([]); }} />}
      <div className={clsx(tabs && "mt-4")}><FilterBar state={f} setState={setF} search={search} selects={selects} sorts={sorts} count={tab === (tabs?.[0][0] ?? "All") && !f.q && !Object.values(f.sel).some((v) => v.length) ? (total ?? shown.length) : shown.length} noun={noun} /></div>
      {selectable && sel.length > 0 && (
        <div className="sticky top-[72px] z-10 mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-brand-900 text-white p-2 pl-4 shadow-pop animate-fade-in">
          <span className="text-sm font-semibold mr-auto">{sel.length} selected</span>
          {bulk.map((b) => <button key={b} type="button" onClick={() => { toast(`${b}: ${sel.length} ${noun}`); setSel([]); }} className={clsx("h-9 px-3.5 rounded-full text-[13px] font-semibold", /delete|deactivate/i.test(b) ? "bg-danger-700 hover:bg-[#9a1d14]" : "bg-white/12 hover:bg-white/20")}>{b}</button>)}
          <button type="button" onClick={() => setSel([])} className="h-9 px-3 rounded-full text-[13px] font-semibold text-white/70 hover:text-white">Clear</button>
        </div>
      )}
      <div className="mt-4 bg-white rounded-[22px] shadow-soft overflow-hidden">
        {shown.length === 0 ? (empty ?? <p className="p-10 text-center text-ink-500">No {noun} match these filters.</p>) : (
          <>
            <table className="hidden md:table w-full text-[14px]">
              <thead><tr className="text-left text-[12.5px] text-ink-500 border-b border-line">
                {selectable && <th className="w-12 pl-5"><input type="checkbox" aria-label="Select all" checked={all} onChange={() => setSel(all ? [] : shown.map((r) => r.id))} className="size-4 accent-[#04411f]" /></th>}
                {cols.map((c) => <th key={c.key} className={clsx("px-4 py-3.5 font-semibold first:pl-6 last:pr-6", c.align === "right" && "text-right", c.className)}>{c.label}</th>)}
              </tr></thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.id} onClick={(e) => { if (!(e.target as HTMLElement).closest("a,button,input,label")) go(r); }} className={clsx("border-b border-line last:border-0 transition", r.href && "cursor-pointer hover:bg-brand-50/50", sel.includes(r.id) && "bg-mint-100/40")}>
                    {selectable && <td className="pl-5"><input type="checkbox" aria-label="Select row" checked={sel.includes(r.id)} onChange={() => setSel(sel.includes(r.id) ? sel.filter((x) => x !== r.id) : [...sel, r.id])} className="size-4 accent-[#04411f]" /></td>}
                    {cols.map((c) => <td key={c.key} className={clsx("px-4 py-3.5 first:pl-6 last:pr-6 align-middle", c.align === "right" && "text-right tabular-nums", c.className)}>{r.cells[c.key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="md:hidden divide-y divide-line">
              {shown.map((r) => (
                <li key={r.id} className={clsx("flex gap-3 p-4", sel.includes(r.id) && "bg-mint-100/40")}>
                  {selectable && <input type="checkbox" aria-label="Select row" checked={sel.includes(r.id)} onChange={() => setSel(sel.includes(r.id) ? sel.filter((x) => x !== r.id) : [...sel, r.id])} className="mt-1 size-5 accent-[#04411f] shrink-0" />}
                  {mobile.lead && <div className="shrink-0">{r.cells[mobile.lead]}</div>}
                  <div className="min-w-0 flex-1" onClick={() => go(r)}>
                    <div className="min-w-0">{r.cells[mobile.title]}</div>
                    {mobile.meta && <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-ink-500">{mobile.meta.map((m) => <span key={m} className="min-w-0">{r.cells[m]}</span>)}</div>}
                  </div>
                  {mobile.end && <div className="shrink-0 self-center">{r.cells[mobile.end]}</div>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {shown.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-ink-500">
          <span>Showing 1 to {shown.length} of {tab === (tabs?.[0][0] ?? "All") && !f.q ? (total ?? shown.length) : shown.length}</span>
          {pages > 1 && <div className="flex items-center gap-1"><button aria-label="Previous page" disabled className="size-9 grid place-items-center rounded-full ring-1 ring-line text-ink-300"><ChevronLeft className="size-4" /></button>{Array.from({ length: pages }, (_, i) => <button key={i} aria-current={i === 0 ? "page" : undefined} className={clsx("size-9 rounded-full text-[13px] font-semibold tabular-nums", i === 0 ? "bg-brand-800 text-white" : "ring-1 ring-line text-ink-700 hover:bg-brand-50")}>{i + 1}</button>)}<button aria-label="Next page" className="size-9 grid place-items-center rounded-full ring-1 ring-line text-ink-700 hover:bg-brand-50"><ChevronRight className="size-4" /></button></div>}
        </div>
      )}
    </div>
  );
}

/* ---------- Charts ---------- */
const nf = (n: number) => n.toLocaleString("en-GB");
/* Area/line chart, one shared y-axis, crosshair + tooltip on hover. Series colours validated (brand-600, info-700). */
export function AreaChart({ labels, series, height = 240, unit = "" }: { labels: string[]; series: { name: string; values: number[]; color?: string }[]; height?: number; unit?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 720, H = height, pl = 44, pr = 12, pt = 12, pb = 28;
  const max = Math.max(...series.flatMap((s) => s.values)) * 1.1;
  const step = Math.pow(10, Math.floor(Math.log10(max / 4)));
  const tick = Math.ceil(max / 4 / step) * step;
  const top = tick * 4;
  const x = (i: number) => pl + (i / (labels.length - 1)) * (W - pl - pr);
  const y = (v: number) => pt + (1 - v / top) * (H - pt - pb);
  const colors = ["#10703a", "#1d5fb8"];
  const fmt = (v: number) => (v >= 1000 ? `${Math.round(v / 100) / 10}k` : `${v}`);
  return (
    <div className="relative">
      {series.length > 1 && <div className="flex flex-wrap gap-4 mb-3 text-[13px] text-ink-600">{series.map((s, i) => <span key={s.name} className="inline-flex items-center gap-2"><span className="w-3 h-1 rounded-full" style={{ background: s.color ?? colors[i] }} />{s.name}</span>)}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto touch-none" role="img" aria-label={`${series.map((s) => s.name).join(" and ")} chart`}
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * W; setHover(Math.max(0, Math.min(labels.length - 1, Math.round(((px - pl) / (W - pl - pr)) * (labels.length - 1))))); }}
        onPointerLeave={() => setHover(null)}>
        {[0, 1, 2, 3, 4].map((k) => <g key={k}><line x1={pl} x2={W - pr} y1={y(k * tick)} y2={y(k * tick)} stroke="#e3e9e5" strokeDasharray={k ? "3 4" : undefined} /><text x={pl - 8} y={y(k * tick) + 4} textAnchor="end" fontSize="11" fill="#7a867f">{fmt(k * tick)}</text></g>)}
        {[0, Math.floor((labels.length - 1) / 2), labels.length - 1].map((i) => <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"} fontSize="11" fill="#7a867f">{labels[i]}</text>)}
        {series.map((s, si) => {
          const c = s.color ?? colors[si];
          const d = s.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("");
          return <g key={s.name}>{si === 0 && <path d={`${d}L${x(s.values.length - 1)},${y(0)}L${x(0)},${y(0)}Z`} fill={c} opacity="0.1" />}<path d={d} fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></g>;
        })}
        {hover !== null && <g><line x1={x(hover)} x2={x(hover)} y1={pt} y2={y(0)} stroke="#5d6a63" strokeWidth="1" />{series.map((s, si) => <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r="5" fill={s.color ?? colors[si]} stroke="#fff" strokeWidth="2" />)}</g>}
      </svg>
      {hover !== null && (
        <div className="absolute top-8 pointer-events-none bg-white rounded-xl shadow-pop ring-1 ring-line px-3 py-2 text-[12.5px] min-w-32" style={{ left: `clamp(0px, calc(${(x(hover) / W) * 100}% - 64px), calc(100% - 140px))` }}>
          <p className="font-semibold text-ink-900">{labels[hover]}</p>
          {series.map((s, si) => <p key={s.name} className="flex items-center justify-between gap-3 text-ink-600"><span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: s.color ?? colors[si] }} />{s.name}</span><span className="font-semibold text-ink-900 tabular-nums">{nf(s.values[hover])}{unit}</span></p>)}
        </div>
      )}
    </div>
  );
}

/* Day x hour heatmap, single-hue sequential ramp. */
export function Heatmap({ rows, cols, values }: { rows: string[]; cols: number; values: number[][] }) {
  const [h, setH] = useState<string | null>(null);
  const ramp = ["#f0f8f3", "#dff1e6", "#bfe3cc", "#86cba1", "#3fa96a", "#10703a", "#04411f"];
  const max = Math.max(...values.flat());
  return (
    <div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[520px]">
          {rows.map((r, ri) => (
            <div key={r} className="flex items-center gap-[2px] mb-[2px]">
              <span className="w-10 text-[12px] text-ink-500 shrink-0">{r}</span>
              {Array.from({ length: cols }, (_, c) => { const v = values[ri][c]; return <span key={c} onPointerEnter={() => setH(`${r} ${String(c).padStart(2, "0")}:00 · ${nf(v)} visitors`)} onPointerLeave={() => setH(null)} className="flex-1 h-6 rounded-[4px]" style={{ background: ramp[Math.min(6, Math.floor((v / max) * 6.99))] }} />; })}
            </div>
          ))}
          <div className="flex gap-[2px] pl-10 text-[11px] text-ink-500">{["00", "06", "12", "18"].map((t) => <span key={t} className="flex-1">{t}</span>)}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-ink-500">
        <span className="min-h-4">{h ?? "Hover a cell for the count"}</span>
        <span className="flex items-center gap-1.5">Fewer{ramp.map((c) => <span key={c} className="size-3 rounded-[3px]" style={{ background: c }} />)}More</span>
      </div>
    </div>
  );
}

export function ChartRange({ options = ["30 days", "90 days"] }: { options?: string[] }) {
  const [v, setV] = useState(options[0]);
  return <div className="inline-flex p-1 rounded-full bg-canvas">{options.map((o) => <button key={o} type="button" onClick={() => setV(o)} aria-pressed={v === o} className={clsx("h-8 px-3 rounded-full text-[13px] font-semibold", v === o ? "bg-white shadow-soft text-brand-800" : "text-ink-500")}>{o}</button>)}</div>;
}

export function LinkRow({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={clsx("block rounded-2xl hover:bg-brand-50/60 transition", className)}>{children}</Link>;
}
