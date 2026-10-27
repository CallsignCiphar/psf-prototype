import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { CmsSettings } from "@/components/dash/CmsSettings";
export const metadata: Metadata = { title: "CMS settings" };
export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const tab = (await searchParams).tab ?? "navigation";
  return <DashShell kind="admin" active="cms" title="CMS settings"><PageHead crumbs={[{ label: "Pages", href: "/admin/cms" }, { label: "CMS settings" }]} title="CMS settings" desc="Changes apply site-wide on save" /><CmsSettings initial={tab} /></DashShell>;
}
