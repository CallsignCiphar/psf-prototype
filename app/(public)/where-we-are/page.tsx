import type { Metadata } from "next";
import { Bus, Car, Clock, Facebook, Instagram, Mail, MapPin, Navigation, Phone, Twitter, Youtube } from "lucide-react";
import { PageHero } from "@/components/page";
import { Cover, btn } from "@/components/ui";

export const metadata: Metadata = { title: "Where we are" };

export default function WhereWeAre() {
  return (
    <>
      <PageHero compact crumbs={[{ label: "Where we are" }]} eyebrow="Visit us" title="Where we are" art={48} desc="Our office is in F-7, Islamabad. Visits are by appointment." />
      <section className="container-site mt-8 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 relative overflow-hidden rounded-[28px] min-h-[360px] sm:min-h-[460px] bg-brand-900">
          <Cover seed={5} kind="grid" dark className="absolute inset-0" />
          <svg viewBox="0 0 800 460" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="xMidYMid slice"><g stroke="#9fe3bd" strokeOpacity=".25" strokeWidth="10" fill="none" strokeLinecap="round"><path d="M-20 300 L820 220" /><path d="M300 -20 L380 480" /><path d="M560 -20 L520 480" /></g><g stroke="#9fe3bd" strokeOpacity=".12" strokeWidth="4" fill="none"><path d="M-20 140 L820 90" /><path d="M120 -20 L180 480" /><path d="M-20 400 L820 360" /></g></svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
            <span className="rounded-2xl bg-white px-4 py-2.5 shadow-pop text-sm font-semibold whitespace-nowrap">Pakistan Strategic Forum</span>
            <MapPin className="size-12 text-mint-300 -mt-1 drop-shadow-lg" fill="#04411f" />
          </div>
          <a href="#" className={btn("light", "md", "absolute right-4 bottom-4 rounded-full")}><Navigation className="size-4" />Get directions</a>
        </div>
        <aside className="lg:col-span-4 space-y-4">
          <div className="card p-6">
            <h2 className="font-semibold text-lg">Address</h2>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-700">
              <li className="flex gap-3"><MapPin className="size-5 text-brand-600 shrink-0" />Office 4, Street 21, F-7/2, Islamabad 44000</li>
              <li className="flex gap-3"><Clock className="size-5 text-brand-600 shrink-0" />Monday to Friday, 09:00 to 17:00 PKT</li>
              <li className="flex gap-3"><Phone className="size-5 text-brand-600 shrink-0" />+92 51 000 0000</li>
              <li className="flex gap-3"><Mail className="size-5 text-brand-600 shrink-0" />info@forumstrategic.com</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-lg">Getting here</h2>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-700"><li className="flex gap-3"><Car className="size-5 text-brand-600 shrink-0" />Visitor parking on Street 21.</li><li className="flex gap-3"><Bus className="size-5 text-brand-600 shrink-0" />Metro bus to Jinnah Avenue, then a 10 minute walk.</li></ul>
          </div>
          <div className="rounded-3xl bg-mint-100 p-6">
            <p className="font-semibold">Follow us</p>
            <div className="mt-3 flex gap-2">{[Twitter, Facebook, Instagram, Youtube].map((I, i) => <a key={i} href="#" aria-label="Social link" className="size-11 grid place-items-center rounded-full bg-white text-brand-800 shadow-soft hover:shadow-lift"><I className="size-5" /></a>)}</div>
          </div>
        </aside>
      </section>
    </>
  );
}
