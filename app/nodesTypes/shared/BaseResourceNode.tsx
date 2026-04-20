// app/nodesTypes/shared/BaseResourceNode.tsx
"use client";
import { Handle, Position } from "@xyflow/react";
import { memo, ReactNode } from "react";
import { nodeDefinitions } from "../../contants/nodeDefinition";

interface BaseResourceNodeProps {
  id: string;
  type: string;
  selected: boolean;
  data: any;
  children?: ReactNode;
}

export const BaseResourceNode = memo(({
  type,
  selected,
  data,
  children,
}: BaseResourceNodeProps) => {
  const def = nodeDefinitions[type as keyof typeof nodeDefinitions];
  if (!def) return null;

  const color = def.color || "#3b82f6";
  const icon = def.icon || "📦";

  return (
    <div
      className={`
        flex flex-col text-white rounded-xl shadow-xl
        border-2 transition-all duration-200
        ${selected ? "border-white ring-4 ring-white/30 scale-[1.02]" : "border-black/20"}
      `}
      style={{ 
        width: 280, 
        background: def.style?.background || `linear-gradient(135deg, ${color}, ${color}dd)`,
        minHeight: 120
      }}
    >
      {/* Input Handle (Target) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="w-3! h-3! border-2! border-white!"
        style={{ background: color }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/20">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl shadow-inner">
          <def.icon />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
            {def.label}
          </p>
          <p className="text-sm font-bold truncate">
            {data.name || "unnamed"}
          </p>
        </div>
      </div>

      {/* Content Body */}
      {children && (
        <div className="p-4 space-y-2 bg-black/5 flex-1">
          {children}
        </div>
      )}

      {/* Footer / Terraform Type */}
      <div className="px-4 py-1.5 text-[9px] font-mono opacity-40 italic flex justify-between items-center">
        <span>{type}</span>
        {data.location && <span>📍 {data.location}</span>}
      </div>

      {/* Output Handle (Source) - Optionnel selon besoin */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="!w-3 !h-3 !border-2 !border-white"
        style={{ background: color }}
      />
    </div>
  );
});

BaseResourceNode.displayName = "BaseResourceNode";

// ── Shared Sub-component ──────────────────────────────────────────────────────
export function NodeInfoRow({ label, value }: { label: string; value?: any }) {
  if (value === undefined || value === null) return null;
  return (
    <div className="flex justify-between items-center text-[11px]">
      <span className="opacity-70 font-medium">{label}</span>
      <span className="font-mono bg-white/10 px-2 py-0.5 rounded truncate max-w-[140px]">
        {String(value)}
      </span>
    </div>
  );
}
