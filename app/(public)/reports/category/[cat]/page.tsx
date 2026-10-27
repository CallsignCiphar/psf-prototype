import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { REPORTS, REPORT_CATEGORIES } from "@/lib/data";
import { PageHero } from "@/components/page";
import { Cover, Pill } from "@/components/ui";
import { ReportList } from "@/components/lists/ReportList";

const slug = (c: string) => c.toLowerCase().replace(/ /g, "-");
export function generateStaticParams() { return REPORT_CATEGORIES.map((c) => ({ cat: slug(c) })); }
export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params; return { title: REPORT_CATEGORIES.find((c) => slug(c) === cat) ?? "Reports" };
}

export default async function ReportCategory({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const name = REPORT_CATEGORIES.find((c) => slug(c) === cat);
  if (!name) notFound();
  const featured = REPORTS.find((r) => r.category === name) ?? REPORTS[0];
  return (
    <>
      <PageHero crumbs={[{ label: "Reports", href: "/reports" }, { label: name }]} eyebrow="Report category" title={name} art={30 + name.length} compact
        desc={`Every ${name.toLowerCase()} we have published, newest first.`}>
        <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {REPORT_CATEGORIES.map((c) => <Link key={c} href={`/reports/category/${slug(c)}`} aria-current={c === name ? "page" : undefined} className={`shrink-0 h-10 px-4 inline-flex items-center rounded-full text-sm font-medium ${c === name ? "bg-white text-brand-900" : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"}`}>{c}</Link>)}
        </div>
      </PageHero>
      <section className="container-site mt-8">
        <div className="card overflow-hidden grid md:grid-cols-12">
          <Cover seed={featured.art} kind="radar" dark className="md:col-span-5 min-h-[220px]" />
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col">
            <Pill tone="mint">Featured {name}</Pill>
            <h2 className="mt-3 font-serif text-[26px] sm:text-[30px] leading-tight font-semibold">{featured.title}</h2>
            <p className="mt-2 text-ink-600">{featured.summary}</p>
            <p className="mt-3 text-[13px] text-ink-500 flex items-center gap-1.5"><FileText className="size-3.5" />{featured.pages} pages · {featured.date}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={`/reports/${featured.slug}`} className="h-11 px-5 inline-flex items-center rounded-full bg-brand-800 text-white font-semibold">Read</Link>
              <a href="#" className="h-11 px-5 inline-flex items-center gap-2 rounded-full ring-1 ring-line-strong font-semibold"><Download className="size-4" />Download PDF</a>
            </div>
          </div>
        </div>
      </section>
      <section className="container-site mt-12">
        <h2 className="font-serif text-[26px] sm:text-[30px] font-semibold mb-5">All {name}</h2>
        <ReportList category={name} />
      </section>
    </>
  );
}
