"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { Camera, Check, Link2, Plus, Search, X } from "lucide-react";
import { TOPICS } from "@/lib/data";
import { Field, PasswordInput, TextArea, TextInput, inputCls } from "@/components/form";

/* Six single-digit boxes with auto-advance, backspace and paste. */
export function OtpInput({ invalid, label = "Verification code", autoFocus }: { invalid?: boolean; label?: string; autoFocus?: boolean }) {
  const [v, setV] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, d: string) => { const n = [...v]; n[i] = d; setV(n); };
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={(e) => { const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6); if (t) { e.preventDefault(); setV(t.padEnd(6, " ").split("").map((c) => c.trim())); refs.current[Math.min(t.length, 5)]?.focus(); } }}>
        {v.map((d, i) => (
          <input key={i} ref={(el) => { refs.current[i] = el; }} value={d} inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} maxLength={1} aria-label={`Digit ${i + 1}`} autoFocus={autoFocus && i === 0}
            onChange={(e) => { const c = e.target.value.replace(/\D/g, "").slice(-1); set(i, c); if (c && i < 5) refs.current[i + 1]?.focus(); }}
            onKeyDown={(e) => { if (e.key === "Backspace" && !v[i] && i > 0) refs.current[i - 1]?.focus(); }}
            className={clsx("h-14 sm:h-16 w-full text-center text-2xl font-semibold tabular-nums rounded-2xl bg-white outline-none transition ring-1 focus:ring-2", invalid ? "ring-2 ring-danger-700" : d ? "ring-brand-400 bg-brand-50" : "ring-line-strong focus:ring-brand-400")} />
        ))}
      </div>
    </fieldset>
  );
}

function score(p: string) {
  let s = 0;
  if (p.length >= 10) s++;
  if (/[a-z]/i.test(p) && /\d/.test(p)) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/[^a-z0-9]/i.test(p) || p.length >= 14) s++;
  return p ? Math.max(1, s) : 0;
}
const LABELS = ["", "Weak", "Fair", "Strong", "Very strong"];

/* Password plus confirm, with a live strength meter and match check. */
export function NewPassword({ idPrefix, label = "Password", confirmLabel = "Confirm password", initial = "" }: { idPrefix: string; label?: string; confirmLabel?: string; initial?: string }) {
  const [p, setP] = useState(initial);
  const [c, setC] = useState("");
  const s = score(p);
  const mismatch = c.length > 0 && c !== p;
  return (
    <>
      <Field label={label} required htmlFor={`${idPrefix}-pw`}>
        <PasswordInput id={`${idPrefix}-pw`} required minLength={10} autoComplete="new-password" value={p} onChange={(e) => setP(e.target.value)} />
        <div className="grid grid-cols-4 gap-1.5" aria-hidden>{[1, 2, 3, 4].map((n) => <span key={n} className={clsx("h-1.5 rounded-full transition", s >= n ? (s <= 1 ? "bg-danger-700" : s === 2 ? "bg-attn-700" : "bg-brand-600") : "bg-line")} />)}</div>
        <p className="text-[13px] text-ink-500" aria-live="polite">{s ? <><span className={clsx("font-semibold", s <= 1 ? "text-danger-700" : s === 2 ? "text-attn-700" : "text-brand-700")}>{LABELS[s]}.</span> </> : null}At least 10 characters with a letter and a number.</p>
      </Field>
      <Field label={confirmLabel} required htmlFor={`${idPrefix}-pw2`} error={mismatch ? "Passwords don't match." : undefined}>
        <PasswordInput id={`${idPrefix}-pw2`} required autoComplete="new-password" value={c} onChange={(e) => setC(e.target.value)} />
        {c && !mismatch && <p className="text-[13px] text-brand-700 font-semibold flex items-center gap-1.5"><Check className="size-4" />Passwords match</p>}
      </Field>
    </>
  );
}

/* Choose 1 to 5 topics or subtopics. */
const ALL = TOPICS.flatMap((t) => t.subs.map((s) => `${t.name} / ${s.name}`));
export function ExpertisePicker({ initial = ["Defence / Strategic Systems", "Geopolitics / South Asia"] }: { initial?: string[] }) {
  const [sel, setSel] = useState<string[]>(initial.filter((x) => ALL.includes(x)));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const opts = ALL.filter((o) => !sel.includes(o) && o.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
  return (
    <Field label="Areas of expertise" required htmlFor="s-exp" hint={`Choose 1 to 5 topics or subtopics. ${sel.length} of 5 chosen.`}>
      <div className="relative">
        <div className={clsx(inputCls, "h-auto min-h-12 py-2 flex flex-wrap items-center gap-2 cursor-text")} onClick={() => setOpen(true)}>
          {sel.map((s) => <span key={s} className="h-8 pl-3 pr-1 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1">{s}<button type="button" aria-label={`Remove ${s}`} onClick={(e) => { e.stopPropagation(); setSel(sel.filter((x) => x !== s)); }} className="size-6 grid place-items-center rounded-full hover:bg-white"><X className="size-3.5" /></button></span>)}
          {sel.length < 5 && <span className="flex items-center gap-2 flex-1 min-w-32"><Search className="size-4 text-ink-400" /><input id="s-exp" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} placeholder="Add a topic" className="flex-1 min-w-0 outline-none bg-transparent text-[15px]" /></span>}
        </div>
        {open && sel.length < 5 && opts.length > 0 && (
          <ul className="absolute z-20 mt-2 left-0 right-0 max-h-64 overflow-auto rounded-2xl bg-white shadow-pop ring-1 ring-line p-1.5">
            {opts.map((o) => <li key={o}><button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setSel([...sel, o]); setQ(""); }} className="w-full text-left px-3 py-2.5 rounded-xl text-[15px] hover:bg-brand-50 flex items-center gap-2"><Plus className="size-4 text-brand-600" />{o}</button></li>)}
          </ul>
        )}
      </div>
    </Field>
  );
}

export function AvatarUpload({ initials = "SH" }: { initials?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  return (
    <Field label="Profile picture" hint="Optional. 400x400, square, circular crop. JPG, PNG or WebP, max 2MB.">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => ref.current?.click()} className="relative size-20 shrink-0 rounded-full overflow-hidden bg-mint-100 text-brand-800 grid place-items-center font-semibold text-xl ring-4 ring-white shadow-soft group" aria-label="Upload profile picture">
          {src ? <img src={src} alt="" className="absolute inset-0 size-full object-cover" /> : initials}
          <span className="absolute inset-0 bg-brand-950/50 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition"><Camera className="size-5" /></span>
        </button>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => ref.current?.click()} className="h-10 px-4 rounded-full bg-white ring-1 ring-line-strong text-sm font-semibold hover:ring-brand-300">{src ? "Change photo" : "Upload photo"}</button>
          {src && <button type="button" onClick={() => setSrc(null)} className="h-10 px-4 rounded-full text-sm font-semibold text-danger-700 hover:bg-danger-50">Remove</button>}
        </div>
        <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) setSrc(URL.createObjectURL(f)); }} />
      </div>
    </Field>
  );
}

export function CountedArea({ id, label, required, min, max, hint, initial = "", rows = 5 }: { id: string; label: ReactNode; required?: boolean; min?: number; max: number; hint?: string; initial?: string; rows?: number }) {
  const [v, setV] = useState(initial);
  const short = min !== undefined && v.length > 0 && v.length < min;
  return (
    <Field label={label} required={required} htmlFor={id} hint={hint} counter={`${v.length} / ${max}${min ? `, minimum ${min}` : ""}`} error={short ? `Please write at least ${min} characters.` : undefined}>
      <TextArea id={id} rows={rows} required={required} minLength={min} maxLength={max} value={v} onChange={(e) => setV(e.target.value)} />
    </Field>
  );
}

export function LinkList({ label, placeholder = "https://", max = 3, hint }: { label: string; placeholder?: string; max?: number; hint?: string }) {
  const [n, setN] = useState(1);
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="relative"><Link2 className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><TextInput type="url" placeholder={placeholder} aria-label={`${label} ${i + 1}`} className="pl-11" /></div>
        ))}
      </div>
      {n < max && <button type="button" onClick={() => setN(n + 1)} className="self-start h-9 px-3 -ml-1 rounded-full text-sm font-semibold text-brand-700 hover:bg-brand-50 inline-flex items-center gap-1.5"><Plus className="size-4" />Add another (up to {max})</button>}
    </Field>
  );
}

export function Countdown({ from = 42 }: { from?: number }) {
  const [s, setS] = useState(from);
  useEffect(() => { if (s <= 0) return; const t = setTimeout(() => setS(s - 1), 1000); return () => clearTimeout(t); }, [s]);
  return s > 0
    ? <span className="text-ink-500">Resend code in <span className="tabular-nums font-semibold">0:{String(s).padStart(2, "0")}</span></span>
    : <button type="button" onClick={() => setS(60)} className="font-semibold text-brand-700 hover:underline">Resend code</button>;
}

/* Prototype form: submitting moves to the next screen in the flow. */
export function NavForm({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return <form className={className} onSubmit={(e) => { e.preventDefault(); window.location.assign(to); }}>{children}</form>;
}
