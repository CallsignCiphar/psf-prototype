import Link from "next/link";
import type { Metadata } from "next";
import { CircleAlert, ImagePlus, MessageSquareQuote, Plus, Trash2 } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Note } from "@/components/dash/kit";
import { Dialog } from "@/components/dash/interactive";
import { CoAuthors, Counted, EditorBar, ImageDialog, ListAdder, Panel, TagInput, Toolbar, TopicFields, UploadedFile } from "@/components/dash/Editor";
import { Check, Field, Segmented, Select, TextArea, TextInput } from "@/components/form";
import { LABELS, REGIONS, COUNTRIES } from "@/lib/data";

export const metadata: Metadata = { title: "Article editor" };

export default async function ArticleEditor({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const changes = (await searchParams).state === "changes";
  const title = changes ? "Civil-military coordination in flood relief, 2010 to 2022" : "Untitled draft";
  return (
    <DashShell kind="portal" active="articles" title="Article editor">
      <EditorBar kind="article" status={changes ? "Changes requested" : "Draft"} saved="14:32" submitHref="/portal/submitted?kind=article" previewTitle={changes ? title : "Water security and the Indus Waters Treaty"} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          {changes && (
            <Note icon={MessageSquareQuote} tone="violet" title="The editor requested changes">
              &ldquo;Strong piece. Please add a source for the 2022 response figures in section 2, and shorten the standfirst to two lines.&rdquo;
              <span className="block mt-1.5 text-[13px] text-ink-500">Pakistan Strategic Forum Editorial · 15 Oct 2026, 16:10 PKT · <button type="button" className="font-semibold text-attn-700 underline">Comment history (2)</button></span>
            </Note>
          )}
          <div className="bg-white rounded-[28px] shadow-soft p-5 sm:p-8 space-y-6">
            <Counted id="ed-title" label="Title" max={120} big rows={2} initial={changes ? title : ""} />
            <Counted id="ed-sf" label="Standfirst" max={220} rows={3} initial={changes ? "How the army, provincial disaster authorities and NDMA divided the work in two floods, and why the handover keeps failing at district level." : ""} />
            <Toolbar />
            <div contentEditable suppressContentEditableWarning className="min-h-[320px] outline-none font-serif text-[18px] leading-[1.75] text-ink-800 space-y-5 [&_h2]:font-serif [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:text-ink-900">
              {changes ? (<>
                <p>When the 2010 floods reached Sindh, the army was the only institution with boats, helicopters and the logistics to move them at scale. That pattern held in 2022.</p>
                <h2>2. What the numbers show</h2>
                <p>In 2022, military units reached affected districts within 48 hours in most cases, while provincial disaster authorities took up to a week to set up coordination cells in the hardest-hit areas.<sup className="text-brand-700 font-sans font-bold">1</sup></p>
              </>) : <p className="text-ink-400">Start writing, or type / for blocks</p>}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-line text-[13px]">
              <span className="font-semibold text-ink-700 tabular-nums">{changes ? "1,842 words · 8 min read" : "0 words"}</span>
              <span className="text-ink-500 inline-flex items-center gap-1.5"><CircleAlert className="size-4" />Minimum 400 words to submit</span>
            </div>
          </div>
          <ListAdder label="Key takeaways" hint={`Optional · ${changes ? 2 : 0} of 5`} placeholder="Add takeaway" initial={changes ? ["The army reaches districts first; provinces take up to a week.", "Handover fails at district level, not in Islamabad."] : []} />
          <ListAdder label="Sources and references" hint="Optional" placeholder="Add source" max={40} initial={changes ? ["NDMA, Pakistan Floods 2022 Situation Report 84, Dec 2022."] : []} />
        </div>

        <aside className="space-y-4 min-w-0">
          <Panel title="Classification">
            <Field label="Content label" required htmlFor="ed-label"><Select id="ed-label" options={LABELS.filter((l) => l !== "Archive")} defaultValue="Analysis" /></Field>
            <TopicFields />
            <Field label="Tags" hint="Up to 10" htmlFor="ed-tags"><TagInput id="ed-tags" initial={changes ? ["Floods", "NDMA", "Civil-military"] : []} /></Field>
          </Panel>
          <Panel title="Location">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Region" required htmlFor="ed-reg"><Select id="ed-reg" options={REGIONS} defaultValue="South Asia" /></Field>
              <Field label="Country" required htmlFor="ed-cty"><Select id="ed-cty" options={COUNTRIES} defaultValue="Pakistan" /></Field>
            </div>
            <Field label="City" required htmlFor="ed-city"><TextInput id="ed-city" defaultValue={changes ? "Sukkur" : ""} /></Field>
            <button type="button" className="text-[14px] font-semibold text-brand-700 inline-flex items-center gap-1.5"><Plus className="size-4" />Add location (up to 4 more)</button>
          </Panel>
          <Panel title="Images" badge={<span className="h-6 px-2 rounded-full bg-danger-50 text-danger-700 text-[12px] font-semibold grid place-items-center">1 missing</span>}>
            <Field label="Card image" required>{changes ? <UploadedFile name="flood-relief-card.jpg" meta="1200x800 · 3:2 · 412 KB" /> : <ImageDialog title="Card image" triggerClass="w-full h-24 rounded-2xl border-2 border-dashed border-line-strong bg-canvas text-sm font-semibold text-ink-600 inline-flex items-center justify-center gap-2 hover:border-brand-300" trigger={<><ImagePlus className="size-5" />Add card image</>} />}</Field>
            <Field label="Cover image" required hint="1920x1080 · 16:9 · JPG, PNG, WebP · max 5MB"><ImageDialog title="Cover image" triggerClass="w-full h-24 rounded-2xl border-2 border-dashed border-line-strong bg-canvas text-sm font-semibold text-ink-600 inline-flex items-center justify-center gap-2 hover:border-brand-300" trigger={<><ImagePlus className="size-5" />Drop an image or browse</>} /></Field>
            <Field label="Cover caption" required htmlFor="ed-cap"><TextInput id="ed-cap" placeholder="What the image shows" /></Field>
            <div className="grid grid-cols-2 gap-3"><Field label="Credit" required htmlFor="ed-cred"><TextInput id="ed-cred" placeholder="Photo: ISPR" /></Field><Field label="Alt text" required htmlFor="ed-alt"><TextInput id="ed-alt" placeholder="Describe the image" /></Field></div>
          </Panel>
          <Panel title="Authors" badge={<span className="text-[12px] text-ink-500">Up to 4 co-authors</span>}>
            <CoAuthors note="Co-authors who haven't accepted are removed at submission." />
          </Panel>
          <Panel title="SEO and sharing" open={false}>
            <Field label="SEO title" htmlFor="ed-seo"><TextInput id="ed-seo" /></Field>
            <Field label="Meta description" htmlFor="ed-md"><TextArea id="ed-md" rows={3} /></Field>
          </Panel>
          <Panel title="Declarations" badge={<span className="text-[12px] font-semibold text-danger-700">Required</span>}>
            <Check required>This is my original work and has not been published elsewhere.</Check>
            <Field label="Conflict of interest"><Segmented name="coi" options={["None", "Describe"]} /></Field>
            <Check required>I agree to the <Link href="/policies/contributor-agreement" className="font-semibold text-brand-700 underline">Contributor Agreement</Link>.</Check>
          </Panel>
          <Panel title="Note to editors" open={false}>
            <Field label="Note" hint="Only Pakistan Strategic Forum editors see this." htmlFor="ed-note"><TextArea id="ed-note" rows={3} /></Field>
          </Panel>
          <Dialog triggerClass="w-full h-12 rounded-full text-danger-700 font-semibold inline-flex items-center justify-center gap-2 hover:bg-danger-50" trigger={<><Trash2 className="size-4" />Delete draft</>}
            title="Delete this draft?" desc={`"${changes ? title : "Untitled draft"}" will be deleted. You cannot undo this.`} confirm={{ label: "Delete draft", tone: "danger", toast: "Draft deleted" }} href="/portal/articles" />
        </aside>
      </div>
    </DashShell>
  );
}
