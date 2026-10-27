import clsx from "clsx";

export type Bar = { label: string; from: number; to: number; kind: "live" | "scheduled" | "expired" | "ended" | "hold" };
const K: Record<Bar["kind"], string> = { live: "bg-brand-700 text-white", scheduled: "bg-info-50 text-info-700 ring-1 ring-info-700/30", expired: "bg-danger-50 text-danger-700 ring-1 ring-danger-700/40", ended: "bg-canvas text-ink-500 ring-1 ring-line", hold: "bg-attn-50 text-attn-700 ring-1 ring-attn-700/30 [background-image:repeating-linear-gradient(45deg,transparent_0_6px,rgb(91_63_196/0.08)_6px_12px)]" };

export function Gantt({ days, start, today, rows, legend }: { days: number; start: number; today: number; rows: { name: string; bars: Bar[] }[]; legend: [Bar["kind"], string][] }) {
  return (
    <div>
      <div className="overflow-x-auto no-scrollbar rounded-[22px] bg-white shadow-soft">
        <div className="min-w-[860px] p-4">
          <div className="grid gap-y-1.5" style={{ gridTemplateColumns: `180px repeat(${days}, minmax(0,1fr))` }}>
            <div />{Array.from({ length: days }, (_, i) => <div key={i} className={clsx("text-center text-[11.5px] font-semibold py-1.5 rounded-md tabular-nums", start + i === today ? "bg-brand-800 text-white" : "text-ink-500")}>{start + i}</div>)}
            {rows.map((r) => (
              <div key={r.name} className="contents">
                <div className="text-[13px] font-semibold text-ink-700 pr-3 py-2 truncate sticky left-0 bg-white">{r.name}</div>
                <div className="relative h-10 rounded-lg bg-canvas/60" style={{ gridColumn: `2 / span ${days}` }}>
                  <div className="absolute inset-y-0 w-0.5 bg-brand-500/40" style={{ left: `${((today - start + 0.5) / days) * 100}%` }} />
                  {r.bars.map((b) => <div key={b.label + b.from} title={b.label} className={clsx("absolute top-1 bottom-1 rounded-md px-2 text-[12px] font-semibold flex items-center truncate", K[b.kind])} style={{ left: `calc(${((b.from - start) / days) * 100}% + 2px)`, width: `calc(${((b.to - b.from + 1) / days) * 100}% - 4px)` }}>{b.label}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-[12.5px] text-ink-600">{legend.map(([k, l]) => <span key={k} className="inline-flex items-center gap-2"><span className={clsx("w-5 h-3 rounded", K[k])} />{l}</span>)}</div>
    </div>
  );
}
