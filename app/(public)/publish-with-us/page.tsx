import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronDown, GraduationCap, Lightbulb, PenLine, Scale, SearchCheck, Target } from "lucide-react";
import { PageHero } from "@/components/page";
import { SectionHeader, btn } from "@/components/ui";

export const metadata: Metadata = { title: "Publish with us" };
const FAQ = [
  ["Do I need an account?", "Yes. You apply once as an Article Writer or Research Writer. Editors approve applications, usually within five working days."],
  ["Can I write both articles and research?", "Yes. Once approved for one role, apply for the other from your portal account page."],
  ["Do you pay contributors?", "Payment terms are set out in the contributor agreement you accept when your application is approved."],
  ["How long does peer review take?", "It depends on the paper and the reviewers. You can see the stage your paper is at in My Research at any time."],
  ["Can I republish my article elsewhere?", "After publication, you may republish with a link back to the original. Check the contributor agreement for details."],
];

export default function PublishWithUs() {
  return (
    <>
      <PageHero crumbs={[{ label: "Publish with us" }]} eyebrow="Contribute" title="Publish with Pakistan Strategic Forum" art={46}
        desc="Two ways to contribute: edited analysis and reports, or peer-reviewed research. Both start with a short application." />
      <section className="container-site mt-10 grid md:grid-cols-2 gap-5">
        {[
          { i: PenLine, t: "Articles and reports", dl: [["Who", "Scholars, practitioners, journalists and students"], ["Formats", "Analysis, explainer, opinion, interview, event report"], ["Length", "800 to 2,500 words"], ["Turnaround", "Editorial review, usually within three working days"]], cta: "Apply as a writer", href: "/join" },
          { i: GraduationCap, t: "Research", dl: [["Who", "Researchers, faculty and postgraduate students"], ["Formats", "Research paper, policy brief, emerging scholar paper"], ["Review", "Double-blind, by two subject experts"], ["Licence", "Contributor agreement, with attribution required"]], cta: "Apply as a researcher", href: "/join" },
        ].map((c, k) => (
          <div key={c.t} className={`rounded-3xl p-6 sm:p-8 flex flex-col ${k === 0 ? "bg-brand-800 text-white" : "bg-white shadow-soft"}`}>
            <span className={`size-12 rounded-2xl grid place-items-center ${k === 0 ? "bg-white/12 text-mint-300" : "bg-mint-100 text-brand-800"}`}><c.i className="size-6" /></span>
            <h2 className="mt-5 font-serif text-[28px] font-semibold">{c.t}</h2>
            <dl className="mt-5 grid gap-3">
              {c.dl.map(([dt, dd]) => <div key={dt} className={`rounded-2xl p-4 ${k === 0 ? "bg-white/8" : "bg-canvas"}`}><dt className={`text-[13px] font-semibold ${k === 0 ? "text-mint-300" : "text-brand-700"}`}>{dt}</dt><dd className={`mt-0.5 ${k === 0 ? "text-white/90" : "text-ink-700"}`}>{dd}</dd></div>)}
            </dl>
            <Link href={c.href} className={btn(k === 0 ? "light" : "primary", "md", "mt-6 self-start rounded-full")}>{c.cta}<ArrowRight className="size-4" /></Link>
          </div>
        ))}
      </section>
      <section className="container-site mt-12">
        <SectionHeader eyebrow="Standards" title="What we look for" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[[Target, "A clear argument", "Say what you think in the first paragraph."], [SearchCheck, "Evidence", "Sources for every factual claim."], [Lightbulb, "Something new", "A fact, angle or argument readers have not seen."], [Scale, "Fairness", "Represent opposing views accurately."]].map(([I, t, d]) => { const Icon = I as typeof Target; return (
            <div key={t as string} className="card p-5"><span className="size-11 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><Icon className="size-5" /></span><p className="mt-4 font-semibold text-lg">{t as string}</p><p className="mt-1 text-sm text-ink-600">{d as string}</p></div>
          ); })}
        </div>
      </section>
      <section className="container-site mt-12 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 card overflow-hidden">
          <h2 className="font-serif text-[24px] font-semibold px-6 pt-6">Formats and lengths</h2>
          <table className="mt-4 w-full text-[15px]">
            <thead><tr className="bg-canvas text-left text-[13px] text-ink-500"><th className="px-6 py-3 font-semibold">Format</th><th className="px-6 py-3 font-semibold">Length</th></tr></thead>
            <tbody className="divide-y divide-line">
              {[["Analysis", "1,200 to 2,500 words"], ["Explainer", "800 to 1,500 words"], ["Opinion", "800 to 1,200 words"], ["Event report", "PDF plus a 300-word summary"], ["Research paper", "6,000 to 10,000 words"], ["Policy brief", "2,000 to 4,000 words"]].map(([a, b]) => <tr key={a}><td className="px-6 py-3.5 font-medium">{a}</td><td className="px-6 py-3.5 text-ink-600">{b}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-6 rounded-3xl bg-mint-100 p-6 sm:p-8">
          <h2 className="font-serif text-[24px] font-semibold">Process</h2>
          <ol className="mt-5 space-y-4">
            {["Apply once and wait for approval.", "Write or upload in the portal. Drafts save automatically.", "Submit for review. Editors reply with a decision or changes.", "Publish. Your author page lists everything you write."].map((s, i) => <li key={s} className="flex gap-4"><span className="size-9 shrink-0 rounded-full bg-brand-800 text-white grid place-items-center text-sm font-semibold">{i + 1}</span><p className="pt-1.5 text-ink-700">{s}</p></li>)}
          </ol>
        </div>
      </section>
      <section className="container-site mt-12 max-w-4xl">
        <SectionHeader eyebrow="Questions" title="Frequently asked" />
        <div className="space-y-3">
          {FAQ.map(([q, a]) => <details key={q} className="group card px-5 sm:px-6"><summary className="flex items-center justify-between gap-4 min-h-16 py-4 cursor-pointer list-none font-semibold text-[17px] [&::-webkit-details-marker]:hidden">{q}<ChevronDown className="size-5 shrink-0 text-brand-700 transition-transform group-open:rotate-180" /></summary><p className="pb-5 -mt-1 text-ink-600 leading-relaxed">{a}</p></details>)}
        </div>
      </section>
    </>
  );
}
