import type { Metadata } from "next";
import { PageHero, Prose } from "@/components/page";
import { CookieSettings } from "@/components/CookieSettings";

export const metadata: Metadata = { title: "Cookie policy" };
const ROWS = [
  ["psf_session", "Keeps you signed in to the portal", "Essential", "Session"],
  ["psf-cookies", "Remembers your cookie choice", "Essential", "12 months"],
  ["cf_clearance", "Security check against automated abuse", "Essential", "30 minutes"],
  ["psf-text", "Remembers your text size", "Preferences", "12 months"],
  ["_analytics_id", "Counts visits anonymously", "Analytics", "13 months"],
];

export default function Cookies() {
  return (
    <>
      <PageHero compact variant="plain" crumbs={[{ label: "Cookie policy" }]} eyebrow="Last updated 30 Aug 2026" title="Cookie policy"
        desc="We use a small number of cookies. Essential ones keep the site working. Everything else needs your consent." actions={<CookieSettings />} />
      <div className="container-site mt-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="card p-6 sm:p-8"><Prose><h2 className="!mt-0">What cookies are</h2><p>Cookies are small files a website stores in your browser. They help a site remember you between pages and visits.</p><h2>How we use them</h2><p>We use essential cookies for sign-in and security, preference cookies to remember settings, and, only with your consent, analytics cookies to count visits anonymously. We do not use advertising or cross-site tracking cookies.</p></Prose></div>
          <div className="card overflow-hidden">
            <h2 className="font-semibold text-lg px-6 pt-6">Cookies we use</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[15px] min-w-[560px]">
                <thead><tr className="bg-canvas text-left text-[13px] text-ink-500">{["Cookie", "Purpose", "Category", "Duration"].map((h) => <th key={h} className="px-6 py-3 font-semibold">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-line">{ROWS.map((r) => <tr key={r[0]}><td className="px-6 py-3.5 font-mono text-sm">{r[0]}</td><td className="px-6 py-3.5 text-ink-700">{r[1]}</td><td className="px-6 py-3.5"><span className="inline-flex h-6 px-2.5 items-center rounded-full bg-brand-50 text-brand-800 text-xs font-semibold">{r[2]}</span></td><td className="px-6 py-3.5 text-ink-600">{r[3]}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-4"><div className="rounded-3xl bg-mint-100 p-6 lg:sticky lg:top-24"><p className="font-semibold text-lg">Your choice</p><p className="mt-2 text-ink-600">You can change your settings at any time. Turning analytics off does not affect how the site works.</p><div className="mt-5"><CookieSettings /></div></div></aside>
      </div>
    </>
  );
}
