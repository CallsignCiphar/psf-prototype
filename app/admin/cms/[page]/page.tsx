import Link from "next/link";
import type { Metadata } from "next";
import { Eye, EyeOff, RotateCcw, Save, Upload } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead, Status, Tag } from "@/components/dash/kit";
import { ActionButton, Dialog, Switch } from "@/components/dash/interactive";
import { CmsBlocks } from "@/components/dash/CmsBlocks";
import { Field, Select, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "CMS editor" };

export default async function CmsEditor({ params }: { params: Promise<{ page: string }> }) {
  const isNew = (await params).page === "new";
  const title = isNew ? "New page" : "About Pakistan Strategic Forum";
  return (
    <DashShell kind="admin" active="cms" title="CMS editor">
      <PageHead crumbs={[{ label: "Pages", href: "/admin/cms" }, { label: title }]} title={title} badge={<>{isNew ? <Status s="Draft" /> : <Status s="Published" />}<Tag tone="violet">Unsaved changes</Tag></>} desc={isNew ? "Choose a template and add blocks" : "Published · last edited 14 Oct 2026 by Hina Shah"}
        actions={<>
          {!isNew && <Dialog triggerClass={btn("ghost", "md", "rounded-full text-danger-700")} trigger={<><EyeOff className="size-4" />Unpublish</>} title={`Unpublish "${title}"?`} desc="Visitors to /about will see a 404 page until you publish it again. Menu links to it are hidden." confirm={{ label: "Unpublish", tone: "danger", toast: "Page unpublished" }} />}
          <Link href="/about" className={btn("secondary", "md", "rounded-full")}><Eye className="size-4" />Preview</Link>
          <ActionButton msg="Draft saved" className={btn("secondary", "md", "rounded-full")}><Save className="size-4" />Save draft</ActionButton>
          <ActionButton msg="Changes published" className={btn("primary", "md", "rounded-full")}><Upload className="size-4" />Publish changes</ActionButton>
        </>} />
      <div className="grid 2xl:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
        <CmsBlocks />
        <aside className="space-y-5 min-w-0 grid md:grid-cols-2 2xl:grid-cols-1 gap-5 2xl:gap-0 2xl:space-y-5 md:space-y-0">
          <Card title="Page"><div className="space-y-4">
            <Field label="Title" required htmlFor="ce-t"><TextInput id="ce-t" defaultValue={isNew ? "" : title} /></Field>
            <Field label="URL" required htmlFor="ce-u"><TextInput id="ce-u" defaultValue={isNew ? "/" : "/about"} /></Field>
            <div className="grid grid-cols-2 gap-3"><Field label="Template" htmlFor="ce-tp"><Select id="ce-tp" options={["About", "Policy", "Landing", "Simple", "Form"]} defaultValue="About" /></Field><Field label="Status" htmlFor="ce-st"><Select id="ce-st" options={["Published", "Draft"]} defaultValue={isNew ? "Draft" : "Published"} /></Field></div>
          </div></Card>
          <Card title="SEO"><div className="space-y-4">
            <Field label="Meta title" htmlFor="ce-mt"><TextInput id="ce-mt" /></Field>
            <Field label="Meta description" counter="47 / 160" htmlFor="ce-md"><TextArea id="ce-md" rows={3} maxLength={160} defaultValue="Who we are, how we work and how we are funded." /></Field>
            <div className="flex items-center justify-between"><span className="text-[14px] font-semibold">Social image: use hero image</span><Switch on label="Use hero image" /></div>
          </div></Card>
          {!isNew && <Card title="Versions"><ul className="space-y-3">{[["Published by Hina Shah", "14 Oct 2026, 15:20"], ["Edited by Hina Shah", "14 Oct 2026, 15:02"], ["Published by Usman Tariq", "3 Jun 2026"]].map(([a, b], i) => <li key={b} className="flex items-center gap-3"><span className="flex-1"><span className="block font-semibold text-[14px]">{a}</span><span className="text-[12.5px] text-ink-500">{b}</span></span>{i > 0 && <ActionButton msg="Version restored as a draft" className="h-8 px-3 rounded-full ring-1 ring-line text-[12.5px] font-semibold inline-flex items-center gap-1"><RotateCcw className="size-3.5" />Restore</ActionButton>}</li>)}</ul></Card>}
        </aside>
      </div>
    </DashShell>
  );
}
