"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Bell, ChevronDown, ExternalLink, FilePlus2, LogOut, Menu, PenLine, Plus, Search, Shield, X, CircleCheck, Users, Newspaper, Megaphone, BadgeCheck, MoreHorizontal } from "lucide-react";
import { ADMIN_NAV, ADMIN_TABS, PORTAL_NAV, PORTAL_TABS, type NavGroup } from "./nav";

type Kind = "portal" | "admin";

/* Global toast, fired from anywhere with toast("Saved"). */
export function toast(msg: string) { window.dispatchEvent(new CustomEvent("psf-toast", { detail: msg })); }
function Toaster() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([]);
  useEffect(() => {
    const h = (e: Event) => { const id = Date.now(); setItems((x) => [...x, { id, msg: (e as CustomEvent).detail }]); setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 3200); };
    window.addEventListener("psf-toast", h); return () => window.removeEventListener("psf-toast", h);
  }, []);
  return (
    <div aria-live="polite" className="fixed z-[80] left-1/2 -translate-x-1/2 bottom-24 lg:bottom-6 flex flex-col items-center gap-2 pointer-events-none">
      {items.map((t) => <div key={t.id} className="pointer-events-auto flex items-center gap-2.5 h-12 pl-4 pr-5 rounded-full bg-ink-900 text-white text-sm font-medium shadow-pop animate-fade-in"><CircleCheck className="size-5 text-mint-300" />{t.msg}</div>)}
    </div>
  );
}

function SideNav({ groups, active, kind, onNavigate }: { groups: NavGroup[]; active: string; kind: Kind; onNavigate?: () => void }) {
  const path = usePathname();
  const [loc, setLoc] = useState(path);
  useEffect(() => { setLoc(window.location.pathname + window.location.search); }, [path]);
  return (
    <nav aria-label={kind === "admin" ? "Admin" : "Portal"} className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-5">
      {groups.map((g, i) => (
        <div key={i}>
          {g.label && <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">{g.label}</p>}
          <ul className="space-y-0.5">
            {g.items.map((it) => {
              const on = it.key === active;
              return (
                <li key={it.key}>
                  <Link href={it.href} onClick={onNavigate} aria-current={on ? "page" : undefined}
                    className={clsx("group flex items-center gap-3 h-11 px-3 rounded-xl text-[14.5px] font-medium transition", on ? "bg-white text-brand-900 shadow-soft" : "text-white/75 hover:bg-white/8 hover:text-white")}>
                    <it.icon className={clsx("size-[18px] shrink-0", on ? "text-brand-700" : "text-white/55 group-hover:text-white")} />
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.badge ? <span className={clsx("min-w-6 h-6 px-1.5 rounded-full text-[11px] font-bold grid place-items-center tabular-nums", on ? "bg-brand-800 text-white" : "bg-mint-500 text-brand-950")}>{it.badge}</span> : null}
                  </Link>
                  {on && it.children && (
                    <ul className="mt-1 mb-2 ml-[30px] pl-3 border-l border-white/15 space-y-0.5">
                      {it.children.map((c) => (
                        <li key={c.href}><Link href={c.href} onClick={onNavigate} className={clsx("flex items-center justify-between h-9 px-3 rounded-lg text-[13.5px]", loc === c.href ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5")}>{c.label}{c.badge ? <span className="text-[11px] font-bold text-mint-300">{c.badge}</span> : null}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand({ kind }: { kind: Kind }) {
  return (
    <Link href={kind === "admin" ? "/admin" : "/portal"} className="flex items-center gap-3 px-5 h-[72px] shrink-0">
      <Image src="/psf-logo.png" alt="" width={38} height={38} className="rounded-full bg-white p-0.5" />
      <span className="min-w-0 leading-tight"><span className="block font-serif font-semibold text-white text-[15px] truncate">Pakistan Strategic Forum</span><span className="block text-[12px] text-mint-300 font-medium">{kind === "admin" ? "Admin dashboard" : "Contributor portal"}</span></span>
    </Link>
  );
}

function SideFoot({ kind }: { kind: Kind }) {
  return (
    <div className="p-3 border-t border-white/10 space-y-0.5">
      <Link href="/" className="flex items-center gap-3 h-10 px-3 rounded-xl text-[14px] text-white/70 hover:bg-white/8 hover:text-white"><ExternalLink className="size-[18px]" />View site</Link>
      {kind === "portal" ? <Link href="/admin" className="flex items-center gap-3 h-10 px-3 rounded-xl text-[14px] text-white/70 hover:bg-white/8 hover:text-white"><Shield className="size-[18px]" />Admin</Link>
        : <Link href="/portal" className="flex items-center gap-3 h-10 px-3 rounded-xl text-[14px] text-white/70 hover:bg-white/8 hover:text-white"><PenLine className="size-[18px]" />Contributor portal</Link>}
      <Link href="/sign-in" className="flex items-center gap-3 h-10 px-3 rounded-xl text-[14px] text-white/70 hover:bg-white/8 hover:text-white"><LogOut className="size-[18px]" />Sign out</Link>
    </div>
  );
}

function useOutside(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) cb(); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, [cb]);
  return ref;
}

function CreateMenu() {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="h-10 pl-3 pr-2.5 sm:pl-4 rounded-full bg-brand-800 text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-brand-700"><Plus className="size-4" /><span className="hidden sm:inline">Create</span><ChevronDown className="size-4 opacity-70" /></button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 card shadow-pop ring-1 ring-line p-1.5 z-40 animate-fade-in">
          {[[Users, "Invite user", "/admin/users/invite"], [Newspaper, "Newsroom post", "/admin/newsroom?new=1"], [Megaphone, "Campaign", "/admin/ads/new"], [BadgeCheck, "ID card", "/admin/id-cards?issue=1"], [FilePlus2, "CMS page", "/admin/cms/about"]].map(([I, l, h]) => { const Icon = I as typeof Users; return <Link key={l as string} href={h as string} className="flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-medium hover:bg-brand-50"><Icon className="size-[18px] text-brand-700" />{l as string}</Link>; })}
        </div>
      )}
    </div>
  );
}

function NotifMenu({ kind }: { kind: Kind }) {
  const [open, setOpen] = useState(false);
  const ref = useOutside(() => setOpen(false));
  const items = kind === "admin"
    ? [["6 applications waiting, oldest 4 days", "/admin/applications"], ["2 overdue reviews", "/admin/research"], ["Top Stories position 3 has expired", "/admin/featured"], ["9 unread inbox messages", "/admin/inbox"]]
    : [["Published: Deterrence stability and hypersonics", "/portal/research/RES-2026-00041?stage=published"], ["Your review of RES-2026-00045 is due in 3 days", "/portal/reviews/RES-2026-00045"], ["Rehan Khan invited you to co-author a report", "/portal?invite=1"]];
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} aria-label="Notifications" aria-expanded={open} className="relative size-10 grid place-items-center rounded-full hover:bg-canvas text-ink-700">
        <Bell className="size-5" /><span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-danger-700 text-white text-[10px] font-bold grid place-items-center">{kind === "admin" ? "9+" : 3}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(340px,calc(100vw-24px))] card shadow-pop ring-1 ring-line p-2 z-40 animate-fade-in">
          <p className="px-3 py-2 text-sm font-semibold">Notifications</p>
          <ul>{items.map(([t, h]) => <li key={t}><Link href={h} onClick={() => setOpen(false)} className="flex gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 text-[14px]"><span className="mt-1.5 size-2 rounded-full bg-mint-500 shrink-0" />{t}</Link></li>)}</ul>
          <Link href={kind === "admin" ? "/admin/logs" : "/portal/notifications"} className="block mt-1 h-10 leading-10 text-center rounded-xl text-sm font-semibold text-brand-700 hover:bg-brand-50">View all</Link>
        </div>
      )}
    </div>
  );
}

function AdminSearch() {
  const [q, setQ] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); window.location.assign(`/admin/users?q=${encodeURIComponent(q)}`); }} className="relative flex-1 max-w-xl hidden md:block">
      <label htmlFor="adm-q" className="sr-only">Search admin</label>
      <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
      <input id="adm-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users, content, reference ID, campaigns, cards" className="w-full h-11 pl-11 pr-4 rounded-full bg-canvas ring-1 ring-line text-[14px] outline-none focus:ring-2 focus:ring-brand-300 focus:bg-white" />
    </form>
  );
}

export function DashShell({ kind, active, title, children }: { kind: Kind; active: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const groups = kind === "admin" ? ADMIN_NAV : PORTAL_NAV;
  const tabs = kind === "admin" ? ADMIN_TABS : PORTAL_TABS;
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <div className="min-h-dvh bg-canvas lg:pl-[272px]">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[272px] flex-col bg-brand-900 text-white z-30">
        <Brand kind={kind} /><SideNav groups={groups} active={active} kind={kind} /><SideFoot kind={kind} />
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink-900/50 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(320px,86vw)] bg-brand-900 text-white flex flex-col rounded-r-[28px] shadow-pop animate-fade-in">
            <div className="flex items-center justify-between pr-3"><Brand kind={kind} /><button onClick={() => setOpen(false)} aria-label="Close menu" className="size-10 grid place-items-center rounded-full hover:bg-white/10"><X className="size-5" /></button></div>
            <SideNav groups={groups} active={active} kind={kind} onNavigate={() => setOpen(false)} /><SideFoot kind={kind} />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-line">
        <div className="h-16 px-3 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-3">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-canvas"><Menu className="size-5" /></button>
          <p className="font-semibold text-[16px] truncate lg:hidden flex-1">{title}</p>
          {kind === "admin" ? <><AdminSearch /><span className="hidden md:block flex-1" /></> : <p className="hidden lg:block flex-1 font-semibold text-[17px]">{title}</p>}
          {kind === "admin" ? <CreateMenu /> : <Link href="/portal/articles/new" className="h-10 px-3 sm:px-4 rounded-full bg-brand-800 text-white text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-brand-700"><PenLine className="size-4" /><span className="hidden sm:inline">Write article</span></Link>}
          <NotifMenu kind={kind} />
          <Link href={kind === "admin" ? "/admin/account" : "/portal/profile"} aria-label="Your account" className="size-10 rounded-full bg-mint-100 text-brand-800 grid place-items-center text-[13px] font-bold ring-2 ring-white shadow-soft">{kind === "admin" ? "UT" : "SH"}</Link>
        </div>
      </header>

      <main id="main" className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-28 lg:pb-12 max-w-[1440px]">{children}</main>

      <nav aria-label="Quick navigation" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-line pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-5 h-16">
          {tabs.map((t) => { const on = t.key === active; return (
            <li key={t.key}><Link href={t.href} aria-current={on ? "page" : undefined} className={clsx("h-full flex flex-col items-center justify-center gap-1 text-[11px] font-semibold", on ? "text-brand-800" : "text-ink-500")}>
              <span className={clsx("relative h-8 w-14 rounded-full grid place-items-center transition", on && "bg-mint-100")}><t.icon className="size-5" />{t.badge ? <span className="absolute -top-0.5 right-2 min-w-4 h-4 px-1 rounded-full bg-danger-700 text-white text-[9px] grid place-items-center">{t.badge}</span> : null}</span>{t.label}
            </Link></li>
          ); })}
          <li><button onClick={() => setOpen(true)} className="w-full h-full flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-ink-500"><span className="h-8 w-14 rounded-full grid place-items-center"><MoreHorizontal className="size-5" /></span>Menu</button></li>
        </ul>
      </nav>
      <Toaster />
    </div>
  );
}
