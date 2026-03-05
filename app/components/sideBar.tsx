// components/Sidebar.tsx
"use client";

import { nodeDefinitions } from "../contants/nodeDefinition";
import { NodeItem } from "./NodeItem";
import { useSidebarHandlers } from "./useSidebarHandlers";

export function Sidebar() {
  const { handleNodeDrop } = useSidebarHandlers();

  return (
    <aside className="w-80 z-50 bg-linear-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-2xl h-screen flex flex-col">
      <div className="p-6 bg-linear-to-r from-blue-600 to-blue-700 text-white sticky top-0 shadow-lg">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <span className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-lg">
            ☁️
          </span>
          Azure Terraform
        </h2>
        <p className="text-blue-100 text-sm mt-1 opacity-90">
          Drag & drop resources
        </p>
      </div>

      <div className="flex-1 p-6 space-y-3 z-50 overflow-scroll">
        {Object.entries(nodeDefinitions).map(([type, config]) => (
          <NodeItem
            key={type}
            nodeType={type}
            config={config}
            onDrop={handleNodeDrop}
          />
        ))}
      </div>

      <div className="p-4 bg-linear-to-t from-slate-200/50 to-transparent border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          Drop dans RG/VNet/Storage
        </p>
      </div>
    </aside>
  );
}
