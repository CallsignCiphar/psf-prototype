"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowDown, ArrowUp, GripVertical, LayoutTemplate, Megaphone, Plus, Rows3, Type, Users2 } from "lucide-react";
import { toast } from "./Shell";
import { UploadedFile } from "./Editor";
import { Field, TextArea, TextInput } from "@/components/form";

const INIT = [["Hero", "Title, standfirst, image", LayoutTemplate], ["Rich text", "Our mission", Type], ["Stats row", "4 figures", Rows3], ["People grid", "Board of advisers, 8 people", Users2], ["Rich text", "Funding and independence", Type], ["Call to action", "Publish with us", Megaphone]] as const;

export function CmsBlocks() {
  const [b, setB] = useState([...INIT]);
  const [sel, setSel] = useState(0);
  const move = (i: number, d: number) => { const a = [...b]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setB(a); setSel(j); };
  return (
    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 items-start">
      <section className="bg-white rounded-[22px] shadow-soft p-4">
        <div className="flex items-center justify-between px-2 pb-3"><h2 className="font-semibold">Blocks</h2><button type="button" onClick={() => toast("Choose a block type")} className="h-9 px-3.5 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1.5"><Plus className="size-4" />Add block</button></div>
        <ol className="space-y-1.5">{b.map(([t, d, I], i) => (
          <li key={t + d}><div className={clsx("flex items-center gap-3 rounded-2xl p-2.5 pr-1.5 cursor-pointer transition", sel === i ? "bg-brand-800 text-white" : "hover:bg-canvas")} onClick={() => setSel(i)}>
            <GripVertical className={clsx("size-4 shrink-0", sel === i ? "text-white/50" : "text-ink-300")} />
            <span className={clsx("size-9 rounded-xl grid place-items-center shrink-0", sel === i ? "bg-white/12 text-mint-300" : "bg-canvas text-brand-700")}><I className="size-[18px]" /></span>
            <span className="flex-1 min-w-0"><span className="block font-semibold text-[14px]">{t}</span><span className={clsx("block text-[12.5px] truncate", sel === i ? "text-white/65" : "text-ink-500")}>{d}</span></span>
            <button type="button" aria-label="Move up" onClick={(e) => { e.stopPropagation(); move(i, -1); }} className="size-8 grid place-items-center rounded-lg hover:bg-white/10"><ArrowUp className="size-4" /></button>
            <button type="button" aria-label="Move down" onClick={(e) => { e.stopPropagation(); move(i, 1); }} className="size-8 grid place-items-center rounded-lg hover:bg-white/10"><ArrowDown className="size-4" /></button>
          </div></li>
        ))}</ol>
      </section>
      <section className="bg-white rounded-[22px] shadow-soft p-5 sm:p-6 space-y-5">
        <h2 className="font-semibold text-[16.5px]">{b[sel][0]} block</h2>
        {b[sel][0] === "Hero" ? (<>
          <Field label="Heading" required htmlFor="ce-h"><TextInput id="ce-h" defaultValue="Independent analysis of Pakistan's security" /></Field>
          <Field label="Standfirst" htmlFor="ce-s"><TextArea id="ce-s" rows={3} defaultValue="Evidence-led writing on defence, geopolitics and national affairs since 2019." /></Field>
          <Field label="Background image" hint="Scrim applied automatically"><UploadedFile name="about-hero.jpg" meta="2400x1200" /></Field>
          <div className="grid sm:grid-cols-2 gap-4"><Field label="Alt text" required htmlFor="ce-a"><TextInput id="ce-a" /></Field><Field label="Credit" htmlFor="ce-c"><TextInput id="ce-c" /></Field></div>
        </>) : (<>
          <Field label="Heading" htmlFor="ce-bh"><TextInput id="ce-bh" key={sel} defaultValue={b[sel][1]} /></Field>
          <Field label="Content" htmlFor="ce-bc"><TextArea id="ce-bc" key={`c${sel}`} rows={8} defaultValue="Content for this block is edited here and appears on the page in the order shown." /></Field>
        </>)}
      </section>
    </div>
  );
}
