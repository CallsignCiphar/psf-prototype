import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, Lock, Send } from "lucide-react";
import { AuthCard, AuthShell, AuthTitle, Stepper } from "@/components/auth/AuthShell";
import { CountedArea, LinkList, NavForm } from "@/components/auth/widgets";
import { TRACK_LABEL, trackOf, trackStates } from "@/components/auth/trackHelpers";
import { Field, FileDrop, Segmented, TextArea, TextInput } from "@/components/form";
import { Avatar, btn } from "@/components/ui";

export const metadata: Metadata = { title: "About you" };

function Who({ name, email, initials }: { name: string; email: string; initials: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-canvas p-3 pr-4 mb-7">
      <Avatar initials={initials} size={44} />
      <div className="min-w-0 flex-1"><p className="font-semibold truncate">{name}</p><p className="text-sm text-ink-500 truncate">{email}</p></div>
      <span className="h-7 px-2.5 rounded-full bg-mint-100 text-brand-800 text-xs font-semibold inline-flex items-center gap-1"><BadgeCheck className="size-3.5" />Verified</span>
    </div>
  );
}
function Locked({ id, label, value }: { id: string; label: string; value: string }) {
  return <Field label={label} required htmlFor={id} hint={<span className="inline-flex items-center gap-1"><Lock className="size-3.5" />From step 1, locked</span>}><TextInput id={id} readOnly value={value} /></Field>;
}

export default async function Profile({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  const t = trackOf((await searchParams).track);
  const Actions = (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-line">
      <Link href={`/join/verify-email?track=${t}`} className={btn("ghost", "lg", "rounded-full")}><ArrowLeft className="size-4" />Back</Link>
      <button className={btn("primary", "lg", "rounded-full sm:px-8")}><Send className="size-4" />Submit application</button>
    </div>
  );
  return (
    <AuthShell aside={t === "research" ? "research" : "join"} wide states={trackStates("/join/profile", t)}>
      <Stepper current={2} />
      <AuthCard>
        {t === "article" ? (
          <>
            <Who name="Bilal Ahmed" email="bilal.ahmed@example.com" initials="BA" />
            <AuthTitle eyebrow={TRACK_LABEL.article} title="About you" desc="Help our editors understand your background and what you want to write." />
            <NavForm to="/join/submitted?track=article" className="space-y-6">
              <CountedArea id="a2-about" label="Tell us about yourself and your writing" required min={100} max={1500} rows={6} hint="Your background, what you want to write about for Pakistan Strategic Forum, and why." />
              <LinkList label="Link to a previous publication" />
              <Field label="Writing sample"><FileDrop label="Drop a file or browse" hint="PDF or DOCX, max 5MB." accept=".pdf,.docx" /></Field>
              <Field label="Social or professional profile" htmlFor="a2-prof"><TextInput id="a2-prof" type="url" placeholder="LinkedIn, X or personal site" /></Field>
              {Actions}
            </NavForm>
          </>
        ) : (
          <>
            <Who name="Sara Haider" email="sara.haider@qau.edu.pk" initials="SH" />
            <AuthTitle eyebrow={TRACK_LABEL.research} title="Your research profile" desc="We use this to verify your academic standing and match you with the right editors." />
            <NavForm to="/join/submitted?track=research" className="space-y-8">
              <fieldset className="space-y-5">
                <legend className="text-[13px] font-semibold uppercase tracking-wider text-ink-500 mb-4">Institution</legend>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Locked id="r2-inst" label="Institution / University" value="Quaid-i-Azam University" />
                  <Locked id="r2-des" label="Designation" value="MPhil candidate" />
                  <Field label="Department / Faculty" htmlFor="r2-dep"><TextInput id="r2-dep" /></Field>
                  <Field label="Programme / Degree" required htmlFor="r2-prog"><TextInput id="r2-prog" required placeholder="For example, MPhil Defence and Strategic Studies" /></Field>
                </div>
                <Field label="Graduation status" required><Segmented name="gs" options={["Currently enrolled", "Graduated", "Not applicable (faculty / professional)"]} /></Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Expected graduation year" required htmlFor="r2-yr"><TextInput id="r2-yr" required inputMode="numeric" placeholder="2027" /></Field>
                  <Field label="Registration / roll number" required htmlFor="r2-reg"><TextInput id="r2-reg" required /></Field>
                </div>
                <Field label="Student or institutional ID card" hint="Optional. Uploading your ID helps us verify your identity faster. It is stored privately and deleted after review."><FileDrop label="Front side" hint="JPG, PNG or PDF, max 5MB." accept=".jpg,.jpeg,.png,.pdf" /></Field>
              </fieldset>
              <fieldset className="space-y-5 pt-6 border-t border-line">
                <legend className="text-[13px] font-semibold uppercase tracking-wider text-ink-500 mb-4">Research</legend>
                <Field label="ORCID iD" htmlFor="r2-orcid" hint={<span className="inline-flex items-center gap-1 text-brand-700 font-semibold"><BadgeCheck className="size-3.5" />Valid ORCID iD</span>}><TextInput id="r2-orcid" defaultValue="0000-0002-1825-0097" /></Field>
                <LinkList label="Google Scholar, LinkedIn or profile URL" />
                <CountedArea id="r2-int" label="Research interests" required min={50} max={1000} rows={4} />
                <CountedArea id="r2-why" label="Why do you want to register with Pakistan Strategic Forum?" required min={50} max={1000} rows={4} />
                <Field label="Previous publications" htmlFor="r2-pub" hint="Citations or links, up to 2000 characters"><TextArea id="r2-pub" rows={4} maxLength={2000} /></Field>
              </fieldset>
              {Actions}
            </NavForm>
          </>
        )}
      </AuthCard>
    </AuthShell>
  );
}
