// app/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      {/* ═══════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════ */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h5v5H2zM9 7h5v5H9zM4 2h3v3H4z"
                  fill="white"
                  opacity="0.9"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">
              CloudSketch
            </span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
              Beta
            </span>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How it works
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#docs" className="hover:text-white transition-colors">
              Docs
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/Visuel"
              className="text-sm bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition-all"
            >
              Start for free →
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/60"
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-3 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Now supporting Azure & AWS resources
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Design your infra
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              visually.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste your Terraform code and get an interactive diagram instantly.
            Drag, connect, and export — no Visio, no draw.io, no friction.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/Visuel"
              className="group w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all text-base flex items-center justify-center gap-2"
            >
              Open Editor
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="#demo"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all text-base"
            >
              Watch demo
            </Link>
          </div>

          {/* Editor Preview */}
          <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#111118] shadow-2xl shadow-black/50">
            {/* Fake toolbar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0d0d14]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-white/20">
                CloudSketch — main.tf
              </span>
            </div>
            {/* Fake canvas */}
            <div className="h-72 md:h-96 relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Fake nodes */}
              <div className="absolute top-8 left-8 px-4 py-3 rounded-xl border border-blue-500/40 bg-blue-500/10 text-xs text-blue-300 font-mono">
                📦 azurerm_resource_group
              </div>
              <div className="absolute top-20 left-48 px-4 py-3 rounded-xl border border-green-500/40 bg-green-500/10 text-xs text-green-300 font-mono">
                🌐 azurerm_virtual_network
              </div>
              <div className="absolute top-36 left-64 px-4 py-3 rounded-xl border border-violet-500/40 bg-violet-500/10 text-xs text-violet-300 font-mono">
                🔷 azurerm_subnet
              </div>
              <div className="absolute top-12 right-24 px-4 py-3 rounded-xl border border-orange-500/40 bg-orange-500/10 text-xs text-orange-300 font-mono">
                💻 azurerm_linux_vm
              </div>
              <div className="absolute bottom-8 right-12 px-4 py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-xs text-cyan-300 font-mono">
                🌍 azurerm_public_ip
              </div>
              {/* Fake edges SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.3 }}
              >
                <line
                  x1="200"
                  y1="60"
                  x2="350"
                  y2="100"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                />
                <line
                  x1="420"
                  y1="120"
                  x2="480"
                  y2="160"
                  stroke="#22c55e"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                />
                <line
                  x1="500"
                  y1="80"
                  x2="600"
                  y2="80"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                />
              </svg>
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111118] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LOGOS / SOCIAL PROOF
      ═══════════════════════════════════════ */}
      <section className="py-12 border-y border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/30 mb-8">
            Trusted by infrastructure teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 text-white/20 font-semibold text-sm tracking-widest uppercase">
            {[
              "Accenture",
              "Devoteam",
              "Sopra Steria",
              "Capgemini",
              "Scaleway",
            ].map((name) => (
              <span
                key={name}
                className="hover:text-white/40 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to
              <br />
              understand your infrastructure
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              From HCL to diagram in seconds. Built for DevOps engineers,
              architects and platform teams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "⚡",
                title: "Instant parsing",
                desc: "Paste any Terraform HCL and get a live interactive diagram. Supports variables, locals, and cross-references.",
                color: "blue",
              },
              {
                icon: "🎨",
                title: "Visual editor",
                desc: "Drag & drop resources, resize containers, connect nodes manually. Full control over the layout.",
                color: "violet",
              },
              {
                icon: "🔗",
                title: "Auto-relations",
                desc: "Dependencies between resources are detected and drawn automatically. No more guessing.",
                color: "cyan",
              },
              {
                icon: "☁️",
                title: "Multi-cloud",
                desc: "Azure, AWS, GCP resources supported. Custom node types for every major service.",
                color: "green",
              },
              {
                icon: "📤",
                title: "Export anywhere",
                desc: "Export as PNG, SVG or PDF. Share a read-only link with your team in one click.",
                color: "orange",
              },
              {
                icon: "🤝",
                title: "Team collaboration",
                desc: "Real-time cursors, comments, and version history. Built for async teams.",
                color: "pink",
              },
            ].map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {icon}
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-white/40">Three steps. Zero configuration.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Paste your Terraform",
                desc: "Copy any `.tf` file into CloudSketch. Modules, variables, multi-file — all supported.",
              },
              {
                step: "02",
                title: "Get your diagram",
                desc: "Resources appear as interactive nodes. Relations are drawn automatically from your references.",
              },
              {
                step: "03",
                title: "Share or export",
                desc: "Export as image or share a live link with your team. No account needed to view.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex gap-8 items-start p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
              >
                <span className="text-4xl font-bold text-white/10 tabular-nums shrink-0">
                  {step}
                </span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRICING
      ═══════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple pricing
            </h2>
            <p className="text-white/40">Start free. Scale when you need.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Free",
                price: "€0",
                period: "forever",
                desc: "For individuals exploring their infra.",
                features: [
                  "5 diagrams",
                  "Azure & AWS nodes",
                  "PNG export",
                  "Community support",
                ],
                cta: "Get started",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "€19",
                period: "/month",
                desc: "For engineers who ship infrastructure daily.",
                features: [
                  "Unlimited diagrams",
                  "All cloud providers",
                  "SVG + PDF export",
                  "Share links",
                  "Priority support",
                ],
                cta: "Start free trial",
                highlighted: true,
              },
              {
                name: "Team",
                price: "€49",
                period: "/month",
                desc: "For platform teams and DevOps squads.",
                features: [
                  "Everything in Pro",
                  "Real-time collaboration",
                  "Version history",
                  "SSO / SAML",
                  "Dedicated support",
                ],
                cta: "Contact us",
                highlighted: false,
              },
            ].map(
              ({ name, price, period, desc, features, cta, highlighted }) => (
                <div
                  key={name}
                  className={`p-6 rounded-2xl border flex flex-col ${highlighted ? "border-blue-500/50 bg-blue-500/5" : "border-white/5 bg-white/[0.02]"}`}
                >
                  {highlighted && (
                    <span className="self-start px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 mb-4">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-semibold text-lg mb-1">{name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">{price}</span>
                    <span className="text-white/30 text-sm">{period}</span>
                  </div>
                  <p className="text-sm text-white/40 mb-6">{desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-white/60"
                      >
                        <span className="text-green-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/Visuel"
                    className={`w-full py-3 rounded-xl text-sm font-medium text-center transition-all ${
                      highlighted
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {cta}
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Your Terraform, finally
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              understandable.
            </span>
          </h2>
          <p className="text-white/40 mb-10 text-lg">
            Join 2,000+ infrastructure engineers who switched from spreadsheets
            to CloudSketch.
          </p>
          <Link
            href="/Visuel"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all text-base"
          >
            Open the editor for free →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600" />
              CloudSketch
            </div>
            <p className="text-sm text-white/30 max-w-xs">
              The visual Terraform editor for modern infrastructure teams.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-12 text-sm">
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Changelog", "Roadmap"],
              },
              {
                title: "Resources",
                links: ["Docs", "Blog", "Examples", "Status"],
              },
              {
                title: "Company",
                links: ["About", "Privacy", "Terms", "Contact"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white/40 mb-4 font-medium">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/30 hover:text-white/60 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-white/20">
          <span>© 2025 CloudSketch. All rights reserved.</span>
          <span>Made with ☁️ for DevOps engineers</span>
        </div>
      </footer>
    </div>
  );
}
