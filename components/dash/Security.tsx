import { Copy, Download, KeyRound, LogOut, Mail, MonitorSmartphone, RefreshCw, ShieldCheck, Smartphone } from "lucide-react";
import { Card, Status } from "./kit";
import { ActionButton, Dialog } from "./interactive";
import { Field, PasswordInput, TextInput } from "@/components/form";
import { NewPassword } from "@/components/auth/widgets";
import { btn } from "@/components/ui";

const CODES = ["7GQK-2M4P", "Z9XR-81TD", "4HNC-6WBA", "P3VE-0LQS", "K8DF-5JRM", "T2YU-9ZXC", "B6QW-3NHE", "R1PL-7GKV"];

function Row({ icon: I, title, sub, children }: { icon: typeof Mail; title: string; sub: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-4 border-b border-line last:border-0">
      <div className="flex items-start gap-3.5 flex-1 min-w-0"><span className="size-10 rounded-xl bg-mint-100 text-brand-800 grid place-items-center shrink-0"><I className="size-5" /></span><div className="min-w-0"><p className="font-semibold">{title}</p><p className="text-[13.5px] text-ink-500 break-words">{sub}</p></div></div>
      {children && <div className="flex flex-wrap gap-2 sm:justify-end pl-[54px] sm:pl-0">{children}</div>}
    </div>
  );
}

export function SignInSecurity({ email, changed, twofa, sessions }: { email: string; changed: string; twofa: string; sessions: [string, string, string, boolean?][] }) {
  return (
    <>
      <Card title="Sign-in and security">
        <Row icon={Mail} title="Email" sub={<>{email} · verified</>}>
          <Dialog triggerClass={btn("secondary", "sm", "rounded-full")} trigger="Change" title="Change email" confirm={{ label: "Send code", toast: "Code sent to the new address" }}>
            <Field label="New email" required htmlFor="m-ne"><TextInput id="m-ne" type="email" required /></Field>
            <Field label="Current password" required htmlFor="m-cp"><PasswordInput id="m-cp" required /></Field>
            <p className="text-[14px] text-ink-600">We send a code to the new address. Your email does not change until you enter it.</p>
          </Dialog>
        </Row>
        <Row icon={KeyRound} title="Password" sub={`Last changed ${changed}`}>
          <Dialog triggerClass={btn("secondary", "sm", "rounded-full")} trigger="Change password" title="Change password" confirm={{ label: "Change password", toast: "Password changed" }}>
            <Field label="Current password" required htmlFor="m-p0"><PasswordInput id="m-p0" required /></Field>
            <NewPassword idPrefix="m-p" label="New password" confirmLabel="Confirm new password" />
          </Dialog>
        </Row>
        <Row icon={ShieldCheck} title="Two-factor authentication" sub={twofa}>
          <Status s="On" />
          <Dialog triggerClass={btn("secondary", "sm", "rounded-full")} trigger="View backup codes" title="Backup codes" desc="Each code works once. 8 of 10 left." cancel="Close">
            <ul className="grid grid-cols-2 gap-2">{CODES.map((c) => <li key={c} className="h-11 rounded-xl bg-canvas grid place-items-center font-mono font-semibold">{c}</li>)}</ul>
            <div className="flex flex-wrap gap-2"><ActionButton msg="New codes generated" className={btn("secondary", "sm", "rounded-full")}><RefreshCw className="size-4" />Generate new codes</ActionButton><ActionButton msg="Copied" className={btn("secondary", "sm", "rounded-full")}><Copy className="size-4" />Copy</ActionButton><ActionButton msg="Downloaded" className={btn("secondary", "sm", "rounded-full")}><Download className="size-4" />Download</ActionButton></div>
          </Dialog>
          <Dialog triggerClass={btn("ghost", "sm", "rounded-full")} trigger={<><Smartphone className="size-4" />Reset app</>} title="Reset your authenticator app?" desc="Your current app and backup codes stop working. You will scan a new QR code straight away." confirm={{ label: "Reset app", tone: "danger", toast: "Scan the new code to finish" }} href="/set-password?step=twofa" />
        </Row>
      </Card>
      <Card title="Active sessions" action={
        <Dialog triggerClass="text-[14px] font-semibold text-danger-700 inline-flex items-center gap-1.5" trigger={<><LogOut className="size-4" /><span className="hidden sm:inline">Sign out all other sessions</span><span className="sm:hidden">Sign out others</span></>} title="Sign out of all other sessions?" desc={`${sessions.length - 1} other devices will be signed out straight away. This device stays signed in.`} confirm={{ label: `Sign out ${sessions.length - 1} sessions`, tone: "danger", toast: "Other sessions signed out" }} />
      }>
        <ul className="divide-y divide-line">
          {sessions.map(([d, l, t, me]) => (
            <li key={d} className="flex items-center gap-3.5 py-3.5">
              <span className="size-10 rounded-xl bg-canvas grid place-items-center text-ink-600 shrink-0"><MonitorSmartphone className="size-5" /></span>
              <div className="flex-1 min-w-0"><p className="font-semibold text-[14.5px]">{d} {me && <span className="ml-1 h-6 px-2 rounded-full bg-mint-100 text-brand-800 text-[11.5px] font-semibold inline-grid place-items-center">This device</span>}</p><p className="text-[13px] text-ink-500">{l} · {t}</p></div>
              {!me && <ActionButton msg={`${d} signed out`} className="h-9 px-3.5 rounded-full ring-1 ring-line text-[13px] font-semibold hover:bg-canvas">Sign out</ActionButton>}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
