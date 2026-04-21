// app/components/DragGhost.tsx
"use client";
import { useEffect, useState } from "react";
import { XYPosition } from "@xyflow/react";
import { nodeDefinitions } from "@/contants/nodeDefinition";

type DragGhostProps = {
  payload: {
    nodeType: string;
    screenPos: XYPosition;
  };
};

export function DragGhost({ payload }: Readonly<DragGhostProps>) {
  const [pos, setPos] = useState<XYPosition>(payload.screenPos);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const def = nodeDefinitions[payload.nodeType];
  if (!def) return null;

  return (
    // 🔑 position: fixed + pointer-events: none = suit le curseur sans bloquer
    <div
      style={{
        position: "fixed",
        left: pos.x + 12, // légèrement décalé du curseur
        top: pos.y + 12,
        pointerEvents: "none", // 🔑 ne bloque PAS les events sous lui
        zIndex: 99999,
        transform: "rotate(2deg)", // petit effet "tenu en main"
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2
                      bg-white border-2 border-blue-500
                      rounded-xl shadow-2xl opacity-90
                      text-sm font-semibold text-slate-700">
        <span className="text-xl"><def.icon /></span>
        <span>{def.label}</span>
      </div>
    </div>
  );
}
