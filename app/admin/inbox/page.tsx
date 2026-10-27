import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { Inbox } from "@/components/dash/Inbox";
export const metadata: Metadata = { title: "Inbox" };
export default function InboxPage() { return <DashShell kind="admin" active="inbox" title="Inbox"><PageHead title="Inbox" desc="9 unread · replies go from editors@psf.org.pk" /><Inbox /></DashShell>; }
