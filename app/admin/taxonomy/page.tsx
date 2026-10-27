import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { Taxonomy } from "@/components/dash/Taxonomy";

export const metadata: Metadata = { title: "Taxonomy" };
export default function TaxonomyPage() {
  return <DashShell kind="admin" active="taxonomy" title="Taxonomy"><PageHead title="Taxonomy" desc="Drag to reorder. A topic with content cannot be deleted until its items are moved." /><Taxonomy /></DashShell>;
}
