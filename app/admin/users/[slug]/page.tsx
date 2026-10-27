import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Ban as BanIcon, KeyRound, ShieldOff, UserCog, UserX } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, Initials, KV, PageHead, Status, Tag, Timeline } from "@/components/dash/kit";
import { ActionButton, TabPanels } from "@/components/dash/interactive";
import { Ban, ChangeRoles, Deactivate, Reset2FA } from "@/components/dash/UserDialogs";
import { USERS } from "@/components/dash/data";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "User detail" };

export default async function UserDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = USERS.find((x) => x.slug === slug) ?? USERS[1];
  return (
    <DashShell kind="admin" active="users" title="User detail">
      <PageHead crumbs={[{ label: "Users", href: "/admin/users" }, { label: u.name }]} title="" />
      <section className="-mt-3 bg-white rounded-[28px] shadow-soft p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-5">
        <Initials i={u.i} size={72} tone="brand" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h1 className="font-serif text-[28px] sm:text-[32px] font-semibold">{u.name}</h1><Status s={u.status} />{u.roles.map((r) => <Tag key={r}>{r}</Tag>)}</div>
          <p className="mt-1 text-[14px] text-ink-500 break-words">{u.email} · Lecturer, NUML Islamabad · Joined {u.joined} · Last active yesterday, 21:04</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ChangeRoles name={u.name} current={u.roles} triggerClass={btn("primary", "md", "rounded-full")} trigger={<><UserCog className="size-4" />Edit roles</>} />
          <Reset2FA name={u.name} triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><ShieldOff className="size-4" />Reset 2FA</>} />
          <ActionButton msg="Password reset email sent" className={btn("secondary", "md", "rounded-full")}><KeyRound className="size-4" />Send password reset</ActionButton>
        </div>
      </section>
      <div className="mt-6">
        <TabPanels tabs={[
          { label: "Overview", content: (
            <div className="grid xl:grid-cols-3 gap-5 items-start">
              <div className="xl:col-span-2 space-y-5 min-w-0">
                <Card title="Profile"><KV cols={2} items={[["Display name", u.name], ["Designation", "Lecturer, International Relations"], ["Institution", "NUML Islamabad"], ["Expertise", "Defence economics, Civil-military relations"], ["Short bio", "Writes on defence budgets and civil-military relations."], ["Links", "LinkedIn · X"], ["Author page", <Link key="a" href="/authors/bilal-ahmed" className="text-brand-700 font-semibold underline">psf.org.pk/author/bilal-ahmed</Link>]]} /></Card>
                <Card title="Content" action={<Link href="/admin/articles" className="text-sm font-semibold text-brand-700">View all</Link>}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{[["Live", "22"], ["Pending", "1"], ["Drafts", "3"], ["Reads", "41,280"]].map(([l, v]) => <div key={l} className="rounded-2xl bg-canvas p-4"><p className="text-[12.5px] text-ink-500">{l}</p><p className="font-serif text-[26px] font-semibold tabular-nums">{v}</p></div>)}</div>
                </Card>
                <Card title="Account status" desc="Deactivate to stop sign-in but keep published work. Ban to block re-registration with this email.">
                  <div className="flex flex-wrap gap-2">
                    <Deactivate name={u.name} triggerClass={btn("secondary", "md", "rounded-full")} trigger={<><UserX className="size-4" />Deactivate</>} />
                    <Ban name={u.name} triggerClass={btn("danger", "md", "rounded-full")} trigger={<><BanIcon className="size-4" />Ban user</>} />
                  </div>
                </Card>
              </div>
              <div className="space-y-5 min-w-0">
                <Card title="Security"><KV items={[["Email", "Verified 18 Jan 2025"], ["Two-factor", "Off (optional for this role)"], ["Last sign-in", "15 Oct 2026, 21:04 · Islamabad, PK"], ["Failed sign-ins", "0 in last 30 days"]]} /></Card>
                <Card title="ID card" action={<Status s="Issued" />}><p className="font-mono font-semibold">PSF-AW-0412</p><p className="text-[13px] text-ink-500">Expires 17 Jan 2027</p><Link href="/admin/id-cards" className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700">Manage ID cards<ArrowRight className="size-4" /></Link></Card>
                <Card title="Recent activity" action={<Link href="/admin/logs" className="text-sm font-semibold text-brand-700">Activity logs</Link>}><Timeline steps={[{ t: "Submitted: Budget 2026-27 follow-up", d: "15 Oct 2026, 21:04", s: "done" }, { t: "Signed in", d: "15 Oct 2026, 20:51", s: "done" }, { t: "Article published: Budget 2026-27, what defence gets", d: "9 Oct 2026", s: "done" }, { t: "Profile updated", d: "2 Oct 2026", s: "done" }]} /></Card>
              </div>
            </div>
          ) },
          { label: "Content", count: 27, content: <Card><ul className="divide-y divide-line">{["Budget 2026-27 follow-up: procurement", "Budget 2026-27: what defence gets", "Reading the defence budget"].map((t, i) => <li key={t} className="flex items-center gap-3 py-3"><span className="flex-1 font-semibold">{t}</span><Status s={i ? "Live" : "Pending review"} /></li>)}</ul></Card> },
          { label: "Applications", count: 1, content: <Card><div className="flex items-center gap-3"><span className="flex-1"><span className="block font-semibold">Article Writer application</span><span className="text-[13px] text-ink-500">APP-2025-0041 · 16 Jan 2025</span></span><Status s="Approved" /></div></Card> },
          { label: "Activity", content: <Card><Timeline steps={[{ t: "auth.sign_in", d: "15 Oct 2026, 20:51 · 39.45.112.8", s: "done" }, { t: "article.submitted", d: "15 Oct 2026, 21:04", s: "done" }, { t: "profile.updated", d: "2 Oct 2026", s: "done" }]} /></Card> },
        ]} />
      </div>
    </DashShell>
  );
}
