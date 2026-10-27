import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FileText, Printer } from "lucide-react";
import { PageHero, Prose } from "@/components/page";
import { Check, Field, ProtoForm, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

type Policy = { title: string; intro: string; sections: [string, string][] };
const P: Record<string, Policy> = {
  editorial: { title: "Editorial policy", intro: "How we decide what to publish, and the standards every piece is held to.", sections: [
    ["Purpose", "We publish evidence-led analysis of Pakistan's security and the region, written for an informed public."],
    ["Independence", "Editors decide what to publish. Funders, advertisers and officials have no say in editorial decisions."],
    ["Accuracy and sourcing", "Every factual claim needs a source an editor can check. Anonymous sources are used only when there is no other way to report a fact, and an editor must know who they are."],
    ["Labelling", "Every piece carries a label: Analysis, Explainer, Opinion, Interview or Archive. Opinion is always labelled as opinion."],
    ["Sensitive security information", "We do not publish operational details that could put lives at risk, such as live troop movements or the identities of personnel in sensitive roles."],
    ["Corrections", "We correct errors promptly and openly. Every correction is noted on the piece and listed in the corrections log."] ] },
  "contributor-agreement": { title: "Contributor agreement", intro: "The terms every approved contributor accepts before publishing with us.", sections: [
    ["Originality", "You confirm the work is your own and has not been published elsewhere."], ["Rights", "You keep copyright. You grant Pakistan Strategic Forum a licence to publish, archive and promote the work."],
    ["Conflicts of interest", "You declare any financial or personal interest relevant to the work."], ["Editing", "You agree that editors may edit for length, clarity and house style, and will see significant changes before publication."] ] },
  privacy: { title: "Privacy policy", intro: "What personal data we collect, why, and the choices you have.", sections: [
    ["What we collect", "Account details for contributors, messages you send us, and, with consent, anonymous analytics."], ["How we use it", "To run contributor accounts, reply to enquiries and understand what readers find useful."],
    ["Sharing", "We do not sell personal data. We share it only with service providers who help us run the site, under contract."], ["Your rights", "You can ask for a copy of your data, or ask us to correct or delete it, by contacting us."] ] },
  disclaimer: { title: "Disclaimer", intro: "The views in our content belong to their authors.", sections: [
    ["Views", "Articles and research reflect the views of their authors, not necessarily those of Pakistan Strategic Forum."], ["Accuracy", "We work to make content accurate at the time of publication. Facts may change after that."], ["Global Watch", "Status levels are editorial judgements and are not official travel advice."] ] },
  terms: { title: "Terms of use", intro: "The rules for using this website.", sections: [
    ["Using the site", "You may read, share and link to our content. You may not scrape it at scale or present it as your own."], ["Accounts", "Contributor accounts are personal. Keep your password and two-factor codes safe."], ["Changes", "We may update these terms. The date at the top shows the latest version."] ] },
  copyright: { title: "Copyright and takedown", intro: "How we handle our content, and how to tell us if you think we have used yours without permission.", sections: [
    ["Our content", "Text, images and graphics on this site belong to Pakistan Strategic Forum or our contributors unless stated otherwise. Short quotes with a link are welcome."],
    ["Takedown requests", "If you believe content on our site infringes your copyright, send a request using the form below. We review every request and reply within five working days."] ] },
  "peer-review": { title: "How peer review works", intro: "Every research paper is reviewed double-blind by two subject experts.", sections: [
    ["Screening", "Editors check scope, format and anonymisation. Papers outside our scope are returned with a reason."], ["Reviewer selection", "Editors invite two approvers with relevant expertise and no conflict of interest."],
    ["Review", "Reviewers assess originality, method, evidence and clarity, and recommend accept, minor revisions, major revisions or reject."], ["Decision", "The handling editor makes the decision and sends anonymised reviews to the author."],
    ["Revisions", "Authors revise and respond to each comment. Revised papers may go back to the reviewers."], ["Final approval", "A senior editor approves accepted papers before they are published with a reference number."] ] },
};
const NAV = Object.entries(P).map(([k, v]) => ({ k, t: v.title }));
const sid = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function generateStaticParams() { return Object.keys(P).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; return { title: P[slug]?.title ?? "Policy" }; }

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = P[slug];
  if (!p) notFound();
  return (
    <>
      <PageHero compact variant="plain" crumbs={[{ label: "Policies" }, { label: p.title }]} eyebrow={<span className="inline-flex items-center gap-2"><FileText className="size-4" />Last updated 2 Sep 2026</span>} title={p.title} desc={p.intro} />
      <div className="container-site mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <aside className="lg:col-span-3 space-y-4">
          <nav aria-label="On this page" className="card p-5 lg:sticky lg:top-24">
            <p className="eyebrow text-ink-500">On this page</p>
            <ol className="mt-3 space-y-1">{p.sections.map(([h], i) => <li key={h}><a href={`#${sid(h)}`} className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-600 hover:bg-canvas hover:text-ink-900"><span className="text-brand-400 mr-1.5 tabular-nums">{i + 1}.</span>{h}</a></li>)}</ol>
            <p className="eyebrow text-ink-500 mt-6">Other policies</p>
            <ul className="mt-2 space-y-1">{NAV.filter((n) => n.k !== slug).map((n) => <li key={n.k}><Link href={`/policies/${n.k}`} className="block rounded-xl px-3 py-2 text-sm text-ink-600 hover:bg-canvas hover:text-brand-800">{n.t}</Link></li>)}<li><Link href="/cookies" className="block rounded-xl px-3 py-2 text-sm text-ink-600 hover:bg-canvas hover:text-brand-800">Cookie policy</Link></li></ul>
          </nav>
        </aside>
        <div className="lg:col-span-9 xl:col-span-8 min-w-0">
          <div className="card p-6 sm:p-10">
            <Prose className="[&_h2:first-child]:mt-0">
              {p.sections.map(([h, b], i) => (<div key={h}><h2 id={sid(h)} className="scroll-mt-28">{i + 1}. {h}</h2><p>{b}</p></div>))}
            </Prose>
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-3 text-sm text-ink-500">
              <span>Questions about this policy? <Link href="/contact" className="text-brand-700 font-semibold underline underline-offset-2">Contact us</Link></span>
              <span className="inline-flex items-center gap-1.5"><Printer className="size-4" />Use your browser to print or save as PDF</span>
            </div>
          </div>
          {slug === "copyright" && (
            <div className="mt-6 card p-5 sm:p-8">
              <h2 className="font-serif text-[26px] font-semibold">Takedown request</h2>
              <ProtoForm className="mt-6 grid sm:grid-cols-2 gap-5" success={{ title: "Request received", body: "Your reference is TKD-2026-0012. We will reply within five working days." }}>
                <Field label="Your name" required htmlFor="t-n"><TextInput id="t-n" required /></Field>
                <Field label="Email" required htmlFor="t-e"><TextInput id="t-e" type="email" required /></Field>
                <Field label="Copyright owner" required htmlFor="t-o" className="sm:col-span-2"><TextInput id="t-o" required /></Field>
                <Field label="URL of the content on our site" required htmlFor="t-u"><TextInput id="t-u" required placeholder="https://forumstrategic.com/..." /></Field>
                <Field label="Original work URL" required htmlFor="t-w"><TextInput id="t-w" required placeholder="https://" /></Field>
                <Field label="Description" required htmlFor="t-d" className="sm:col-span-2"><TextArea id="t-d" rows={4} required /></Field>
                <div className="sm:col-span-2"><Check required>I believe in good faith that this use is not authorised, and the information in this request is accurate.</Check></div>
                <Field label="Electronic signature, type your full name" required htmlFor="t-s" className="sm:col-span-2"><TextInput id="t-s" required /></Field>
                <div className="sm:col-span-2"><button className={btn("primary", "lg", "rounded-full w-full sm:w-auto")}>Send request</button></div>
              </ProtoForm>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
