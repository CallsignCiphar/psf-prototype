import type { Metadata } from "next";
import { CheckCircle2, Construction, Save } from "lucide-react";
import { DashShell } from "@/components/dash/Shell";
import { Card, PageHead, Status, Tag } from "@/components/dash/kit";
import { ActionButton, Dialog, Switch } from "@/components/dash/interactive";
import { Field, Select, TextInput } from "@/components/form";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Settings" };

function Toggle({ t, d, on = true }: { t: string; d: string; on?: boolean }) {
  return <div className="flex items-center justify-between gap-4 py-3.5 border-b border-line last:border-0"><div><p className="font-semibold text-[14.5px]">{t}</p><p className="text-[13px] text-ink-500">{d}</p></div><Switch on={on} label={t} /></div>;
}
function Val({ t, v }: { t: string; v: string }) {
  return <div className="flex items-center justify-between gap-4 py-3.5 border-b border-line last:border-0"><p className="font-semibold text-[14.5px]">{t}</p><span className="h-9 px-3.5 rounded-xl bg-canvas ring-1 ring-line text-[14px] font-semibold grid place-items-center tabular-nums whitespace-nowrap">{v}</span></div>;
}

export default function Settings() {
  const nav = ["General", "Security", "Email", "Content and workflow", "Integrations", "Maintenance"];
  return (
    <DashShell kind="admin" active="settings" title="Settings">
      <PageHead title="Settings" badge={<Tag tone="dark">Super Admin only</Tag>} desc="Changes are logged in Activity logs" actions={<><button className={btn("ghost", "md", "rounded-full")}>Discard</button><ActionButton msg="Settings saved and logged" className={btn("primary", "md", "rounded-full")}><Save className="size-4" />Save settings</ActionButton></>} />
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
        <nav aria-label="Settings sections" className="lg:sticky lg:top-24 flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">{nav.map((n, i) => <a key={n} href={`#${n.toLowerCase().replace(/ /g, "-")}`} className={i === 0 ? "shrink-0 h-10 px-4 rounded-full lg:rounded-xl bg-brand-800 text-white text-[14px] font-semibold flex items-center" : "shrink-0 h-10 px-4 rounded-full lg:rounded-xl bg-white lg:bg-transparent shadow-soft lg:shadow-none text-[14px] font-semibold text-ink-700 hover:bg-white flex items-center"}>{n}</a>)}</nav>
        <div className="space-y-5 min-w-0">
          <div id="general" className="scroll-mt-24"><Card title="General"><div className="grid sm:grid-cols-2 gap-5">
            <Field label="Organisation name" required htmlFor="se-o"><TextInput id="se-o" defaultValue="Pakistan Strategic Forum" /></Field>
            <Field label="Public contact email" required htmlFor="se-e"><TextInput id="se-e" defaultValue="editors@psf.org.pk" /></Field>
            <Field label="Time zone" required htmlFor="se-tz"><Select id="se-tz" options={["Asia/Karachi (PKT, UTC+5)"]} defaultValue="Asia/Karachi (PKT, UTC+5)" /></Field>
            <Field label="Date format" htmlFor="se-df"><Select id="se-df" options={["16 October 2026", "16 Oct 2026", "16/10/2026"]} defaultValue="16 October 2026" /></Field>
          </div></Card></div>
          <div id="security" className="scroll-mt-24"><Card title="Security">
            <Toggle t="Require 2FA for Approvers" d="Approvers cannot sign in without it" />
            <Toggle t="Require 2FA for all staff roles" d="Editor, Admin, Super Admin and custom roles" />
            <Toggle t="Cloudflare Turnstile on public forms" d="Sign in, signup, contact, corrections" />
            <Val t="Session timeout" v="8 hours" /><Val t="Lock after failed sign-ins" v="5 attempts, 15 minutes" /><Val t="Minimum password length" v="10 characters" />
          </Card></div>
          <div id="email" className="scroll-mt-24"><Card title="Email"><div className="grid sm:grid-cols-2 gap-5">
            <Field label="Sender name" required htmlFor="se-sn"><TextInput id="se-sn" defaultValue="Pakistan Strategic Forum" /></Field>
            <Field label="Sender address" required htmlFor="se-sa"><TextInput id="se-sa" defaultValue="no-reply@psf.org.pk" /></Field>
          </div><div className="mt-4 flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700"><CheckCircle2 className="size-4" />Domain verified (SPF, DKIM)</span><span className="text-[13px] text-ink-500">23 transactional templates</span><button className={btn("secondary", "sm", "rounded-full")}>Edit templates</button></div></Card></div>
          <div id="content-and-workflow" className="scroll-mt-24"><Card title="Content and workflow">
            <Val t="Read counting window" v="1 per IP per item per 24 hours" /><Val t="Article review target" v="3 working days" /><Val t="Reviewer response window" v="3 days to accept" /><Val t="Review due after acceptance" v="21 days" /><Val t="Invitation link expiry" v="72 hours" /><Val t="Minimum article length" v="400 words" />
            <Toggle t="Allow comments on published articles" d="Editors only, not public comments" on={false} />
          </Card></div>
          <div id="integrations" className="scroll-mt-24"><Card title="Integrations"><ul className="grid sm:grid-cols-2 gap-3">{[["Analytics", "Property G-PSF2026", "Connected"], ["YouTube", "Channel feed for Videos page", "Connected"], ["Cloudflare Turnstile", "Site key ending 9f2a", "Connected"], ["Newsletter provider", "Not set up", "Not connected"]].map(([a, b, c]) => <li key={a} className="rounded-2xl ring-1 ring-line p-4"><div className="flex items-center justify-between gap-2"><p className="font-semibold">{a}</p><Status s={c} /></div><p className="text-[13px] text-ink-500 mt-1">{b}</p></li>)}</ul></Card></div>
          <div id="maintenance" className="scroll-mt-24"><section className="rounded-[22px] bg-white shadow-soft p-5 sm:p-6 ring-1 ring-danger-50">
            <h2 className="font-semibold text-[16.5px]">Maintenance mode</h2><p className="mt-1 text-[14px] text-ink-600">Shows the maintenance page to all visitors. Signed-in staff can still use the dashboard.</p>
            <Dialog triggerClass={btn("danger", "md", "mt-4 rounded-full")} trigger={<><Construction className="size-4" />Turn on maintenance mode</>} title="Turn on maintenance mode?" desc="Every public page shows the maintenance page until you turn it off." confirm={{ label: "Turn on", tone: "danger", toast: "Maintenance mode is on" }} href="/error/maintenance" />
          </section></div>
        </div>
      </div>
    </DashShell>
  );
}
