import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Settings2 } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Status, Tag } from "@/components/dash/kit";
import { DataList } from "@/components/dash/interactive";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "CMS pages" };
const P = [["About Pakistan Strategic Forum", "/about", "About", "Published", "Hina Shah", "14 Oct 2026"], ["Editorial policy", "/policies/editorial", "Policy", "Published", "Usman Tariq", "2 Sep 2026"], ["Copyright and takedown", "/policies/copyright", "Policy", "Published", "Usman Tariq", "2 Sep 2026"], ["Privacy policy", "/policies/privacy", "Policy", "Published", "Usman Tariq", "30 Aug 2026"], ["Terms of use", "/policies/terms", "Policy", "Published", "Usman Tariq", "30 Aug 2026"], ["Cookie policy", "/cookies", "Policy", "Published", "Usman Tariq", "30 Aug 2026"], ["Publish with us", "/publish-with-us", "Landing", "Draft", "Hina Shah", "15 Oct 2026"], ["Advertise", "/advertise", "Landing", "Published", "Hina Shah", "1 Jul 2026"], ["Where we are", "/where-we-are", "Simple", "Published", "Hina Shah", "12 Mar 2026"], ["Contact", "/contact", "Form", "Published", "Hina Shah", "12 Mar 2026"]];

export default function CmsPages() {
  return (
    <DashShell kind="admin" active="cms" title="CMS">
      <PageHead title="Pages" desc="Static pages. Topic, article and research pages are generated and not edited here." actions={<><Link href="/admin/cms/settings" className={btn("secondary", "md", "rounded-full")}><Settings2 className="size-4" />CMS settings</Link><Link href="/admin/cms/new" className={btn("primary", "md", "rounded-full")}><Plus className="size-4" />New page</Link></>} />
      <DataList noun="pages" pages={1} search="Search pages" sorts={["Recently updated", "A to Z"]}
        selects={[{ key: "tpl", label: "Template", options: ["About", "Policy", "Landing", "Simple", "Form"] }, { key: "st", label: "Status", options: ["Published", "Draft"] }]}
        cols={[{ key: "p", label: "Page" }, { key: "u", label: "URL" }, { key: "t", label: "Template" }, { key: "s", label: "Status" }, { key: "b", label: "Last edited by" }, { key: "d", label: "Updated" }, { key: "e", label: "", className: "text-right" }]}
        mobile={{ title: "p", meta: ["u", "s", "d"], end: "e" }}
        rows={P.map(([p, u, t, s, b, d]) => ({ id: u, href: "/admin/cms/about", text: p + u, f: { tpl: t, st: s }, cells: { p: <span className="font-semibold">{p}</span>, u: <span className="font-mono text-[12.5px] text-ink-500">{u}</span>, t: <Tag>{t}</Tag>, s: <Status s={s} />, b: <span className="text-ink-600">{b}</span>, d: <span className="text-ink-600 whitespace-nowrap">{d}</span>, e: <Link href="/admin/cms/about" className="h-9 px-3.5 rounded-full ring-1 ring-line text-[13px] font-semibold inline-flex items-center hover:bg-canvas">Edit</Link> } }))} />
    </DashShell>
  );
}
