import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Football 2026 Simulator",
  description: "Simulate the full 48-team, 104-match 2026 international football tournament",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geist.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
