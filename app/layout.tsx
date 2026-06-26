import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { ServiceWorkerRegistrar } from "@/components/ui/ServiceWorkerRegistrar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deutsch Tracker",
  description: "German A1→A2 spaced repetition + habit tracker",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#18181b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased bg-zinc-900 text-zinc-100 min-h-screen">
        <ServiceWorkerRegistrar />
        <Nav />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
