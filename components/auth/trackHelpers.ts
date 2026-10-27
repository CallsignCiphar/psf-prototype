export type Track = "article" | "research";
export const trackOf = (t?: string): Track => (t === "article" ? "article" : "research");
export const TRACK_LABEL: Record<Track, string> = { article: "Article Writer application", research: "Research Writer application" };
export const trackStates = (base: string, t: Track, extra?: string) => [
  { label: "research track", href: `${base}?track=research${extra ?? ""}`, active: t === "research" },
  { label: "article track", href: `${base}?track=article${extra ?? ""}`, active: t === "article" },
];
