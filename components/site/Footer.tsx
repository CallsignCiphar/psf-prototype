import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUp, ChevronDown, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { SITE, TOPICS } from "@/lib/data";
import { btn } from "@/components/ui";

const COLS = [
  { title: "Topics", links: TOPICS.map((t) => ({ label: t.name, href: `/topics/${t.slug}` })) },
  { title: "Publications", links: [
    { label: "Reports", href: "/reports" }, { label: "Research", href: "/research" }, { label: "Newsroom", href: "/newsroom" },
    { label: "Global Watch", href: "/global-watch" }, { label: "Videos", href: "/videos" } ] },
  { title: "About", links: [
    { label: "About us", href: "/about" }, { label: "Editorial policy", href: "/policies/editorial" }, { label: "Corrections", href: "/corrections" },
    { label: "Contributor agreement", href: "/policies/contributor-agreement" }, { label: "Where we are", href: "/where-we-are" }, { label: "Contact", href: "/contact" } ] },
  { title: "Work with us", links: [
    { label: "Publish with us", href: "/publish-with-us" }, { label: "Write an article", href: "/join" }, { label: "Submit a paper", href: "/research/submit" },
    { label: "How peer review works", href: "/policies/peer-review" }, { label: "Advertise", href: "/advertise" } ] },
  { title: "Legal", links: [
    { label: "Privacy", href: "/policies/privacy" }, { label: "Cookies", href: "/cookies" }, { label: "Disclaimer", href: "/policies/disclaimer" },
    { label: "Copyright and takedown", href: "/policies/copyright" }, { label: "Terms of use", href: "/policies/terms" } ] },
];
const SOC = { x: Twitter, facebook: Facebook, instagram: Instagram, youtube: Youtube } as const;

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white/80 mt-16 sm:mt-24 rounded-t-[32px] sm:rounded-t-[40px] overflow-hidden">
      <div className="container-site pt-12 sm:pt-16 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="flex items-start gap-4 max-w-xl">
            <span className="size-16 shrink-0 rounded-2xl bg-white grid place-items-center p-1.5"><Image src="/psf-logo.png" alt="" width={56} height={56} className="object-contain" /></span>
            <div>
              <p className="font-serif text-2xl font-semibold text-white">Pakistan Strategic Forum</p>
              <p className="mt-1.5 text-[15px] leading-relaxed">{SITE.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className={btn("light", "md", "rounded-full")}>Write for us<ArrowRight className="size-4" /></Link>
            <Link href="/research/submit" className={btn("outline-light", "md", "rounded-full")}>Submit research</Link>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-5 gap-6 py-10">
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="eyebrow text-mint-300 mb-4">{c.title}</p>
              <ul className="space-y-2.5 text-[15px]">{c.links.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline underline-offset-4 decoration-mint-300">{l.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="md:hidden py-6 divide-y divide-white/10">
          {COLS.map((c) => (
            <details key={c.title} className="group">
              <summary className="flex items-center justify-between h-14 cursor-pointer list-none font-semibold text-white [&::-webkit-details-marker]:hidden">
                {c.title}<ChevronDown className="size-5 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="pb-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[15px]">{c.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
            </details>
          ))}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-white/10 text-sm">
          <p>© 2019 to 2026 Pakistan Strategic Forum. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {SITE.social.map((s) => { const I = SOC[s.key as keyof typeof SOC]; return <a key={s.key} href={s.href} aria-label={s.label} className="size-10 grid place-items-center rounded-full bg-white/8 hover:bg-white/15 hover:text-white"><I className="size-[18px]" /></a>; })}
            <a href="#top" className="ml-2 inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white/8 hover:bg-white/15 hover:text-white font-medium"><ArrowUp className="size-4" />Top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AdSlot({ size, enabled, className }: { size: "leaderboard" | "rectangle" | "skyscraper"; enabled: boolean; className?: string }) {
  if (!enabled) return null;
  const dims = { leaderboard: "h-[100px] sm:h-[90px] max-w-[970px]", rectangle: "h-[250px] max-w-[300px]", skyscraper: "h-[600px] max-w-[300px]" }[size];
  const spec = { leaderboard: "970 x 90 · 320 x 100 on mobile", rectangle: "300 x 250", skyscraper: "300 x 600" }[size];
  return (
    <aside aria-label="Advertisement" className={className}>
      <p className="eyebrow text-ink-400 text-center mb-2 text-[10px]">Advertisement</p>
      <div className={`mx-auto w-full ${dims} rounded-2xl bg-white ring-1 ring-line grid place-items-center text-sm text-ink-400`}>Ad slot · {spec}</div>
    </aside>
  );
}
