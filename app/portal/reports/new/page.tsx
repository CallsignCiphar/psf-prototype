import Link from "next/link";
import type { Metadata } from "next";
import { CircleAlert, Trash2 } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Dialog } from "@/components/dash/interactive";
import { CoAuthors, Counted, EditorBar, Panel, TagInput, Toolbar, UploadedFile } from "@/components/dash/Editor";
import { Check, Field, FileDrop, Select, TextInput } from "@/components/form";
import { REPORT_CATEGORIES, TOPICS } from "@/lib/data";

export const metadata: Metadata = { title: "Report editor" };

export default function ReportEditor() {
  return (
    <DashShell kind="portal" active="reports" title="Report editor">
      <EditorBar kind="report" status="Draft" saved="11:48" submitHref="/portal/submitted?kind=article" previewTitle="Roundtable: Afghanistan after the transition" />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          <div className="bg-white rounded-[28px] shadow-soft p-5 sm:p-8 space-y-6">
            <Counted id="re-title" label="Title" max={120} big initial="Roundtable: Afghanistan after the transition" />
            <Counted id="re-sum" label="Summary" max={300} rows={3} initial="A closed-door roundtable on border management, trade and refugee returns since 2021." />
            <Toolbar embeds={false} />
            <div contentEditable suppressContentEditableWarning className="min-h-[220px] outline-none font-serif text-[18px] leading-[1.75] text-ink-800 space-y-5 [&_h2]:text-[24px] [&_h2]:font-semibold">
              <p>Pakistan Strategic Forum convened a closed-door roundtable on 9 October 2026 under the Chatham House Rule. Participants included former diplomats, two retired corps commanders and researchers from three universities.</p>
              <h2>Key themes</h2>
              <p className="text-ink-400">Continue writing, or type / for blocks</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-line text-[13px]"><span className="font-semibold tabular-nums">412 words</span><span className="text-ink-500 inline-flex items-center gap-1.5"><CircleAlert className="size-4" />Body is optional when a PDF is attached</span></div>
          </div>
          <section className="bg-white rounded-[22px] shadow-soft p-5 sm:p-6">
            <div className="flex items-baseline justify-between mb-3"><h3 className="font-semibold">Report PDF</h3><span className="text-[12px] font-semibold text-danger-700">Required</span></div>
            <FileDrop label="Drop the PDF here or browse" hint="PDF only, up to 20 MB. Readers can download it from the report page." accept=".pdf" />
          </section>
        </div>
        <aside className="space-y-4 min-w-0">
          <Panel title="Classification">
            <Field label="Category" required htmlFor="re-cat"><Select id="re-cat" options={REPORT_CATEGORIES} defaultValue="Roundtable" /></Field>
            <Field label="Topic" required htmlFor="re-top"><Select id="re-top" options={TOPICS.map((t) => t.name)} defaultValue="Geopolitics" /></Field>
            <Field label="Tags" hint="Up to 10" htmlFor="re-tags"><TagInput id="re-tags" initial={["Afghanistan", "Border trade"]} /></Field>
          </Panel>
          <Panel title="Event details">
            <div className="grid grid-cols-2 gap-3"><Field label="Event date" required htmlFor="re-date"><TextInput id="re-date" type="date" defaultValue="2026-10-09" /></Field><Field label="City" required htmlFor="re-city"><TextInput id="re-city" defaultValue="Islamabad" /></Field></div>
            <Field label="Venue" htmlFor="re-venue"><TextInput id="re-venue" /></Field>
            <Field label="Partner organisations" htmlFor="re-part"><TextInput id="re-part" placeholder="Optional" /></Field>
          </Panel>
          <Panel title="Cover image">
            <UploadedFile name="roundtable-oct.jpg" meta="1600x900 · 16:9 · 640 KB" />
            <div className="grid grid-cols-2 gap-3"><Field label="Alt text" required htmlFor="re-alt"><TextInput id="re-alt" /></Field><Field label="Credit" required htmlFor="re-cred"><TextInput id="re-cred" /></Field></div>
          </Panel>
          <Panel title="Co-authors"><CoAuthors tag="Invite pending" note="Up to 4. Pending invites are removed at submission." /></Panel>
          <Panel title="Declarations" badge={<span className="text-[12px] font-semibold text-danger-700">Required</span>}>
            <Check required>Participants agreed to this summary being published.</Check>
            <Check required>I agree to the <Link href="/policies/contributor-agreement" className="font-semibold text-brand-700 underline">Contributor Agreement</Link>.</Check>
          </Panel>
          <Dialog triggerClass="w-full h-12 rounded-full text-danger-700 font-semibold inline-flex items-center justify-center gap-2 hover:bg-danger-50" trigger={<><Trash2 className="size-4" />Delete draft</>}
            title="Delete this draft?" desc='"Roundtable: Afghanistan after the transition" will be deleted. You cannot undo this.' confirm={{ label: "Delete draft", tone: "danger", toast: "Draft deleted" }} href="/portal/reports" />
        </aside>
      </div>
    </DashShell>
  );
}
