import Link from "next/link";
import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead } from "@/components/dash/kit";
import { MyList } from "@/components/dash/MyList";
import { MY_ARTICLES } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "My Articles" };

export default async function MyArticles({ searchParams }: { searchParams: Promise<{ empty?: string }> }) {
  const { empty } = await searchParams;
  return (
    <DashShell kind="portal" active="articles" title="My Articles">
      <PageHead title="My Articles" desc="20 articles · reads counted once per reader per 24 hours" actions={<Link href="/portal/articles/new" className={btn("primary", "md", "rounded-full")}><PenLine className="size-4" />Write article</Link>} />
      <MyList kind="articles" items={MY_ARTICLES} empty={empty === "true"} />
    </DashShell>
  );
}
