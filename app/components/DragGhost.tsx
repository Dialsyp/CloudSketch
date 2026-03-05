import { useEffect } from "react";
import { nodeDefinitions } from "../contants/nodeDefinition";
import { XYPosition } from "@xyflow/react";

export function DragGhost({
  payload,
  onHoverParent,
}: {
  payload: { nodeType: string; screenPos: XYPosition };
  onHoverParent: (pos: XYPosition) => void;
}) {
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      onHoverParent({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [onHoverParent]);

  return (
    <div
      className="drag-ghost"
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0.8,
        transform: `translate(${payload.screenPos.x}px, ${payload.screenPos.y}px)`,
      }}
    >
      {nodeDefinitions[payload.nodeType]?.icon}{" "}
      {nodeDefinitions[payload.nodeType]?.label}
    </div>
  );
}
