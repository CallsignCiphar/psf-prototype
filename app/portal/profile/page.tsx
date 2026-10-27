import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, Save } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead } from "@/components/dash/kit";
import { ActionButton, Switch } from "@/components/dash/interactive";
import { TagInput } from "@/components/dash/Editor";
import { CountedArea } from "@/components/auth/widgets";
import { Field, Select, TextInput } from "@/components/form";
import { btn } from "@/components/ui";
import { AvatarUpload } from "@/components/auth/widgets";

export const metadata: Metadata = { title: "Profile" };

export default function Profile() {
  return (
    <DashShell kind="portal" active="profile" title="Profile">
      <PageHead title="Profile" desc="What readers see on your author page and bylines" actions={<><Link href="/portal" className={btn("ghost", "md", "rounded-full")}>Cancel</Link><ActionButton msg="Profile saved" className={btn("primary", "md", "rounded-full")}><Save className="size-4" />Save changes</ActionButton></>} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Photo"><AvatarUpload initials="SH" /></Card>
          <Card title="Public details">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-[120px_1fr] gap-5"><Field label="Title" htmlFor="pf-t"><Select id="pf-t" options={["Ms", "Mr", "Dr", "Prof", "None"]} defaultValue="Ms" /></Field><Field label="Display name" required htmlFor="pf-name"><TextInput id="pf-name" defaultValue="Sara Haider" /></Field></div>
              <div className="grid sm:grid-cols-2 gap-5"><Field label="Designation" required htmlFor="pf-des"><TextInput id="pf-des" defaultValue="MPhil candidate" /></Field><Field label="Institution" required htmlFor="pf-inst"><TextInput id="pf-inst" defaultValue="Quaid-i-Azam University" /></Field></div>
              <CountedArea id="pf-sb" label="Short bio" required max={160} rows={2} hint="Shown under your byline." initial="Researcher in nuclear deterrence and crisis stability in South Asia." />
              <CountedArea id="pf-fb" label="Full bio" max={1500} rows={5} hint="Shown on your author page. Up to 1,500 characters." initial="Sara Haider is an MPhil candidate in Defence and Strategic Studies at Quaid-i-Azam University. Her research covers missile signalling, crisis communication and arms control in South Asia." />
              <Field label="Areas of expertise" hint="Up to 5" htmlFor="pf-exp"><TagInput id="pf-exp" max={5} initial={["Nuclear deterrence", "Crisis stability", "Arms control"]} /></Field>
            </div>
          </Card>
          <Card title="Links">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="ORCID iD" htmlFor="pf-orcid"><TextInput id="pf-orcid" defaultValue="0000-0002-1825-0097" /></Field>
              <Field label="Google Scholar" htmlFor="pf-gs"><TextInput id="pf-gs" placeholder="https://scholar.google.com/..." /></Field>
              <Field label="LinkedIn" htmlFor="pf-li"><TextInput id="pf-li" placeholder="https://linkedin.com/in/..." /></Field>
              <Field label="X" htmlFor="pf-x"><TextInput id="pf-x" placeholder="@handle" /></Field>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-canvas p-4"><div><p className="font-semibold">Show my email on my author page</p><p className="text-[13px] text-ink-500">Off by default</p></div><Switch label="Show my email on my author page" /></div>
          </Card>
        </div>
        <aside className="xl:sticky xl:top-24 min-w-0">
          <div className="rounded-[28px] bg-white shadow-soft overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-brand-700 to-brand-950" />
            <div className="px-6 pb-6 -mt-10">
              <span className="size-20 rounded-full bg-mint-100 text-brand-800 grid place-items-center font-bold text-2xl ring-4 ring-white">SH</span>
              <p className="mt-1 eyebrow text-ink-500 pt-3">Preview</p>
              <p className="mt-1 font-serif text-[24px] font-semibold">Sara Haider</p>
              <p className="text-[14px] text-brand-700 font-semibold">MPhil candidate, Quaid-i-Azam University</p>
              <p className="mt-3 text-[14.5px] text-ink-600">Researcher in nuclear deterrence and crisis stability in South Asia.</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{["Nuclear deterrence", "Crisis stability", "Arms control"].map((t) => <span key={t} className="h-7 px-2.5 rounded-full bg-mint-100 text-brand-800 text-[12px] font-semibold grid place-items-center">{t}</span>)}</div>
              <p className="mt-4 text-[13px] text-ink-500">14 articles · 2 research papers · 1 report</p>
              <Link href="/authors/sara-haider" className={btn("secondary", "md", "mt-5 w-full rounded-full")}><ExternalLink className="size-4" />View public page</Link>
            </div>
          </div>
        </aside>
      </div>
    </DashShell>
  );
}
