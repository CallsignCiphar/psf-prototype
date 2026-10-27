import Link from "next/link";
import type { Metadata } from "next";
import { CircleCheck, CircleAlert, Eye, FilePlus2, MessageSquare, UserCog } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Initials, KV, PageHead, Status } from "@/components/dash/kit";
import { Dialog, Switch } from "@/components/dash/interactive";
import { ArticleDecision } from "@/components/dash/Decision";
import { Field, TextArea } from "@/components/form";
import { Cover, btn } from "@/components/ui";

export const metadata: Metadata = { title: "Article review" };

export default function ArticleReview() {
  return (
    <DashShell kind="admin" active="articles" title="Article review">
      <PageHead crumbs={[{ label: "Articles", href: "/admin/articles" }, { label: "Pending review", href: "/admin/articles" }, { label: "Water security and the Indus Waters Treaty" }]} title="Review article" badge={<Status s="Pending review" />}
        actions={<>
          <Dialog triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><UserCog className="size-4" />Assign editor</>} title="Assign editor" confirm={{ label: "Assign", toast: "Editor assigned" }}>
            <ul className="space-y-2">{[["HS", "Hina Shah", "Editor · 6 open"], ["FQ", "Dr Faisal Qureshi", "Research Editor · 4 open"], ["UT", "Usman Tariq", "Super Admin · 0 open"]].map(([i, n, d], k) => <li key={n}><label className="flex items-center gap-3 rounded-2xl ring-1 ring-line p-3 cursor-pointer has-[:checked]:ring-2 has-[:checked]:ring-brand-600"><input type="radio" name="ae" defaultChecked={k === 0} className="accent-[#04411f] size-5" /><Initials i={i} /><span><span className="block font-semibold">{n}</span><span className="text-[13px] text-ink-500">{d}</span></span></label></li>)}</ul>
          </Dialog>
          <Dialog triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><FilePlus2 className="size-4" />Add correction</>} title="Add a correction" confirm={{ label: "Publish correction", toast: "Correction published" }}>
            <Field label="Correction text" required htmlFor="m-cx"><TextArea id="m-cx" rows={4} required /></Field>
            <label className="flex gap-3"><input type="checkbox" defaultChecked className="size-5 accent-[#04411f]" />Show on the Corrections page</label>
            <label className="flex gap-3"><input type="checkbox" defaultChecked className="size-5 accent-[#04411f]" />Notify the author</label>
          </Dialog>
          <Link href="/articles/air-defence-in-depth" className={btn("ghost", "md", "rounded-full")}><Eye className="size-4" />Preview on site</Link>
        </>} />
      <div className="grid xl:grid-cols-[minmax(0,1fr)_400px] gap-5 items-start">
        <article className="bg-white rounded-[28px] shadow-soft overflow-hidden min-w-0">
          <div className="p-5 sm:p-9">
            <p className="eyebrow text-brand-600">Climate and Environment · Analysis</p>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[38px] leading-tight font-semibold">Water security and the Indus Waters Treaty</h2>
            <p className="mt-3 font-serif text-[19px] text-ink-600">Treaty mechanisms have held through three wars. Whether they hold through a hotter, drier basin is a different question.</p>
            <p className="mt-5 flex items-center gap-2 text-[14px]"><Initials i="SH" size={30} /><span className="font-semibold">Sara Haider</span><span className="text-ink-500">· 2,140 words · 9 min read</span></p>
          </div>
          <Cover seed={7} kind="contour" className="aspect-[16/8]" />
          <p className="px-5 sm:px-9 pt-2 text-[12.5px] text-ink-500">The Tarbela Dam spillway in August 2025. Photo: WAPDA</p>
          <div className="p-5 sm:p-9 font-serif text-[18px] leading-[1.75] text-ink-800 space-y-5">
            <p>The Indus Waters Treaty has outlasted three wars and decades of hostile rhetoric. Its dispute mechanisms have each been used, and each has produced outcomes both sides could live with.</p>
            <p>The pressure now is hydrological rather than political. Glacier melt is front-loading flows by <mark className="bg-attn-50 ring-1 ring-attn-700/30 rounded px-0.5">as much as 20 per cent</mark><sup className="font-sans text-brand-700 font-bold">1</sup>, and the treaty assumes a river that is changing beneath it.</p>
            <p>India&apos;s run-of-river projects on the Chenab are legal under the treaty&apos;s design criteria, a point Pakistani commentary often skips.</p>
          </div>
        </article>
        <aside className="space-y-4 min-w-0">
          <section className="rounded-[24px] bg-white shadow-soft ring-2 ring-mint-500 p-5"><h2 className="font-semibold text-[16.5px] mb-4">Decision</h2><ArticleDecision /></section>
          <Card title="Submission"><KV items={[["Author", "Sara Haider"], ["Submitted", "12 Oct 2026, 21:40"], ["Label", "Analysis"], ["Topic", "Climate and Environment / Water"], ["Location", "Pakistan, India"], ["Editor", "Hina Shah"]]} /></Card>
          <Card title="Checks"><ul className="space-y-2.5 text-[14px]">{[["Card and cover images with alt text", true], ["Content label, topic and location set", true], ["Over 400 words", true], ["Sources listed", false], ["Declarations accepted", true]].map(([t, ok]) => <li key={t as string} className="flex gap-2.5">{ok ? <CircleCheck className="size-5 text-brand-600 shrink-0" /> : <CircleAlert className="size-5 text-attn-700 shrink-0" />}{t as string}</li>)}</ul></Card>
          <Card title="Comments" desc="1 open"><div className="rounded-2xl bg-attn-50 p-4"><p className="flex items-center gap-2 text-[13px] font-semibold"><MessageSquare className="size-4 text-attn-700" />1 · Hina Shah <span className="text-ink-500 font-normal">10:41</span></p><p className="mt-1.5 text-[14.5px]">Source needed for the 20 per cent figure.</p></div><p className="mt-3 text-[12.5px] text-ink-500">Select text in the article to comment.</p></Card>
          <Card title="Placement">
            <div className="flex items-center justify-between gap-3 py-2"><div><p className="font-semibold text-[14.5px]">Add to Top Stories</p><p className="text-[12.5px] text-ink-500">Goes into the next free slot</p></div><Switch label="Add to Top Stories" /></div>
            <div className="flex items-center justify-between gap-3 py-2 border-t border-line"><p className="font-semibold text-[14.5px]">Allow in newsletter</p><Switch on label="Allow in newsletter" /></div>
          </Card>
        </aside>
      </div>
    </DashShell>
  );
}
