import type { Metadata } from "next";
import { ArrowDown, BarChart3, ChevronDown, Globe2, LayoutTemplate, MonitorSmartphone, ShieldCheck, Smartphone, Tag, UsersRound } from "lucide-react";
import { PageHero, StatTiles } from "@/components/page";
import { Check, Field, ProtoForm, Select, TextArea, TextInput } from "@/components/form";
import { SectionHeader, btn } from "@/components/ui";

export const metadata: Metadata = { title: "Advertise" };
const PLACEMENTS = [
  { i: LayoutTemplate, t: "Leaderboard", s: "970 x 90 desktop, 320 x 100 mobile", d: "Homepage and section pages, below the header." },
  { i: MonitorSmartphone, t: "Sidebar", s: "300 x 600", d: "Article, report and research pages, beside the text." },
  { i: Tag, t: "In-article", s: "300 x 250", d: "Inside articles, after the fourth paragraph." },
  { i: Smartphone, t: "Mobile banner", s: "320 x 100", d: "All pages on phones, where most readers are." },
];
const FAQ = [["What is the minimum booking period?", "Two weeks for any placement."], ["What reporting do I get?", "Impressions, clicks and click-through rate by placement and by page, weekly and at the end of the campaign."], ["Can I target specific pages?", "Yes, by topic. We do not target individuals or use third-party tracking."]];

export default function Advertise() {
  return (
    <>
      <PageHero crumbs={[{ label: "Advertise" }]} eyebrow="Advertise with us" title="Reach Pakistan's defence and policy audience" art={44}
        desc="Officials, officers, analysts, students and journalists read Pakistan Strategic Forum. Advertising is clearly labelled and kept apart from editorial decisions."
        actions={<a href="#enquire" className={btn("light", "md", "rounded-full")}>Enquire now<ArrowDown className="size-4" /></a>}
        aside={<StatTiles onDark items={[["420k", "Monthly page views"], ["86k", "Monthly readers"], ["68%", "Read on mobile"], ["3m 12s", "Average time on page"]]} />} />

      <section className="container-site mt-12 sm:mt-16 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow="Audience" title="Who reads us" />
          <ul className="space-y-3">
            {[[UsersRound, "Decision makers", "Government, armed forces and diplomatic readers."], [BarChart3, "Analysts and academics", "Universities, think tanks and research centres."], [Globe2, "Pakistan and abroad", "Readers in Pakistan, the Gulf, the UK and the US."]].map(([I, t, d]) => { const Icon = I as typeof UsersRound; return (
              <li key={t as string} className="card p-5 flex gap-4"><span className="size-11 shrink-0 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><Icon className="size-5" /></span><div><p className="font-semibold">{t as string}</p><p className="text-sm text-ink-600 mt-0.5">{d as string}</p></div></li>
            ); })}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <SectionHeader eyebrow="Formats" title="Placements" />
          <div className="grid sm:grid-cols-2 gap-4">
            {PLACEMENTS.map((p) => (
              <div key={p.t} className="card p-5">
                <div className="flex items-center justify-between"><span className="size-11 rounded-2xl bg-brand-800 text-white grid place-items-center"><p.i className="size-5" /></span><span className="text-xs font-semibold text-brand-700 bg-brand-50 rounded-full px-2.5 h-6 inline-flex items-center">{p.s}</span></div>
                <p className="mt-4 font-semibold text-lg">{p.t}</p><p className="mt-1 text-sm text-ink-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site mt-12 grid md:grid-cols-2 gap-6">
        <div className="card p-6 sm:p-8">
          <ShieldCheck className="size-8 text-brand-700" />
          <h2 className="mt-4 font-serif text-[26px] font-semibold">Formats and policies</h2>
          <ul className="mt-4 space-y-2.5 text-ink-700 list-disc pl-5 marker:text-brand-500">
            <li>Static images (JPG, PNG, WebP), under 200 KB.</li><li>Every ad is labelled "Advertisement".</li><li>No political, gambling or weapons sales advertising.</li><li>Editors never review or approve ad content for editorial fit, and advertisers have no say in coverage.</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-mint-100 p-6 sm:p-8">
          <h2 className="font-serif text-[26px] font-semibold">Process</h2>
          <ol className="mt-5 space-y-4">
            {["Send an enquiry with your dates and goals.", "We confirm availability and send a quote within two working days.", "You send creatives. We check sizes and labelling.", "Your campaign runs, with weekly reporting."].map((s, i) => (
              <li key={s} className="flex gap-4"><span className="size-9 shrink-0 rounded-full bg-brand-800 text-white grid place-items-center text-sm font-semibold">{i + 1}</span><p className="pt-1.5 text-ink-700">{s}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquire" className="container-site mt-12 grid lg:grid-cols-12 gap-6 scroll-mt-28">
        <div className="lg:col-span-8 card p-5 sm:p-8">
          <h2 className="font-serif text-[26px] font-semibold">Enquire about advertising</h2>
          <ProtoForm className="mt-6 grid sm:grid-cols-2 gap-5" success={{ title: "Enquiry sent", body: "Thank you. Our advertising team will reply within two working days with availability and a quote." }}>
            <Field label="First name" required htmlFor="a-fn"><TextInput id="a-fn" required /></Field>
            <Field label="Last name" required htmlFor="a-ln"><TextInput id="a-ln" required /></Field>
            <Field label="Work email" required htmlFor="a-em"><TextInput id="a-em" type="email" required /></Field>
            <Field label="Phone" htmlFor="a-ph"><TextInput id="a-ph" type="tel" placeholder="+92" /></Field>
            <Field label="Company or brand" required htmlFor="a-co"><TextInput id="a-co" required /></Field>
            <Field label="Website" htmlFor="a-web"><TextInput id="a-web" placeholder="https://" /></Field>
            <Field label="Industry" htmlFor="a-in"><Select id="a-in" placeholder="Select industry" options={["Banking and finance", "Education", "Telecoms", "Energy", "Government", "Other"]} /></Field>
            <Field label="Campaign start" htmlFor="a-st"><TextInput id="a-st" type="date" /></Field>
            <Field label="Duration" htmlFor="a-du"><Select id="a-du" options={["2 weeks", "1 month", "3 months", "6 months"]} defaultValue="1 month" /></Field>
            <Field label="Placements of interest" htmlFor="a-pl"><Select id="a-pl" placeholder="Select" options={["Leaderboard", "Sidebar", "In-article", "Mobile banner", "Not sure yet"]} /></Field>
            <Field label="Message and objectives" required htmlFor="a-msg" className="sm:col-span-2"><TextArea id="a-msg" rows={5} required /></Field>
            <div className="sm:col-span-2 space-y-3"><Check defaultChecked>Send me the media kit</Check><Check required>I agree to Pakistan Strategic Forum processing my details to respond (Privacy Policy).</Check></div>
            <div className="sm:col-span-2"><button className={btn("primary", "lg", "rounded-full w-full sm:w-auto")}>Send enquiry</button></div>
          </ProtoForm>
        </div>
        <div className="lg:col-span-4 space-y-3">
          <h2 className="font-semibold text-lg mb-2">Questions</h2>
          {FAQ.map(([q, a]) => (
            <details key={q} className="group card px-5"><summary className="flex items-center justify-between gap-3 min-h-14 py-3 cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-brand-700 transition-transform group-open:rotate-180" /></summary><p className="pb-4 text-ink-600 text-[15px]">{a}</p></details>
          ))}
        </div>
      </section>
    </>
  );
}
