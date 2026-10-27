import { REPORT_CATEGORIES, TOPICS } from "./data";

export type NavLink = { label: string; href: string; desc?: string };
export type NavItem = {
  key: string; label: string; href: string; dot?: boolean;
  columns?: { title: string; href: string; links: NavLink[] }[];
  feature?: { eyebrow: string; title: string; href: string; art: number };
  quick?: NavLink[];
};

export const NAV: NavItem[] = [
  {
    key: "topics", label: "Topics", href: "/topics",
    columns: TOPICS.map((t) => ({ title: t.name, href: `/topics/${t.slug}`, links: t.subs.map((s) => ({ label: s.name, href: `/topics/${t.slug}/${s.slug}` })) })),
    feature: { eyebrow: "Featured analysis", title: "Air defence in depth: how Pakistan is layering its western approaches", href: "/articles/air-defence-in-depth", art: 1 },
  },
  {
    key: "reports", label: "Reports", href: "/reports",
    columns: [{ title: "By category", href: "/reports", links: REPORT_CATEGORIES.map((c) => ({ label: c, href: `/reports/category/${c.toLowerCase().replace(/ /g, "-")}` })) }],
    quick: [{ label: "All reports", href: "/reports", desc: "Conference readouts, briefs and the Annual Outlook" }, { label: "Annual Outlook 2027", href: "/reports/annual-outlook-2027", desc: "Our yearly security assessment" }],
    feature: { eyebrow: "New report", title: "Annual Outlook 2027: the South Asia security environment", href: "/reports/annual-outlook-2027", art: 21 },
  },
  {
    key: "research", label: "Research", href: "/research",
    quick: [
      { label: "Research hub", href: "/research", desc: "Peer-reviewed papers and policy research" },
      { label: "All research", href: "/research/all", desc: "Browse and filter every published paper" },
      { label: "Submit a paper", href: "/research/submit", desc: "Double-blind peer review" },
      { label: "How peer review works", href: "/policies/peer-review", desc: "Our review standards, step by step" },
    ],
    feature: { eyebrow: "Latest paper", title: "Deterrence stability and hypersonic delivery systems in South Asia", href: "/research/deterrence-hypersonics", art: 17 },
  },
  { key: "globalwatch", label: "Global Watch", href: "/global-watch" },
  { key: "newsroom", label: "Newsroom", href: "/newsroom", dot: true },
  {
    key: "about", label: "About", href: "/about",
    quick: [
      { label: "About us", href: "/about", desc: "Who we are and how we work" },
      { label: "Where we are", href: "/where-we-are", desc: "Our office and how to reach it" },
      { label: "Publish with us", href: "/publish-with-us", desc: "Write articles or submit research" },
      { label: "Contact", href: "/contact", desc: "General, editorial and media enquiries" },
      { label: "Advertise", href: "/advertise", desc: "Placements and audience" },
    ],
  },
];
