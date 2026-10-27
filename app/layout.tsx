import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ProtoNav } from "@/components/proto/ProtoNav";

export const metadata: Metadata = {
  title: { default: "Pakistan Strategic Forum", template: "%s | Pakistan Strategic Forum" },
  description: "Independent analysis of the forces shaping Pakistan's security and the region around it.",
  icons: { icon: "/psf-logo.png", apple: "/psf-logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#022c15" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" id="top">
      <body>{children}<ProtoNav /></body>
    </html>
  );
}
