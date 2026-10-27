import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { ItemView, type ViewStatus } from "@/components/dash/ItemView";

export const metadata: Metadata = { title: "Article view" };

export default async function View({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const s = (await searchParams).status;
  const status: ViewStatus = s === "changes" || s === "live" || s === "rejected" ? s : "pending";
  return <DashShell kind="portal" active="articles" title="Article view"><ItemView kind="article" status={status} /></DashShell>;
}
