import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, BookOpen, Globe, Landmark, Shield, type LucideIcon } from "lucide-react";

export const TOPIC_ICONS: Record<string, LucideIcon> = { shield: Shield, globe: Globe, landmark: Landmark, "book-open": BookOpen };

type BtnVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light" | "danger";
type BtnSize = "sm" | "md" | "lg";
const btnBase = "items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";
const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-brand-800 text-white hover:bg-brand-700 shadow-[0_6px_16px_-8px_rgb(4_65_31/0.6)]",
  secondary: "bg-white text-ink-900 ring-1 ring-line-strong hover:ring-brand-300 hover:bg-brand-50",
  ghost: "text-brand-800 hover:bg-brand-50",
  light: "bg-white text-brand-900 hover:bg-mint-100",
  "outline-light": "text-white ring-1 ring-white/50 hover:bg-white/10",
  danger: "bg-danger-700 text-white hover:bg-[#9a1d14]",
};
const btnSizes: Record<BtnSize, string> = { sm: "h-9 px-3.5 text-sm", md: "h-11 px-5 text-[15px]", lg: "h-12 px-6 text-base" };

export function btn(variant: BtnVariant = "primary", size: BtnSize = "md", extra?: string) {
  return clsx(extra && /(^|\s)hidden(\s|$)/.test(extra) ? "" : "inline-flex", btnBase, btnVariants[variant], btnSizes[size], extra);
}

export function ButtonLink({ href, variant = "primary", size = "md", className, children, ...rest }: { href: string; variant?: BtnVariant; size?: BtnSize } & Omit<ComponentProps<typeof Link>, "href">) {
  return <Link href={href} className={btn(variant, size, className)} {...rest}>{children}</Link>;
}

export function Chip({ children, active, className }: { children: ReactNode; active?: boolean; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium transition-colors",
      active ? "bg-brand-800 text-white" : "bg-white text-ink-700 ring-1 ring-line hover:ring-brand-300 hover:text-brand-800", className)}>
      {children}
    </span>
  );
}

const LABEL_TONE: Record<string, string> = {
  Analysis: "text-brand-700", Explainer: "text-info-700", Opinion: "text-attn-700", Interview: "text-brand-600", Archive: "text-ink-500",
};
export function Label({ label, onDark }: { label: string; onDark?: boolean }) {
  return <span className={clsx("eyebrow", onDark ? "text-mint-300" : LABEL_TONE[label] ?? "text-brand-700")}>{label}</span>;
}

export function Pill({ children, tone = "brand", className }: { children: ReactNode; tone?: "brand" | "mint" | "danger" | "info" | "attn" | "neutral" | "dark"; className?: string }) {
  const tones = {
    brand: "bg-brand-100 text-brand-800", mint: "bg-mint-100 text-brand-800", danger: "bg-danger-50 text-danger-700",
    info: "bg-info-50 text-info-700", attn: "bg-attn-50 text-attn-700", neutral: "bg-canvas text-ink-600 ring-1 ring-line", dark: "bg-white/10 text-white ring-1 ring-white/20",
  };
  return <span className={clsx("inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-xs font-semibold whitespace-nowrap", tones[tone], className)}>{children}</span>;
}

export function SectionHeader({ eyebrow, title, href, linkLabel = "View all", onDark, className, children }: { eyebrow?: string; title: string; href?: string; linkLabel?: string; onDark?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={clsx("flex items-end justify-between gap-4 mb-6 sm:mb-8", className)}>
      <div className="min-w-0">
        {eyebrow && <p className={clsx("eyebrow mb-2", onDark ? "text-mint-300" : "text-brand-600")}>{eyebrow}</p>}
        <h2 className={clsx("font-serif text-[26px] sm:text-[32px] leading-[1.15] font-semibold tracking-[-0.01em]", onDark ? "text-white" : "text-ink-900")}>{title}</h2>
        {children}
      </div>
      {href && (
        <Link href={href} className={clsx("group shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold rounded-full h-9 px-3.5 transition-colors",
          onDark ? "text-white hover:bg-white/10" : "text-brand-800 hover:bg-brand-50")}>
          <span className="hidden sm:inline">{linkLabel}</span><span className="sm:hidden">All</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function Avatar({ initials, size = 32, className }: { initials: string; size?: number; className?: string }) {
  return (
    <span aria-hidden className={clsx("inline-flex items-center justify-center rounded-full bg-brand-100 text-brand-800 font-semibold shrink-0", className)}
      style={{ width: size, height: size, fontSize: Math.max(11, Math.round(size / 2.8)) }}>{initials}</span>
  );
}

/* Generated cover art. Stands in for photography until the CMS supplies real images.
   Deterministic per seed, always in the brand greens, with rounded corners from the parent. */
const PALETTES = [
  ["#022c15", "#0a5a2d", "#3fa96a", "#9fe3bd"],
  ["#04411f", "#10703a", "#86cba1", "#e4f7ec"],
  ["#0a5a2d", "#1b8a4b", "#bfe3cc", "#ffffff"],
  ["#021f10", "#04411f", "#34c77b", "#c9f0da"],
  ["#dff1e6", "#f0f8f3", "#1b8a4b", "#04411f"],
  ["#c9f0da", "#e4f7ec", "#10703a", "#022c15"],
];
function rand(seed: number) { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

export function Cover({ seed, className, label, kind, dark }: { seed: number; className?: string; label?: string; kind?: "contour" | "radar" | "grid" | "waves"; dark?: boolean }) {
  const r = rand(seed);
  const p = dark ? PALETTES[seed % 4] : PALETTES[(seed * 7 + 3) % PALETTES.length];
  const k = kind ?? (["contour", "radar", "grid", "waves"] as const)[seed % 4];
  const id = `c${seed}`;
  const lines: ReactNode[] = [];
  if (k === "contour") {
    const cx = 200 + r() * 400, cy = 120 + r() * 200;
    for (let i = 0; i < 14; i++) {
      const rx = 40 + i * 42, ry = 26 + i * 28, rot = r() * 40 - 20;
      lines.push(<ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} fill="none" stroke={p[2]} strokeOpacity={0.18 + (i % 3) * 0.08} strokeWidth={1.2} />);
    }
  } else if (k === "radar") {
    const cx = 520 + r() * 160, cy = 300 + r() * 80;
    for (let i = 1; i < 9; i++) lines.push(<circle key={i} cx={cx} cy={cy} r={i * 58} fill="none" stroke={p[2]} strokeOpacity={0.28} strokeWidth={1} />);
    lines.push(<path key="sweep" d={`M${cx} ${cy} L${cx - 470} ${cy - 260} A 540 540 0 0 1 ${cx - 120} ${cy - 520} Z`} fill={p[2]} fillOpacity={0.14} />);
    for (let i = 0; i < 7; i++) lines.push(<circle key={`b${i}`} cx={cx - 80 - r() * 380} cy={cy - 40 - r() * 260} r={3 + r() * 3} fill={p[3]} fillOpacity={0.85} />);
  } else if (k === "grid") {
    for (let x = 0; x < 20; x++) for (let y = 0; y < 12; y++) {
      const v = r();
      if (v > 0.55) lines.push(<circle key={`${x}-${y}`} cx={20 + x * 40} cy={20 + y * 40} r={v > 0.9 ? 5 : 2.2} fill={v > 0.9 ? p[3] : p[2]} fillOpacity={v > 0.9 ? 0.9 : 0.4} />);
    }
  } else {
    for (let i = 0; i < 11; i++) {
      const y = 140 + i * 30, a = 18 + r() * 26;
      lines.push(<path key={i} d={`M -20 ${y} C 160 ${y - a}, 300 ${y + a}, 420 ${y} S 700 ${y - a}, 820 ${y}`} fill="none" stroke={p[2]} strokeOpacity={0.22 + (i % 4) * 0.06} strokeWidth={1.4} />);
    }
  }
  return (
    <div className={clsx(className?.includes("absolute") ? "" : "relative", "overflow-hidden", className)} style={{ background: p[0] }} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <radialGradient id={`${id}g`} cx="78%" cy="18%" r="85%"><stop offset="0" stopColor={p[1]} /><stop offset="1" stopColor={p[0]} /></radialGradient>
        </defs>
        <rect width="800" height="450" fill={`url(#${id}g)`} />
        {lines}
      </svg>
    </div>
  );
}
