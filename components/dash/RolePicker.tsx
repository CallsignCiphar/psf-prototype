"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, ClipboardCheck, GraduationCap, Lock, PenLine } from "lucide-react";

export function RolePicker() {
  const [v, setV] = useState("Research Writer");
  const roles = [
    { r: "Article Writer", d: "Analysis and commentary for the Pakistan Strategic Forum site.", i: PenLine, tag: "Your role", locked: true },
    { r: "Research Writer", d: "Peer-reviewed research papers.", i: GraduationCap },
    { r: "Approver", d: "Review research papers. Pakistan Strategic Forum invites approvers directly.", i: ClipboardCheck, tag: "By invitation", locked: true },
  ];
  return (
    <fieldset className="grid sm:grid-cols-3 gap-3">
      <legend className="sr-only">Role</legend>
      {roles.map((x) => (
        <label key={x.r} className={clsx("relative rounded-[22px] p-5 ring-1 transition", x.locked ? "bg-canvas ring-line cursor-not-allowed opacity-75" : v === x.r ? "bg-white ring-2 ring-brand-600 shadow-lift cursor-pointer" : "bg-white ring-line cursor-pointer")}>
          <input type="radio" name="role" disabled={x.locked} checked={v === x.r} onChange={() => setV(x.r)} className="sr-only" />
          <span className={clsx("size-10 rounded-xl grid place-items-center", v === x.r && !x.locked ? "bg-brand-800 text-white" : "bg-white text-brand-700 ring-1 ring-line")}><x.i className="size-5" /></span>
          <span className="mt-3 block font-semibold">{x.r}</span>
          <span className="mt-1 block text-[13px] text-ink-500">{x.d}</span>
          {x.tag && <span className="mt-3 inline-flex items-center gap-1 h-6 px-2 rounded-full bg-white ring-1 ring-line text-[11.5px] font-semibold text-ink-600"><Lock className="size-3" />{x.tag}</span>}
          {v === x.r && !x.locked && <span className="absolute top-4 right-4 size-6 rounded-full bg-brand-700 text-white grid place-items-center"><Check className="size-4" strokeWidth={3} /></span>}
        </label>
      ))}
    </fieldset>
  );
}
