import type { Metadata } from "next";
import { BellRing, FileText, Search, Send, UserPlus, XOctagon } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Initials, KV, PageHead, Status, Timeline } from "@/components/dash/kit";
import { ActionButton, Dialog, TabPanels } from "@/components/dash/interactive";
import { Field, Segmented, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Research paper, editor view" };

function Reviewers() {
  return (
    <Card title="Reviewers" action={
      <Dialog size="lg" triggerClass={btn("primary", "sm", "rounded-full")} trigger={<><UserPlus className="size-4" />Invite reviewer</>} title="Invite a reviewer for RES-2026-00048" desc="Expertise: Economic Security" cancel={null} confirm={{ label: "Done" }}>
        <div className="relative"><Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><TextInput placeholder="Search approvers by name or expertise" aria-label="Search approvers" className="pl-10" /></div>
        <ul className="divide-y divide-line">{[["IS", "Dr Imran Siddiqui", "NDU", "Strategic stability, sanctions", "1", "6 reviews, avg. 17 days", true], ["AM", "Dr Ayesha Malik", "LUMS", "Economic security, trade", "0", "4 reviews, avg. 19 days"], ["OF", "Omar Farooq", "IIUI", "Export controls", "0", "New approver"]].map(([i, n, inst, ex, open, hist, inv]) => (
          <li key={n as string} className="flex flex-wrap items-center gap-3 py-3"><Initials i={i as string} /><span className="flex-1 min-w-[160px]"><span className="block font-semibold">{n as string} <span className="text-ink-500 font-normal">· {inst as string}</span></span><span className="block text-[13px] text-ink-500">{ex as string} · {open as string} open · {hist as string}</span></span>{inv ? <span className="text-[13px] font-semibold text-ink-500">Already invited</span> : <ActionButton msg={`Invitation sent to ${n}`} className={btn("secondary", "sm", "rounded-full")}>Invite</ActionButton>}</li>
        ))}</ul>
        <p className="text-[13px] text-ink-500">Approvers who are co-authors or share an institution with the author are hidden.</p>
      </Dialog>
    }>
      <ul className="divide-y divide-line">{[["RA", "Reviewer A", "Dr Imran Siddiqui · NDU", "12 Oct 2026", "Minor revisions"], ["RB", "Reviewer B", "Dr Ayesha Malik · LUMS", "13 Oct 2026", "Major revisions"]].map(([i, r, w, d, rec]) => (
        <li key={r} className="flex flex-wrap items-center gap-3 py-3.5"><Initials i={i} tone="grey" /><span className="flex-1 min-w-[160px]"><span className="block font-semibold">{r}</span><span className="block text-[13px] text-ink-500">{w}</span></span><Status s="Completed" /><span className="text-[13px] text-ink-500">{d}</span><Status s={rec} />
          <Dialog size="lg" triggerClass="text-[13px] font-semibold text-brand-700" trigger="Read review" title={`${r}: ${rec}`} cancel="Close"><p className="font-serif text-[17px] leading-relaxed">The argument is well supported, but the export data should be disaggregated by year and the case selection explained more clearly.</p></Dialog>
        </li>
      ))}</ul>
      <div className="mt-3 pt-3 border-t border-line"><Dialog triggerClass="text-[13px] font-semibold text-brand-700 inline-flex items-center gap-1.5" trigger={<><BellRing className="size-4" />Send reviewer reminder</>} title="Remind Reviewer B?" desc="The review of RES-2026-00045 was due on 14 Oct 2026, 2 days ago." confirm={{ label: "Send reminder", toast: "Reminder sent" }}>
        <Field label="Message" htmlFor="m-rt"><TextArea id="m-rt" rows={3} defaultValue="A gentle reminder that your review is now overdue. Please let us know if you need more time." /></Field>
        <Field label="New due date" hint="Optional" htmlFor="m-nd"><TextInput id="m-nd" type="date" /></Field>
      </Dialog></div>
    </Card>
  );
}

export default function ResearchItem() {
  return (
    <DashShell kind="admin" active="research" title="Research paper">
      <PageHead crumbs={[{ label: "Research papers", href: "/admin/research" }, { label: "RES-2026-00048" }]} title="Sanctions and dual-use exports from South Asia" badge={<Status s="Editor decision needed" />} desc="RES-2026-00048 · Original research · Round 1 · submitted 2 Sep 2026"
        actions={<Dialog triggerClass={btn("secondary", "md", "rounded-full text-danger-700")} trigger={<><XOctagon className="size-4" />Retract</>} title="Retract this paper?" desc="The paper stays online with a Retracted banner and the notice below. Citations to it still resolve." confirm={{ label: "Retract paper", tone: "danger", toast: "Paper retracted" }}>
          <Field label="Retraction notice" required hint="Published at the top of the paper" htmlFor="m-rn"><TextArea id="m-rn" rows={4} required /></Field>
          <Field label="Type RETRACT to confirm" required htmlFor="m-rtc"><TextInput id="m-rtc" required pattern="RETRACT" /></Field>
        </Dialog>} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
        <div className="min-w-0">
          <TabPanels tabs={[
            { label: "Overview", content: (
              <div className="space-y-5">
                <Reviewers />
                <Card title="Review summary">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{[["Originality", "4"], ["Method", "3"], ["Evidence", "3.5"], ["Clarity", "4"]].map(([l, v]) => <div key={l} className="rounded-2xl bg-canvas p-4"><p className="text-[12.5px] text-ink-500">{l}</p><p className="font-serif text-[26px] font-semibold tabular-nums">{v}<span className="text-[14px] text-ink-400 font-sans"> / 5 avg</span></p></div>)}</div>
                  <p className="mt-4 text-[14.5px] text-ink-700">Both reviewers support publication after revision. Reviewer B asks for the export data to be disaggregated by year and a clearer case selection.</p>
                </Card>
                <section className="bg-white rounded-[22px] shadow-soft ring-2 ring-mint-500 p-5 sm:p-6">
                  <h2 className="font-semibold text-[16.5px]">Editor decision</h2>
                  <form className="mt-4 space-y-5">
                    <Field label="Decision" required><Segmented name="ed" options={["Accept", "Minor revisions", "Major revisions", "Reject"]} defaultValue="Minor revisions" /></Field>
                    <div className="grid sm:grid-cols-2 gap-5"><Field label="Revision due" required htmlFor="ri-due"><TextInput id="ri-due" type="date" defaultValue="2026-11-15" /></Field><Field label="Send reviews to author"><Segmented name="sr" options={["Both, anonymised", "Reviewer A only", "None"]} /></Field></div>
                    <Field label="Decision letter" required htmlFor="ri-letter"><TextArea id="ri-letter" rows={6} defaultValue={"Dear Mr Iqbal,\n\nBoth reviewers support publication after revision. Please disaggregate the export data by year and explain your case selection."} /></Field>
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2"><ActionButton msg="Draft decision saved" className={btn("secondary", "md", "rounded-full")}>Save draft</ActionButton><Dialog triggerClass={btn("primary", "md", "rounded-full")} trigger={<><Send className="size-4" />Send decision</>} title="Send decision to the author?" desc="The author receives the letter and the anonymised reviews by email and in My Research." confirm={{ label: "Send decision", toast: "Decision sent" }} href="/admin/research" /></div>
                  </form>
                </section>
              </div>
            ) },
            { label: "Reviewers", count: 2, content: <Reviewers /> },
            { label: "Files", content: <Card><ul className="space-y-2">{["Anonymised manuscript · v1", "Title page · v1 · editors only", "Supplementary data · v1", "Cover letter"].map((f) => <li key={f}><button type="button" className="w-full flex items-center gap-3 rounded-xl bg-canvas p-3.5 text-left hover:bg-mint-100"><FileText className="size-5 text-brand-700" /><span className="font-semibold text-[14px]">{f}</span></button></li>)}</ul></Card> },
            { label: "History", content: <Card><Timeline steps={[{ t: "Reviews completed", d: "13 Oct 2026", s: "done" }, { t: "Reviewers accepted", d: "16 Sep 2026", s: "done" }, { t: "Passed screening", d: "6 Sep 2026", s: "done" }, { t: "Submitted", d: "2 Sep 2026", s: "done" }]} /></Card> },
          ]} />
        </div>
        <aside className="space-y-5 min-w-0 xl:mt-[60px]">
          <Card title="Details" action={<Dialog triggerClass="text-sm font-semibold text-brand-700" trigger="Reassign" title="Reassign editor" confirm={{ label: "Assign", toast: "Editor reassigned" }}><Segmented name="ae" options={["Hina Shah", "Dr Faisal Qureshi", "Usman Tariq"]} defaultValue="Dr Faisal Qureshi" /></Dialog>}>
            <KV items={[["Author", "Danish Iqbal (corresponding)"], ["Co-authors", "None"], ["Category", "Economic Security"], ["Keywords", "Sanctions, Export controls, Dual-use"], ["Editor", "Dr Faisal Qureshi"], ["COI", "None declared"], ["Funding", "None"]]} />
          </Card>
          <Card title="History"><Timeline steps={[{ t: "Reviews completed", d: "13 Oct 2026", s: "done" }, { t: "Reviewers accepted", d: "16 Sep 2026", s: "done" }, { t: "Passed screening", d: "6 Sep 2026", s: "done" }, { t: "Submitted", d: "2 Sep 2026", s: "done" }]} /></Card>
        </aside>
      </div>
    </DashShell>
  );
}
