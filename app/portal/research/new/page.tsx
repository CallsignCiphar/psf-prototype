import Link from "next/link";
import type { Metadata } from "next";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Check, Info, Pencil, Save, Send } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { ActionButton } from "@/components/dash/interactive";
import { Note, PageHead } from "@/components/dash/kit";
import { UploadedFile } from "@/components/dash/Editor";
import { Abstract, CoAuthorRows, Keywords, PaperType } from "@/components/dash/ResearchForm";
import { Check as Tick, Field, FileDrop, Segmented, Select, TextArea, TextInput } from "@/components/form";
import { Initials } from "@/components/dash/kit";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Submit a research paper" };
const STEPS = ["Manuscript details", "Authors and files", "Declarations and submit"];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="bg-white rounded-[24px] shadow-soft p-5 sm:p-7"><h2 className="font-semibold text-[17px] mb-5">{title}</h2><div className="space-y-5">{children}</div></section>;
}

export default async function SubmitResearch({ searchParams }: { searchParams: Promise<{ step?: string }> }) {
  const step = Math.min(3, Math.max(1, Number((await searchParams).step) || 1));
  return (
    <DashShell kind="portal" active="research" title="Submit research">
      <PageHead crumbs={[{ label: "My Research", href: "/portal/research" }, { label: "New submission" }]} title="Submit a research paper" desc={`Step ${step} of 3`} />
      <ol className="grid grid-cols-3 gap-2 mb-6" aria-label="Submission steps">
        {STEPS.map((s, i) => { const n = i + 1; const done = n < step, now = n === step; return (
          <li key={s} aria-current={now ? "step" : undefined}>
            <Link href={`/portal/research/new?step=${n}`} className={clsx("flex items-center gap-2.5 rounded-2xl p-2.5 sm:p-3.5 transition", now ? "bg-brand-800 text-white shadow-lift" : done ? "bg-mint-100 text-brand-900" : "bg-white shadow-soft text-ink-500")}>
              <span className={clsx("size-8 rounded-full grid place-items-center text-[13px] font-bold shrink-0", now ? "bg-white text-brand-800" : done ? "bg-brand-700 text-white" : "bg-canvas")}>{done ? <Check className="size-4" strokeWidth={3} /> : n}</span>
              <span className="text-[13px] sm:text-[14px] font-semibold leading-tight hidden sm:block">{s}</span>
            </Link>
          </li>
        ); })}
      </ol>
      <p className="sm:hidden -mt-3 mb-5 text-[14px] font-semibold text-brand-800">{STEPS[step - 1]}</p>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          {step === 1 && (<>
            <Block title="Paper type"><PaperType /></Block>
            <Block title="Manuscript">
              <Field label="Title" required htmlFor="rs-title" counter="58 / 200"><TextInput id="rs-title" required defaultValue="Groundwater depletion in the Lower Indus: a security lens" /></Field>
              <Abstract /><Keywords />
            </Block>
            <Block title="Classification">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Research category" required htmlFor="rs-cat"><Select id="rs-cat" options={["Climate and Resource Security", "Strategic Stability", "Urban Security", "Economic Security", "Human Security", "Information Security"]} defaultValue="Climate and Resource Security" /></Field>
                <Field label="Topic" required htmlFor="rs-top"><Select id="rs-top" options={["Climate and Environment", "Defence", "Geopolitics", "National Affairs"]} defaultValue="Climate and Environment" /></Field>
              </div>
              <Field label="Is this based on a thesis or dissertation?"><Segmented name="th" options={["Yes", "No"]} defaultValue="No" /></Field>
            </Block>
          </>)}
          {step === 2 && (<>
            <Block title="Authors">
              <div className="flex items-center gap-3 rounded-2xl bg-mint-100 p-4"><Initials i="SH" tone="brand" size={44} /><div className="flex-1 min-w-0"><p className="font-semibold">Sara Haider</p><p className="text-[13px] text-ink-600 truncate">Quaid-i-Azam University · ORCID 0000-0002-1825-0097</p></div><span className="h-7 px-2.5 rounded-full bg-white text-brand-800 text-[12px] font-semibold grid place-items-center shrink-0">Corresponding author</span></div>
              <h3 className="font-semibold text-[15px] pt-2">Co-authors</h3>
              <CoAuthorRows />
            </Block>
            <Block title="Files">
              <Field label="Anonymised manuscript" required hint="DOCX or PDF, up to 20 MB. Remove names, affiliations and self-citations that identify you."><UploadedFile name="groundwater-lower-indus-anon.docx" meta="DOCX · 1.8 MB · uploaded 11:50" /></Field>
              <Field label="Title page" required hint="Names, affiliations, acknowledgements and funding. Editors only."><UploadedFile name="title-page.docx" meta="DOCX · 42 KB · uploaded 11:51" /></Field>
              <Field label="Supplementary files"><FileDrop label="Drop file here or browse" hint="Data, appendices or figures. Up to 5 files, 50 MB in total." multiple /></Field>
            </Block>
            <Block title="Cover letter"><Field label="Letter to the editor" hint="Optional. Why this paper fits Pakistan Strategic Forum and anything editors should know." htmlFor="rs-cl"><TextArea id="rs-cl" rows={5} /></Field></Block>
          </>)}
          {step === 3 && (<>
            <Block title="Declarations">
              <Tick required>This manuscript is original and is not under consideration elsewhere.</Tick>
              <Tick required>All listed authors have approved the submission.</Tick>
              <Field label="Conflict of interest" required><Segmented name="coi" options={["None to declare", "I have something to declare"]} /></Field>
              <Field label="Funding statement" htmlFor="rs-fund"><TextArea id="rs-fund" rows={3} /></Field>
              <Field label="Does the research involve human participants?" required><Segmented name="eth" options={["No", "Yes, with ethics approval (upload the approval letter)"]} /></Field>
              <Tick required>I agree to the <Link href="/policies/contributor-agreement" className="font-semibold text-brand-700 underline">Contributor Agreement</Link> and <Link href="/policies/editorial" className="font-semibold text-brand-700 underline">Editorial Policy</Link>.</Tick>
            </Block>
            <section className="bg-white rounded-[24px] shadow-soft p-5 sm:p-7">
              <div className="flex items-center justify-between mb-4"><h2 className="font-semibold text-[17px]">Review your submission</h2><Link href="/portal/research/new?step=1" className="text-[14px] font-semibold text-brand-700 inline-flex items-center gap-1.5"><Pencil className="size-4" />Edit</Link></div>
              <dl className="divide-y divide-line">
                {[["Type", "Original research"], ["Title", "Groundwater depletion in the Lower Indus: a security lens"], ["Category", "Climate and Resource Security"], ["Keywords", "Groundwater, Sindh, Water security, GRACE"], ["Authors", "Sara Haider (corresponding), Dr Ayesha Malik"], ["Files", "Anonymised manuscript, Title page"]].map(([a, b]) => <div key={a} className="py-3 grid sm:grid-cols-[160px_1fr] gap-1"><dt className="text-[13px] text-ink-500">{a}</dt><dd className="font-medium">{b}</dd></div>)}
              </dl>
            </section>
            <Note icon={Info} tone="blue" title="What happens next">Editors screen new papers within 5 working days. If it goes to review, two reviewers assess it double-blind. You can follow each stage in My Research.</Note>
          </>)}

          <div className="sticky bottom-[72px] lg:bottom-4 z-10 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur shadow-pop ring-1 ring-line p-2">
            {step > 1 ? <Link href={`/portal/research/new?step=${step - 1}`} className={btn("ghost", "md", "rounded-full")}><ArrowLeft className="size-4" />Back</Link> : <Link href="/portal/research" className={btn("ghost", "md", "rounded-full")}><ArrowLeft className="size-4" />Back</Link>}
            <span className="flex-1 text-center text-[12.5px] text-ink-500 hidden sm:inline"><Check className="size-3.5 inline text-brand-600" /> Draft saved 11:52</span>
            <ActionButton msg="Draft saved" className="h-11 px-4 rounded-full ring-1 ring-line-strong text-[14px] font-semibold inline-flex items-center gap-2 ml-auto sm:ml-0"><Save className="size-4" /><span className="hidden sm:inline">Save draft</span></ActionButton>
            {step < 3 ? <Link href={`/portal/research/new?step=${step + 1}`} className={btn("primary", "md", "rounded-full")}>Continue<ArrowRight className="size-4" /></Link>
              : <Link href="/portal/submitted?kind=research" className={btn("primary", "md", "rounded-full")}><Send className="size-4" />Submit paper</Link>}
          </div>
        </div>
        <aside className="hidden xl:block space-y-4 sticky top-24">
          <div className="rounded-[24px] bg-brand-900 text-white p-6">
            <p className="eyebrow text-mint-300">Before you submit</p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/85">{["Remove your name and institution from the manuscript.", "Use [Author, year] for your own earlier work.", "Put acknowledgements and funding on the title page.", "Keep the abstract between 150 and 300 words."].map((t) => <li key={t} className="flex gap-2.5"><Check className="size-4 mt-0.5 text-mint-300 shrink-0" />{t}</li>)}</ul>
            <Link href="/policies/peer-review" className="mt-5 inline-flex text-[14px] font-semibold text-mint-300 underline underline-offset-2">How peer review works</Link>
          </div>
        </aside>
      </div>
    </DashShell>
  );
}
