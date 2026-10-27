import Link from "next/link";
import { Download, ExternalLink, FileText, MessageSquareQuote, Pencil, TrendingUp, Undo2, XCircle } from "lucide-react";
import { Card, KV, Note, PageHead, Status, Timeline, type Step } from "./kit";
import { Dialog } from "./interactive";
import { Field, TextArea } from "@/components/form";
import { Cover, btn } from "@/components/ui";

const STATUS = { pending: "Pending review", changes: "Changes requested", live: "Live", rejected: "Rejected" } as const;
export type ViewStatus = keyof typeof STATUS;

export function ItemView({ kind, status }: { kind: "article" | "report"; status: ViewStatus }) {
  const art = kind === "article";
  const t = art ? "Water security and the Indus Waters Treaty" : "Seminar on climate finance for South Asia";
  const sf = art ? "Treaty mechanisms have held through three wars. Whether they hold through a hotter, drier basin is a different question." : "A one-day seminar with the Ministry of Climate Change on what South Asian states can realistically raise, and from whom.";
  const list = art ? "/portal/articles" : "/portal/reports";
  const steps: Step[] = status === "pending"
    ? [{ t: "Draft created", d: "1 Oct 2026, 10:12", s: "done" }, { t: "Submitted for review", d: "12 Oct 2026, 21:40", s: "done" }, { t: "Editorial review", d: "Usually within 3 working days", s: "now" }, { t: "Published", s: "todo" }]
    : status === "changes" ? [{ t: "Submitted for review", d: "12 Oct 2026, 21:40", s: "done" }, { t: "Changes requested", d: "15 Oct 2026, 16:10", s: "done" }, { t: "Resubmit", d: "No deadline", s: "now" }, { t: "Published", s: "todo" }]
    : status === "live" ? [{ t: "Submitted for review", d: "12 Oct 2026, 21:40", s: "done" }, { t: "Approved", d: "14 Oct 2026, 11:02", s: "done" }, { t: "Published", d: "14 Oct 2026, 12:00", s: "done" }]
    : [{ t: "Submitted for review", d: "12 Oct 2026, 21:40", s: "done" }, { t: "Rejected", d: "14 Oct 2026, 11:02", s: "bad" }];
  const action = status === "pending"
    ? <Dialog triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><Undo2 className="size-4" />Withdraw submission</>} title="Withdraw from review?" desc="Editors stop reviewing it and it returns to your drafts. You can submit again later." confirm={{ label: "Withdraw", tone: "danger", toast: "Withdrawn and moved to drafts" }} href={list}>
        <Field label="Reason" hint="Optional. Shared with editors." htmlFor="m-wd"><TextArea id="m-wd" rows={3} /></Field>
      </Dialog>
    : status === "changes" ? <Link href={`${list}/new?state=changes`} className={btn("primary", "md", "rounded-full")}><Pencil className="size-4" />Edit and resubmit</Link>
    : status === "live" ? <Link href={art ? "/articles/air-defence-in-depth" : "/reports/future-warfare-readout"} className={btn("primary", "md", "rounded-full")}><ExternalLink className="size-4" />View live</Link> : null;
  const details: [string, string][] = art
    ? [["Label", "Analysis"], ["Topic", "Climate and Environment"], ["Subtopic", "Water"], ["Location", "Pakistan, India"], ["Tags", "Indus, Treaty, Water"], ["Words", "2,140"]]
    : [["Category", "Seminar"], ["Event date", "2 Oct 2026"], ["Venue", "Islamabad"], ["Topic", "Climate and Environment"], ["Co-authors", "Rehan Khan"]];
  return (
    <>
      <PageHead crumbs={[{ label: art ? "My Articles" : "My Reports", href: list }, { label: t }]} title={t} badge={<Status s={STATUS[status]} />} desc="Read only" actions={action} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          {status === "changes" && <Note icon={MessageSquareQuote} tone="violet" title="Editor feedback">&ldquo;Please cite the 2023 neutral expert decision directly and cut the second section by about a third.&rdquo;<span className="block mt-1 text-[13px] text-ink-500">Pakistan Strategic Forum Editorial · 15 Oct 2026, 16:10 PKT</span></Note>}
          {status === "rejected" && <Note icon={XCircle} tone="red" title="Reason for rejection">Outside editorial scope. This piece reads as advocacy for a specific policy position without the evidence base Pakistan Strategic Forum requires for Analysis.<span className="block mt-1 text-[13px] text-ink-500">Pakistan Strategic Forum Editorial · 14 Oct 2026, 11:02 PKT · <Link href="/policies/editorial" className="font-semibold text-danger-700 underline">Read the editorial policy</Link></span></Note>}
          <article className="bg-white rounded-[28px] shadow-soft overflow-hidden">
            <div className="p-5 sm:p-9">
              <p className="eyebrow text-brand-600">{art ? "Climate and Environment · Analysis" : "Seminar · 2 October 2026, Islamabad"}</p>
              <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] leading-tight font-semibold tracking-[-0.02em]">{t}</h2>
              <p className="mt-3 font-serif text-[18px] sm:text-[20px] text-ink-600 leading-relaxed">{sf}</p>
              <p className="mt-5 text-[14px]"><span className="font-semibold">Sara Haider</span> <span className="text-ink-500">· MPhil candidate, Quaid-i-Azam University</span></p>
            </div>
            <Cover seed={art ? 7 : 22} kind="contour" className="aspect-[16/8]" label="Cover image" />
            <div className="p-5 sm:p-9 font-serif text-[18px] leading-[1.75] text-ink-800 space-y-5">
              <p>The Indus Waters Treaty has outlasted three wars and decades of hostile rhetoric. Its dispute mechanisms, the Permanent Indus Commission, the neutral expert and the court of arbitration, have each been used, and each has produced outcomes both sides could live with.</p>
              <p>The pressure now is hydrological rather than political. Glacier melt is front-loading flows, monsoon variability is widening, and the treaty assumes a river that is changing beneath it.</p>
              <p className="font-sans text-[13px] text-ink-500 rounded-xl bg-canvas px-4 py-3">Preview shows the first 3 paragraphs.</p>
              {!art && (
                <div className="font-sans flex items-center gap-3 rounded-2xl ring-1 ring-line p-3">
                  <span className="size-11 rounded-xl bg-danger-50 text-danger-700 grid place-items-center"><FileText className="size-5" /></span>
                  <div className="flex-1 min-w-0"><p className="font-semibold text-[14px] truncate">psf-climate-finance-seminar-2026.pdf</p><p className="text-[12.5px] text-ink-500">PDF · 24 pages · 3.1 MB</p></div>
                  <button type="button" className={btn("secondary", "sm", "rounded-full")}><Download className="size-4" />Download</button>
                </div>
              )}
            </div>
          </article>
        </div>
        <aside className="space-y-4 min-w-0">
          <Card title="Status"><Timeline steps={steps} /></Card>
          {status === "live" && (
            <Card title="Performance" action={<TrendingUp className="size-5 text-brand-600" />}>
              <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-mint-100 p-4"><p className="text-[13px] text-ink-600">Reads</p><p className="font-serif text-[28px] font-semibold tabular-nums">412</p></div><div className="rounded-2xl bg-canvas p-4"><p className="text-[13px] text-ink-600">Since</p><p className="font-semibold mt-2">14 Oct 2026</p></div></div>
            </Card>
          )}
          <Card title="Details"><KV items={details} /></Card>
        </aside>
      </div>
    </>
  );
}
