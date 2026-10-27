"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { geoGraticule10, geoOrthographic, geoPath, geoCentroid, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { ArrowRight, Layers, Minus, Plus, RotateCcw, Search, X } from "lucide-react";
import { ARTICLES, NEWSROOM, REPORTS, RESEARCH, TOPICS, authorBySlug } from "@/lib/data";
import { FilterBar, useFilters } from "@/components/filters";
import { Pill } from "@/components/ui";

type Level = "Crisis" | "Elevated" | "Watch" | "Stable";
const STATUS: Record<string, { level: Level; brief: string; coverage: number; capital: string }> = {
  Pakistan: { level: "Elevated", brief: "Security operations continue in North Waziristan. Economic talks with lenders resume next month.", coverage: 412, capital: "Islamabad" },
  Afghanistan: { level: "Elevated", brief: "Border crossings partly reopened. Trade talks with Islamabad continue.", coverage: 238, capital: "Kabul" },
  India: { level: "Watch", brief: "Monsoon session ends. Defence procurement announcements expected.", coverage: 141, capital: "New Delhi" },
  Iran: { level: "Elevated", brief: "Sanctions talks stalled. A joint border commission meets next month.", coverage: 96, capital: "Tehran" },
  China: { level: "Stable", brief: "CPEC phase two review under way.", coverage: 88, capital: "Beijing" },
  Yemen: { level: "Crisis", brief: "Attacks on Red Sea shipping continue.", coverage: 31, capital: "Sanaa" },
  "Saudi Arabia": { level: "Stable", brief: "Remittance and labour agreements renewed.", coverage: 44, capital: "Riyadh" },
  Sudan: { level: "Crisis", brief: "Humanitarian corridor talks continue.", coverage: 12, capital: "Khartoum" },
  Bangladesh: { level: "Watch", brief: "Election preparations under way.", coverage: 22, capital: "Dhaka" },
  "United States of America": { level: "Stable", brief: "Sustainment package for regional partners approved.", coverage: 63, capital: "Washington" },
  Russia: { level: "Watch", brief: "Energy deals with Central Asia under discussion.", coverage: 27, capital: "Moscow" },
  Turkey: { level: "Stable", brief: "Defence industry cooperation expanding.", coverage: 19, capital: "Ankara" },
  "Sri Lanka": { level: "Stable", brief: "Port access agreements under review.", coverage: 9, capital: "Colombo" },
  Ukraine: { level: "Crisis", brief: "Fighting continues on the eastern front.", coverage: 17, capital: "Kyiv" },
};
const LEVEL_FILL: Record<Level, string> = { Crisis: "#d9534a", Elevated: "#34c77b", Watch: "#86cba1", Stable: "#bfe3cc" };
const REGION_COUNTRIES: Record<string, [string, number][]> = {
  "South Asia": [["Pakistan", 412], ["Afghanistan", 238], ["India", 141], ["Bangladesh", 22], ["Sri Lanka", 9]],
  "Middle East": [["Iran", 96], ["Saudi Arabia", 44], ["Yemen", 31], ["Turkey", 19]],
  "Central Asia": [["Uzbekistan", 14], ["Tajikistan", 11], ["Kazakhstan", 8]],
  "East Asia": [["China", 88], ["Japan", 6]], Europe: [["Russia", 27], ["Ukraine", 17], ["United Kingdom", 15]],
  Africa: [["Sudan", 12], ["Egypt", 7]], Americas: [["United States of America", 63]],
};

type Feat = { type: "Feature"; id?: string; properties: { name: string }; geometry: GeoPermissibleObjects };

export function GlobalWatch() {
  const topo = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const countries = useMemo(() => (feature(topo, topo.objects.countries) as unknown as { features: Feat[] }).features, [topo]);
  const [rot, setRot] = useState<[number, number]>([-69, -25]);
  const [scale, setScale] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [layers, setLayers] = useState({ coverage: true, status: true, borders: true });
  const [layerMenu, setLayerMenu] = useState(false);
  const [tab, setTab] = useState("Articles");
  const [region, setRegion] = useState("South Asia");
  const [f, setF] = useFilters({ seg: "90 days", sel: {} });
  const [csearch, setCsearch] = useState("");
  const drag = useRef<{ x: number; y: number; r: [number, number] } | null>(null);
  const interacted = useRef(false);
  const W = 640;

  useEffect(() => { if (window.matchMedia("(min-width: 1024px)").matches) setSelected("Afghanistan"); }, []);
  useEffect(() => {
    let id: number;
    const tick = () => { if (!interacted.current) setRot((r) => [r[0] + 0.06, r[1]]); id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const proj = useMemo(() => geoOrthographic().scale((W / 2 - 8) * scale).translate([W / 2, W / 2]).rotate([rot[0], rot[1]]).clipAngle(90), [rot, scale]);
  const path = useMemo(() => geoPath(proj), [proj]);
  const focus = (name: string) => {
    const c = countries.find((x) => x.properties.name === name);
    interacted.current = true;
    setSelected(name); setTab("Articles");
    if (c) { const [lon, lat] = geoCentroid(c as never); setRot([-lon, -lat]); }
  };

  const onDown = (e: React.PointerEvent) => { interacted.current = true; drag.current = { x: e.clientX, y: e.clientY, r: rot }; (e.target as Element).setPointerCapture?.(e.pointerId); };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const k = 0.35 / scale;
    setRot([drag.current.r[0] + (e.clientX - drag.current.x) * k, Math.max(-80, Math.min(80, drag.current.r[1] - (e.clientY - drag.current.y) * k))]);
  };
  const onUp = () => { drag.current = null; };

  const info = selected ? STATUS[selected] : null;
  const items = {
    Articles: ARTICLES.slice(0, 5).map((a) => ({ title: a.title, meta: `${a.label} · ${authorBySlug(a.author).name} · ${a.date}`, href: `/articles/${a.slug}` })),
    Reports: REPORTS.slice(0, 3).map((r) => ({ title: r.title, meta: `${r.category} · ${r.date}`, href: `/reports/${r.slug}` })),
    Research: RESEARCH.map((r) => ({ title: r.title, meta: `Peer-reviewed · ${r.date}`, href: `/research/${r.slug}` })),
    Newsroom: NEWSROOM.slice(0, 4).map((n) => ({ title: n.title, meta: `${n.time} PKT · ${n.country}`, href: `/newsroom/${n.id}` })),
  } as Record<string, { title: string; meta: string; href: string }[]>;
  const matches = csearch ? Object.keys(STATUS).filter((c) => c.toLowerCase().includes(csearch.toLowerCase())).slice(0, 6) : [];

  const marker = (name: string) => {
    const c = countries.find((x) => x.properties.name === name); if (!c) return null;
    const ctr = geoCentroid(c as never); const pt = proj(ctr);
    const vis = path({ type: "Point", coordinates: ctr }) !== null;
    if (!pt || !vis) return null;
    const r = 4 + Math.sqrt(STATUS[name].coverage) * 0.7 * Math.min(scale, 1.6);
    return <g key={name} transform={`translate(${pt[0]},${pt[1]})`} className="cursor-pointer" onClick={() => focus(name)}><circle r={r * 1.9} fill="#34c77b" fillOpacity={0.18} /><circle r={r} fill={name === selected ? "#ffffff" : "#04411f"} stroke="#ffffff" strokeWidth={2} /></g>;
  };

  const Drawer = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-line">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-ink-500">{info?.capital}</p>
            <h2 className="mt-1 font-serif text-[26px] font-semibold leading-tight">{selected === "United States of America" ? "United States" : selected}</h2>
          </div>
          <button onClick={() => setSelected(null)} aria-label="Close" className="size-10 grid place-items-center rounded-full hover:bg-canvas"><X className="size-5" /></button>
        </div>
        {info ? (
          <>
            <div className="mt-3 flex items-center gap-2"><span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-semibold" style={{ background: `${LEVEL_FILL[info.level]}33`, color: info.level === "Crisis" ? "#b42318" : "#04411f" }}><span className="size-2 rounded-full" style={{ background: LEVEL_FILL[info.level] }} />{info.level}</span><span className="text-sm text-ink-500">{info.coverage} pieces · reviewed 14 Oct</span></div>
            <p className="mt-3 text-[15px] text-ink-700 leading-relaxed">{info.brief}</p>
          </>
        ) : <p className="mt-3 text-sm text-ink-500">No status brief for this country yet.</p>}
      </div>
      <div role="tablist" className="flex gap-1 px-3 pt-3 overflow-x-auto no-scrollbar">
        {Object.keys(items).map((k) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={clsx("h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap", tab === k ? "bg-brand-800 text-white" : "text-ink-600 hover:bg-canvas")}>{k}<span className="ml-1.5 opacity-60 tabular-nums">{items[k].length}</span></button>)}
      </div>
      <ul className="flex-1 overflow-y-auto p-3">
        {items[tab].map((it) => <li key={it.href}><Link href={it.href} className="group block rounded-2xl p-3 hover:bg-brand-50"><span className="block font-semibold leading-snug group-hover:text-brand-800">{it.title}</span><span className="block text-[13px] text-ink-500 mt-0.5">{it.meta}</span></Link></li>)}
      </ul>
      <div className="p-3 border-t border-line"><button className="w-full h-11 rounded-xl bg-canvas text-sm font-semibold text-brand-800 hover:bg-brand-50">Load more</button></div>
    </div>
  );

  return (
    <div>
      <FilterBar state={f} setState={setF} count={412} noun="pieces on the globe"
        selects={[
          { key: "type", label: "Content type", options: ["Articles", "Reports", "Research", "Newsroom"], multi: true },
          { key: "topic", label: "Topic", options: TOPICS.map((t) => t.name), multi: true },
          { key: "region", label: "Region", options: Object.keys(REGION_COUNTRIES), multi: true },
        ]}
        segments={{ label: "Period", options: ["7 days", "30 days", "90 days", "12 months", "All"] }} />

      <div className="mt-5 relative grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 relative overflow-hidden rounded-[28px] bg-brand-950 shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#0a5a2d_0%,#022c15_55%,#021f10_100%)]" />
          <div className="absolute left-3 right-3 top-3 z-10 flex gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60" />
              <input value={csearch} onChange={(e) => setCsearch(e.target.value)} placeholder="Search a country" aria-label="Search a country" className="w-full h-11 pl-10 pr-3 rounded-full bg-white/10 ring-1 ring-white/20 text-white placeholder:text-white/50 outline-none focus:ring-mint-300 backdrop-blur" />
              {matches.length > 0 && (
                <ul className="absolute left-0 right-0 top-full mt-2 card p-1.5 shadow-pop">{matches.map((m) => <li key={m}><button onClick={() => { focus(m); setCsearch(""); }} className="w-full text-left h-10 px-3 rounded-xl text-sm hover:bg-brand-50">{m}</button></li>)}</ul>
              )}
            </div>
            <div className="relative ml-auto">
              <button onClick={() => setLayerMenu(!layerMenu)} aria-expanded={layerMenu} className="h-11 px-4 inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 text-white text-sm font-medium backdrop-blur hover:bg-white/15"><Layers className="size-4" />Layers</button>
              {layerMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 card p-2 shadow-pop">
                  {([["coverage", "Our coverage"], ["status", "Status layer"], ["borders", "Country borders"]] as const).map(([k, l]) => (
                    <label key={k} className="flex items-center justify-between h-10 px-3 rounded-xl hover:bg-canvas text-sm font-medium cursor-pointer">{l}<input type="checkbox" checked={layers[k]} onChange={() => setLayers({ ...layers, [k]: !layers[k] })} className="size-4 accent-[#04411f]" /></label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${W}`} className="relative w-full aspect-square max-h-[680px] mx-auto touch-none select-none cursor-grab active:cursor-grabbing"
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} role="img" aria-label="Interactive globe of Global Watch coverage. Drag to rotate, select a country for its brief.">
            <defs><radialGradient id="ocean" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#0f4d2a" /><stop offset="1" stopColor="#052814" /></radialGradient></defs>
            <circle cx={W / 2} cy={W / 2} r={(W / 2 - 8) * scale} fill="url(#ocean)" stroke="#34c77b" strokeOpacity=".35" />
            <path d={path(geoGraticule10()) ?? ""} fill="none" stroke="#9fe3bd" strokeOpacity=".08" />
            {countries.map((c) => {
              const name = c.properties.name; const s = STATUS[name];
              const d = path(c as never); if (!d) return null;
              const fill = layers.status && s ? LEVEL_FILL[s.level] : "#1b5a36";
              return (
                <path key={name + (c.id ?? "")} d={d} fill={fill} fillOpacity={name === selected ? 1 : name === hover ? 0.95 : s ? 0.85 : 0.65}
                  stroke={name === selected ? "#ffffff" : "#0a3d20"} strokeWidth={name === selected ? 1.6 : layers.borders ? 0.6 : 0}
                  className="cursor-pointer transition-[fill-opacity]" onMouseEnter={() => setHover(name)} onMouseLeave={() => setHover(null)} onClick={() => focus(name)}>
                  <title>{name}{s ? `, ${s.level}, ${s.coverage} pieces` : ""}</title>
                </path>
              );
            })}
            {layers.coverage && Object.keys(STATUS).map(marker)}
          </svg>

          <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-1.5">
            {[[Plus, "Zoom in", () => setScale((s) => Math.min(3, s * 1.25))], [Minus, "Zoom out", () => setScale((s) => Math.max(0.8, s / 1.25))], [RotateCcw, "Reset view", () => { setScale(1); setRot([-69, -25]); }]].map(([I, l, fn]) => { const Icon = I as typeof Plus; return (
              <button key={l as string} onClick={fn as () => void} aria-label={l as string} className="size-11 grid place-items-center rounded-2xl bg-white text-brand-900 shadow-lift hover:bg-mint-100"><Icon className="size-5" /></button>
            ); })}
          </div>
          <div className="absolute left-3 bottom-3 z-10 flex flex-wrap gap-x-3 gap-y-1.5 rounded-2xl bg-brand-950/70 backdrop-blur px-3 py-2 text-xs text-white/85 max-w-[70%]">
            {(Object.keys(LEVEL_FILL) as Level[]).map((l) => <span key={l} className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: LEVEL_FILL[l] }} />{l}</span>)}
          </div>
        </div>

        {/* Drawer: side on desktop, bottom sheet on mobile */}
        <aside className="hidden lg:block lg:col-span-4 card overflow-hidden h-[min(680px,calc(100vw*0.6))] min-h-[520px]">
          {selected ? Drawer : (
            <div className="h-full grid place-items-center text-center p-8"><div><p className="font-semibold text-lg">Select a country</p><p className="text-ink-500 mt-1">Tap a country or a coverage marker to see its brief and our latest work.</p></div></div>
          )}
        </aside>
        {selected && (
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-[58] max-h-[72vh] bg-white rounded-t-[28px] shadow-pop flex flex-col animate-fade-in" role="dialog" aria-label={`${selected} brief`}>
            <span className="mx-auto mt-2.5 h-1.5 w-12 rounded-full bg-line-strong" aria-hidden />
            {Drawer}
          </div>
        )}
      </div>
      <p className="mt-3 text-[13px] text-ink-500">Status levels are editorial judgements by our desk and are reviewed weekly. They are not official travel advice. Borders are shown for orientation only.</p>

      {/* Below the globe */}
      <div className="mt-12 grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 card p-5 sm:p-6">
          <h2 className="font-semibold text-[17px]">Coverage by region</h2>
          <div className="mt-4 flex gap-1.5 overflow-x-auto no-scrollbar">
            {Object.keys(REGION_COUNTRIES).map((r) => <button key={r} onClick={() => setRegion(r)} aria-pressed={region === r} className={clsx("h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap", region === r ? "bg-brand-800 text-white" : "bg-canvas text-ink-600")}>{r}</button>)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {REGION_COUNTRIES[region].map(([c, n]) => <button key={c} onClick={() => { focus(c); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="h-10 px-4 inline-flex items-center gap-2 rounded-full ring-1 ring-line text-sm font-medium hover:ring-brand-300 hover:bg-brand-50">{c === "United States of America" ? "United States" : c}<span className="text-ink-400 tabular-nums">{n}</span></button>)}
          </div>
        </section>
        <section className="lg:col-span-5 card p-5 sm:p-6">
          <h2 className="font-semibold text-[17px]">Most covered, last 90 days</h2>
          <ol className="mt-4 space-y-3">
            {Object.entries(STATUS).sort((a, b) => b[1].coverage - a[1].coverage).slice(0, 5).map(([c, s], i) => (
              <li key={c}><button onClick={() => focus(c)} className="w-full flex items-center gap-3 text-left group"><span className="font-serif text-xl font-semibold text-brand-300 w-6 tabular-nums">{i + 1}</span><span className="flex-1 font-medium group-hover:text-brand-700">{c === "United States of America" ? "United States" : c}</span><Pill tone={s.level === "Crisis" ? "danger" : "mint"}>{s.level}</Pill><span className="text-sm text-ink-500 tabular-nums w-10 text-right">{s.coverage}</span></button></li>
            ))}
          </ol>
        </section>
        <section className="lg:col-span-12 card p-5 sm:p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-[17px]">Recent activity</h2><Link href="/newsroom" className="text-sm font-semibold text-brand-700 inline-flex items-center gap-1">Newsroom<ArrowRight className="size-4" /></Link></div>
          <ul className="mt-4 grid md:grid-cols-2 gap-x-8">
            {NEWSROOM.slice(0, 6).map((n) => <li key={n.id} className="border-b border-line last:border-0 md:[&:nth-last-child(2)]:border-0"><Link href={`/newsroom/${n.id}`} className="group flex gap-3 py-3.5"><span className="text-[13px] font-semibold text-ink-500 tabular-nums w-12 shrink-0 pt-0.5">{n.time}</span><span><span className="block font-medium leading-snug group-hover:text-brand-700">{n.title}</span><span className="text-[13px] text-ink-500">{n.country}</span></span></Link></li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
