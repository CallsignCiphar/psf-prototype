import Link from "next/link";
import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { NotifList } from "@/components/dash/NotifList";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Notifications" };

export default function Notifications() {
  return (
    <DashShell kind="portal" active="notifications" title="Notifications">
      <PageHead title="Notifications" actions={<Link href="/portal/account#email" className={btn("secondary", "md", "rounded-full")}><Settings2 className="size-4" />Email preferences</Link>} />
      <div className="max-w-3xl"><NotifList /></div>
    </DashShell>
  );
}
