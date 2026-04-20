// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactFlowProvider } from "@xyflow/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloudSketch — Visual Terraform Editor",
  description: "Design and visualize your cloud infrastructure visually.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0a0a0f] text-white antialiased`}
      >
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </body>
    </html>
  );
}
