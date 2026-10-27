import Link from "next/link";
import type { Metadata } from "next";
import { CircleCheck, ClipboardCheck, FileSearch, Send } from "lucide-react";
import { CORRECTIONS_LOG } from "@/lib/data";
import { PageHero } from "@/components/page";
import { Field, FileDrop, ProtoForm, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Corrections" };

export default function Corrections() {
  return (
    <>
      <PageHero compact variant="mint" crumbs={[{ label: "Corrections" }]} eyebrow="Accuracy" title="Corrections"
        desc="We correct mistakes openly. Tell us what is wrong and we will review it, fix it if we got it wrong, and log the change below." />
      <section className="container-site mt-10 grid sm:grid-cols-3 gap-4">
        {[[Send, "You report it", "Send the link, what is wrong and a source."], [FileSearch, "We check it", "An editor reviews the claim, usually within three working days."], [ClipboardCheck, "We log it", "Published corrections appear on the piece and in the log."]].map(([I, t, d]) => { const Icon = I as typeof Send; return (
          <div key={t as string} className="card p-5 flex gap-4"><span className="size-11 shrink-0 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><Icon className="size-5" /></span><div><p className="font-semibold">{t as string}</p><p className="text-sm text-ink-600 mt-0.5">{d as string}</p></div></div>
        ); })}
      </section>
      <section className="container-site mt-10 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 card p-5 sm:p-8">
          <h2 className="font-serif text-[26px] font-semibold">Request a correction</h2>
          <ProtoForm className="mt-6 grid sm:grid-cols-2 gap-5" success={{ title: "Request received", body: "Thank you. Your reference is COR-2026-0045. We will email you when an editor has reviewed it." }}>
            <Field label="First name" required htmlFor="co-fn"><TextInput id="co-fn" required /></Field>
            <Field label="Last name" required htmlFor="co-ln"><TextInput id="co-ln" required /></Field>
            <Field label="Email" required htmlFor="co-em" className="sm:col-span-2"><TextInput id="co-em" type="email" required /></Field>
            <Field label="Item URL" required htmlFor="co-url" className="sm:col-span-2" hint="The page on our site that has the error"><TextInput id="co-url" type="url" required placeholder="https://forumstrategic.com/..." /></Field>
            <Field label="What is incorrect" required htmlFor="co-wr" className="sm:col-span-2"><TextArea id="co-wr" rows={4} required /></Field>
            <Field label="Suggested correction and source" htmlFor="co-src" className="sm:col-span-2"><TextInput id="co-src" placeholder="https://" /></Field>
            <Field label="Supporting file" className="sm:col-span-2" hint="Optional. PDF, JPG or PNG, up to 10 MB."><FileDrop /></Field>
            <div className="sm:col-span-2"><button className={btn("primary", "lg", "rounded-full w-full sm:w-auto")}>Send request</button></div>
          </ProtoForm>
        </div>
        <div className="lg:col-span-5">
          <div className="card p-5 sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between"><h2 className="font-semibold text-lg">Corrections log</h2><span className="text-sm text-ink-500">Latest first</span></div>
            <ol className="mt-4 space-y-4">
              {CORRECTIONS_LOG.map((c) => (
                <li key={c.date + c.item} className="rounded-2xl bg-canvas p-4">
                  <p className="text-[13px] text-ink-500 flex items-center gap-1.5"><CircleCheck className="size-4 text-brand-600" />{c.date}</p>
                  <Link href="/articles/air-defence-in-depth" className="mt-1 block font-semibold hover:text-brand-700">{c.item}</Link>
                  <p className="mt-1 text-sm text-ink-600 leading-relaxed">{c.text}</p>
                </li>
              ))}
            </ol>
            <Link href="/policies/editorial" className="mt-4 inline-block text-sm font-semibold text-brand-700 underline underline-offset-4">Read our corrections policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
