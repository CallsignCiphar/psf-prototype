import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ArrowLeft, BadgeCheck, Check, CircleAlert, CircleCheck, Info, Lock, ShieldCheck, Users } from "lucide-react";
import { Cover } from "@/components/ui";

/* Split-screen shell for sign-in and onboarding. Brand panel on desktop, compact band on mobile. */
export function AuthShell({ children, wide, aside, states }: { children: ReactNode; wide?: boolean; aside?: "join" | "signin" | "research"; states?: { label: string; href: string; active?: boolean }[] }) {
  const copy = {
    signin: { t: "Welcome back to Pakistan Strategic Forum", d: "Sign in to write, submit research, review papers or manage the site." },
    join: { t: "Write for Pakistan Strategic Forum", d: "Join a network of scholars, practitioners and journalists writing on Pakistan's security and the region." },
    research: { t: "Publish peer-reviewed research", d: "Double-blind review by two subject experts, a reference number and a permanent record for every accepted paper." },
  }[aside ?? "signin"];
  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[minmax(420px,5fr)_7fr]">
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-brand-900 text-white p-10 xl:p-14 sticky top-0 h-dvh">
        <Cover seed={aside === "research" ? 12 : aside === "join" ? 46 : 3} kind="contour" dark className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/40 to-brand-950/90" />
        <Link href="/" className="relative flex items-center gap-3">
          <Image src="/psf-logo.png" alt="" width={48} height={48} className="rounded-full bg-white p-0.5" />
          <span className="font-serif text-xl font-semibold">Pakistan Strategic Forum</span>
        </Link>
        <div className="relative max-w-md">
          <h2 className="font-serif text-[40px] leading-[1.1] font-semibold tracking-[-0.02em] text-balance">{copy.t}</h2>
          <p className="mt-4 text-lg text-white/75 leading-relaxed">{copy.d}</p>
          <ul className="mt-8 space-y-3">
            {[[ShieldCheck, "Secure sign-in with two-factor authentication"], [BadgeCheck, "Verified contributor profile and ID card"], [Users, "Editors and reviewers who reply quickly"]].map(([I, t]) => { const Icon = I as typeof Lock; return (
              <li key={t as string} className="flex items-center gap-3 rounded-2xl bg-white/8 ring-1 ring-white/10 backdrop-blur-sm px-4 py-3"><span className="size-9 rounded-xl bg-mint-500/20 text-mint-300 grid place-items-center"><Icon className="size-5" /></span><span className="text-[15px] text-white/90">{t as string}</span></li>
            ); })}
          </ul>
        </div>
        <p className="relative text-sm text-white/50">© 2019 to 2026 Pakistan Strategic Forum</p>
      </aside>

      <div className="flex flex-col min-h-dvh">
        <div className="lg:hidden relative overflow-hidden bg-brand-900 text-white">
          <Cover seed={3} kind="contour" dark className="absolute inset-0 opacity-70" />
          <div className="relative flex items-center justify-between px-4 h-16">
            <Link href="/" className="flex items-center gap-2.5"><Image src="/psf-logo.png" alt="" width={36} height={36} className="rounded-full bg-white p-0.5" /><span className="font-serif font-semibold">Pakistan Strategic Forum</span></Link>
          </div>
        </div>
        <div className="hidden lg:flex justify-end px-10 pt-8">
          <Link href="/" className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold text-ink-600 hover:bg-white hover:shadow-soft"><ArrowLeft className="size-4" />Back to the website</Link>
        </div>
        <main id="main" className={clsx("flex-1 w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 lg:py-12", wide ? "max-w-[720px]" : "max-w-[480px]")}>
          {children}
        </main>
        {states && (
          <div className="mx-auto w-full max-w-[720px] px-4 sm:px-8 pb-24">
            <div className="rounded-2xl border border-dashed border-line-strong p-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-ink-500 uppercase tracking-wider mr-1">Preview states</span>
              {states.map((s) => <Link key={s.href} href={s.href} className={clsx("h-7 px-2.5 inline-flex items-center rounded-full font-medium", s.active ? "bg-brand-800 text-white" : "bg-white ring-1 ring-line text-ink-700 hover:ring-brand-300")}>{s.label}</Link>)}
            </div>
          </div>
        )}
        <p className="lg:hidden text-center text-xs text-ink-400 pb-24">© 2019 to 2026 Pakistan Strategic Forum</p>
      </div>
    </div>
  );
}

export function AuthCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("bg-white rounded-[28px] shadow-soft p-6 sm:p-9", className)}>{children}</div>;
}

export function AuthTitle({ eyebrow, title, desc, icon }: { eyebrow?: string; title: string; desc?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="mb-7">
      {icon && <div className="mb-5">{icon}</div>}
      {eyebrow && <p className="eyebrow text-brand-600 mb-2">{eyebrow}</p>}
      <h1 className="font-serif text-[30px] sm:text-[34px] leading-tight font-semibold tracking-[-0.02em]">{title}</h1>
      {desc && <p className="mt-2 text-[16px] text-ink-600 leading-relaxed">{desc}</p>}
    </div>
  );
}

export function IconBadge({ icon: I, tone = "brand" }: { icon: typeof Lock; tone?: "brand" | "danger" | "mint" | "attn" }) {
  return <span className={clsx("size-14 rounded-2xl grid place-items-center", { brand: "bg-brand-800 text-white shadow-lift", danger: "bg-danger-50 text-danger-700", mint: "bg-mint-100 text-brand-800", attn: "bg-attn-50 text-attn-700" }[tone])}><I className="size-7" /></span>;
}

export function Alert({ tone = "info", children, action }: { tone?: "info" | "danger" | "success" | "attn"; children: ReactNode; action?: ReactNode }) {
  const I = { info: Info, danger: CircleAlert, success: CircleCheck, attn: Lock }[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={clsx("flex gap-3 rounded-2xl p-4 text-[15px] leading-snug mb-6", { info: "bg-info-50 text-info-700", danger: "bg-danger-50 text-danger-700", success: "bg-mint-100 text-brand-800", attn: "bg-attn-50 text-attn-700" }[tone])}>
      <I className="size-5 shrink-0 mt-px" />
      <div className="min-w-0">{children}{action && <div className="mt-1.5 font-semibold underline underline-offset-2">{action}</div>}</div>
    </div>
  );
}

export function Turnstile() {
  return (
    <div className="flex items-center gap-3 h-16 px-4 rounded-xl bg-canvas ring-1 ring-line text-sm text-ink-600">
      <span className="size-6 rounded-md bg-white ring-1 ring-line-strong grid place-items-center"><CircleCheck className="size-4 text-brand-600" /></span>
      <span className="flex-1">Security check passed</span>
      <span className="text-[11px] text-ink-400 text-right leading-tight">Cloudflare<br />Turnstile</span>
    </div>
  );
}

const STEPS = ["Account", "Verify email", "About you", "Submitted"];
export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 mb-8" aria-label="Application progress">
      {STEPS.map((s, i) => {
        const done = i < current, now = i === current;
        return (
          <li key={s} className="flex-1 min-w-0" aria-current={now ? "step" : undefined}>
            <div className={clsx("h-1.5 rounded-full", done ? "bg-brand-700" : now ? "bg-mint-500" : "bg-line")} />
            <p className={clsx("mt-2 text-[12px] sm:text-[13px] font-semibold truncate", now ? "text-brand-800" : done ? "text-ink-600" : "text-ink-400")}>
              <span className="tabular-nums inline-flex align-[-2px]">{done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}</span><span className="hidden sm:inline"> · {s}</span><span className="sm:hidden">{now ? ` ${s}` : ""}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
