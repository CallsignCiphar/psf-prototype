"use client";

import { useState } from "react";
import clsx from "clsx";
import { CalendarClock, Check, MessageSquarePlus, PenLine, Send, X } from "lucide-react";
import { toast } from "./Shell";

const OPTS = [["Approve and publish now", Check], ["Approve and schedule", CalendarClock], ["Request changes", PenLine], ["Reject", X]] as const;

export function ArticleDecision() {
  const [v, setV] = useState<string>("Request changes");
  const [note, setNote] = useState("Please add a source for the 20 per cent figure in paragraph 2.");
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast(`Decision sent: ${v}`); setTimeout(() => window.location.assign("/admin/articles"), 700); }} className="space-y-4">
      <fieldset className="grid grid-cols-2 gap-2"><legend className="sr-only">Decision</legend>
        {OPTS.map(([o, I]) => <label key={o} className={clsx("rounded-2xl p-3 ring-1 cursor-pointer text-[13.5px] font-semibold flex flex-col gap-2 transition", v === o ? (o === "Reject" ? "ring-2 ring-danger-700 bg-danger-50 text-danger-700" : "ring-2 ring-brand-600 bg-mint-100/60 text-brand-900") : "ring-line-strong text-ink-700 hover:ring-brand-300")}><input type="radio" name="dec" checked={v === o} onChange={() => setV(o)} className="sr-only" /><I className="size-5" />{o}</label>)}
      </fieldset>
      {v === "Approve and schedule" && <div className="grid grid-cols-2 gap-2"><label className="text-[13px] font-semibold">Date *<input type="date" required defaultValue="2026-10-20" className="mt-1 w-full h-11 px-3 rounded-xl ring-1 ring-line-strong" /></label><label className="text-[13px] font-semibold">Time (PKT) *<input type="time" required defaultValue="10:00" className="mt-1 w-full h-11 px-3 rounded-xl ring-1 ring-line-strong" /></label></div>}
      {v === "Reject" && <label className="block text-[13px] font-semibold">Reason *<select className="mt-1 w-full h-11 px-3 rounded-xl ring-1 ring-line-strong bg-white"><option>Outside editorial scope</option><option>Insufficient evidence</option><option>Published elsewhere</option></select></label>}
      <label className="block"><span className="text-sm font-semibold">Note to author *</span>
        <textarea required rows={4} value={note} onChange={(e) => setNote(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-xl ring-1 ring-line-strong text-[14.5px] outline-none focus:ring-2 focus:ring-brand-400" />
        <span className="text-[12.5px] text-ink-500">Sent by email and shown in the portal.</span>
      </label>
      {v === "Request changes" && <label className="flex gap-2.5 text-[14px]"><input type="checkbox" defaultChecked className="size-5 accent-[#04411f]" /><MessageSquarePlus className="size-4 mt-0.5 text-brand-600" />Include my 1 inline comment</label>}
      <p className="text-[12.5px] text-ink-500">Version 2 · previous decision: none</p>
      <button className={clsx("w-full h-12 rounded-full font-semibold text-white inline-flex items-center justify-center gap-2", v === "Reject" ? "bg-danger-700" : "bg-brand-800 hover:bg-brand-700")}><Send className="size-4" />Send decision</button>
    </form>
  );
}
