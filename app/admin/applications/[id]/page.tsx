import type { Metadata } from "next";
import { Check, CircleCheck, Lock, MessageSquareMore, ShieldCheck, XCircle } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Initials, KV, PageHead, Status, Tag, Timeline } from "@/components/dash/kit";
import { Dialog } from "@/components/dash/interactive";
import { Field, Select, TextArea } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Application review" };

export default function ApplicationReview() {
  return (
    <DashShell kind="admin" active="users" title="Application review">
      <PageHead crumbs={[{ label: "Users", href: "/admin/users" }, { label: "Pending applications", href: "/admin/applications" }, { label: "Sara Haider" }]} title="" />
      <section className="-mt-3 bg-white rounded-[28px] shadow-soft p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
        <Initials i="SH" size={64} tone="brand" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h1 className="font-serif text-[28px] font-semibold">Sara Haider</h1><Status s="Pending" /><Tag>Research Writer</Tag><Tag tone="violet">Attempt 2</Tag></div>
          <p className="mt-1 text-[14px] text-ink-500">sara.haider@qau.edu.pk <span className="text-brand-700 font-semibold">Verified</span> · Submitted 12 Oct 2026, 21:14 PKT</p>
        </div>
      </section>
      <div className="mt-5 grid xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Step 1: Account" action={<Tag><Lock className="size-3 mr-1" />Read-only</Tag>}><KV cols={2} items={[["Name", "Sara Haider"], ["Profile photo", "SH"], ["Areas of expertise", "Defence / Strategic Systems, Geopolitics / South Asia"], ["Institution", "Quaid-i-Azam University"], ["Designation", "Student"]]} /></Card>
          <Card title="Step 2: Research profile"><KV cols={2} items={[["Department", "Defence and Strategic Studies"], ["Programme / degree", "MPhil, Strategic Studies"], ["Graduation status", "Currently enrolled · expected 2027"], ["Registration number", "QAU-DSS-24-0117"], ["ORCID iD", <span key="o">0000-0002-1825-0097 <span className="text-brand-700 font-semibold">checksum valid</span></span>], ["Profile links", "Google Scholar · LinkedIn"], ["Research interests", "Nuclear deterrence and crisis stability in South Asia; missile technology and signalling; confidence-building measures."], ["Why register", "To publish peer-reviewed work from my MPhil thesis and contribute policy briefs on crisis stability."], ["Previous publications", "Conference paper, NDU Islamabad, 2025."]]} /></Card>
          <Card title="Student ID card" desc="Stored privately. Deleted 30 days after a decision.">
            <div className="aspect-[16/9] max-w-md rounded-2xl bg-gradient-to-br from-canvas to-mint-100 ring-1 ring-line grid place-items-center text-center p-6"><div><ShieldCheck className="size-8 mx-auto text-brand-600" /><p className="mt-2 font-semibold text-[14px]">Secure viewer</p><p className="text-[12.5px] text-ink-500">Signed URL, no download</p></div></div>
          </Card>
        </div>
        <aside className="space-y-5 min-w-0">
          <Card title="Submission context">
            <KV items={[["IP", "39.48.xxx.xxx"], ["Location", "Islamabad, Pakistan"], ["Device", "Desktop · Chrome 129 · Windows"], ["Time to complete form", "14 min"]]} />
            <ul className="mt-4 space-y-2 text-[14px]">{["Email domain matches stated university (qau.edu.pk)", "No other account from this IP", "Not a disposable email domain"].map((t) => <li key={t} className="flex gap-2"><CircleCheck className="size-4 text-brand-600 mt-0.5 shrink-0" />{t}</li>)}</ul>
          </Card>
          <Card title="History" desc="2 attempts"><Timeline steps={[{ t: "Returned with comments", d: "8 Oct 2026 · Usman Tariq: Please add your programme details and a short description of your research interests.", s: "done" }, { t: "Attempt 1 submitted", d: "6 Oct 2026, 18:02 PKT", s: "done" }]} /></Card>
          <Card title="Duplicate check"><p className="text-[14px] text-ink-600 flex gap-2"><Check className="size-4 text-brand-600 mt-0.5" />No other users with the same name, phone or IP.</p></Card>
          <section className="sticky bottom-[72px] lg:bottom-4 rounded-[24px] bg-brand-900 text-white p-5 shadow-pop">
            <p className="font-semibold">Decision for APP-2026-00218</p>
            <div className="mt-4 grid gap-2">
              <Dialog triggerClass={btn("light", "md", "w-full rounded-full")} trigger={<><Check className="size-4" />Approve</>} title="Approve Sara Haider as Research Writer?" desc="She gets an approval email and can sign in straight away." confirm={{ label: "Approve", toast: "Application approved" }} href="/admin/applications">
                <label className="flex gap-3 text-[15px]"><input type="checkbox" defaultChecked className="mt-0.5 size-5 accent-[#04411f]" />Also issue an ID card</label>
                <Field label="Welcome note" hint="Optional. Added to the email." htmlFor="m-an"><TextArea id="m-an" rows={3} /></Field>
              </Dialog>
              <Dialog triggerClass="h-11 rounded-full bg-white/10 ring-1 ring-white/20 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/15" trigger={<><MessageSquareMore className="size-4" />Request more information</>} title="Ask for more information" desc="The application moves to More info requested until they reply." confirm={{ label: "Send request", toast: "Request sent to applicant" }} href="/admin/applications">
                <Field label="What do you need?" required htmlFor="m-ri"><TextArea id="m-ri" rows={4} required /></Field>
                <label className="flex gap-3 text-[15px]"><input type="checkbox" defaultChecked className="mt-0.5 size-5 accent-[#04411f]" />Allow the applicant to upload a file</label>
              </Dialog>
              <div className="grid grid-cols-2 gap-2">
                <Dialog triggerClass="h-11 rounded-full bg-white/10 ring-1 ring-white/20 font-semibold text-[14px] inline-flex items-center justify-center gap-1.5 hover:bg-white/15" trigger={<><XCircle className="size-4" />Reject</>} title="Reject this application" confirm={{ label: "Reject application", tone: "danger", toast: "Application rejected" }} href="/admin/applications">
                  <Field label="Reason" required htmlFor="m-rr"><Select id="m-rr" options={["Could not verify enrolment", "Outside scope", "Incomplete application", "Other"]} defaultValue="Could not verify enrolment" /></Field>
                  <Field label="Message to applicant" required htmlFor="m-rm"><TextArea id="m-rm" rows={3} required /></Field>
                  <fieldset className="space-y-2"><legend className="text-sm font-semibold mb-1">Reapply</legend><label className="flex gap-3"><input type="radio" name="ra" defaultChecked className="accent-[#04411f] size-5" />Allow a new application after 90 days</label><label className="flex gap-3"><input type="radio" name="ra" className="accent-[#04411f] size-5" />Permanently reject this email</label></fieldset>
                </Dialog>
                <Dialog triggerClass="h-11 rounded-full text-[14px] font-semibold text-white/70 hover:text-white hover:bg-white/10" trigger="Reject permanently" title="Reject permanently?" desc="This email can never apply again. The applicant is told by email." confirm={{ label: "Reject permanently", tone: "danger", toast: "Permanently rejected" }} href="/admin/applications">
                  <Field label="Reason" required htmlFor="m-rp"><TextArea id="m-rp" rows={3} required /></Field>
                </Dialog>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </DashShell>
  );
}
