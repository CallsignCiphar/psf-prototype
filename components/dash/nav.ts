import {
  Activity, BadgeCheck, BarChart3, Bell, CircleUserRound, FileText, FolderTree, Globe2, GraduationCap, Inbox, LayoutDashboard,
  Megaphone, Newspaper, PanelsTopLeft, ScrollText, Settings, ShieldCheck, Star, UserCog, Users, ClipboardCheck, type LucideIcon,
} from "lucide-react";

export type NavItem = { key: string; label: string; href: string; icon: LucideIcon; badge?: number; children?: { label: string; href: string; badge?: number }[] };
export type NavGroup = { label?: string; items: NavItem[] };

export const PORTAL_NAV: NavGroup[] = [
  { items: [{ key: "overview", label: "Overview", href: "/portal", icon: LayoutDashboard }] },
  { label: "My work", items: [
    { key: "articles", label: "My Articles", href: "/portal/articles", icon: FileText },
    { key: "reports", label: "My Reports", href: "/portal/reports", icon: ScrollText },
    { key: "research", label: "My Research", href: "/portal/research", icon: GraduationCap },
    { key: "reviews", label: "Reviews", href: "/portal/reviews", icon: ClipboardCheck, badge: 2 },
  ] },
  { label: "You", items: [
    { key: "notifications", label: "Notifications", href: "/portal/notifications", icon: Bell, badge: 3 },
    { key: "profile", label: "Profile", href: "/portal/profile", icon: CircleUserRound },
    { key: "account", label: "Account", href: "/portal/account", icon: ShieldCheck },
  ] },
];

export const ADMIN_NAV: NavGroup[] = [
  { items: [
    { key: "overview", label: "Overview", href: "/admin", icon: LayoutDashboard },
    { key: "analytics", label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ] },
  { label: "People", items: [
    { key: "users", label: "Users", href: "/admin/users", icon: Users, badge: 6, children: [
      { label: "All users", href: "/admin/users" }, { label: "Pending applications", href: "/admin/applications", badge: 6 },
      { label: "Article Writers", href: "/admin/users?role=Article%20Writer" }, { label: "Research Writers", href: "/admin/users?role=Research%20Writer" },
      { label: "Approvers", href: "/admin/users?role=Approver" }, { label: "Experts", href: "/admin/users?role=Expert" },
      { label: "Staff and admins", href: "/admin/users?role=Staff" }, { label: "Invited", href: "/admin/users?status=Invited" },
      { label: "Deactivated", href: "/admin/users?status=Deactivated" }, { label: "Banned", href: "/admin/users?status=Banned" },
      { label: "Permanently rejected", href: "/admin/applications?tab=Permanently%20rejected" },
    ] },
    { key: "roles", label: "Roles and permissions", href: "/admin/roles", icon: UserCog },
  ] },
  { label: "Content", items: [
    { key: "articles", label: "Articles", href: "/admin/articles", icon: FileText, badge: 4 },
    { key: "reports", label: "Reports", href: "/admin/reports", icon: ScrollText, badge: 1 },
    { key: "research", label: "Research papers", href: "/admin/research", icon: GraduationCap, badge: 3 },
    { key: "newsroom", label: "Newsroom", href: "/admin/newsroom", icon: Newspaper },
    { key: "featured", label: "Featured and Top Stories", href: "/admin/featured", icon: Star },
    { key: "taxonomy", label: "Taxonomy", href: "/admin/taxonomy", icon: FolderTree },
    { key: "global-watch", label: "Global Watch", href: "/admin/global-watch", icon: Globe2 },
  ] },
  { label: "Operations", items: [
    { key: "ads", label: "Ad management", href: "/admin/ads", icon: Megaphone },
    { key: "inbox", label: "Inbox", href: "/admin/inbox", icon: Inbox, badge: 9 },
    { key: "id-cards", label: "ID cards", href: "/admin/id-cards", icon: BadgeCheck },
  ] },
  { label: "Site", items: [
    { key: "cms", label: "CMS", href: "/admin/cms", icon: PanelsTopLeft },
    { key: "logs", label: "Activity logs", href: "/admin/logs", icon: Activity },
    { key: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
  ] },
];

export const PORTAL_TABS = [
  { key: "overview", label: "Home", href: "/portal", icon: LayoutDashboard },
  { key: "articles", label: "Articles", href: "/portal/articles", icon: FileText },
  { key: "research", label: "Research", href: "/portal/research", icon: GraduationCap },
  { key: "reviews", label: "Reviews", href: "/portal/reviews", icon: ClipboardCheck, badge: 2 },
];
export const ADMIN_TABS = [
  { key: "overview", label: "Home", href: "/admin", icon: LayoutDashboard },
  { key: "articles", label: "Content", href: "/admin/articles", icon: FileText, badge: 4 },
  { key: "users", label: "People", href: "/admin/users", icon: Users, badge: 6 },
  { key: "inbox", label: "Inbox", href: "/admin/inbox", icon: Inbox, badge: 9 },
];
