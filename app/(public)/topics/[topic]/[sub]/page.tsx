import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOPICS } from "@/lib/data";
import { TopicPage } from "@/components/TopicPage";

export function generateStaticParams() { return TOPICS.flatMap((t) => t.subs.map((s) => ({ topic: t.slug, sub: s.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string; sub: string }> }): Promise<Metadata> {
  const p = await params; const t = TOPICS.find((x) => x.slug === p.topic);
  return { title: t?.subs.find((s) => s.slug === p.sub)?.name ?? "Topic" };
}
export default async function Page({ params }: { params: Promise<{ topic: string; sub: string }> }) {
  const { topic, sub } = await params;
  const t = TOPICS.find((x) => x.slug === topic);
  if (!t || !t.subs.some((s) => s.slug === sub)) notFound();
  return <TopicPage topic={topic} sub={sub} />;
}
