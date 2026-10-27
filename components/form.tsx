"use client";

import { useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { CircleAlert, CircleCheck, Eye, EyeOff, FileUp, Paperclip, X } from "lucide-react";

export const inputCls = "w-full h-12 px-4 rounded-xl bg-white ring-1 ring-line-strong text-[15px] text-ink-900 outline-none placeholder:text-ink-400 focus:ring-2 focus:ring-brand-400 transition disabled:bg-canvas disabled:text-ink-500 read-only:bg-canvas read-only:text-ink-600";

export function Field({ label, required, hint, error, children, htmlFor, className, counter }: { label: ReactNode; required?: boolean; hint?: ReactNode; error?: string; children: ReactNode; htmlFor?: string; className?: string; counter?: string }) {
  return (
    <div className={clsx("flex flex-col gap-2 min-w-0", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-800">{label}{required && <span className="text-danger-700 ml-0.5" aria-hidden>*</span>}</label>
        {counter && <span className="text-xs text-ink-400 tabular-nums">{counter}</span>}
      </div>
      {children}
      {error ? <p className="text-[13px] text-danger-700 flex items-center gap-1.5"><CircleAlert className="size-4" />{error}</p> : hint ? <p className="text-[13px] text-ink-500 leading-snug">{hint}</p> : null}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { invalid, className, ...rest } = props;
  return <input {...rest} aria-invalid={invalid || undefined} className={clsx(inputCls, invalid && "ring-2 ring-danger-700", className)} />;
}

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? "text" : "password"} className={clsx(inputCls, "pr-12")} />
      <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-1.5 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-lg text-ink-500 hover:text-ink-900">{show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button>
    </div>
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx("w-full px-4 py-3 rounded-xl bg-white ring-1 ring-line-strong text-[15px] leading-relaxed outline-none placeholder:text-ink-400 focus:ring-2 focus:ring-brand-400 resize-y min-h-28", props.className)} />;
}

export function Select({ options, placeholder, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string }) {
  return (
    <select {...rest} defaultValue={rest.defaultValue ?? ""} className={clsx(inputCls, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235d6a63%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_14px_center] pr-11", rest.className)}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export function Check({ children, defaultChecked, required }: { children: ReactNode; defaultChecked?: boolean; required?: boolean }) {
  return (
    <label className="flex items-start gap-3 text-[15px] text-ink-700 leading-snug cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} required={required} className="mt-0.5 size-5 rounded-md accent-[#04411f] shrink-0" />
      <span>{children}</span>
    </label>
  );
}

export function Segmented({ options, name, defaultValue }: { options: string[]; name: string; defaultValue?: string }) {
  const [v, setV] = useState(defaultValue ?? options[0]);
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className={clsx("h-11 px-4 inline-flex items-center rounded-xl text-sm font-semibold cursor-pointer transition ring-1", v === o ? "bg-brand-800 text-white ring-brand-800" : "bg-white text-ink-700 ring-line-strong hover:ring-brand-300")}>
          <input type="radio" name={name} value={o} checked={v === o} onChange={() => setV(o)} className="sr-only" />{o}
        </label>
      ))}
    </div>
  );
}

export function FileDrop({ label = "Drop a file here or browse", hint, accept, multiple }: { label?: string; hint?: string; accept?: string; multiple?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [over, setOver] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); setFiles([...files, ...Array.from(e.dataTransfer.files).map((f) => f.name)]); }}
        className={clsx("w-full rounded-2xl border-2 border-dashed px-5 py-6 flex items-center gap-4 text-left transition", over ? "border-brand-500 bg-brand-50" : "border-line-strong bg-canvas hover:border-brand-300")}>
        <span className="size-12 shrink-0 rounded-2xl bg-white text-brand-700 grid place-items-center shadow-soft"><FileUp className="size-6" /></span>
        <span><span className="block font-semibold text-ink-900">{label}</span>{hint && <span className="block text-[13px] text-ink-500 mt-0.5">{hint}</span>}</span>
      </button>
      <input ref={ref} type="file" accept={accept} multiple={multiple} className="sr-only" onChange={(e) => setFiles([...files, ...Array.from(e.target.files ?? []).map((f) => f.name)])} />
      {files.length > 0 && (
        <ul className="mt-2 space-y-2">
          {files.map((f, i) => (
            <li key={f + i} className="flex items-center gap-3 h-12 px-4 rounded-xl bg-white ring-1 ring-line text-sm"><Paperclip className="size-4 text-brand-700" /><span className="flex-1 truncate font-medium">{f}</span><button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label={`Remove ${f}`} className="size-8 grid place-items-center rounded-lg hover:bg-canvas"><X className="size-4" /></button></li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Wraps a prototype form: on submit it shows a success state instead of posting. */
export function ProtoForm({ children, success, className }: { children: ReactNode; success: { title: string; body: string }; className?: string }) {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className={clsx("rounded-3xl bg-mint-100 p-8 text-center", className)} role="status">
      <CircleCheck className="size-12 text-brand-700 mx-auto" />
      <p className="mt-4 font-serif text-2xl font-semibold">{success.title}</p>
      <p className="mt-2 text-ink-600 max-w-md mx-auto">{success.body}</p>
      <button onClick={() => setSent(false)} className="mt-6 h-11 px-5 rounded-full bg-white shadow-soft font-semibold text-brand-800">Send another</button>
    </div>
  );
  return <form className={className} onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollTo({ top: (e.currentTarget.getBoundingClientRect().top + window.scrollY) - 120, behavior: "smooth" }); }}>{children}</form>;
}
