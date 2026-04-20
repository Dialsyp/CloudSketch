// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactFlowProvider } from "@xyflow/react";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloudSketch",
  description: "Azure Infrastructure Architect",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        {/* 🔑 ReactFlowProvider OBLIGATOIRE pour useReactFlow() dans les enfants */}
        <ReactFlowProvider>
          <div className="text-black">{children}</div>
        </ReactFlowProvider>
      </body>
    </html>
  );
}
