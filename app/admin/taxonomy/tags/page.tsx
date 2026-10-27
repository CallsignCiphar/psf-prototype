import type { Metadata } from "next";
import { GitMerge, Plus } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Tag } from "@/components/dash/kit";
import { DataList, Dialog } from "@/components/dash/interactive";
import { Field, Select, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Tags" };
const TAGS = [["Nuclear deterrence", 84, "2 Feb 2023"], ["CPEC", 71, "2 Feb 2023"], ["Floods", 33, "30 Aug 2022"], ["Flood", 4, "11 Sep 2025"], ["Flooding", 2, "3 Oct 2026"], ["NDMA", 19, "4 Sep 2022"], ["Indus Waters Treaty", 17, "9 Jan 2024"], ["Afghanistan", 96, "2 Feb 2023"], ["Hypersonics", 6, "16 Oct 2026"]] as const;

export default function Tags() {
  return (
    <DashShell kind="admin" active="taxonomy" title="Tags">
      <PageHead crumbs={[{ label: "Taxonomy", href: "/admin/taxonomy" }, { label: "Tags" }]} title="Tags" desc="Writers can add up to 10 tags per item. Merge near-duplicates to keep search clean."
        actions={<>
          <Dialog triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><GitMerge className="size-4" />Merge tags</>} title="Merge 2 tags" confirm={{ label: "Merge tags", toast: "Tags merged. Old URLs redirect." }}>
            <div className="flex gap-2"><Tag>Flood</Tag><Tag>Flooding</Tag></div>
            <Field label="Merge into" required htmlFor="m-mi"><Select id="m-mi" options={["Floods (33 uses)", "NDMA (19 uses)"]} defaultValue="Floods (33 uses)" /></Field>
            <p className="text-[14px] text-ink-600">6 items are retagged. Old tag URLs redirect to the new tag.</p>
          </Dialog>
          <Dialog triggerClass={btn("primary", "md", "rounded-full")} trigger={<><Plus className="size-4" />Add tag</>} title="Add tag" confirm={{ label: "Add tag", toast: "Tag added" }}><Field label="Tag name" required htmlFor="m-tn"><TextInput id="m-tn" required /></Field></Dialog>
        </>} />
      <DataList noun="tags" total={1042} selectable bulk={["Merge into...", "Delete"]} search="Search tags" sorts={["Most used", "Newest", "A to Z"]}
        selects={[{ key: "unused", label: "Unused only", options: ["Yes", "No"] }]}
        cols={[{ key: "t", label: "Tag" }, { key: "slug", label: "Slug" }, { key: "u", label: "Uses", align: "right" }, { key: "c", label: "Created" }]}
        mobile={{ title: "t", meta: ["slug", "c"], end: "u" }}
        rows={TAGS.map(([t, u, c]) => ({ id: t, text: t, f: { unused: (u as number) < 1 ? "Yes" : "No" }, cells: { t: <span className="font-semibold">{t}</span>, slug: <span className="font-mono text-[12.5px] text-ink-500">{t.toLowerCase().replace(/ /g, "-")}</span>, u: <span className="font-semibold tabular-nums">{u}</span>, c: <span className="text-ink-600">{c}</span> } }))} />
    </DashShell>
  );
}
