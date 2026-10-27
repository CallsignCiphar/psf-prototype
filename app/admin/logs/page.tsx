import type { Metadata } from "next";
import { Download } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { PageHead, Person } from "@/components/dash/kit";
import { ActionButton, DataList } from "@/components/dash/interactive";
import { LogEntry } from "@/components/dash/LogEntry";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Activity logs" };
const L = [["16 Oct 2026, 10:44:12", "HS", "Hina Shah", "Editor", "article.changes_requested", "Water security and the Indus Waters Treaty", "39.45.112.8"], ["16 Oct 2026, 10:21:03", "UT", "Usman Tariq", "Super Admin", "featured.reorder", "Top Stories", "39.45.112.20"], ["16 Oct 2026, 09:58:47", "FQ", "Dr Faisal Qureshi", "Research Editor", "research.reviewer_invited", "RES-2026-00052", "111.68.99.4"], ["16 Oct 2026, 09:12:30", "SH", "Sara Haider", "Research Writer", "auth.sign_in", "2FA: authenticator", "182.180.5.77"], ["16 Oct 2026, 09:00:00", "S", "System", "Scheduler", "research.published", "RES-2026-00017", "internal"], ["15 Oct 2026, 23:59:00", "S", "System", "Scheduler", "featured.expired", "Top Stories position 3", "internal"], ["15 Oct 2026, 18:02:19", "UT", "Usman Tariq", "Super Admin", "user.role_changed", "Omar Farooq: Approver", "39.45.112.20"], ["15 Oct 2026, 16:40:55", "U", "Unknown", "Not signed in", "auth.sign_in_failed", "kjaved@yahoo.com, account banned", "103.255.4.19"], ["15 Oct 2026, 16:10:08", "HS", "Hina Shah", "Editor", "article.changes_requested", "Civil-military coordination in flood relief", "39.45.112.8"]];

export default function Logs() {
  return (
    <DashShell kind="admin" active="logs" title="Activity logs">
      <PageHead title="Activity logs" desc="Read-only. Kept for 24 months, then archived." actions={<ActionButton msg="CSV export started" className={btn("secondary", "md", "rounded-full")}><Download className="size-4" />Export CSV</ActionButton>} />
      <DataList noun="entries" total={14208} search="Search target or IP" sorts={["Newest", "Oldest"]}
        selects={[{ key: "user", label: "User", options: ["Hina Shah", "Usman Tariq", "Dr Faisal Qureshi", "Sara Haider", "System"] }, { key: "mod", label: "Module", options: ["article", "featured", "research", "auth", "user"] }, { key: "range", label: "Last 7 days", options: ["Today", "Last 7 days", "Last 30 days"] }]}
        cols={[{ key: "t", label: "Time (PKT)" }, { key: "u", label: "User" }, { key: "a", label: "Action" }, { key: "tg", label: "Target" }, { key: "ip", label: "IP" }]}
        mobile={{ title: "a", meta: ["u", "t", "tg"] }}
        rows={L.map(([t, i, n, r, a, tg, ip]) => ({ id: t + a, text: tg + ip + a, f: { user: n, mod: a.split(".")[0] }, cells: { t: <span className="text-ink-600 whitespace-nowrap tabular-nums text-[13px]">{t}</span>, u: <Person i={i} name={n} sub={r} />, a: <LogEntry action={a} time={t} by={`${n}, ${r}`} target={tg} ip={ip} />, tg: <span className="text-ink-700">{tg}</span>, ip: <span className="font-mono text-[12.5px] text-ink-500">{ip}</span> } }))} />
    </DashShell>
  );
}
