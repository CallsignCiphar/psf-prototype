"use client";

import { useEffect, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

const V: Record<string, number> = { Pakistan: 61204, "United States of America": 7830, "United Kingdom": 4112, "United Arab Emirates": 3605, "Saudi Arabia": 2240, India: 1980, Canada: 1210, Germany: 980, China: 870, Turkey: 760, Qatar: 690, Afghanistan: 640, Australia: 610, Iran: 420, Malaysia: 380, France: 360, Bangladesh: 300, Oman: 290, Kuwait: 260, Norway: 120 };
const RAMP = ["#f0f8f3", "#dff1e6", "#bfe3cc", "#86cba1", "#3fa96a", "#10703a", "#04411f"];
const bucket = (v?: number) => (v ? Math.min(6, 1 + Math.floor(Math.log10(v) * 1.35 - 2.6)) : 0);

export function Choropleth() {
  const [hover, setHover] = useState<string | null>(null);
  const [paths, setPaths] = useState<{ d: string; n: string }[]>([]);
  useEffect(() => {
    const fc = feature(world as unknown as Topology, (world as unknown as Topology).objects.countries) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name: string }>;
    const proj = geoNaturalEarth1().fitSize([800, 400], fc);
    const p = geoPath(proj);
    setPaths(fc.features.filter((f) => f.properties.name !== "Antarctica").map((f) => ({ d: p(f) ?? "", n: f.properties.name })));
  }, []);
  return (
    <div>
      <div className="relative rounded-2xl bg-canvas overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-auto" role="img" aria-label="Visitors by country, last 30 days">
          {paths.map((p) => <path key={p.n} d={p.d} fill={RAMP[bucket(V[p.n])]} stroke="#fff" strokeWidth="0.5" onPointerEnter={() => setHover(p.n)} onPointerLeave={() => setHover(null)} className="transition-opacity hover:opacity-80" />)}
        </svg>
        {hover && <div className="absolute left-3 top-3 rounded-xl bg-white shadow-pop ring-1 ring-line px-3 py-2 text-[13px]"><p className="font-semibold">{hover}</p><p className="text-ink-600 tabular-nums">{(V[hover] ?? 0).toLocaleString("en-GB")} visitors</p></div>}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[12px] text-ink-500">Fewer{RAMP.map((c) => <span key={c} className="size-3 rounded-[3px] ring-1 ring-line" style={{ background: c }} />)}More</div>
    </div>
  );
}
