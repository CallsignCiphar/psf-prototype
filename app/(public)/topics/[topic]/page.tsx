import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOPICS } from "@/lib/data";
import { TopicPage } from "@/components/TopicPage";

export function generateStaticParams() { return TOPICS.map((t) => ({ topic: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params; return { title: TOPICS.find((t) => t.slug === topic)?.name ?? "Topic" };
}
export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!TOPICS.some((t) => t.slug === topic)) notFound();
  return <TopicPage topic={topic} />;
}
