import type { Metadata } from "next";
import { Info, LockKeyhole } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, IconBadge } from "@/components/auth/AuthShell";
import { NavForm, NewPassword } from "@/components/auth/widgets";
import { btn } from "@/components/ui";

export const metadata: Metadata = { title: "Choose a new password" };

export default function Reset() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthTitle icon={<IconBadge icon={LockKeyhole} />} title="Choose a new password" />
        <NavForm to="/sign-in" className="space-y-5">
          <NewPassword idPrefix="rp" label="New password" confirmLabel="Confirm new password" />
          <button className={btn("primary", "lg", "w-full rounded-full")}>Reset password</button>
          <p className="flex items-center gap-2 text-sm text-ink-500"><Info className="size-4" />Resetting signs you out of all other devices.</p>
        </NavForm>
      </AuthCard>
    </AuthShell>
  );
}
