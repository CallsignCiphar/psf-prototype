"use client";

import { useState } from "react";
import clsx from "clsx";
import { ClipboardCheck, Crown, PenSquare, Star } from "lucide-react";

export function InviteRole() {
  const [v, setV] = useState("Approver");
  const r = [[ClipboardCheck, "Approver", "Reviews research papers. 2FA required."], [Star, "Expert", "Listed on the Experts page, can write by invitation."], [PenSquare, "Editor", "Reviews and publishes articles and reports."], [Crown, "Admin", "Full dashboard access except Settings."]] as const;
  return (
    <fieldset>
      <legend className="text-sm font-semibold mb-3">Role<span className="text-danger-700">*</span></legend>
      <div className="grid sm:grid-cols-2 gap-3">{r.map(([I, t, d]) => (
        <label key={t} className={clsx("flex gap-3 rounded-2xl p-4 cursor-pointer ring-1 transition", v === t ? "ring-2 ring-brand-600 bg-mint-100/50" : "ring-line-strong hover:ring-brand-300")}>
          <input type="radio" name="role" checked={v === t} onChange={() => setV(t)} className="sr-only" />
          <span className={clsx("size-10 rounded-xl grid place-items-center shrink-0", v === t ? "bg-brand-800 text-white" : "bg-canvas text-brand-700")}><I className="size-5" /></span>
          <span><span className="block font-semibold">{t}</span><span className="block text-[13px] text-ink-500">{d}</span></span>
        </label>
      ))}</div>
    </fieldset>
  );
}
