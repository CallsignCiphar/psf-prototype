"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

const MODULES = ["Articles", "Reports", "Research papers", "Newsroom", "Featured and Top Stories", "Taxonomy", "Global Watch", "Ad management", "Inbox", "ID cards", "CMS", "Users", "Activity logs"];
const ACTS = ["View", "Create", "Edit", "Approve / publish", "Delete"];

export function PermMatrix({ locked }: { locked?: boolean }) {
  const [on, setOn] = useState<Record<string, boolean>>({ "Research papers-View": true, "Research papers-Edit": true, "Research papers-Approve / publish": true, "Taxonomy-View": true, "Users-View": true, "Activity logs-View": true });
  const n = Object.values(on).filter(Boolean).length;
  const cell = (m: string, a: string) => {
    const k = `${m}-${a}`; const v = !!on[k];
    return <button type="button" role="checkbox" aria-checked={v} aria-label={`${m}: ${a}`} disabled={locked} onClick={() => setOn({ ...on, [k]: !v })} className={clsx("size-8 rounded-lg grid place-items-center transition", v ? "bg-brand-700 text-white" : "bg-canvas ring-1 ring-line hover:ring-brand-300")}>{v && <Check className="size-4" strokeWidth={3} />}</button>;
  };
  return (
    <div>
      <p className="text-[13px] text-ink-500 mb-4"><span className="font-semibold text-ink-900 tabular-nums">{n} of 65</span> granted</p>
      <table className="hidden md:table w-full text-[14px]">
        <thead><tr className="text-left text-[12.5px] text-ink-500"><th className="py-2 font-semibold">Module</th>{ACTS.map((a) => <th key={a} className="py-2 font-semibold text-center">{a}</th>)}</tr></thead>
        <tbody>{MODULES.map((m) => <tr key={m} className="border-t border-line"><td className="py-2.5 font-medium">{m}</td>{ACTS.map((a) => <td key={a} className="py-2.5"><div className="grid place-items-center">{cell(m, a)}</div></td>)}</tr>)}</tbody>
      </table>
      <ul className="md:hidden space-y-3">{MODULES.map((m) => <li key={m} className="rounded-2xl bg-canvas/60 ring-1 ring-line p-3"><p className="font-semibold text-[14px] mb-2">{m}</p><div className="grid grid-cols-5 gap-1 text-center">{ACTS.map((a) => <div key={a} className="flex flex-col items-center gap-1">{cell(m, a)}<span className="text-[10px] text-ink-500 leading-tight">{a.replace(" / publish", "")}</span></div>)}</div></li>)}</ul>
    </div>
  );
}
