import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Mail, Megaphone, MapPin, Newspaper, PenLine, Phone, SquarePen } from "lucide-react";
import { PageHero } from "@/components/page";
import { Check, Field, ProtoForm, Segmented, TextArea, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Contact" };
const HELP = [
  { i: Newspaper, t: "Editorial", d: "Pitches, questions about a piece, interview requests.", e: "editors@forumstrategic.com" },
  { i: SquarePen, t: "Corrections", d: "Report a factual error in something we published.", href: "/corrections" },
  { i: Megaphone, t: "Advertising", d: "Placements, rates and the media kit.", href: "/advertise" },
  { i: PenLine, t: "Writing for us", d: "Apply as a writer or submit research.", href: "/publish-with-us" },
];

export default function Contact() {
  return (
    <>
      <PageHero compact crumbs={[{ label: "Contact" }]} eyebrow="Get in touch" title="Contact Pakistan Strategic Forum" art={40}
        desc="Tell us what you need and the right team will reply, usually within two working days." />
      <section className="container-site mt-10">
        <h2 className="font-serif text-[26px] font-semibold mb-5">How we can help</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HELP.map((h) => {
            const inner = (<><span className="size-11 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><h.i className="size-5" /></span><p className="mt-4 font-semibold text-lg">{h.t}</p><p className="mt-1 text-sm text-ink-600 leading-relaxed">{h.d}</p>{h.e && <p className="mt-3 text-sm font-semibold text-brand-700 break-all">{h.e}</p>}</>);
            return h.href ? <Link key={h.t} href={h.href} className="card card-hover p-5">{inner}</Link> : <div key={h.t} className="card p-5">{inner}</div>;
          })}
        </div>
      </section>
      <section className="container-site mt-12 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 card p-5 sm:p-8">
          <h2 className="font-serif text-[26px] font-semibold">Send a message</h2>
          <ProtoForm className="mt-6 grid sm:grid-cols-2 gap-5" success={{ title: "Message sent", body: "Thank you. We have emailed you a copy and will reply within two working days." }}>
            <Field label="First name" required htmlFor="c-fn"><TextInput id="c-fn" required autoComplete="given-name" /></Field>
            <Field label="Last name" required htmlFor="c-ln"><TextInput id="c-ln" required autoComplete="family-name" /></Field>
            <Field label="Email" required htmlFor="c-em" className="sm:col-span-2"><TextInput id="c-em" type="email" required autoComplete="email" /></Field>
            <Field label="Reason for contact" required className="sm:col-span-2"><Segmented name="reason" options={["Editorial", "Media", "Partnership", "Technical", "Other"]} /></Field>
            <Field label="Subject" required htmlFor="c-su" className="sm:col-span-2"><TextInput id="c-su" required /></Field>
            <Field label="Message" required htmlFor="c-me" className="sm:col-span-2" hint="Up to 2,000 characters"><TextArea id="c-me" rows={6} required /></Field>
            <div className="sm:col-span-2"><Check required>I agree to Pakistan Strategic Forum processing my details to respond to this message (<Link href="/policies/privacy" className="text-brand-700 underline underline-offset-2">Privacy Policy</Link>).</Check></div>
            <div className="sm:col-span-2 h-[65px] w-[300px] max-w-full rounded-xl ring-1 ring-line bg-canvas grid place-items-center text-xs text-ink-400">Security check</div>
            <div className="sm:col-span-2"><button className={btn("primary", "lg", "rounded-full w-full sm:w-auto")}>Send message</button></div>
          </ProtoForm>
        </div>
        <aside className="lg:col-span-4 space-y-4">
          <div className="card p-6">
            <h2 className="font-semibold text-lg">Our office</h2>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-700">
              <li className="flex gap-3"><MapPin className="size-5 text-brand-600 shrink-0" />Office 4, Street 21, F-7/2, Islamabad</li>
              <li className="flex gap-3"><Phone className="size-5 text-brand-600 shrink-0" />+92 51 000 0000</li>
              <li className="flex gap-3"><Mail className="size-5 text-brand-600 shrink-0" />info@forumstrategic.com</li>
              <li className="flex gap-3"><Clock className="size-5 text-brand-600 shrink-0" />Monday to Friday, 09:00 to 17:00 PKT</li>
            </ul>
            <Link href="/where-we-are" className={btn("secondary", "md", "mt-5 w-full rounded-full")}>Directions</Link>
          </div>
          <div className="rounded-3xl bg-mint-100 p-6"><p className="font-semibold">Media enquiries</p><p className="mt-1 text-sm text-ink-600">For urgent press requests, email media@forumstrategic.com with "Urgent" in the subject.</p></div>
        </aside>
      </section>
    </>
  );
}
