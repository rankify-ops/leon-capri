import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { asset } from "@/lib/basePath";
import "./globals.css";

// LÉONCAPRI's own site face.
const host = Host_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-host", display: "swap" });

const title = "LÉONCAPRI — Book an Initial Discussion with Izaac Trpeski";
// Their own og:description.
const description =
  "Leon Capri are design experience visionaries focused on Project Marketing, Branding & Design seeking to transform spaces. We work with Property Developers, Real Estate Agencies, Architects and other consultants.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title,
    description,
    images: [{ url: asset("/img/og.jpg"), width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: asset("/img/icon-32.png"), sizes: "32x32" }, { url: asset("/img/icon-192.png"), sizes: "192x192" }],
    apple: asset("/img/icon-180.png"),
  },
};

export const viewport: Viewport = { themeColor: "#efe9e1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={host.variable}>
      <body>{children}</body>
    </html>
  );
}
