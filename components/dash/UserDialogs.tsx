import { Field, Segmented, TextArea } from "@/components/form";
import { Dialog } from "./interactive";

const ROLES = [["Article Writer", "Write analysis and commentary"], ["Research Writer", "Submit research papers"], ["Approver", "Peer review. Requires 2FA."], ["Expert", "Listed on the Experts page"], ["Editor", "Staff role"]];

export function ChangeRoles({ name, current, triggerClass, trigger }: { name: string; current: string[]; triggerClass: string; trigger: React.ReactNode }) {
  return (
    <Dialog triggerClass={triggerClass} trigger={trigger} title={`Roles for ${name}`} confirm={{ label: "Save roles", toast: "Roles saved and logged" }}>
      <ul className="space-y-2">{ROLES.map(([r, d]) => <li key={r}><label className="flex items-start gap-3 rounded-2xl ring-1 ring-line p-4 cursor-pointer has-[:checked]:ring-2 has-[:checked]:ring-brand-600 has-[:checked]:bg-mint-100/40"><input type="checkbox" defaultChecked={current.includes(r)} className="mt-0.5 size-5 accent-[#04411f]" /><span><span className="block font-semibold">{r}</span><span className="block text-[13px] text-ink-500">{d}</span></span></label></li>)}</ul>
    </Dialog>
  );
}

export function Deactivate({ name, triggerClass, trigger }: { name: string; triggerClass: string; trigger: React.ReactNode }) {
  return (
    <Dialog triggerClass={triggerClass} trigger={trigger} title={`Deactivate ${name}?`} desc="He is signed out and cannot sign in. His 22 live items stay published. You can reactivate him later." confirm={{ label: "Deactivate", tone: "danger", toast: `${name} deactivated` }}>
      <Field label="Reason" required hint="Logged, not sent" htmlFor="m-du"><TextArea id="m-du" rows={3} required /></Field>
    </Dialog>
  );
}

export function Ban({ name, triggerClass, trigger }: { name: string; triggerClass: string; trigger: React.ReactNode }) {
  return (
    <Dialog triggerClass={triggerClass} trigger={trigger} title={`Ban ${name}?`} desc="He is signed out, cannot sign in and cannot register again with this email. Choose what happens to his work." confirm={{ label: "Ban user", tone: "danger", toast: `${name} banned` }}>
      <Segmented name="bw" options={["Keep live items published", "Unpublish all his items"]} />
      <Field label="Reason" required htmlFor="m-bu"><TextArea id="m-bu" rows={3} required /></Field>
    </Dialog>
  );
}

export function Reset2FA({ name, triggerClass, trigger }: { name: string; triggerClass: string; trigger: React.ReactNode }) {
  return (
    <Dialog triggerClass={triggerClass} trigger={trigger} title={`Reset two-factor for ${name}?`} desc="Their authenticator and backup codes stop working. They must set up 2FA again at their next sign-in. Only do this after confirming their identity." confirm={{ label: "Reset 2FA", tone: "danger", toast: "Two-factor reset and logged" }}>
      <Field label="How was identity confirmed?" htmlFor="m-id"><select id="m-id" className="w-full h-12 px-4 rounded-xl ring-1 ring-line-strong bg-white"><option>Phone call to number on file</option><option>Video call</option><option>In person</option></select></Field>
    </Dialog>
  );
}

