import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CircleCheck, CircleHelp, CircleX, ScanLine, Search } from "lucide-react";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "ID card verification" };

export default async function Verify({ searchParams }: { searchParams: Promise<{ state?: string; id?: string }> }) {
  const { state = "active", id = "PSF-RW-0187" } = await searchParams;
  const S = {
    active: { icon: CircleCheck, tone: "bg-mint-100 text-brand-800", title: "Verified", body: "This card is valid and belongs to an approved contributor." },
    inactive: { icon: CircleX, tone: "bg-danger-50 text-danger-700", title: "Not active", body: "This card has expired or been revoked. The holder is not currently an approved contributor." },
    unknown: { icon: CircleHelp, tone: "bg-canvas text-ink-700", title: "Card not found", body: "We could not find a card with this number. Check the number and try again." },
  }[state as "active" | "inactive" | "unknown"] ?? null;
  if (!S) return null;
  return (
    <section className="container-site py-10 sm:py-16">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <span className="mx-auto size-14 rounded-2xl bg-white shadow-soft grid place-items-center text-brand-700"><ScanLine className="size-7" /></span>
          <h1 className="mt-4 font-serif text-[32px] sm:text-[40px] font-semibold">ID card verification</h1>
          <p className="mt-2 text-ink-600">Check a Pakistan Strategic Forum contributor card. Scanning the QR code on the card opens this page.</p>
        </div>
        <form action="/verify" className="mt-8 flex gap-2">
          <label htmlFor="v-id" className="sr-only">Card number</label>
          <div className="relative flex-1"><Search className="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" /><input id="v-id" name="id" defaultValue={id} className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white shadow-soft ring-1 ring-line text-lg font-mono uppercase outline-none focus:ring-2 focus:ring-brand-400" /></div>
          <button className={btn("primary", "lg", "h-14 rounded-2xl")}>Check</button>
        </form>
        <div className="mt-6 card overflow-hidden" role="status">
          <div className={`p-6 flex items-center gap-4 ${S.tone}`}><S.icon className="size-10 shrink-0" /><div><p className="font-serif text-2xl font-semibold">{S.title}</p><p className="text-[15px] opacity-90">{S.body}</p></div></div>
          {state !== "unknown" && (
            <div className="p-6 flex gap-5">
              <div className="w-24 h-28 rounded-2xl bg-brand-100 grid place-items-center text-brand-800 font-semibold text-2xl shrink-0">SH</div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm flex-1">
                {[["Name", "Sara Haider"], ["Card ID", id], ["Designation", "Research Writer"], ["Valid until", state === "active" ? "2 Mar 2027" : "6 May 2026"]].map(([k, v]) => <div key={k}><dt className="text-ink-500">{k}</dt><dd className="font-semibold mt-0.5 break-all">{v}</dd></div>)}
              </dl>
            </div>
          )}
          <div className="px-6 py-4 border-t border-line flex items-center gap-3 text-[13px] text-ink-500"><Image src="/psf-logo.png" alt="" width={28} height={28} />Issued by Pakistan Strategic Forum. Questions? <Link href="/contact" className="text-brand-700 font-semibold">Contact us</Link></div>
        </div>
        <p className="mt-4 text-center text-[13px] text-ink-400">Prototype states: <Link href="/verify?state=active" className="underline">active</Link> · <Link href="/verify?state=inactive&id=PSF-AW-0355" className="underline">inactive</Link> · <Link href="/verify?state=unknown&id=PSF-XX-0000" className="underline">unknown</Link></p>
      </div>
    </section>
  );
}
