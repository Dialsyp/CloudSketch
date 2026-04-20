// components/Sidebar.tsx
"use client";

import { useState, useMemo } from "react";
import {
  FiSearch, FiX, FiChevronDown, FiArrowRight, FiBookOpen
} from "react-icons/fi";
import {
  HiOutlineRectangleGroup,
} from "react-icons/hi2";
import {
  MdOutlineComputer, MdOutlineStorage, MdOutlineMonitor,
  MdOutlineSecurity,
} from "react-icons/md";
import {
  BiNetworkChart, BiData,
} from "react-icons/bi";

import { nodeDefinitions } from "../contants/nodeDefinition";
import { NodeItem } from "./NodeItem";
import { useSidebarHandlers } from "./useSidebarHandlers";

/* ── CATEGORIES ─────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "group",
    label: "Groups",
    icon: <HiOutlineRectangleGroup size={14} />,
    color: "text-blue-500 bg-blue-50 border-blue-100",
  },
  {
    id: "compute",
    label: "Compute",
    icon: <MdOutlineComputer size={14} />,
    color: "text-orange-500 bg-orange-50 border-orange-100",
  },
  {
    id: "network",
    label: "Network",
    icon: <BiNetworkChart size={14} />,
    color: "text-emerald-500 bg-emerald-50 border-emerald-100",
  },
  {
    id: "storage",
    label: "Storage",
    icon: <MdOutlineStorage size={14} />,
    color: "text-yellow-500 bg-yellow-50 border-yellow-100",
  },
  {
    id: "database",
    label: "Databases",
    icon: <BiData size={14} />,
    color: "text-purple-500 bg-purple-50 border-purple-100",
  },
  {
    id: "security",
    label: "Security",
    icon: <MdOutlineSecurity size={14} />,
    color: "text-red-500 bg-red-50 border-red-100",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: <MdOutlineMonitor size={14} />,
    color: "text-cyan-500 bg-cyan-50 border-cyan-100",
  },
];

/* ── TEMPLATES ──────────────────────────────────────────────── */
const TEMPLATES = [
  {
    name: "Basic Web App",
    description: "RG + VNet + VM + Public IP",
    tags: ["vm", "network"],
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-500 bg-blue-100",
    icon: <BiNetworkChart size={16} />,
  },
  {
    name: "AKS Cluster",
    description: "Managed Kubernetes + Node pool",
    tags: ["kubernetes", "compute"],
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-500 bg-purple-100",
    icon: <MdOutlineComputer size={16} />,
  },
  {
    name: "Storage + CDN",
    description: "Blob Storage + CDN Endpoint",
    tags: ["storage", "cdn"],
    color: "bg-yellow-50 border-yellow-100",
    iconColor: "text-yellow-500 bg-yellow-100",
    icon: <MdOutlineStorage size={16} />,
  },
  {
    name: "3-Tier Architecture",
    description: "Frontend + Backend + DB subnets",
    tags: ["network", "enterprise"],
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-500 bg-emerald-100",
    icon: <HiOutlineRectangleGroup size={16} />,
  },
];

/* ── SIDEBAR ────────────────────────────────────────────────── */
export function Sidebar() {
  const { handleNodeDrop } = useSidebarHandlers();
  const [expandedCats, setExpandedCats] = useState<string[]>(["group", "compute", "network"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"resources" | "templates">("resources");

  const toggleCat = (id: string) =>
    setExpandedCats(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );

  const filteredNodes = useMemo(() =>
    Object.entries(nodeDefinitions).filter(([_, cfg]) =>
      cfg.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cfg.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <aside className="w-72 flex flex-col bg-white border-l border-slate-200 h-full overflow-hidden">

      {/* ── HEADER ────────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 shrink-0 space-y-3">

        {/* Title row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Resources
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-400
                           text-[10px] font-mono border border-slate-200">
            {Object.keys(nodeDefinitions).length} types
          </span>
        </div>

        {/* Tabs */}
        <div className="flex p-0.5 rounded-lg bg-slate-100 border border-slate-200">
          {(["resources", "templates"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium capitalize
                          transition-all duration-200
                          ${activeTab === tab
                            ? "bg-white text-slate-700 shadow-sm border border-slate-200"
                            : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200
                       rounded-lg text-xs text-slate-600 placeholder-slate-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20
                       focus:border-blue-400 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2
                         text-slate-300 hover:text-slate-500 transition-colors"
            >
              <FiX size={12} />
            </button>
          )}
        </div>

        {/* Results count */}
        {searchTerm && (
          <p className="text-[10px] text-slate-400 px-1">
            {filteredNodes.length} result{filteredNodes.length !== 1 && "s"} for "
            <span className="text-slate-600 font-medium">{searchTerm}</span>"
          </p>
        )}
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5
                      scrollbar-thin scrollbar-track-transparent
                      scrollbar-thumb-slate-200">

        {activeTab === "resources" ? (
          <>
            {CATEGORIES.map(cat => {
              const catNodes = filteredNodes.filter(
                ([_, cfg]) => cfg.category === cat.id && !cfg.isSku
              );
              if (catNodes.length === 0) return null;

              const isExpanded = expandedCats.includes(cat.id);

              return (
                <div key={cat.id} className="rounded-xl overflow-hidden">

                  {/* Category header */}
                  <button
                    onClick={() => toggleCat(cat.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5
                               hover:bg-slate-50 transition-colors group rounded-xl"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-md border flex items-center
                                       justify-center shrink-0 ${cat.color}`}>
                        {cat.icon}
                      </div>
                      <span className="text-xs font-semibold text-slate-500
                                       group-hover:text-slate-700 transition-colors
                                       uppercase tracking-wide">
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono">
                        {catNodes.length}
                      </span>
                    </div>

                    <FiChevronDown
                      size={12}
                      className={`text-slate-300 transition-transform duration-200
                                  ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Nodes */}
                  {isExpanded && (
                    <div className="px-1 pb-2 space-y-0.5
                                    animate-in fade-in slide-in-from-top-1 duration-150">
                      {catNodes.map(([type, cfg]) => (
                        <NodeItem
                          key={type}
                          nodeType={type}
                          config={cfg}
                          onDrop={handleNodeDrop}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* SKUs */}
            {!searchTerm && (() => {
              const skuNodes = filteredNodes.filter(([_, cfg]) => cfg.isSku);
              if (skuNodes.length === 0) return null;
              return (
                <div className="mt-2 pt-3 border-t border-slate-100">
                  <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400
                                uppercase tracking-widest mb-1">
                    SKUs & Tiers
                  </p>
                  <div className="space-y-0.5">
                    {skuNodes.map(([type, cfg]) => (
                      <NodeItem key={type} nodeType={type} config={cfg} onDrop={handleNodeDrop}/>
                    ))}
                  </div>
                </div>
              );
            })()}
          </>
        ) : (
          <TemplatesTab />
        )}
      </div>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <div className="shrink-0 px-4 py-3 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Drag to canvas
            </span>
          </div>
          <a href="#"
             className="flex items-center gap-1 text-[10px] text-blue-400
                        hover:text-blue-600 transition-colors">
            <FiBookOpen size={10}/>
            Docs
          </a>
        </div>
      </div>
    </aside>
  );
}

/* ── TEMPLATES TAB ──────────────────────────────────────────── */
function TemplatesTab() {
  return (
    <div className="space-y-2 py-1">
      <p className="px-2 pb-1 text-[10px] text-slate-400 leading-relaxed">
        Starter architectures — click to load on canvas
      </p>
      {TEMPLATES.map(tpl => (
        <button
          key={tpl.name}
          className={`w-full text-left p-3 rounded-xl border transition-all
                      duration-200 hover:shadow-sm group ${tpl.color}`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                             shrink-0 ${tpl.iconColor}`}>
              {tpl.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700
                            group-hover:text-slate-900 transition-colors">
                {tpl.name}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                {tpl.description}
              </p>
              <div className="flex gap-1 mt-2 flex-wrap">
                {tpl.tags.map(tag => (
                  <span key={tag}
                        className="px-1.5 py-0.5 rounded-md bg-white/80 border
                                   border-slate-200 text-[9px] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <FiArrowRight
              size={12}
              className="text-slate-300 group-hover:text-slate-500
                         group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
