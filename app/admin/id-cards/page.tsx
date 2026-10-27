import Link from "next/link";
import type { Metadata } from "next";
import { BadgeCheck, ExternalLink, Plus, ShieldX } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead, Person, Status } from "@/components/dash/kit";
import { DataList, Dialog } from "@/components/dash/interactive";
import { IdCard } from "@/components/dash/IdCard";
import { Field, Select, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "ID cards" };
const CARDS = [["PSF-RW-0187", "SH", "Sara Haider", "Research Writer", "3 Mar 2026", "2 Mar 2027", "Issued"], ["PSF-AW-0412", "BA", "Bilal Ahmed", "Article Writer", "18 Jan 2026", "17 Jan 2027", "Issued"], ["PSF-AP-0021", "IS", "Dr Imran Siddiqui", "Approver", "2 Feb 2026", "1 Feb 2027", "Issued"], ["PSF-AW-0398", "ZQ", "Zara Qamar", "Article Writer", "7 May 2025", "6 May 2026", "Expired"], ["PSF-AW-0355", "KJ", "Kamran Javed", "Article Writer", "1 Nov 2024", "31 Oct 2025", "Revoked"]];

export default async function IdCards({ searchParams }: { searchParams: Promise<{ issue?: string }> }) {
  const issue = (await searchParams).issue === "1";
  return (
    <DashShell kind="admin" active="id-cards" title="ID cards">
      <PageHead title="ID cards" desc="Issued to approved contributors on request · valid 12 months" actions={
        <Dialog size="lg" openOnLoad={issue} triggerClass={btn("primary", "md", "rounded-full")} trigger={<><Plus className="size-4" />Issue card</>} title="Issue ID card" confirm={{ label: "Issue card", toast: "Card PSF-RW-0232 issued and emailed" }}>
          <div className="grid sm:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <Field label="Contributor" required htmlFor="m-ic"><TextInput id="m-ic" required defaultValue="Danish Iqbal" placeholder="Search approved contributors" /></Field>
              <Field label="Role on card" required htmlFor="m-ir"><Select id="m-ir" options={["Research Writer", "Article Writer", "Approver", "Expert"]} defaultValue="Research Writer" /></Field>
              <Field label="Valid for" htmlFor="m-iv"><Select id="m-iv" options={["12 months", "6 months"]} defaultValue="12 months" /></Field>
              <Field label="Photo" htmlFor="m-ip"><Select id="m-ip" options={["Use profile photo", "Upload a new photo"]} defaultValue="Use profile photo" /></Field>
              <label className="flex gap-3"><input type="checkbox" defaultChecked className="size-5 accent-[#04411f]" />Email the PDF to the contributor</label>
            </div>
            <div><p className="text-sm font-semibold mb-2">Preview</p><IdCard name="Danish Iqbal" role="Research Writer" no="PSF-RW-0232" valid="15 Oct 2027" /></div>
          </div>
        </Dialog>} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start">
        <DataList noun="cards" total={231} selectable bulk={["Email PDF", "Revoke"]} search="Search card number or name" sorts={["Expires soonest", "Newest"]}
          selects={[{ key: "status", label: "Status", options: ["Issued", "Expired", "Revoked"] }, { key: "role", label: "Role", options: ["Research Writer", "Article Writer", "Approver"] }]}
          cols={[{ key: "no", label: "Card no." }, { key: "h", label: "Holder" }, { key: "i", label: "Issued" }, { key: "e", label: "Expires" }, { key: "s", label: "Status" }, { key: "a", label: "", className: "text-right" }]}
          mobile={{ title: "h", meta: ["no", "s", "e"], end: "a" }}
          rows={CARDS.map(([no, i, n, r, is, ex, s]) => ({ id: no, text: no + n, f: { status: s, role: r }, cells: { no: <span className="font-mono text-[12.5px] font-semibold">{no}</span>, h: <Person i={i} name={n} sub={r} />, i: <span className="text-ink-600 whitespace-nowrap">{is}</span>, e: <span className="text-ink-600 whitespace-nowrap">{ex}</span>, s: <Status s={s} />,
            a: s === "Issued" ? <Dialog triggerClass="size-9 grid place-items-center rounded-full hover:bg-danger-50 text-danger-700" trigger={<ShieldX className="size-4" aria-label={`Revoke ${no}`} />} title={`Revoke card ${no}?`} desc="The verification page will show Inactive for this card from now on." confirm={{ label: "Revoke card", tone: "danger", toast: `${no} revoked` }}><Field label="Reason" required htmlFor={`rv-${no}`}><TextArea id={`rv-${no}`} rows={3} required /></Field></Dialog> : null } }))} />
        <Card title="Card preview" className="xl:sticky xl:top-24">
          <IdCard name="Sara Haider" role="Research Writer" no="PSF-RW-0187" valid="2 Mar 2027" />
          <p className="mt-4 text-[13.5px] text-ink-600 flex gap-2"><BadgeCheck className="size-4 text-brand-600 shrink-0 mt-0.5" />The QR code opens psf.org.pk/verify with the card number, which shows Active, Inactive or Unknown.</p>
          <Link href="/verify?state=active&id=PSF-RW-0187" className={btn("secondary", "md", "mt-4 w-full rounded-full")}><ExternalLink className="size-4" />Open verification page</Link>
        </Card>
      </div>
    </DashShell>
  );
}
