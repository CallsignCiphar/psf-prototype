import Link from "next/link";
import type { Metadata } from "next";
import { FilePlus2 } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { MyList } from "@/components/dash/MyList";
import { MY_REPORTS } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "My Reports" };

export default async function MyReports({ searchParams }: { searchParams: Promise<{ empty?: string }> }) {
  const { empty } = await searchParams;
  return (
    <DashShell kind="portal" active="reports" title="My Reports">
      <PageHead title="My Reports" desc="5 reports" actions={<Link href="/portal/reports/new" className={btn("primary", "md", "rounded-full")}><FilePlus2 className="size-4" />New report</Link>} />
      <MyList kind="reports" items={MY_REPORTS} empty={empty === "true"} />
    </DashShell>
  );
}
