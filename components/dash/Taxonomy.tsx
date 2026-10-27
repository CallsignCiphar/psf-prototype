"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ChevronRight, GripVertical, Plus, Trash2 } from "lucide-react";
import { Dialog, Pills, Switch } from "./interactive";
import { toast } from "./Shell";
import { UploadedFile } from "./Editor";
import { Field, Select, TextArea, TextInput } from "@/components/form";

const TOPICS: [string, number, [string, number][]][] = [
  ["National Affairs", 412, [["Security", 61], ["Governance", 39], ["Federal and provincial", 70], ["Elections", 103]]],
  ["International Affairs", 388, []], ["Defence and Security", 301, []], ["Economy", 214, []], ["Climate and Environment", 96, []], ["Strategic Stability", 152, []], ["Science and Technology", 61, []],
];
const REPORT_CATS: [string, number][] = [["Annual Outlook", 4], ["Special Reports", 9], ["Conference", 22], ["Policy brief", 31], ["Roundtable", 18], ["Seminar", 12]];
const RES_CATS: [string, number][] = [["Research Papers", 31], ["Policy Briefs", 12], ["Emerging Scholars", 5]];

export function Taxonomy() {
  const [tab, setTab] = useState("Topics");
  const [sel, setSel] = useState("National Affairs");
  const list: [string, number, [string, number][]][] = tab === "Topics" ? TOPICS : (tab === "Report categories" ? REPORT_CATS : RES_CATS).map(([n, c]) => [n, c, []]);
  const cur = list.find((x) => x[0] === sel) ?? list[0];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3"><Pills items={["Topics", "Report categories", "Research categories"]} value={tab} onChange={(t) => { setTab(t); setSel(t === "Topics" ? "National Affairs" : (t === "Report categories" ? REPORT_CATS : RES_CATS)[0][0]); }} /><Link href="/admin/taxonomy/tags" className="h-10 px-4 rounded-full bg-white shadow-soft text-[14px] font-semibold inline-flex items-center gap-1.5 text-ink-700 hover:text-brand-800">Tags<ChevronRight className="size-4" /></Link></div>
      <div className="mt-5 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-5 items-start">
        <section className="bg-white rounded-[22px] shadow-soft p-4">
          <div className="flex items-center justify-between px-2 pb-3"><h2 className="font-semibold">{tab}</h2><button type="button" onClick={() => toast(`New ${tab === "Topics" ? "topic" : "category"} added`)} className="h-9 px-3.5 rounded-full bg-mint-100 text-brand-800 text-[13px] font-semibold inline-flex items-center gap-1.5"><Plus className="size-4" />Add</button></div>
          <ul className="space-y-1">{list.map(([n, c, subs]) => (
            <li key={n}>
              <button type="button" onClick={() => setSel(n)} className={clsx("w-full flex items-center gap-3 h-12 px-3 rounded-xl text-left transition", sel === n ? "bg-brand-800 text-white" : "hover:bg-canvas")}><GripVertical className={clsx("size-4", sel === n ? "text-white/50" : "text-ink-300")} /><span className="flex-1 font-semibold text-[14.5px]">{n}</span><span className={clsx("text-[13px] tabular-nums", sel === n ? "text-white/70" : "text-ink-500")}>{c}</span></button>
              {subs.length > 0 && <ul className="ml-9 mt-1 mb-2 border-l border-line pl-3 space-y-0.5">{subs.map(([s, sc]) => <li key={s} className="flex items-center justify-between h-9 px-3 rounded-lg text-[14px] text-ink-600 hover:bg-canvas"><span>{s}</span><span className="tabular-nums text-ink-400">{sc}</span></li>)}</ul>}
            </li>
          ))}</ul>
        </section>
        <section className="bg-white rounded-[22px] shadow-soft p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="font-semibold text-[16.5px] mb-5">Edit {tab === "Topics" ? "topic" : "category"}</h2>
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4"><Field label="Name" required htmlFor="tx-n"><TextInput id="tx-n" key={cur[0]} defaultValue={cur[0]} /></Field><Field label="Slug" required htmlFor="tx-s" hint={`psf.org.pk/topics/${cur[0].toLowerCase().replace(/ /g, "-")}`}><TextInput id="tx-s" key={cur[0] + "s"} defaultValue={cur[0].toLowerCase().replace(/ /g, "-")} /></Field></div>
            <Field label="Description" hint="Shown on the topic page header" htmlFor="tx-d"><TextArea id="tx-d" rows={3} /></Field>
            <Field label="Header image"><UploadedFile name="national-affairs.jpg" meta="1920x600" /></Field>
            <Field label="SEO title" htmlFor="tx-seo"><TextInput id="tx-seo" /></Field>
            <div className="flex items-center justify-between rounded-2xl bg-canvas p-4"><div><p className="font-semibold">Show in main navigation</p><p className="text-[13px] text-ink-500">Visible</p></div><Switch on label="Show in main navigation" /></div>
            <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 pt-2 border-t border-line">
              <Dialog triggerClass="h-11 px-4 rounded-full text-danger-700 font-semibold inline-flex items-center justify-center gap-2 hover:bg-danger-50 sm:mr-auto" trigger={<><Trash2 className="size-4" />Delete</>} title="This topic still has content" desc={`${cur[0]} has ${cur[1]} items${cur[2].length ? ` and ${cur[2].length} subtopics` : ""}. Move them to another topic first.`} confirm={{ label: "Move and delete", tone: "danger", toast: "Items moved and topic deleted" }}>
                <Field label="Move items to" required htmlFor="m-mv"><Select id="m-mv" required placeholder="Choose a topic" options={list.map((x) => x[0]).filter((x) => x !== cur[0])} /></Field>
              </Dialog>
              <button type="button" className="h-11 px-5 rounded-full ring-1 ring-line-strong font-semibold">Cancel</button>
              <button type="button" onClick={() => toast("Saved")} className="h-11 px-6 rounded-full bg-brand-800 text-white font-semibold">Save</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
