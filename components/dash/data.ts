// Sample data for the portal and admin prototypes. Real values come from the existing back end.

export const days30 = Array.from({ length: 30 }, (_, i) => { const d = new Date(2026, 8, 17 + i); return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }); });
const wave = (base: number, amp: number, seed: number, trend = 0) => days30.map((_, i) => Math.round(base + amp * Math.sin(i / 2.2 + seed) + amp * 0.5 * Math.sin(i / 0.9 + seed * 2) + trend * i + (i % 7 === 5 || i % 7 === 6 ? -amp * 0.6 : 0)));
export const READS_30 = wave(78, 26, 1, 0.9);
export const VISITORS_30 = wave(2600, 650, 2, 18);
export const PAGEVIEWS_30 = wave(7600, 1600, 2.3, 50);
export const IMPRESSIONS_16 = Array.from({ length: 16 }, (_, i) => Math.round(8400 + 1900 * Math.sin(i / 1.6) + 120 * i));
export const days16 = Array.from({ length: 16 }, (_, i) => `${i + 1} Oct`);
export const HEAT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((_, d) => Array.from({ length: 24 }, (_, h) => Math.round(Math.max(4, (h >= 7 && h <= 23 ? 60 + 50 * Math.sin((h - 7) / 5) : 12) * (d >= 5 ? 0.7 : 1) + ((h * 7 + d * 13) % 17)))));

export type MyItem = { slug: string; title: string; sub: string; status: string; topic: string; updated: string; reads: string; action?: string };
export const MY_ARTICLES: MyItem[] = [
  { slug: "flood-relief", title: "Civil-military coordination in flood relief, 2010 to 2022", sub: "Analysis", status: "Changes requested", topic: "National Affairs", updated: "15 Oct 2026", reads: "Not live", action: "Edit" },
  { slug: "water-security", title: "Water security and the Indus Waters Treaty", sub: "Analysis", status: "Pending review", topic: "Climate and Environment", updated: "12 Oct 2026", reads: "Not live" },
  { slug: "maritime-doctrine", title: "Maritime doctrine after the 2025 naval review", sub: "Commentary", status: "Pending review", topic: "Defence and Security", updated: "9 Oct 2026", reads: "Not live" },
  { slug: "cpec-premium", title: "The CPEC security premium", sub: "Draft", status: "Draft", topic: "Economy", updated: "3 Oct 2026", reads: "Not live", action: "Edit" },
  { slug: "untitled", title: "Untitled draft", sub: "Draft", status: "Draft", topic: "Not set", updated: "28 Sep 2026", reads: "Not live", action: "Edit" },
  { slug: "signalling-through-tests", title: "Signalling through tests", sub: "Published 2 Sep 2026", status: "Live", topic: "Strategic Stability", updated: "2 Sep 2026", reads: "3,880" },
  { slug: "crisis-hotlines", title: "Crisis hotlines in South Asia", sub: "Published 18 Aug 2026", status: "Live", topic: "International Affairs", updated: "18 Aug 2026", reads: "2,615" },
  { slug: "missile-tests-media", title: "Missile tests and the media cycle", sub: "Published 30 Jul 2026", status: "Live", topic: "Strategic Stability", updated: "30 Jul 2026", reads: "1,940" },
  { slug: "afghan-transit", title: "Afghan transit trade after the border closures", sub: "Published 11 Jul 2026", status: "Live", topic: "Economy", updated: "11 Jul 2026", reads: "1,288" },
  { slug: "drones-loc", title: "Drones on the Line of Control", sub: "Published 24 Jun 2026", status: "Live", topic: "Defence and Security", updated: "24 Jun 2026", reads: "1,105" },
];
export const MY_REPORTS: MyItem[] = [
  { slug: "roundtable-afghanistan", title: "Roundtable: Afghanistan after the transition", sub: "Roundtable · draft", status: "Draft", topic: "Roundtable", updated: "14 Oct 2026", reads: "Not live", action: "Edit" },
  { slug: "climate-finance-seminar", title: "Seminar on climate finance for South Asia", sub: "Seminar", status: "Pending review", topic: "Seminar", updated: "8 Oct 2026", reads: "Not live" },
  { slug: "future-warfare-readout", title: "Future warfare conference readout", sub: "Published 28 Apr 2026", status: "Live", topic: "Conference", updated: "28 Apr 2026", reads: "1,522" },
  { slug: "nuclear-risk-reduction", title: "Policy brief: nuclear risk reduction measures", sub: "Published 3 Mar 2026", status: "Live", topic: "Policy brief", updated: "3 Mar 2026", reads: "988" },
  { slug: "youth-dialogue", title: "Youth dialogue on national security", sub: "Published 19 Jan 2026", status: "Live", topic: "Dialogue", updated: "19 Jan 2026", reads: "640" },
];
export const MY_RESEARCH = [
  { id: "Draft", title: "Groundwater depletion in the Lower Indus", sub: "Step 2 of 3 complete", stage: "Draft", round: "", updated: "14 Oct 2026", action: "Continue", href: "/portal/research/new?step=2" },
  { id: "RES-2026-00041", title: "Civil defence planning in Karachi", sub: "Revised manuscript due 30 Oct 2026", stage: "Revisions requested", round: "1", updated: "11 Oct 2026", action: "Respond", href: "/portal/research/RES-2026-00041" },
  { id: "RES-2026-00052", title: "Arms control lessons from the INF collapse", sub: "Submitted 16 Oct 2026", stage: "Under review", round: "1", updated: "16 Oct 2026", href: "/portal/research/RES-2026-00041?stage=review" },
  { id: "RES-2026-00017", title: "Deterrence stability and hypersonics", sub: "Published 16 Oct 2026", stage: "Published", round: "2", updated: "16 Oct 2026", href: "/portal/research/RES-2026-00041?stage=published" },
  { id: "RES-2025-00088", title: "Strategic culture in Pakistani military writing", sub: "Published 2 Dec 2025", stage: "Published", round: "1", updated: "2 Dec 2025", href: "/portal/research/RES-2026-00041?stage=published" },
];

export const USERS = [
  { slug: "sara-haider", i: "SH", name: "Sara Haider", email: "sara.haider@qau.edu.pk", roles: ["Research Writer", "Article Writer", "Approver"], status: "Active", joined: "3 Mar 2024", last: "Today, 09:12", items: 19 },
  { slug: "bilal-ahmed", i: "BA", name: "Bilal Ahmed", email: "bilal.ahmed@numl.edu.pk", roles: ["Article Writer"], status: "Active", joined: "18 Jan 2025", last: "Yesterday", items: 27 },
  { slug: "imran-siddiqui", i: "IS", name: "Dr Imran Siddiqui", email: "i.siddiqui@ndu.edu.pk", roles: ["Approver", "Expert"], status: "Active", joined: "2 Feb 2023", last: "14 Oct 2026", items: 6 },
  { slug: "rehan-khan", i: "RK", name: "Rehan Khan", email: "rehan.k@gmail.com", roles: ["Article Writer"], status: "Active", joined: "9 Sep 2025", last: "15 Oct 2026", items: 8 },
  { slug: "ayesha-malik", i: "AM", name: "Dr Ayesha Malik", email: "a.malik@lums.edu.pk", roles: ["Research Writer"], status: "Active", joined: "12 Jun 2025", last: "1 Oct 2026", items: 3 },
  { slug: "hina-shah", i: "HS", name: "Hina Shah", email: "hina.shah@psf.org.pk", roles: ["Editor"], status: "Active", joined: "4 Apr 2022", last: "Today, 08:40", items: 0 },
  { slug: "omar-farooq", i: "OF", name: "Omar Farooq", email: "o.farooq@iiui.edu.pk", roles: ["Approver"], status: "Invited", joined: "14 Oct 2026", last: "Never", items: 0 },
  { slug: "zara-qamar", i: "ZQ", name: "Zara Qamar", email: "zara.q@outlook.com", roles: ["Article Writer"], status: "Deactivated", joined: "7 May 2024", last: "2 Mar 2026", items: 4 },
  { slug: "kamran-javed", i: "KJ", name: "Kamran Javed", email: "kjaved@yahoo.com", roles: ["Article Writer"], status: "Banned", joined: "1 Nov 2024", last: "20 Jan 2026", items: 2 },
];

export const APPLICATIONS = [
  { i: "SH", name: "Sara Haider", email: "sara.haider@qau.edu.pk", role: "Research Writer", inst: "Quaid-i-Azam University", sub: "12 Oct 2026", wait: "4 days" },
  { i: "UR", name: "Usama Rafiq", email: "usama.rafiq@pu.edu.pk", role: "Article Writer", inst: "University of the Punjab", sub: "13 Oct 2026", wait: "3 days" },
  { i: "MA", name: "Mehwish Ali", email: "mehwish.ali@gmail.com", role: "Article Writer", inst: "Independent journalist", sub: "14 Oct 2026", wait: "2 days" },
  { i: "DI", name: "Danish Iqbal", email: "d.iqbal@ndu.edu.pk", role: "Research Writer", inst: "National Defence University", sub: "15 Oct 2026", wait: "1 day" },
  { i: "FN", name: "Fatima Noor", email: "fatima.noor@lums.edu.pk", role: "Research Writer", inst: "LUMS", sub: "16 Oct 2026", wait: "Today" },
  { i: "AR", name: "Ahmed Raza", email: "ahmed.raza@hotmail.com", role: "Article Writer", inst: "Retired, Pakistan Navy", sub: "16 Oct 2026", wait: "Today" },
];

export const ADMIN_ITEMS = [
  { slug: "water-security", title: "Water security and the Indus Waters Treaty", by: "Sara Haider", type: "Article", topic: "Climate and Environment", sub: "12 Oct 2026", editor: "Hina Shah", status: "Pending review" },
  { slug: "maritime-doctrine", title: "Maritime doctrine after the 2025 naval review", by: "Sara Haider", type: "Article", topic: "Defence and Security", sub: "13 Oct 2026", editor: "Hina Shah", status: "Pending review" },
  { slug: "budget-follow-up", title: "Budget 2026-27 follow-up: procurement", by: "Bilal Ahmed", type: "Article", topic: "Economy", sub: "15 Oct 2026", editor: "Unassigned", status: "Pending review" },
  { slug: "climate-finance-seminar", title: "Seminar on climate finance for South Asia", by: "Sara Haider, Rehan Khan", type: "Report", topic: "Climate and Environment", sub: "8 Oct 2026", editor: "Hina Shah", status: "Pending review" },
  { slug: "kashmir-unga", title: "Kashmir and the 2026 UNGA session", by: "Rehan Khan", type: "Article", topic: "International Affairs", sub: "16 Oct 2026", editor: "Unassigned", status: "Pending review" },
  { slug: "flood-relief", title: "Civil-military coordination in flood relief", by: "Sara Haider", type: "Article", topic: "National Affairs", sub: "10 Oct 2026", editor: "Hina Shah", status: "Changes requested" },
  { slug: "annual-outlook-2027", title: "Annual Outlook 2027", by: "PSF Analysis Desk", type: "Report", topic: "Defence and Security", sub: "14 Oct 2026", editor: "Hina Shah", status: "Scheduled" },
  { slug: "cyber-command", title: "The case for a national cyber command", by: "Bilal Ahmed", type: "Article", topic: "Science and Technology", sub: "15 Oct 2026", editor: "Hina Shah", status: "Live" },
  { slug: "gwadar", title: "Gwadar after the attacks", by: "Rehan Khan", type: "Article", topic: "National Affairs", sub: "13 Oct 2026", editor: "Hina Shah", status: "Rejected" },
];

export const ADMIN_RESEARCH = [
  { id: "RES-2026-00048", title: "Sanctions and dual-use exports from South Asia", by: "Danish Iqbal", cat: "Economic Security", stage: "Editor decision needed", round: "1", reviews: "2 of 2 in", inStage: "3 days", editor: "Dr Faisal Qureshi" },
  { id: "RES-2026-00045", title: "Hybrid threats and information operations", by: "Fatima Noor", cat: "Information Security", stage: "Under review", round: "1", reviews: "1 of 2 in", inStage: "18 days", editor: "Dr Faisal Qureshi", overdue: true },
  { id: "RES-2026-00052", title: "Arms control lessons from the INF collapse", by: "Sara Haider", cat: "Strategic Stability", stage: "Submitted", round: "1", reviews: "Not assigned", inStage: "1 day", editor: "Unassigned" },
  { id: "RES-2026-00041", title: "Civil defence planning in Karachi", by: "Sara Haider", cat: "Urban Security", stage: "Revisions requested", round: "1", reviews: "2 of 2 in", inStage: "6 days", editor: "Hina Shah" },
  { id: "RES-2026-00039", title: "Afghan refugees and labour markets in KP", by: "Dr Ayesha Malik", cat: "Human Security", stage: "Awaiting final approval", round: "2", reviews: "2 of 2 in", inStage: "2 days", editor: "Dr Faisal Qureshi" },
  { id: "RES-2026-00036", title: "Hydropower diplomacy on the Kabul River", by: "Usama Rafiq", cat: "Climate and Resource Security", stage: "Under review", round: "2", reviews: "0 of 2 in", inStage: "22 days", editor: "Hina Shah", overdue: true },
];
