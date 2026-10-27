"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import clsx from "clsx";
import {
  Bold, ChevronDown, Code2, Eye, FileUp, Heading2, History, Image as ImageIcon, Italic, Link2, List, ListOrdered, MonitorSmartphone,
  Plus, Quote, Save, Send, Strikethrough, Superscript, Trash2, Underline, X, Youtube, Check, Search,
} from "lucide-react";
import { Dialog } from "./interactive";
import { toast } from "./Shell";
import { Initials, Status } from "./kit";
import { Field, Select, TextInput } from "@/components/form";
import { TOPICS } from "@/lib/data";

export function Counted({ id, label, max, initial, rows = 2, big, required = true }: { id: string; label: string; max: number; initial: string; rows?: number; big?: boolean; required?: boolean }) {
  const [v, setV] = useState(initial);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5"><label htmlFor={id} className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-500">{label}{required && " *"}</label><span className={clsx("text-[12px] tabular-nums", v.length > max ? "text-danger-700" : "text-ink-400")}>{v.length} / {max}</span></div>
      <textarea id={id} rows={rows} value={v} onChange={(e) => setV(e.target.value)} className={clsx("w-full resize-none bg-transparent outline-none rounded-xl px-0 focus:bg-canvas/60 focus:px-3 transition-all", big ? "font-serif text-[28px] sm:text-[36px] leading-tight font-semibold tracking-[-0.02em]" : "font-serif text-[18px] sm:text-[20px] leading-relaxed text-ink-600")} />
    </div>
  );
}

function Tool({ icon: I, label, onClick }: { icon: typeof Bold; label: string; onClick?: () => void }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className="size-9 shrink-0 grid place-items-center rounded-lg text-ink-600 hover:bg-white hover:text-brand-800 hover:shadow-soft"><I className="size-[18px]" /></button>;
}

export function Toolbar({ embeds = true }: { embeds?: boolean }) {
  return (
    <div className="sticky top-16 z-10 -mx-1 flex items-center gap-0.5 overflow-x-auto no-scrollbar rounded-2xl bg-canvas p-1.5 ring-1 ring-line">
      <span className="h-9 pl-3 pr-2 shrink-0 inline-flex items-center gap-1 rounded-lg bg-white text-[13px] font-semibold shadow-soft">Paragraph<ChevronDown className="size-4 text-ink-400" /></span>
      <span className="w-px h-6 bg-line mx-1 shrink-0" />
      <Tool icon={Bold} label="Bold" /><Tool icon={Italic} label="Italic" /><Tool icon={Underline} label="Underline" /><Tool icon={Strikethrough} label="Strikethrough" /><Tool icon={Quote} label="Quote" /><Tool icon={Superscript} label="Footnote" />
      <span className="w-px h-6 bg-line mx-1 shrink-0" />
      <Tool icon={Heading2} label="Heading" /><Tool icon={List} label="Bulleted list" /><Tool icon={ListOrdered} label="Numbered list" />
      <span className="w-px h-6 bg-line mx-1 shrink-0" />
      <Dialog triggerClass="size-9 shrink-0 grid place-items-center rounded-lg text-ink-600 hover:bg-white hover:text-brand-800" trigger={<Link2 className="size-[18px]" aria-label="Insert link" />} title="Insert link" confirm={{ label: "Insert", toast: "Link inserted" }}>
        <Field label="Text" htmlFor="m-lt"><TextInput id="m-lt" /></Field>
        <Field label="URL" required htmlFor="m-lu"><TextInput id="m-lu" type="url" required placeholder="https://" /></Field>
        <label className="flex items-center gap-3 text-[15px]"><input type="checkbox" className="size-5 accent-[#04411f]" />Open in a new tab</label>
      </Dialog>
      <ImageDialog trigger={<ImageIcon className="size-[18px]" aria-label="Insert image" />} triggerClass="size-9 shrink-0 grid place-items-center rounded-lg text-ink-600 hover:bg-white hover:text-brand-800" />
      {embeds && (
        <Dialog triggerClass="size-9 shrink-0 grid place-items-center rounded-lg text-ink-600 hover:bg-white hover:text-brand-800" trigger={<Youtube className="size-[18px]" aria-label="Embed a post or video" />} title="Embed a post or video" confirm={{ label: "Embed", toast: "Embed added" }}>
          <Field label="Link" required htmlFor="m-em" hint="YouTube and X links only"><TextInput id="m-em" type="url" required placeholder="https://youtube.com/..." /></Field>
          <div className="aspect-video rounded-2xl bg-canvas ring-1 ring-line grid place-items-center text-sm text-ink-500">Preview</div>
          <Field label="Caption" htmlFor="m-ec"><TextInput id="m-ec" /></Field>
        </Dialog>
      )}
      <Tool icon={Code2} label="Table" />
    </div>
  );
}

export function ImageDialog({ trigger, triggerClass, title = "Card image" }: { trigger: ReactNode; triggerClass: string; title?: string }) {
  const [ratio, setRatio] = useState("3:2 card");
  return (
    <Dialog size="lg" triggerClass={triggerClass} trigger={trigger} title={title} confirm={{ label: "Use image", toast: "Image added" }}>
      <div className="grid sm:grid-cols-[1fr_260px] gap-5">
        <div>
          <div className={clsx("relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-700 to-brand-950", ratio.startsWith("3") ? "aspect-[3/2]" : "aspect-video")}>
            <div className="absolute inset-6 rounded-xl ring-2 ring-white/80 ring-dashed" /><span className="absolute bottom-3 left-3 h-7 px-2.5 rounded-full bg-white/90 text-[12px] font-semibold grid place-items-center">Drag to reposition</span>
          </div>
          <div className="mt-3 flex gap-2">{["3:2 card", "16:9 cover"].map((r) => <button key={r} type="button" onClick={() => setRatio(r)} className={clsx("h-9 px-3.5 rounded-full text-[13px] font-semibold", ratio === r ? "bg-brand-800 text-white" : "bg-canvas ring-1 ring-line")}>{r}</button>)}</div>
          <p className="mt-2 text-[13px] text-ink-500">1200x800 minimum. JPG or PNG, up to 5 MB.</p>
        </div>
        <div className="space-y-4">
          <Field label="Alt text" required htmlFor="m-ia"><TextInput id="m-ia" required placeholder="Describe the image" /></Field>
          <Field label="Caption" required htmlFor="m-ic"><TextInput id="m-ic" required placeholder="What the image shows" /></Field>
          <Field label="Credit" required htmlFor="m-icr"><TextInput id="m-icr" required placeholder="Photo: ISPR" /></Field>
        </div>
      </div>
    </Dialog>
  );
}

export function ListAdder({ label, hint, initial, placeholder, max = 5 }: { label: string; hint: string; initial: string[]; placeholder: string; max?: number }) {
  const [items, setItems] = useState(initial);
  const [v, setV] = useState("");
  return (
    <section className="rounded-[22px] bg-canvas/70 ring-1 ring-line p-4 sm:p-5">
      <div className="flex items-baseline justify-between"><h3 className="font-semibold">{label}</h3><span className="text-[12.5px] text-ink-500">{hint}</span></div>
      <ol className="mt-3 space-y-2">{items.map((t, i) => <li key={t + i} className="flex items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-line"><span className="size-6 rounded-full bg-mint-100 text-brand-800 text-[12px] font-bold grid place-items-center shrink-0">{i + 1}</span><span className="flex-1 text-[14.5px]">{t}</span><button type="button" aria-label="Remove" onClick={() => setItems(items.filter((_, j) => j !== i))} className="size-7 grid place-items-center rounded-lg hover:bg-canvas"><X className="size-4" /></button></li>)}</ol>
      {items.length < max && <div className="mt-2 flex gap-2"><TextInput value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} aria-label={placeholder} /><button type="button" onClick={() => { if (v.trim()) { setItems([...items, v.trim()]); setV(""); } }} className="h-12 px-4 shrink-0 rounded-xl bg-white ring-1 ring-line-strong font-semibold text-[14px] inline-flex items-center gap-1.5 hover:ring-brand-300"><Plus className="size-4" />Add</button></div>}
    </section>
  );
}

export function TagInput({ initial, max = 10, id }: { initial: string[]; max?: number; id: string }) {
  const [t, setT] = useState(initial);
  const [v, setV] = useState("");
  return (
    <div className="min-h-12 rounded-xl bg-white ring-1 ring-line-strong p-1.5 flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-brand-400">
      {t.map((x) => <span key={x} className="h-8 pl-3 pr-1 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1">{x}<button type="button" aria-label={`Remove ${x}`} onClick={() => setT(t.filter((y) => y !== x))} className="size-6 grid place-items-center rounded-full hover:bg-white"><X className="size-3.5" /></button></span>)}
      {t.length < max && <input id={id} value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if ((e.key === "Enter" || e.key === ",") && v.trim()) { e.preventDefault(); setT([...t, v.trim()]); setV(""); } }} placeholder="Type and press Enter" className="flex-1 min-w-28 px-2 outline-none text-[14px]" />}
    </div>
  );
}

export function Panel({ title, badge, children, open = true }: { title: string; badge?: ReactNode; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group bg-white rounded-[22px] shadow-soft">
      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-between gap-3 px-5 h-14"><span className="font-semibold">{title}</span><span className="flex items-center gap-2">{badge}<ChevronDown className="size-5 text-ink-400 transition-transform group-open:rotate-180" /></span></summary>
      <div className="px-5 pb-5 space-y-4">{children}</div>
    </details>
  );
}

export function CoAuthors({ who = "Rehan Khan", tag = "Invite pending", note }: { who?: string; tag?: string; note: string }) {
  const [on, setOn] = useState(true);
  return (
    <>
      {on && (
        <div className="flex items-center gap-3 rounded-xl bg-canvas p-3">
          <Initials i="RK" /><div className="flex-1 min-w-0"><p className="font-semibold text-[14px]">{who}</p><Status s={tag} className="mt-1 h-6 text-[11.5px]" /></div>
          <Dialog triggerClass="size-9 grid place-items-center rounded-lg hover:bg-white text-ink-500" trigger={<Trash2 className="size-4" aria-label={`Remove ${who}`} />} title={`Remove ${who} as co-author?`} desc="They will be told by email and the piece will no longer appear on their author page." confirm={{ label: "Remove", tone: "danger", toast: `${who} removed` }} />
        </div>
      )}
      <div className="relative"><Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><TextInput placeholder="Search approved contributors" aria-label="Search approved contributors" className="pl-10" /></div>
      <p className="text-[12.5px] text-ink-500">{note}</p>
    </>
  );
}

export function EditorBar({ status, saved, submitHref, kind, previewTitle }: { status: string; saved: string; submitHref: string; kind: "article" | "report"; previewTitle: string }) {
  const [device, setDevice] = useState("Desktop");
  return (
    <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 lg:-mx-8 -mt-5 sm:-mt-8 mb-6 px-4 sm:px-6 lg:px-8 py-3 bg-white/90 backdrop-blur-xl border-b border-line flex items-center gap-2 sm:gap-3 flex-wrap">
      <Link href={`/portal/${kind}s`} className="text-[13px] font-semibold text-ink-500 hover:text-brand-800 hidden sm:block">My {kind === "article" ? "Articles" : "Reports"}</Link>
      <Status s={status} />
      <span className="text-[13px] text-ink-500 inline-flex items-center gap-1.5"><Check className="size-4 text-brand-600" />Saved {saved}</span>
      <span className="flex-1" />
      <Dialog side triggerClass="size-10 sm:size-auto sm:h-10 sm:px-3.5 rounded-full grid sm:inline-flex place-items-center items-center gap-2 text-[14px] font-semibold text-ink-700 hover:bg-canvas" trigger={<><History className="size-4" /><span className="hidden sm:inline">Versions</span></>} title="Version history" desc="4 versions" confirm={{ label: "Restore version 3", toast: "Version 3 restored as a new draft" }}>
        {[["Version 4", "16 Oct 2026, 10:41 · Hina Shah", "Current"], ["Version 3", "15 Oct 2026, 20:02 · Sara Haider", "Submitted"], ["Version 2", "12 Oct 2026, 21:40 · Sara Haider", "Submitted"], ["Version 1", "1 Oct 2026, 10:12 · Sara Haider", "Draft"]].map(([v, d, s], i) => (
          <div key={v} className={clsx("rounded-2xl p-4 ring-1", i === 1 ? "ring-2 ring-brand-400 bg-mint-100/40" : "ring-line")}><div className="flex justify-between gap-3"><p className="font-semibold">{v}</p><span className="text-[12px] font-semibold text-ink-500">{s}</span></div><p className="text-[13px] text-ink-500">{d}</p></div>
        ))}
        <div className="rounded-2xl bg-canvas p-4"><p className="text-[12px] font-bold uppercase tracking-wider text-ink-500">Changes in version 3</p><p className="mt-2 font-serif text-[16px]">...flows by as much as <del className="bg-danger-50 text-danger-700">a quarter</del> <ins className="bg-mint-200 no-underline">20 per cent</ins>...</p><button type="button" className="mt-3 text-[13px] font-semibold text-brand-700">Compare with current</button></div>
      </Dialog>
      <Dialog size="xl" triggerClass="h-10 px-3.5 rounded-full inline-flex items-center gap-2 text-[14px] font-semibold text-ink-700 hover:bg-canvas" trigger={<><Eye className="size-4" /><span className="hidden sm:inline">Preview</span></>} title={`Preview: ${previewTitle}`} cancel="Close preview">
        <div className="flex gap-2">{["Desktop", "Mobile"].map((d) => <button key={d} type="button" onClick={() => setDevice(d)} className={clsx("h-9 px-3.5 rounded-full text-[13px] font-semibold inline-flex items-center gap-1.5", device === d ? "bg-brand-800 text-white" : "bg-canvas")}><MonitorSmartphone className="size-4" />{d}</button>)}</div>
        <div className={clsx("mx-auto rounded-[24px] ring-1 ring-line p-6 sm:p-10 bg-white transition-all", device === "Mobile" ? "max-w-[390px]" : "max-w-3xl")}>
          <p className="eyebrow text-brand-600">Climate and Environment · Analysis</p>
          <h3 className="mt-2 font-serif text-[30px] leading-tight font-semibold">{previewTitle}</h3>
          <p className="mt-3 font-serif text-[18px] text-ink-600">Treaty mechanisms have held through three wars.</p>
          <div className="mt-6 aspect-video rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950" />
        </div>
      </Dialog>
      <button type="button" onClick={() => toast("Draft saved")} className="h-10 px-4 rounded-full ring-1 ring-line-strong text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-canvas"><Save className="size-4" /><span className="hidden sm:inline">Save draft</span></button>
      <Link href={submitHref} className="h-10 px-4 rounded-full bg-brand-800 text-white text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-brand-700"><Send className="size-4" />Submit<span className="hidden sm:inline"> for review</span></Link>
    </div>
  );
}

export function UploadedFile({ name, meta, onReplace = true }: { name: string; meta: string; onReplace?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-canvas p-3">
      <span className="size-11 rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 shrink-0 grid place-items-center text-white"><FileUp className="size-5" /></span>
      <div className="min-w-0 flex-1"><p className="font-semibold text-[14px] truncate">{name}</p><p className="text-[12.5px] text-ink-500">{meta}</p></div>
      {onReplace && <button type="button" className="h-9 px-3 rounded-full bg-white ring-1 ring-line text-[13px] font-semibold">Replace</button>}
    </div>
  );
}

export function TopicFields() {
  const [t, setT] = useState("National Affairs");
  const topic = TOPICS.find((x) => x.name === t) ?? TOPICS[2];
  return (
    <>
      <Field label="Topic" required htmlFor="ed-topic"><select id="ed-topic" value={t} onChange={(e) => setT(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white ring-1 ring-line-strong text-[15px] outline-none focus:ring-2 focus:ring-brand-400">{TOPICS.map((x) => <option key={x.slug}>{x.name}</option>)}</select></Field>
      <Field label="Subtopic" required htmlFor="ed-sub"><Select id="ed-sub" options={topic.subs.map((s) => s.name)} defaultValue={topic.subs[0].name} /></Field>
    </>
  );
}

