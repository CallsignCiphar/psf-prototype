"use client";

import { useState } from "react";
import { GripVertical, Plus, Search, Upload } from "lucide-react";
import { Pills, Switch } from "./interactive";
import { toast } from "./Shell";
import { UploadedFile } from "./Editor";
import { Field, TextInput } from "@/components/form";

const NAV = ["Topics", "Reports", "Research", "Global Watch", "Newsroom", "About", "Videos", "Publish with us", "Contact", "Advertise"];
const FOOT: Record<string, string[]> = { Explore: ["Topics", "Reports", "Research"], About: ["About Pakistan Strategic Forum", "Where we are", "Contact"], Contribute: ["Publish with us", "Submit a paper"], Policies: ["Editorial", "Corrections", "Copyright"], Legal: ["Privacy", "Terms", "Cookies"] };
const MEDIA = [["about-hero.jpg", "2400x1200"], ["tarbela-2025.jpg", "1600x900"], ["roundtable-oct.jpg", "1600x900"], ["national-affairs.jpg", "1920x600"], ["flood-relief-card.jpg", "1200x800"], ["ndu-signing.jpg", "1600x1067"], ["psf-logo-white.svg", "SVG"], ["dialogue-2026.jpg", "1600x900"], ["hypersonics-cover.jpg", "1600x900"], ["karachi-port.jpg", "1600x900"], ["budget-card.jpg", "1200x800"], ["red-sea.jpg", "1600x900"]];
const MAP: Record<string, string> = { navigation: "Navigation", footer: "Footer", social: "Social links", media: "Media library", global: "Global settings" };

export function CmsSettings({ initial }: { initial: string }) {
  const [tab, setTab] = useState(MAP[initial] ?? "Navigation");
  return (
    <div>
      <Pills items={Object.values(MAP)} value={tab} onChange={setTab} />
      <section className="mt-5 bg-white rounded-[22px] shadow-soft p-5 sm:p-6">
        {tab === "Navigation" && (<>
          <div className="flex items-center justify-between gap-3"><div><h2 className="font-semibold text-[16.5px]">Main navigation</h2><p className="text-[13px] text-ink-500">Topics open the mega menu. Drag to reorder, indent to nest.</p></div><button type="button" className="h-9 px-3.5 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1.5 shrink-0"><Plus className="size-4" />Add link</button></div>
          <ul className="mt-4 space-y-2">{NAV.map((n, i) => <li key={n} className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-canvas/60 ring-1 ring-line p-2 pl-3"><GripVertical className="size-4 text-ink-300 shrink-0" /><TextInput aria-label={`Label ${n}`} defaultValue={n} className="h-10 flex-1 min-w-0" /><TextInput aria-label={`Link ${n}`} defaultValue={`/${n.toLowerCase().replace(/ /g, "-")}`} className="h-10 flex-1 min-w-0 hidden sm:block font-mono text-[13px]" /><span className="text-[12px] font-semibold text-ink-500 w-14 text-right hidden sm:inline">{i === 9 ? "Hidden" : "Shown"}</span><Switch on={i !== 9} label={`Show ${n}`} /></li>)}</ul>
          <h3 className="mt-8 font-semibold">Utility bar</h3>
          <div className="mt-3 grid sm:grid-cols-2 gap-4"><Field label="Left text" hint="Date is set automatically" htmlFor="cs-ul"><TextInput id="cs-ul" defaultValue="Global Watch: 212 locations" /></Field><Field label="Right links" htmlFor="cs-ur"><TextInput id="cs-ur" defaultValue="Advertise" /></Field></div>
        </>)}
        {tab === "Footer" && (<><h2 className="font-semibold text-[16.5px]">Footer columns</h2><div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-5 gap-3">{Object.entries(FOOT).map(([c, ls]) => <div key={c} className="rounded-2xl bg-canvas/60 ring-1 ring-line p-4"><p className="font-semibold">{c}</p><ul className="mt-2 space-y-1.5">{ls.map((l) => <li key={l} className="h-9 px-3 rounded-lg bg-white ring-1 ring-line text-[13.5px] flex items-center gap-2"><GripVertical className="size-3.5 text-ink-300" />{l}</li>)}</ul><button type="button" className="mt-2 text-[13px] font-semibold text-brand-700 inline-flex items-center gap-1"><Plus className="size-3.5" />Add</button></div>)}</div></>)}
        {tab === "Social links" && (<><h2 className="font-semibold text-[16.5px]">Social links</h2><div className="mt-4 grid sm:grid-cols-2 gap-4">{["X", "LinkedIn", "YouTube", "Facebook", "Instagram"].map((s) => <Field key={s} label={s} htmlFor={`so-${s}`}><TextInput id={`so-${s}`} placeholder={`https://${s.toLowerCase()}.com/...`} /></Field>)}</div></>)}
        {tab === "Media library" && (<>
          <div className="flex flex-wrap items-center gap-3"><div className="relative flex-1 min-w-[200px]"><Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><input aria-label="Search media" placeholder="Search media" className="w-full h-11 pl-10 rounded-full bg-canvas ring-1 ring-line text-[14px] outline-none" /></div><select aria-label="Type" className="h-11 px-4 rounded-full ring-1 ring-line bg-white text-[14px] font-semibold"><option>Type: Images</option><option>Type: Documents</option></select><button type="button" onClick={() => toast("Choose files to upload")} className="h-11 px-4 rounded-full bg-brand-800 text-white text-[14px] font-semibold inline-flex items-center gap-2"><Upload className="size-4" />Upload</button></div>
          <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">{MEDIA.map(([n, d], i) => <li key={n}><button type="button" className="w-full text-left group"><span className="block aspect-[4/3] rounded-2xl ring-1 ring-line group-hover:ring-2 group-hover:ring-brand-500" style={{ background: `linear-gradient(${135 + i * 20}deg, #0a5a2d, #${["86cba1", "3fa96a", "022c15", "bfe3cc"][i % 4]})` }} /><span className="mt-1.5 block text-[12.5px] font-semibold truncate">{n}</span><span className="block text-[11.5px] text-ink-500">{d}</span></button></li>)}</ul>
        </>)}
        {tab === "Global settings" && (<div className="space-y-5 max-w-2xl"><h2 className="font-semibold text-[16.5px]">Global settings</h2>
          <Field label="Site name" required htmlFor="cs-sn"><TextInput id="cs-sn" defaultValue="Pakistan Strategic Forum" /></Field>
          <Field label="Tagline" htmlFor="cs-tl"><TextInput id="cs-tl" defaultValue="Independent analysis of the forces shaping Pakistan's security and the region around it." /></Field>
          <Field label="Default social image"><UploadedFile name="psf-default-og.jpg" meta="1200x630" /></Field>
          <Field label="Copyright line" htmlFor="cs-cr"><TextInput id="cs-cr" defaultValue="© 2019 to 2026 Pakistan Strategic Forum" /></Field>
          {[["Show cookie banner", "Required for analytics cookies", true], ["Show Videos in navigation", "", false]].map(([t, d, on]) => <div key={t as string} className="flex items-center justify-between gap-4 rounded-2xl bg-canvas p-4"><div><p className="font-semibold">{t as string}</p>{d && <p className="text-[13px] text-ink-500">{d as string}</p>}</div><Switch on={on as boolean} label={t as string} /></div>)}
        </div>)}
      </section>
      <div className="mt-4 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3"><p className="text-[13px] text-ink-500">Last saved 14 Oct 2026, 15:20 by Hina Shah</p><div className="flex gap-2"><button type="button" className="h-11 px-5 rounded-full ring-1 ring-line-strong font-semibold flex-1 sm:flex-none">Discard</button><button type="button" onClick={() => toast("Saved. Changes apply site-wide.")} className="h-11 px-6 rounded-full bg-brand-800 text-white font-semibold flex-1 sm:flex-none">Save</button></div></div>
    </div>
  );
}
