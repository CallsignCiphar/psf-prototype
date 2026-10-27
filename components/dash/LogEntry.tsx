import { Copy } from "lucide-react";
import { Dialog } from "./interactive";
import { KV, Tag } from "./kit";

export function LogEntry({ action, time, by, target, ip }: { action: string; time: string; by: string; target: string; ip: string }) {
  return (
    <Dialog side triggerClass="text-left font-mono text-[12.5px] font-semibold text-brand-800 hover:underline" trigger={action} title={action} desc="Logged automatically" cancel="Close">
      <KV items={[["Time", `${time} PKT`], ["By", by], ["Target", target], ["IP", ip], ["Device", "Chrome on macOS"]]} />
      <div><p className="text-sm font-semibold mb-2">Change</p><pre className="rounded-2xl bg-brand-950 text-mint-200 p-4 text-[12.5px] overflow-x-auto">{`roles:\n  before: []\n  after:  ["Approver"]\nreason: "Invited reviewer"`}</pre></div>
      <button type="button" className="h-10 px-4 rounded-full ring-1 ring-line font-semibold text-[14px] inline-flex items-center gap-2"><Copy className="size-4" />Copy JSON</button>
      <Tag>Read-only</Tag>
    </Dialog>
  );
}
