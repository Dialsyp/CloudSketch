"use client";
import { findParentContainer, getAbsolutePosition } from "@/utils/flowUtils";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

export function MouseTracker() {
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const [screen, setScreen] = useState({ x: 0, y: 0 });
  const [flow, setFlow] = useState({ x: 0, y: 0 });
  const [relative, setRelative] = useState<{ x: number; y: number; parentLabel: string } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const screenPos = { x: e.clientX, y: e.clientY };
      setScreen({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      const pos = screenToFlowPosition(screenPos);
      setFlow({ x: Math.round(pos.x), y: Math.round(pos.y) });

      // Cherche le conteneur sous le curseur
      const allNodes = getNodes();
      const parent = findParentContainer(allNodes, pos);

      if (parent) {
        const absParent = getAbsolutePosition(parent, allNodes);
        setRelative({
          x: Math.round(pos.x - absParent.x),
          y: Math.round(pos.y - absParent.y),
          parentLabel: (parent.data?.label as string) ?? parent.id,
        });
      } else {
        setRelative(null);
      }
    },
    [screenToFlowPosition, getNodes],
  );

  useEffect(() => {
    globalThis.addEventListener("mousemove", handleMouseMove);
    return () => globalThis.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="absolute bottom-4 left-4 z-50 bg-black/70 text-white text-xs font-mono px-3 py-2 rounded-lg pointer-events-none space-y-0.5">
      <div className="text-white/40">
        Screen <span className="text-white">x: {screen.x} y: {screen.y}</span>
      </div>
      <div className="text-white/40">
        Flow <span className="text-emerald-400">x: {flow.x} y: {flow.y}</span>
      </div>

      {relative ? (
        <div className="text-white/40 border-t border-white/10 pt-0.5 mt-0.5">
          <span className="text-purple-400">{relative.parentLabel}</span>
          {" → "}
          <span className="text-orange-400">x: {relative.x} y: {relative.y}</span>
        </div>
      ) : (
        <div className="text-white/20 border-t border-white/10 pt-0.5 mt-0.5">
          hors conteneur
        </div>
      )}
    </div>
  );
}
