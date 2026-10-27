import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { AdminContent } from "@/components/dash/AdminContent";
export const metadata: Metadata = { title: "Reports" };
export default function AdminReports() { return <DashShell kind="admin" active="reports" title="Reports"><AdminContent type="Report" /></DashShell>; }
