import Link from "next/link";
import type { Metadata } from "next";
import { CalendarClock, Info, Save } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Note, PageHead, Status } from "@/components/dash/kit";
import { ActionButton, Switch } from "@/components/dash/interactive";
import { UploadedFile } from "@/components/dash/Editor";
import { NavForm } from "@/components/auth/widgets";
import { Field, Segmented, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "New campaign" };
const SLOTS = [["Leaderboard 728x90", "Homepage and section pages, below header", "Available", true], ["Sidebar 300x600", "Article, report and research pages", "2 of 3 booked", true], ["In-article 300x250", "After paragraph 4 of articles", "Available", false], ["Mobile banner 320x100", "All pages on small screens", "Available", false]] as const;

export default function NewCampaign() {
  return (
    <DashShell kind="admin" active="ads" title="New campaign">
      <PageHead crumbs={[{ label: "Campaigns", href: "/admin/ads" }, { label: "New campaign" }]} title="New campaign" badge={<Status s="Draft" />} />
      <NavForm to="/admin/ads" className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Campaign"><div className="grid sm:grid-cols-2 gap-5">
            <Field label="Campaign name" required htmlFor="cf-n" className="sm:col-span-2"><TextInput id="cf-n" required defaultValue="Jazz Business" /></Field>
            <Field label="Advertiser" required hint="From Advertise enquiries or add new" htmlFor="cf-a"><TextInput id="cf-a" defaultValue="Jazz" /></Field>
            <Field label="Contact email" required htmlFor="cf-e"><TextInput id="cf-e" type="email" required /></Field>
          </div><p className="mt-4 text-[13px] text-ink-500">Linked enquiry: <span className="font-semibold text-brand-700">ADV-2026-0091 · 2 Oct 2026</span></p></Card>
          <Card title="Schedule"><div className="grid sm:grid-cols-3 gap-5"><Field label="Start" required htmlFor="cf-s"><TextInput id="cf-s" type="date" defaultValue="2026-10-20" /></Field><Field label="End" required htmlFor="cf-en"><TextInput id="cf-en" type="date" defaultValue="2026-11-20" /></Field><Field label="Time zone" htmlFor="cf-tz"><TextInput id="cf-tz" defaultValue="Asia/Karachi (PKT)" readOnly /></Field></div></Card>
          <Card title="Slots">
            <ul className="grid sm:grid-cols-2 gap-3">{SLOTS.map(([n, d, a, on]) => <li key={n}><label className="flex gap-3 rounded-2xl ring-1 ring-line p-4 cursor-pointer has-[:checked]:ring-2 has-[:checked]:ring-brand-600 has-[:checked]:bg-mint-100/40"><input type="checkbox" defaultChecked={on} className="mt-0.5 size-5 accent-[#04411f]" /><span className="flex-1"><span className="block font-semibold">{n}</span><span className="block text-[13px] text-ink-500">{d}</span><span className={a === "Available" ? "mt-2 inline-block text-[12px] font-semibold text-brand-700" : "mt-2 inline-block text-[12px] font-semibold text-attn-700"}>{a}</span></span></label></li>)}</ul>
            <div className="mt-4"><Note icon={Info} tone="violet" title="Sidebar 300x600 has 1 rotation left for these dates">Each slot rotates up to 3 campaigns. <Link href="/admin/ads/calendar" className="font-semibold underline">View calendar</Link></Note></div>
          </Card>
          <Card title="Creatives">
            <div className="space-y-4">
              <Field label="Leaderboard 728x90" required><UploadedFile name="jazz-business-728x90.png" meta="728x90 · PNG · 84 KB · checked" /></Field>
              <Field label="Sidebar 300x600" required><UploadedFile name="jazz-business-300x600.jpg" meta="300x600 · JPG · 142 KB · checked" /></Field>
              <div className="grid sm:grid-cols-2 gap-5"><Field label="Click-through URL" required htmlFor="cf-u"><TextInput id="cf-u" type="url" required placeholder="https://" /></Field><Field label="Alt text" required htmlFor="cf-alt"><TextInput id="cf-alt" required /></Field></div>
              <label className="flex gap-3 text-[15px]"><input type="checkbox" defaultChecked className="size-5 accent-[#04411f]" />Add UTM parameters (utm_source=psf, utm_medium=display)</label>
            </div>
          </Card>
          <Card title="Targeting">
            <Field label="Show on topics"><Segmented name="tg" options={["All topics", "Choose topics"]} /></Field>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-canvas p-4"><p className="font-semibold text-[14.5px]">Exclude from research paper pages</p><Switch on label="Exclude from research paper pages" /></div>
            <p className="mt-3 text-[13px] text-ink-500">Ads are labelled &ldquo;Advertisement&rdquo; on the site.</p>
          </Card>
        </div>
        <aside className="xl:sticky xl:top-24 space-y-3 min-w-0">
          <div className="rounded-[24px] bg-brand-900 text-white p-5"><p className="font-semibold">Summary</p><dl className="mt-3 space-y-2 text-[14px]">{[["Dates", "20 Oct to 20 Nov"], ["Slots", "Leaderboard, Sidebar"], ["Creatives", "2 of 2 checked"]].map(([a, b]) => <div key={a} className="flex justify-between gap-3"><dt className="text-white/60">{a}</dt><dd className="font-semibold">{b}</dd></div>)}</dl></div>
          <button className={btn("primary", "lg", "w-full rounded-full")}><CalendarClock className="size-4" />Schedule campaign</button>
          <ActionButton msg="Draft saved" className={btn("secondary", "lg", "w-full rounded-full")}><Save className="size-4" />Save draft</ActionButton>
          <Link href="/admin/ads" className={btn("ghost", "lg", "w-full rounded-full")}>Cancel</Link>
        </aside>
      </NavForm>
    </DashShell>
  );
}
