import Link from "next/link";
import { ArrowLeft, Hammer, LayoutGrid } from "lucide-react";
import { btn } from "@/components/ui";

export default async function Pending({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return (
    <section className="container-site py-20 sm:py-28">
      <div className="card max-w-2xl mx-auto p-8 sm:p-12 text-center">
        <span className="mx-auto size-14 rounded-2xl bg-mint-100 text-brand-800 grid place-items-center"><Hammer className="size-6" /></span>
        <h1 className="mt-5 font-serif text-3xl font-semibold">This page is being redesigned</h1>
        <p className="mt-3 text-ink-600">/{slug.join("/")} is part of the next phase of the redesign and will appear here shortly.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={btn("primary", "md", "rounded-full")}><ArrowLeft className="size-4" />Back to home</Link>
          <Link href="/prototype" className={btn("secondary", "md", "rounded-full")}><LayoutGrid className="size-4" />All screens</Link>
        </div>
      </div>
    </section>
  );
}
