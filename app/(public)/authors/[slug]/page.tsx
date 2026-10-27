import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BadgeCheck, FileText, GraduationCap, Linkedin, Mail, ScrollText, Twitter } from "lucide-react";
import { ARTICLES, AUTHORS, AUTHOR_BIO, REPORTS, RESEARCH_ALL, authorBySlug, topicBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/page";
import { Avatar, Cover } from "@/components/ui";
import { AuthorWorks } from "@/components/lists/AuthorWorks";

export function generateStaticParams() { return AUTHORS.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: AUTHORS.find((a) => a.slug === slug)?.name ?? "Author" };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!AUTHORS.find((a) => a.slug === slug)) notFound();
  const a = authorBySlug(slug);
  const arts = ARTICLES.filter((x) => x.author === slug);
  const papers = RESEARCH_ALL.filter((p) => p.authors.includes(a.name.replace("Dr ", "")));
  const bio = AUTHOR_BIO[slug] ?? `${a.name} writes for Pakistan Strategic Forum. A full biography will be added from the contributor's profile.`;
  const topics = Array.from(new Set(arts.map((x) => x.topic)));
  return (
    <>
      <section className="sm:container-site sm:pt-5">
        <div className="relative overflow-hidden sm:rounded-[32px] bg-white shadow-soft">
          <div className="relative h-28 sm:h-36"><Cover seed={slug.length + 40} kind="contour" dark className="absolute inset-0" /></div>
          <div className="px-5 sm:px-10 pb-8 -mt-12 sm:-mt-14 relative">
            <Avatar initials={a.initials} size={104} className="ring-4 ring-white shadow-lift" />
            <div className="mt-4 grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8">
                <h1 className="font-serif text-[32px] sm:text-[44px] font-semibold tracking-[-0.02em] leading-tight flex items-center gap-2 flex-wrap">{a.name}<BadgeCheck className="size-7 text-brand-600" aria-label="Verified contributor" /></h1>
                <p className="mt-1 text-[17px] text-brand-700 font-semibold">{a.role}</p>
                <p className="mt-4 text-[17px] text-ink-600 leading-relaxed max-w-2xl">{bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[[Twitter, "X"], [Linkedin, "LinkedIn"], [Mail, "Email"]].map(([I, l]) => { const Icon = I as typeof Mail; return <a key={l as string} href="#" aria-label={l as string} className="size-11 grid place-items-center rounded-full bg-canvas text-ink-700 hover:bg-mint-100 hover:text-brand-800"><Icon className="size-5" /></a>; })}
                  <Link href={`/verify?state=active&id=PSF-${a.initials}-0${a.articles}`} className="h-11 px-4 inline-flex items-center gap-2 rounded-full bg-mint-100 text-brand-800 text-sm font-semibold"><BadgeCheck className="size-4" />Verify ID card</Link>
                </div>
              </div>
              <dl className="lg:col-span-4 grid grid-cols-3 gap-3">
                {[[FileText, a.articles, "Articles"], [ScrollText, REPORTS.filter((_, i) => i % AUTHORS.length === AUTHORS.indexOf(a) % 3).slice(0, 2).length, "Reports"], [GraduationCap, papers.length, "Papers"]].map(([I, n, l]) => { const Icon = I as typeof Mail; return (
                  <div key={l as string} className="rounded-2xl bg-canvas p-3 sm:p-4 text-center"><Icon className="size-5 mx-auto text-brand-600" /><dd className="mt-1 font-serif text-2xl font-semibold tabular-nums">{n as number}</dd><dt className="text-xs text-ink-500">{l as string}</dt></div>
                ); })}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <div className="container-site mt-6"><Breadcrumbs items={[{ label: "Authors" }, { label: a.name }]} /></div>
      {topics.length > 0 && <div className="container-site mt-4 flex flex-wrap gap-2">{topics.map((t) => <Link key={t} href={`/topics/${t}`} className="h-9 px-4 rounded-full bg-white shadow-soft text-sm font-semibold text-brand-800 grid place-items-center hover:bg-mint-100">Writes on {topicBySlug(t).name}</Link>)}</div>}
      <section className="container-site mt-10">
        <h2 className="font-serif text-[28px] font-semibold mb-5">Published work</h2>
        <AuthorWorks articles={arts.map((x) => x.slug)} reports={REPORTS.filter((_, i) => i % AUTHORS.length === AUTHORS.indexOf(a) % 3).slice(0, 2).map((r) => r.slug)} papers={papers.map((p) => p.slug)} />
      </section>
    </>
  );
}
