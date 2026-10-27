import type { Metadata } from "next";
import { ERRORS, ErrorView } from "@/components/ErrorView";

export function generateStaticParams() { return Object.keys(ERRORS).map((code) => ({ code })); }
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  return { title: ERRORS[code]?.title ?? "Error" };
}
export default async function ErrorPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <ErrorView code={code} />;
}
