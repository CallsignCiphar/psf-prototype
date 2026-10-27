"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowLeft, FilePlus2, Search, Send, X } from "lucide-react";
import { Pills } from "./interactive";
import { toast } from "./Shell";
import { Initials, Tag } from "./kit";

const M = [
  { id: "COR-2026-0044", from: "Javed Akhtar", email: "javed.akhtar@gmail.com", time: "10:42", subj: "Wrong date in Crisis hotlines article", k: "Correction", prev: "The 1999 hotline agreement was signed in February, not March...", unread: true },
  { id: "ADV-2026-0093", from: "Jazz Brand Team", email: "brand@jazz.com.pk", time: "09:15", subj: "Sidebar placement for November", k: "Advertise", prev: "We would like to book the 300x600 sidebar for four weeks...", unread: true },
  { id: "CPY-2026-0011", from: "Dawn Media Group", email: "legal@dawn.com", time: "Yesterday", subj: "Use of photograph without credit", k: "Copyright", prev: "The image in your 9 October article belongs to Dawn...", unread: true },
  { id: "CON-2026-0210", from: "Amna Riaz", email: "amna.riaz@fjwu.edu.pk", time: "Yesterday", subj: "Internship enquiry", k: "Contact", prev: "I am a final-year IR student at FJWU and would like to know..." },
  { id: "CON-2026-0207", from: "Tariq Mehmood", email: "t.mehmood@uni.edu.pk", time: "14 Oct", subj: "Speaker request for a seminar", k: "Contact", prev: "Our university is hosting a seminar on maritime security..." },
  { id: "COR-2026-0043", from: "Saad Ali", email: "saad.ali@gmail.com", time: "13 Oct", subj: "Figure 2 axis label", k: "Correction", prev: "The y-axis in figure 2 of the hypersonics paper is mislabelled..." },
];
const TONE: Record<string, "violet" | "blue" | "red" | "grey"> = { Correction: "violet", Advertise: "blue", Copyright: "red", Contact: "grey" };

export function Inbox() {
  const [sel, setSel] = useState<string | null>("COR-2026-0044");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState("All");
  const m = M.find((x) => x.id === sel) ?? M[0];
  const list = M.filter((x) => tab === "All" || x.k === tab);
  return (
    <div className="grid lg:grid-cols-[400px_minmax(0,1fr)] gap-5 items-start">
      <section className={clsx("bg-white rounded-[22px] shadow-soft overflow-hidden", mobileOpen && "hidden lg:block")}>
        <div className="p-4 border-b border-line space-y-3">
          <div className="relative"><Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><input placeholder="Search inbox" aria-label="Search inbox" className="w-full h-11 pl-10 pr-4 rounded-full bg-canvas ring-1 ring-line text-[14px] outline-none focus:ring-2 focus:ring-brand-300" /></div>
          <Pills size="sm" items={["All", "Correction", "Advertise", "Copyright", "Contact"]} value={tab} onChange={setTab} />
        </div>
        <ul className="divide-y divide-line">{list.map((x) => (
          <li key={x.id}><button type="button" onClick={() => { setSel(x.id); setMobileOpen(true); }} className={clsx("w-full text-left p-4 flex gap-3 transition", sel === x.id ? "bg-mint-100/60" : "hover:bg-canvas")}>
            <Initials i={x.from.split(" ").map((w) => w[0]).join("").slice(0, 2)} tone={x.unread ? "brand" : "grey"} />
            <span className="flex-1 min-w-0"><span className="flex items-center justify-between gap-2"><span className={clsx("truncate text-[14.5px]", x.unread ? "font-bold" : "font-semibold")}>{x.from}</span><span className="text-[12px] text-ink-500 shrink-0">{x.time}</span></span><span className="block text-[14px] truncate mt-0.5">{x.subj}</span><span className="block text-[13px] text-ink-500 truncate">{x.prev}</span><span className="mt-1.5 inline-block"><Tag tone={TONE[x.k]}>{x.k}</Tag></span></span>
          </button></li>
        ))}</ul>
      </section>
      <section className={clsx("bg-white rounded-[22px] shadow-soft p-5 sm:p-7 min-w-0", !mobileOpen && "hidden lg:block")}>
        <button type="button" onClick={() => setMobileOpen(false)} className="lg:hidden -mt-1 mb-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700"><ArrowLeft className="size-4" />Inbox</button>
        <div className="flex flex-wrap items-center gap-2"><Tag tone={TONE[m.k]}>{m.k}</Tag><Tag tone="blue">Open</Tag></div>
        <h2 className="mt-3 font-serif text-[24px] sm:text-[28px] font-semibold leading-tight">{m.subj}</h2>
        <p className="mt-1.5 text-[13.5px] text-ink-500 break-words">{m.from} &lt;{m.email}&gt; · 16 Oct 2026, {m.time} PKT · {m.id}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[13px]"><select aria-label="Assign" className="h-9 px-3 rounded-full ring-1 ring-line bg-white font-semibold"><option>Assign: Hina Shah</option><option>Assign: Usman Tariq</option></select><select aria-label="Status" className="h-9 px-3 rounded-full ring-1 ring-line bg-white font-semibold"><option>Status: Open</option><option>Status: Waiting</option><option>Status: Closed</option></select></div>
        <div className="mt-6 font-serif text-[17px] leading-relaxed text-ink-800 space-y-3"><p>Dear Pakistan Strategic Forum team,</p><p>In &ldquo;Crisis hotlines in South Asia&rdquo; (18 Aug 2026), the second paragraph says the 1999 hotline agreement was signed in March. The Lahore Declaration and its memorandum were signed on 21 February 1999.</p><p>Regards,<br />{m.from}</p></div>
        {m.k === "Correction" && <dl className="mt-6 grid sm:grid-cols-3 gap-3">{[["Item", "Crisis hotlines in South Asia"], ["Section", "Paragraph 2"], ["Evidence", "Link provided"]].map(([a, b]) => <div key={a} className="rounded-2xl bg-canvas p-3.5"><dt className="text-[12.5px] text-ink-500">{a}</dt><dd className="font-semibold text-[14px]">{b}</dd></div>)}</dl>}
        <form onSubmit={(e) => { e.preventDefault(); toast("Reply sent from editors@psf.org.pk"); }} className="mt-6 pt-6 border-t border-line">
          <label htmlFor="ib-r" className="sr-only">Reply</label>
          <textarea id="ib-r" rows={4} placeholder={`Reply to ${m.from}`} className="w-full px-4 py-3 rounded-2xl ring-1 ring-line-strong text-[15px] outline-none focus:ring-2 focus:ring-brand-400" />
          <label className="mt-3 flex gap-3 text-[14.5px]"><input type="checkbox" className="size-5 accent-[#04411f]" /><FilePlus2 className="size-4 mt-0.5 text-brand-600" />Log as a correction on the article</label>
          <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2"><button type="button" onClick={() => toast("Closed without reply")} className="h-11 px-5 rounded-full ring-1 ring-line-strong font-semibold inline-flex items-center justify-center gap-2"><X className="size-4" />Close without reply</button><button className="h-11 px-6 rounded-full bg-brand-800 text-white font-semibold inline-flex items-center justify-center gap-2"><Send className="size-4" />Send reply</button></div>
        </form>
      </section>
    </div>
  );
}
