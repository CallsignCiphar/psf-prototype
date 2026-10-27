"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { Bell, CheckCheck, ClipboardCheck, FileCheck2, KeyRound, MessageSquare, Send, UserPlus } from "lucide-react";
import { Pills } from "./interactive";
import { toast } from "./Shell";

const N = [
  { g: "Today", t: "Published: Deterrence stability and hypersonics is now live.", time: "09:00", i: FileCheck2, k: "Submissions", href: "/portal/research/RES-2026-00041?stage=published", unread: true },
  { g: "Today", t: "Your review of RES-2026-00045 is due in 3 days.", time: "08:30", i: ClipboardCheck, k: "Reviews", href: "/portal/reviews/RES-2026-00045", unread: true },
  { g: "Today", t: "Rehan Khan invited you to co-author a report.", time: "07:45", i: UserPlus, k: "Submissions", href: "/portal?invite=1", unread: true },
  { g: "Yesterday", t: "Changes requested on Civil-military coordination in flood relief.", time: "16:10", i: MessageSquare, k: "Submissions", href: "/portal/articles/new?state=changes" },
  { g: "Yesterday", t: "New review invitation: RES-2026-00049.", time: "11:02", i: Bell, k: "Reviews", href: "/portal/reviews" },
  { g: "Earlier", t: "An editor commented on Crisis hotlines in South Asia.", time: "12 Oct 2026", i: MessageSquare, k: "Submissions", href: "/portal/articles/water-security?status=live" },
  { g: "Earlier", t: "Submitted: Water security and the Indus Waters Treaty.", time: "12 Oct 2026", i: Send, k: "Submissions", href: "/portal/articles/water-security" },
  { g: "Earlier", t: "New sign-in from Chrome on Windows, Islamabad.", time: "10 Oct 2026", i: KeyRound, k: "Security", href: "/portal/account" },
];

export function NotifList() {
  const [tab, setTab] = useState("All");
  const [read, setRead] = useState(false);
  const list = N.filter((n) => tab === "All" || (tab === "Unread (3)" ? n.unread && !read : n.k === tab));
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Pills items={["All", read ? "Unread (0)" : "Unread (3)", "Submissions"]} value={tab} onChange={setTab} />
        <button type="button" onClick={() => { setRead(true); toast("All marked as read"); }} className="h-10 px-4 rounded-full bg-white shadow-soft text-[14px] font-semibold text-brand-800 inline-flex items-center gap-2"><CheckCheck className="size-4" />Mark all as read</button>
      </div>
      {["Today", "Yesterday", "Earlier"].map((g) => { const items = list.filter((n) => n.g === g); if (!items.length) return null; return (
        <section key={g} className="mt-6">
          <h2 className="eyebrow text-ink-500 mb-3">{g}</h2>
          <ul className="bg-white rounded-[22px] shadow-soft divide-y divide-line overflow-hidden">
            {items.map((n) => (
              <li key={n.t}><Link href={n.href} className={clsx("flex items-start gap-4 p-4 sm:px-6 hover:bg-canvas", n.unread && !read && "bg-mint-100/30")}>
                <span className={clsx("size-10 rounded-xl grid place-items-center shrink-0", n.unread && !read ? "bg-brand-800 text-white" : "bg-canvas text-brand-700")}><n.i className="size-5" /></span>
                <span className="flex-1 min-w-0 text-[14.5px] pt-2 leading-snug">{n.t}</span>
                <span className="text-[12.5px] text-ink-500 pt-2.5 whitespace-nowrap">{n.time}</span>
                {n.unread && !read && <span className="size-2.5 mt-3.5 rounded-full bg-mint-500 shrink-0" aria-label="Unread" />}
              </Link></li>
            ))}
          </ul>
        </section>
      ); })}
      <div className="mt-6 text-center"><button type="button" className="h-11 px-5 rounded-full bg-white shadow-soft text-[14px] font-semibold">Load older</button></div>
    </div>
  );
}
