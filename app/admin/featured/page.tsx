import Link from "next/link";
import type { Metadata } from "next";
import { CalendarRange, Save } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { ActionButton } from "@/components/dash/interactive";
import { FeaturedSlots } from "@/components/dash/Featured";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Featured and Top Stories" };

export default function Featured() {
  return (
    <DashShell kind="admin" active="featured" title="Featured">
      <PageHead title="Featured and Top Stories" desc="Changes go live on save. Expired items drop out automatically at the time shown." actions={<><Link href="/admin/featured/timeline" className={btn("secondary", "md", "rounded-full")}><CalendarRange className="size-4" />Timeline</Link><ActionButton msg="Order saved" className={btn("primary", "md", "rounded-full")}><Save className="size-4" />Save order</ActionButton></>} />
      <div className="max-w-4xl"><FeaturedSlots /></div>
    </DashShell>
  );
}
