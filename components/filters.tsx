"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowDownUp, Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

export type SelectDef = { key: string; label: string; options: string[]; multi?: boolean; searchable?: boolean };
export type FilterState = { q: string; sel: Record<string, string[]>; seg: string; tog: Record<string, boolean>; sort: string };

export function useFilters(init?: Partial<FilterState>) {
  const [state, setState] = useState<FilterState>({ q: "", sel: {}, seg: "", tog: {}, sort: "", ...init });
  return [state, setState] as const;
}

function useOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) cb(); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
}

function Dropdown({ def, value, onChange }: { def: SelectDef; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useOutside(ref, () => setOpen(false));
  const opts = def.options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  const toggle = (o: string) => onChange(def.multi ? (value.includes(o) ? value.filter((x) => x !== o) : [...value, o]) : value[0] === o ? [] : [o]);
  const on = value.length > 0;
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox"
        className={clsx("h-10 pl-4 pr-3 inline-flex items-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition",
          on ? "bg-brand-800 text-white" : "bg-canvas text-ink-700 ring-1 ring-line hover:ring-brand-300")}>
        {def.label}{on && <span className={clsx("min-w-5 h-5 px-1.5 rounded-full text-[11px] grid place-items-center", "bg-white/20")}>{def.multi ? value.length : value[0]}</span>}
        <ChevronDown className={clsx("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 z-30 w-64 card shadow-pop ring-1 ring-line p-2 animate-fade-in" role="listbox" aria-multiselectable={def.multi}>
          {(def.searchable || def.options.length > 8) && (
            <div className="relative mb-2"><Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${def.label.toLowerCase()}`} className="w-full h-10 pl-9 pr-3 rounded-xl bg-canvas text-sm outline-none focus:ring-2 focus:ring-brand-300" /></div>
          )}
          <ul className="max-h-64 overflow-y-auto">
            {opts.map((o) => {
              const sel = value.includes(o);
              return (
                <li key={o}>
                  <button type="button" onClick={() => toggle(o)} role="option" aria-selected={sel} className="w-full flex items-center gap-3 h-10 px-3 rounded-xl text-sm text-left hover:bg-brand-50">
                    <span className={clsx("size-5 rounded-md grid place-items-center ring-1 shrink-0", sel ? "bg-brand-800 ring-brand-800 text-white" : "ring-line-strong")}>{sel && <Check className="size-3.5" />}</span>{o}
                  </button>
                </li>
              );
            })}
          </ul>
          {value.length > 0 && <button type="button" onClick={() => onChange([])} className="mt-1 w-full h-9 rounded-xl text-sm font-medium text-brand-700 hover:bg-brand-50">Clear</button>}
        </div>
      )}
    </div>
  );
}

export function FilterBar({ state, setState, search, selects = [], segments, toggles = [], sorts = [], count, noun = "results" }: {
  state: FilterState; setState: (s: FilterState) => void; search?: string; selects?: SelectDef[];
  segments?: { label?: string; options: string[] }; toggles?: { key: string; label: string }[]; sorts?: string[]; count?: number; noun?: string;
}) {
  const [sheet, setSheet] = useState(false);
  const activeChips = useMemo(() => {
    const c: { label: string; clear: () => void }[] = [];
    for (const d of selects) for (const v of state.sel[d.key] ?? []) c.push({ label: `${d.label}: ${v}`, clear: () => setState({ ...state, sel: { ...state.sel, [d.key]: (state.sel[d.key] ?? []).filter((x) => x !== v) } }) });
    for (const t of toggles) if (state.tog[t.key]) c.push({ label: t.label, clear: () => setState({ ...state, tog: { ...state.tog, [t.key]: false } }) });
    if (state.q) c.push({ label: `"${state.q}"`, clear: () => setState({ ...state, q: "" }) });
    return c;
  }, [state, selects, toggles, setState]);
  const clearAll = () => setState({ ...state, q: "", sel: {}, tog: {} });
  const nActive = activeChips.length;

  const Controls = ({ stacked }: { stacked?: boolean }) => (
    <>
      {segments && (
        <div role="group" aria-label={segments.label ?? "Range"} className={clsx("flex items-center gap-1 rounded-full bg-canvas p-1 ring-1 ring-line", stacked && "w-full overflow-x-auto no-scrollbar")}>
          {segments.options.map((o) => (
            <button key={o} type="button" onClick={() => setState({ ...state, seg: o })} aria-pressed={state.seg === o}
              className={clsx("h-8 px-3.5 rounded-full text-sm font-medium whitespace-nowrap transition", state.seg === o ? "bg-white text-brand-800 shadow-soft" : "text-ink-600 hover:text-brand-800")}>{o}</button>
          ))}
        </div>
      )}
      {selects.map((d) => (
        stacked ? (
          <fieldset key={d.key} className="w-full">
            <legend className="text-sm font-semibold text-ink-900 mb-2">{d.label}</legend>
            <div className="flex flex-wrap gap-2">
              {d.options.map((o) => { const on = (state.sel[d.key] ?? []).includes(o); return (
                <button key={o} type="button" aria-pressed={on} onClick={() => { const cur = state.sel[d.key] ?? []; setState({ ...state, sel: { ...state.sel, [d.key]: d.multi ? (on ? cur.filter((x) => x !== o) : [...cur, o]) : on ? [] : [o] } }); }}
                  className={clsx("h-9 px-3.5 rounded-full text-sm font-medium transition", on ? "bg-brand-800 text-white" : "bg-canvas ring-1 ring-line text-ink-700")}>{o}</button>
              ); })}
            </div>
          </fieldset>
        ) : (
          <Dropdown key={d.key} def={d} value={state.sel[d.key] ?? []} onChange={(v) => setState({ ...state, sel: { ...state.sel, [d.key]: v } })} />
        )
      ))}
      {toggles.map((t) => (
        <label key={t.key} className={clsx("inline-flex items-center gap-2.5 h-10 text-sm font-medium text-ink-700 cursor-pointer select-none", stacked ? "w-full justify-between" : "px-2")}>
          {stacked && t.label}
          <button type="button" role="switch" aria-checked={!!state.tog[t.key]} onClick={() => setState({ ...state, tog: { ...state.tog, [t.key]: !state.tog[t.key] } })}
            className={clsx("relative w-10 h-6 rounded-full transition", state.tog[t.key] ? "bg-brand-700" : "bg-ink-300")}>
            <span className={clsx("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", state.tog[t.key] ? "left-[18px]" : "left-0.5")} />
          </button>
          {!stacked && t.label}
        </label>
      ))}
    </>
  );

  return (
    <div className="card p-3 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {search !== undefined && (
          <div className="relative flex-1 min-w-[180px] lg:max-w-xs">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
            <input value={state.q} onChange={(e) => setState({ ...state, q: e.target.value })} placeholder={search} aria-label={search}
              className="w-full h-11 sm:h-10 pl-10 pr-4 rounded-full bg-canvas ring-1 ring-line text-[15px] sm:text-sm outline-none focus:ring-2 focus:ring-brand-300 placeholder:text-ink-400" />
          </div>
        )}
        <div className="hidden lg:flex items-center gap-2 flex-wrap"><Controls /></div>
        {(selects.length > 0 || toggles.length > 0 || segments) && <button type="button" onClick={() => setSheet(true)} className="lg:hidden h-11 px-4 inline-flex items-center gap-2 rounded-full bg-canvas ring-1 ring-line text-sm font-semibold text-ink-800">
          <SlidersHorizontal className="size-4" />Filters{nActive > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-brand-800 text-white text-[11px] grid place-items-center">{nActive}</span>}
        </button>}
        {sorts.length > 0 && (
          <label className="ml-auto inline-flex items-center gap-2 h-11 sm:h-10 pl-3.5 pr-2 rounded-full bg-canvas ring-1 ring-line text-sm font-medium text-ink-700">
            <ArrowDownUp className="size-4 text-ink-400" aria-hidden /><span className="sr-only">Sort</span>
            <select value={state.sort || sorts[0]} onChange={(e) => setState({ ...state, sort: e.target.value })} className="bg-transparent outline-none pr-1 cursor-pointer">
              {sorts.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        )}
      </div>
      {(nActive > 0 || count !== undefined) && (
        <div className="mt-3 pt-3 border-t border-line flex items-center gap-2 flex-wrap">
          {count !== undefined && <span className="text-sm text-ink-500 mr-1"><span className="font-semibold text-ink-800 tabular-nums">{count}</span> {noun}</span>}
          {activeChips.map((c) => (
            <button key={c.label} type="button" onClick={c.clear} className="h-8 pl-3 pr-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-800 text-[13px] font-medium hover:bg-brand-100">{c.label}<X className="size-3.5" /></button>
          ))}
          {nActive > 0 && <button type="button" onClick={clearAll} className="h-8 px-2 text-[13px] font-semibold text-ink-500 hover:text-ink-900">Clear all</button>}
        </div>
      )}

      {sheet && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink-900/50 animate-fade-in" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] bg-white rounded-t-[28px] shadow-pop flex flex-col animate-fade-in">
            <div className="flex items-center justify-between px-5 h-16 border-b border-line">
              <span className="font-semibold text-lg">Filters</span>
              <button type="button" onClick={() => setSheet(false)} aria-label="Close filters" className="size-11 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6"><Controls stacked /></div>
            <div className="p-4 border-t border-line grid grid-cols-2 gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button type="button" onClick={clearAll} className="h-12 rounded-xl ring-1 ring-line-strong font-medium">Clear all</button>
              <button type="button" onClick={() => setSheet(false)} className="h-12 rounded-xl bg-brand-800 text-white font-semibold">Show {count ?? ""} {noun}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
