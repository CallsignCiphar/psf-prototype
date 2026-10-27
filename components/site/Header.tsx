"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  AArrowDown, AArrowUp, ArrowRight, ArrowUpRight, ChevronDown, Facebook, Globe, Instagram, Menu, Search, Type, Twitter, X, Youtube,
} from "lucide-react";
import { NAV, type NavItem } from "@/lib/nav";
import { HOTSPOTS, SITE } from "@/lib/data";
import { Cover, btn } from "@/components/ui";
import { SearchOverlay } from "./SearchOverlay";

const SOCIAL_ICONS = { x: Twitter, facebook: Facebook, instagram: Instagram, youtube: Youtube } as const;

function useTextSize() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  useEffect(() => {
    try { const s = localStorage.getItem("psf-text") as "sm" | "md" | "lg" | null; if (s) setSize(s); } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.dataset.text = size === "md" ? "" : size;
    try { localStorage.setItem("psf-text", size); } catch {}
  }, [size]);
  return [size, setSize] as const;
}

export function UtilityBar() {
  const [size, setSize] = useTextSize();
  const ticker = [...HOTSPOTS, ...HOTSPOTS];
  return (
    <div className="bg-brand-900 text-white/85 text-[13px]">
      <div className="container-site h-10 flex items-center gap-4">
        <Link href="/global-watch" className="flex items-center gap-2 shrink-0 font-medium text-white hover:text-mint-300">
          <span className="size-2 rounded-full bg-mint-500 animate-pulse-dot" aria-hidden />
          <Globe className="size-4 hidden sm:block" aria-hidden />
          <span>Global Watch <span className="text-white/60 font-normal hidden sm:inline">· {SITE.globalWatchCount} locations</span></span>
        </Link>
        <div className="relative flex-1 min-w-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_24px,#000_calc(100%-24px),transparent)]" aria-label="Live hotspots">
          <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
            {ticker.map((h, i) => (
              <Link key={i} href="/global-watch" className="flex items-center gap-2 whitespace-nowrap hover:text-white" tabIndex={i >= HOTSPOTS.length ? -1 : 0}>
                <span className={clsx("size-1.5 rounded-full", h.level === "Crisis" ? "bg-[#ff8a80]" : h.level === "Elevated" ? "bg-mint-300" : "bg-white/50")} aria-hidden />
                <span className="font-semibold text-white">{h.name}</span><span className="text-white/60">{h.note}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <div role="group" aria-label="Text size" className="flex items-center rounded-full bg-white/8 p-0.5 ring-1 ring-white/15">
            <button onClick={() => setSize("sm")} aria-label="Smaller text" aria-pressed={size === "sm"} className={clsx("size-7 grid place-items-center rounded-full", size === "sm" ? "bg-white text-brand-900" : "hover:bg-white/10")}><AArrowDown className="size-4" /></button>
            <button onClick={() => setSize("md")} aria-label="Default text size" aria-pressed={size === "md"} className={clsx("size-7 grid place-items-center rounded-full", size === "md" ? "bg-white text-brand-900" : "hover:bg-white/10")}><Type className="size-3.5" /></button>
            <button onClick={() => setSize("lg")} aria-label="Larger text" aria-pressed={size === "lg"} className={clsx("size-7 grid place-items-center rounded-full", size === "lg" ? "bg-white text-brand-900" : "hover:bg-white/10")}><AArrowUp className="size-4" /></button>
          </div>
          <span className="w-px h-4 bg-white/20 mx-2" aria-hidden />
          {SITE.social.map((s) => {
            const Icon = SOCIAL_ICONS[s.key as keyof typeof SOCIAL_ICONS];
            return <a key={s.key} href={s.href} aria-label={s.label} className="size-8 grid place-items-center rounded-full hover:bg-white/10 hover:text-white"><Icon className="size-4" /></a>;
          })}
          <span className="w-px h-4 bg-white/20 mx-2" aria-hidden />
          <Link href="/advertise" className="font-medium text-white hover:text-mint-300 px-1">Advertise</Link>
        </div>
      </div>
    </div>
  );
}

function MegaPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const hasCols = !!item.columns;
  return (
    <div className="absolute left-0 right-0 top-full pt-3 animate-fade-in">
      <div className="container-site">
        <div className="card shadow-pop ring-1 ring-line p-6 lg:p-8 grid grid-cols-12 gap-8">
          <div className={clsx(item.feature ? "col-span-8" : "col-span-12")}>
            {hasCols ? (
              <div className={clsx("grid gap-6", item.columns!.length > 2 ? "grid-cols-4" : "grid-cols-2")}>
                {item.columns!.map((c) => (
                  <div key={c.title}>
                    <Link href={c.href} onClick={onClose} className="group flex items-center gap-1.5 font-semibold text-ink-900 hover:text-brand-700 mb-3">
                      {c.title}<ArrowUpRight className="size-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                    <ul className="space-y-1">
                      {c.links.map((l) => (
                        <li key={l.href}><Link href={l.href} onClick={onClose} className="block rounded-lg px-2 py-1.5 -mx-2 text-[15px] text-ink-600 hover:bg-brand-50 hover:text-brand-800">{l.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
            {item.quick && (
              <ul className={clsx("grid gap-2", hasCols ? "mt-6 pt-6 border-t border-line grid-cols-2" : "grid-cols-2")}>
                {item.quick.map((q) => (
                  <li key={q.href}>
                    <Link href={q.href} onClick={onClose} className="group flex items-start gap-3 rounded-xl p-3 hover:bg-brand-50">
                      <span className="mt-0.5 size-8 shrink-0 grid place-items-center rounded-lg bg-brand-100 text-brand-800"><ArrowRight className="size-4" /></span>
                      <span><span className="block font-semibold text-ink-900 group-hover:text-brand-800">{q.label}</span><span className="block text-sm text-ink-500">{q.desc}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {item.feature && (
            <Link href={item.feature.href} onClick={onClose} className="col-span-4 group relative overflow-hidden rounded-2xl min-h-56 flex">
              <Cover seed={item.feature.art} dark className="absolute inset-0" />
              <span className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/40 to-transparent" />
              <span className="relative mt-auto p-5">
                <span className="eyebrow text-mint-300">{item.feature.eyebrow}</span>
                <span className="block mt-2 font-serif text-xl leading-snug font-semibold text-white group-hover:underline decoration-mint-300 underline-offset-4">{item.feature.title}</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function Header({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(null); setMobile(false); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobile || search ? "hidden" : ""; }, [mobile, search]);

  const enter = (k: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(k); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 140); };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <UtilityBar />
      <header className={clsx("sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow", scrolled ? "shadow-soft" : "shadow-[0_1px_0_var(--color-line)]")}>
        <div className="container-site h-16 lg:h-[76px] flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 min-w-0" aria-label={`${SITE.name}, home`}>
            <Image src="/psf-logo.png" alt="" width={52} height={52} priority className="size-11 lg:size-[52px] object-contain" />
            <span className="font-serif font-semibold text-ink-900 leading-[1.05] text-[17px] lg:text-[19px]">Pakistan<br className="sm:hidden" /> Strategic Forum</span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:flex items-center gap-0.5 mx-auto" onMouseLeave={leave}>
            {NAV.map((item) => {
              const hasPanel = !!(item.columns || item.quick);
              const active = isActive(item.href);
              return (
                <div key={item.key} onMouseEnter={() => (hasPanel ? enter(item.key) : setOpen(null))}>
                  {hasPanel ? (
                    <button onClick={() => setOpen(open === item.key ? null : item.key)} aria-expanded={open === item.key}
                      className={clsx("flex items-center gap-1 h-10 px-3 rounded-full text-[15px] font-medium transition-colors",
                        open === item.key ? "bg-brand-50 text-brand-800" : active ? "text-brand-800" : "text-ink-700 hover:text-brand-800 hover:bg-brand-50")}>
                      {item.label}<ChevronDown className={clsx("size-4 transition-transform", open === item.key && "rotate-180")} />
                    </button>
                  ) : (
                    <Link href={item.href} className={clsx("flex items-center gap-1.5 h-10 px-3 rounded-full text-[15px] font-medium transition-colors",
                      active ? "text-brand-800 bg-brand-50" : "text-ink-700 hover:text-brand-800 hover:bg-brand-50")}>
                      {item.label}{item.dot && <span className="size-1.5 rounded-full bg-mint-500 animate-pulse-dot" aria-label="New posts" />}
                    </Link>
                  )}
                  {open === item.key && hasPanel && <div onMouseEnter={() => enter(item.key)}><MegaPanel item={item} onClose={() => setOpen(null)} /></div>}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto xl:ml-0 shrink-0">
            <button onClick={() => setSearch(true)} aria-label="Search"
              title="Search (Ctrl K)" className="hidden md:grid size-10 place-items-center rounded-full bg-canvas ring-1 ring-line text-ink-600 hover:ring-brand-300 hover:text-brand-800 transition">
              <Search className="size-[18px]" />
            </button>
            <button onClick={() => setSearch(true)} aria-label="Search" className="md:hidden size-11 grid place-items-center rounded-full hover:bg-brand-50 text-ink-700"><Search className="size-5" /></button>
            {signedIn ? (
              <Link href="/portal" className={btn("secondary", "sm", "hidden sm:inline-flex")}>My portal</Link>
            ) : (
              <>
                <Link href="/sign-in" className="hidden sm:inline-flex h-10 items-center px-3 rounded-full text-[15px] font-medium text-brand-800 hover:bg-brand-50">Sign in</Link>
                <Link href="/join" className={btn("primary", "sm", "hidden sm:inline-flex h-10 px-4 rounded-full")}>Write for us</Link>
              </>
            )}
            <button onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile} className="xl:hidden size-11 grid place-items-center rounded-full hover:bg-brand-50 text-ink-900"><Menu className="size-6" /></button>
          </div>
        </div>
      </header>

      {mobile && <MobileMenu onClose={() => setMobile(false)} onSearch={() => { setMobile(false); setSearch(true); }} isActive={isActive} />}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}

function MobileMenu({ onClose, onSearch, isActive }: { onClose: () => void; onSearch: () => void; isActive: (h: string) => boolean }) {
  const [section, setSection] = useState<string | null>("topics");
  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink-900/50 animate-fade-in" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-[420px] bg-white flex flex-col shadow-pop animate-fade-in">
        <div className="h-16 px-4 flex items-center justify-between border-b border-line">
          <span className="flex items-center gap-2.5"><Image src="/psf-logo.png" alt="" width={40} height={40} className="size-10" /><span className="font-serif font-semibold">Pakistan Strategic Forum</span></span>
          <button onClick={onClose} aria-label="Close menu" className="size-11 grid place-items-center rounded-full hover:bg-brand-50"><X className="size-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <button onClick={onSearch} className="w-full flex items-center gap-3 h-12 px-4 rounded-xl bg-canvas ring-1 ring-line text-ink-500 mb-4"><Search className="size-5" />Search articles, reports, research</button>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const has = !!(item.columns || item.quick);
              const isOpen = section === item.key;
              return (
                <li key={item.key} className="rounded-2xl overflow-hidden">
                  {has ? (
                    <button onClick={() => setSection(isOpen ? null : item.key)} aria-expanded={isOpen}
                      className={clsx("w-full flex items-center justify-between h-14 px-4 rounded-2xl text-[17px] font-semibold", isOpen ? "bg-brand-50 text-brand-800" : "text-ink-900")}>
                      {item.label}<ChevronDown className={clsx("size-5 transition-transform", isOpen && "rotate-180")} />
                    </button>
                  ) : (
                    <Link href={item.href} onClick={onClose} className={clsx("flex items-center gap-2 h-14 px-4 rounded-2xl text-[17px] font-semibold", isActive(item.href) ? "bg-brand-50 text-brand-800" : "text-ink-900")}>
                      {item.label}{item.dot && <span className="size-2 rounded-full bg-mint-500" />}
                    </Link>
                  )}
                  {has && isOpen && (
                    <div className="px-2 pb-3 pt-1">
                      {item.columns?.map((c) => (
                        <div key={c.title} className="mb-2">
                          <Link href={c.href} onClick={onClose} className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-ink-900 hover:bg-brand-50">{c.title}<ArrowRight className="size-4 text-brand-700" /></Link>
                          <div className="flex flex-wrap gap-2 px-3 pb-1">
                            {c.links.map((l) => <Link key={l.href} href={l.href} onClick={onClose} className="h-9 px-3.5 inline-flex items-center rounded-full bg-canvas ring-1 ring-line text-sm font-medium text-ink-700">{l.label}</Link>)}
                          </div>
                        </div>
                      ))}
                      {item.quick?.map((q) => (
                        <Link key={q.href} href={q.href} onClick={onClose} className="block px-3 py-2.5 rounded-xl hover:bg-brand-50">
                          <span className="block font-semibold text-ink-900">{q.label}</span><span className="block text-sm text-ink-500">{q.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 pt-6 border-t border-line flex items-center justify-between">
            <span className="text-sm text-ink-500">Follow us</span>
            <div className="flex gap-1">
              {SITE.social.map((s) => { const Icon = SOCIAL_ICONS[s.key as keyof typeof SOCIAL_ICONS]; return <a key={s.key} href={s.href} aria-label={s.label} className="size-11 grid place-items-center rounded-full bg-canvas text-ink-700"><Icon className="size-5" /></a>; })}
            </div>
          </div>
          <Link href="/advertise" onClick={onClose} className="mt-3 flex items-center justify-between h-12 px-4 rounded-xl bg-canvas text-[15px] font-medium text-ink-700">Advertise with us<ArrowRight className="size-4" /></Link>
        </div>
        <div className="p-4 border-t border-line grid grid-cols-2 gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href="/sign-in" onClick={onClose} className={btn("secondary", "lg", "w-full")}>Sign in</Link>
          <Link href="/join" onClick={onClose} className={btn("primary", "lg", "w-full")}>Write for us</Link>
        </div>
      </div>
    </div>
  );
}
