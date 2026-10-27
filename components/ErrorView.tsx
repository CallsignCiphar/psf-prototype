import Link from "next/link";
import { ArrowLeft, Compass, Home, RefreshCw, Search, ServerCrash, Archive, Wrench } from "lucide-react";
import { btn } from "./ui";

export const ERRORS: Record<string, { icon: typeof Compass; code: string; title: string; body: string; primary: [string, string]; secondary?: [string, string] }> = {
  "404": { icon: Compass, code: "404", title: "We can't find that page", body: "The link may be broken or the page may have moved. Try searching, or start from the homepage.", primary: ["Go to homepage", "/"], secondary: ["Search the site", "/search"] },
  "410": { icon: Archive, code: "410", title: "This content has been removed", body: "The page you are looking for was withdrawn and is no longer available. Our corrections log explains significant removals.", primary: ["View corrections log", "/corrections"], secondary: ["Go to homepage", "/"] },
  "500": { icon: ServerCrash, code: "500", title: "Something went wrong on our side", body: "We have been alerted and are looking into it. Please try again in a few minutes.", primary: ["Try again", "/"], secondary: ["Contact us", "/contact"] },
  maintenance: { icon: Wrench, code: "Maintenance", title: "We'll be back shortly", body: "Pakistan Strategic Forum is undergoing scheduled maintenance. Thank you for your patience.", primary: ["Follow us on X for updates", "#"] },
};

export function ErrorView({ code }: { code: string }) {
  const e = ERRORS[code] ?? ERRORS["404"];
  const I = e.icon;
  return (
    <section className="container-site py-14 sm:py-24">
      <div className="relative max-w-3xl mx-auto rounded-[32px] bg-white shadow-soft overflow-hidden">
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-mint-100" aria-hidden />
        <div className="absolute -bottom-28 -left-16 size-64 rounded-full bg-brand-50" aria-hidden />
        <div className="relative p-8 sm:p-14 text-center">
          <span className="mx-auto size-16 rounded-3xl bg-brand-800 text-white grid place-items-center shadow-lift"><I className="size-8" /></span>
          <p className="mt-6 font-serif text-[56px] sm:text-[80px] leading-none font-semibold text-brand-800 tabular-nums">{e.code}</p>
          <h1 className="mt-4 font-serif text-[28px] sm:text-[36px] font-semibold">{e.title}</h1>
          <p className="mt-3 text-[17px] text-ink-600 max-w-lg mx-auto">{e.body}</p>
          {code === "404" && (
            <form action="/search" className="mt-8 relative max-w-md mx-auto">
              <Search className="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input name="q" aria-label="Search" placeholder="Search the site" className="w-full h-14 pl-12 pr-4 rounded-2xl bg-canvas ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400" />
            </form>
          )}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href={e.primary[1]} className={btn("primary", "lg", "rounded-full")}>{code === "500" ? <RefreshCw className="size-4" /> : code === "404" ? <Home className="size-4" /> : null}{e.primary[0]}</Link>
            {e.secondary && <Link href={e.secondary[1]} className={btn("secondary", "lg", "rounded-full")}><ArrowLeft className="size-4" />{e.secondary[0]}</Link>}
          </div>
          {code !== "maintenance" && (
            <div className="mt-10 pt-8 border-t border-line">
              <p className="text-sm text-ink-500">Popular right now</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {[["Newsroom", "/newsroom"], ["Global Watch", "/global-watch"], ["Reports", "/reports"], ["Research", "/research"], ["Defence", "/topics/defence"]].map(([l, h]) => <Link key={h} href={h} className="h-10 px-4 rounded-full bg-canvas text-sm font-semibold text-ink-700 grid place-items-center hover:bg-mint-100 hover:text-brand-800">{l}</Link>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
