import type { Metadata } from "next";
import { DashShell } from "@/components/dash/Shell";
import { AdminContent } from "@/components/dash/AdminContent";
export const metadata: Metadata = { title: "Articles and reports" };
export default function AdminArticles() { return <DashShell kind="admin" active="articles" title="Articles"><AdminContent /></DashShell>; }
