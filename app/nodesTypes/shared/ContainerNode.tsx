// app/nodesTypes/shared/ContainerNode.tsx
"use client";
import { Handle, NodeResizer, Position } from "@xyflow/react";
import { memo, ReactNode } from "react";

interface ContainerNodeProps {
  selected: boolean;
  label: string;
  sublabel?: string;
  icon: string;
  borderColor: string;
  bgColor: string;
  resizerColor: string;
  minWidth?: number;
  minHeight?: number;
  children?: ReactNode;
}

export const ContainerNode = memo(({
  selected,
  label,
  sublabel,
  icon,
  borderColor,
  bgColor,
  resizerColor,
  minWidth = 250,
  minHeight = 150,
  children,
}: ContainerNodeProps) => {
  return (
    <>
      {/* Handles pour les liens hiérarchiques */}
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />

      <NodeResizer
        color={resizerColor}
        isVisible={selected}
        minWidth={minWidth}
        minHeight={minHeight}
        lineClassName="opacity-60"
        handleClassName="w-3 h-3 rounded-sm border-2"
      />

      {/* Container body */}
      <div
        className="w-full h-full rounded-xl border-2 relative"
        style={{
          borderColor,
          backgroundColor: bgColor,
          borderStyle: "dashed",
        }}
      >
        {/* Header badge */}
        <div
          className="absolute -top-4 left-3 flex items-center gap-1.5
                     px-2 py-0.5 rounded-md text-white text-xs font-bold
                     shadow-md"
          style={{ backgroundColor: borderColor }}
        >
          <span>{icon}</span>
          <span className="truncate max-w-[140px]">{label}</span>
        </div>

        {/* Sublabel (location, etc.) */}
        {sublabel && (
          <div
            className="absolute -top-4 right-3 text-xs font-medium
                       px-2 py-0.5 rounded-md"
            style={{ color: borderColor, backgroundColor: bgColor }}
          >
            {sublabel}
          </div>
        )}

        {/* Drop zone hint quand vide */}
        {children}
      </div>
    </>
  );
});

ContainerNode.displayName = "ContainerNode";
