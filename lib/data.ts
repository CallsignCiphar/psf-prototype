// Sample content for the prototype. Every item here maps to an existing backend entity
// (articles, newsroom posts, reports, research papers, videos, authors, taxonomy).

export const SITE = {
  name: "Pakistan Strategic Forum",
  tagline: "Independent analysis of the forces shaping Pakistan's security and the region around it.",
  adsEnabled: true,
  globalWatchCount: 212,
  social: [
    { key: "x", label: "X", handle: "@StrategicForumPK", href: "#" },
    { key: "facebook", label: "Facebook", handle: "Pakistan Strategic Forum", href: "#" },
    { key: "instagram", label: "Instagram", handle: "@strategicforum.pk", href: "#" },
    { key: "youtube", label: "YouTube", handle: "Pakistan Strategic Forum", href: "#" },
  ],
};

export type Topic = { slug: string; name: string; icon: string; count: number; blurb: string; subs: { slug: string; name: string }[] };

export const TOPICS: Topic[] = [
  { slug: "defence", name: "Defence", icon: "shield", count: 142, blurb: "Forces, doctrine and capability across land, air and sea.", subs: [
    { slug: "land", name: "Land" }, { slug: "air", name: "Air" }, { slug: "sea", name: "Sea" }, { slug: "strategic-systems", name: "Strategic Systems" } ] },
  { slug: "geopolitics", name: "Geopolitics", icon: "globe", count: 118, blurb: "Pakistan's neighbourhood and the powers that shape it.", subs: [
    { slug: "south-asia", name: "South Asia" }, { slug: "afghanistan", name: "Afghanistan" }, { slug: "americas", name: "Americas" }, { slug: "middle-east", name: "Middle East" } ] },
  { slug: "national-affairs", name: "National Affairs", icon: "landmark", count: 87, blurb: "Security, the economy and policy at home.", subs: [
    { slug: "security", name: "Security" }, { slug: "economy", name: "Economy" }, { slug: "policy", name: "Policy" } ] },
  { slug: "history", name: "History", icon: "book-open", count: 54, blurb: "The battles, operations and people behind today's choices.", subs: [
    { slug: "battles-operations", name: "Battles & Operations" }, { slug: "profiles", name: "Profiles" } ] },
];

export type Author = { slug: string; name: string; role: string; initials: string; articles: number };
export const AUTHORS: Author[] = [
  { slug: "ayesha-rahman", name: "Ayesha Rahman", role: "Senior Fellow, Air Power", initials: "AR", articles: 38 },
  { slug: "sara-haider", name: "Sara Haider", role: "Research Writer, Strategic Stability", initials: "SH", articles: 19 },
  { slug: "bilal-ahmed", name: "Bilal Ahmed", role: "Article Writer, Defence Economics", initials: "BA", articles: 27 },
  { slug: "imran-siddiqui", name: "Dr Imran Siddiqui", role: "Approver, National Defence University", initials: "IS", articles: 6 },
  { slug: "rehan-khan", name: "Rehan Khan", role: "Article Writer, Afghanistan", initials: "RK", articles: 8 },
  { slug: "hina-shah", name: "Hina Shah", role: "Editor", initials: "HS", articles: 12 },
];

export type Article = {
  slug: string; title: string; standfirst: string; label: "Analysis" | "Explainer" | "Opinion" | "Interview" | "Archive";
  topic: string; sub: string; author: string; date: string; read: number; art: number; place?: string;
};

export const ARTICLES: Article[] = [
  { slug: "air-defence-in-depth", title: "Air defence in depth: how Pakistan is layering its western approaches", standfirst: "Radar coverage, interceptor basing and ground-based systems are being stitched into one picture. The gaps that remain are mostly about time.", label: "Analysis", topic: "defence", sub: "air", author: "ayesha-rahman", date: "16 Oct 2026", read: 9, art: 1, place: "Khyber Pakhtunkhwa" },
  { slug: "recruitment-pipeline", title: "Inside the recruitment pipeline: how militant networks target teenagers in the tribal districts", standfirst: "Interviews with families and local officials show recruitment now starts online and ends in person.", label: "Analysis", topic: "national-affairs", sub: "security", author: "rehan-khan", date: "15 Oct 2026", read: 11, art: 2, place: "Bajaur" },
  { slug: "hangor-arabian-sea", title: "What the Hangor programme means for the Arabian Sea balance", standfirst: "Eight boats change the arithmetic of sea denial off Makran. They do not change it on their own.", label: "Analysis", topic: "defence", sub: "sea", author: "bilal-ahmed", date: "14 Oct 2026", read: 8, art: 3, place: "Arabian Sea" },
  { slug: "border-management-kabul", title: "Border management with Kabul needs a political track, not only fencing", standfirst: "The fence has cut crossings. It has not cut the grievances that move people across it.", label: "Opinion", topic: "geopolitics", sub: "afghanistan", author: "rehan-khan", date: "13 Oct 2026", read: 6, art: 4, place: "Torkham" },
  { slug: "aziz-bhatti-brb", title: "Major Aziz Bhatti and the defence of the BRB canal, 1965", standfirst: "Six days on the canal line, and what the battle still teaches about holding ground.", label: "Archive", topic: "history", sub: "battles-operations", author: "hina-shah", date: "12 Oct 2026", read: 12, art: 5, place: "Lahore" },
  { slug: "armour-eastern-front", title: "Why armour still matters on the eastern front, and where it does not", standfirst: "Drones have changed the open ground. The canal belt and the desert are different stories.", label: "Analysis", topic: "defence", sub: "land", author: "ayesha-rahman", date: "11 Oct 2026", read: 10, art: 6 },
  { slug: "reading-defence-budget", title: "Reading the defence budget: what the headline number leaves out", standfirst: "Pensions, procurement and the off-budget lines that make comparisons misleading.", label: "Explainer", topic: "national-affairs", sub: "economy", author: "bilal-ahmed", date: "10 Oct 2026", read: 7, art: 7 },
  { slug: "gulf-wants-predictability", title: "\"The Gulf wants predictability\": a former envoy on Riyadh and Islamabad", standfirst: "On remittances, labour and the security guarantees nobody writes down.", label: "Interview", topic: "geopolitics", sub: "middle-east", author: "hina-shah", date: "9 Oct 2026", read: 14, art: 8 },
  { slug: "deepfakes-in-a-crisis", title: "Deepfakes in a crisis: verification before escalation", standfirst: "A fake video during a standoff could move faster than any hotline. What a verification protocol would need.", label: "Analysis", topic: "defence", sub: "strategic-systems", author: "sara-haider", date: "8 Oct 2026", read: 9, art: 9 },
  { slug: "full-spectrum-deterrence", title: "Full spectrum deterrence, ten years on", standfirst: "What the doctrine promised, what it delivered and the questions it now faces.", label: "Analysis", topic: "defence", sub: "strategic-systems", author: "sara-haider", date: "7 Oct 2026", read: 13, art: 10 },
  { slug: "kabul-economic-diplomacy", title: "Kabul's new economic diplomacy and what it asks of Islamabad", standfirst: "Transit, minerals and a Central Asian pivot that runs through Pakistan or around it.", label: "Analysis", topic: "geopolitics", sub: "afghanistan", author: "rehan-khan", date: "6 Oct 2026", read: 8, art: 11 },
  { slug: "indus-waters-legal-options", title: "Indus waters after suspension: the legal options", standfirst: "Arbitration, the neutral expert and the World Bank's role, explained.", label: "Explainer", topic: "geopolitics", sub: "south-asia", author: "sara-haider", date: "5 Oct 2026", read: 10, art: 12 },
  { slug: "iran-border-provinces", title: "Iran's border provinces and the security dilemma", standfirst: "Sistan-Baluchestan and Balochistan share more than a border. They share a problem.", label: "Analysis", topic: "geopolitics", sub: "middle-east", author: "bilal-ahmed", date: "4 Oct 2026", read: 9, art: 13 },
  { slug: "operation-gibraltar", title: "Operation Gibraltar, sixty-one years later", standfirst: "The plan, the assumptions and the war that followed, from the archive.", label: "Archive", topic: "history", sub: "battles-operations", author: "hina-shah", date: "5 Aug 2026", read: 15, art: 14 },
];

export type NewsItem = { id: string; time: string; region: string; title: string; breaking?: boolean; type: "Press release" | "Update" | "Event" | "Announcement" };
export const NEWS: NewsItem[] = [
  { id: "n1", time: "14:30 PKT", region: "South Asia, Pakistan", title: "ISPR confirms security operation under way in North Waziristan district", breaking: true, type: "Update" },
  { id: "n2", time: "13:05 PKT", region: "Middle East, Iran", title: "Tehran and Islamabad agree on a joint border commission meeting next month", type: "Update" },
  { id: "n3", time: "11:40 PKT", region: "South Asia, Afghanistan", title: "Torkham crossing reopens to cargo traffic after three-day closure", type: "Update" },
  { id: "n4", time: "09:15 PKT", region: "East Asia, China", title: "Second Hangor-class submarine begins sea trials, officials say", type: "Update" },
  { id: "n5", time: "15 Oct, 22:50 PKT", region: "Americas, United States", title: "US State Department approves sustainment package for regional partners", type: "Update" },
  { id: "n6", time: "15 Oct, 18:00 PKT", region: "Islamabad", title: "Forum hosts the 2026 Islamabad Security Dialogue on 20 October", type: "Event" },
];

export type Report = { slug: string; title: string; category: string; date: string; pages: number; summary: string; art: number };
export const REPORT_CATEGORIES = ["Annual Outlook", "Conference", "Policy brief", "Roundtable", "Seminar"];
export const REPORTS: Report[] = [
  { slug: "annual-outlook-2027", title: "Annual Outlook 2027: the South Asia security environment", category: "Annual Outlook", date: "1 Oct 2026", pages: 64, summary: "Our yearly assessment of the risks, trends and choices facing Pakistan and its neighbours.", art: 21 },
  { slug: "future-warfare-readout", title: "Future warfare conference readout", category: "Conference", date: "28 Apr 2026", pages: 32, summary: "Two days of panels on drones, electronic warfare and the changing infantry battle.", art: 22 },
  { slug: "nuclear-risk-reduction", title: "Policy brief: nuclear risk reduction measures", category: "Policy brief", date: "3 Mar 2026", pages: 12, summary: "Five measures both sides could adopt without a treaty.", art: 23 },
  { slug: "climate-finance-seminar", title: "Seminar on climate finance for South Asia", category: "Seminar", date: "2 Oct 2026", pages: 24, summary: "What South Asian states can realistically raise, and from whom.", art: 24 },
];

export type Paper = { slug: string; title: string; authors: string; category: string; date: string; ref: string; abstract: string; pages: number };
export const RESEARCH: Paper[] = [
  { slug: "deterrence-hypersonics", title: "Deterrence stability and hypersonic delivery systems in South Asia", authors: "Sara Haider, Dr Imran Siddiqui", category: "Strategic Stability", date: "16 Oct 2026", ref: "PSF.R.2026.017", abstract: "Compressed decision times raise the premium on early warning and on clear signalling. We model three crisis scenarios.", pages: 38 },
  { slug: "indus-basin-security", title: "Water and security in the Indus basin: options after treaty suspension", authors: "Dr Ayesha Malik", category: "Climate and Resource Security", date: "2 Sep 2026", ref: "PSF.R.2026.014", abstract: "A legal and hydrological review of the options open to Pakistan, with costs and timelines for each.", pages: 44 },
  { slug: "civil-military-flood-relief", title: "Civil-military coordination in flood relief, 2010 to 2022", authors: "Sara Haider", category: "Human Security", date: "18 Jul 2026", ref: "PSF.R.2026.011", abstract: "Three disaster responses show the army arrives fastest. Whether relief lasts depends on the civilian handover.", pages: 29 },
];

export const VIDEOS = [
  { id: "v1", title: "Air defence in depth, explained in 6 minutes", length: "6:12", date: "16 Oct 2026", art: 31 },
  { id: "v2", title: "Islamabad Security Dialogue 2026: opening panel", length: "48:30", date: "10 Oct 2026", art: 32 },
  { id: "v3", title: "The Hangor submarine programme in context", length: "9:45", date: "3 Oct 2026", art: 33 },
  { id: "v4", title: "Reading the defence budget with Bilal Ahmed", length: "12:08", date: "26 Sep 2026", art: 34 },
];

export const MOST_READ = ["reading-defence-budget", "air-defence-in-depth", "indus-waters-legal-options", "recruitment-pipeline", "full-spectrum-deterrence"];

export const HOTSPOTS = [
  { name: "North Waziristan", level: "Elevated", note: "Security operation under way" },
  { name: "Red Sea", level: "Crisis", note: "Shipping attacks continue" },
  { name: "Torkham", level: "Watch", note: "Cargo traffic resumes" },
  { name: "Sistan-Baluchestan", level: "Elevated", note: "Border commission planned" },
];

export const topicBySlug = (s: string) => TOPICS.find((t) => t.slug === s)!;
export const authorBySlug = (s: string) => AUTHORS.find((a) => a.slug === s)!;
export const articleBySlug = (s: string) => ARTICLES.find((a) => a.slug === s)!;
export const subName = (topic: string, sub: string) => topicBySlug(topic).subs.find((x) => x.slug === sub)?.name ?? sub;
