"use client";
import { useDraggable } from "@neodrag/react";
import { XYPosition } from "@xyflow/react";
import { useRef, useState } from "react";
import { DragGhost } from "./DragGhost";

export interface DraggableNodeProps {
  className?: string;
  children: React.ReactNode;
  nodeType: string;
  onDrop: (
    nodeType: string,
    position: XYPosition,
    extras?: Record<string, any>,
  ) => void;
  isSku?: boolean;
}

export default function DraggableNode({
  className,
  children,
  nodeType,
  onDrop,
}: DraggableNodeProps) {
  // 🔑 Ref sur un div invisible de taille 0, pas sur le vrai item
  const invisibleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ghostPos, setGhostPos] = useState<XYPosition>({ x: 0, y: 0 });

  useDraggable(invisibleRef as React.RefObject<HTMLElement>, {
    position: { x: 0, y: 0 },

    onDragStart: ({ event }) => {
      setIsDragging(true);
      setGhostPos({ x: event.clientX, y: event.clientY });
    },

    onDrag: ({ event }) => {
      setGhostPos({ x: event.clientX, y: event.clientY });
    },

    onDragEnd: ({ event }) => {
      setIsDragging(false);
      onDrop(nodeType, { x: event.clientX, y: event.clientY });
    },
  });

  return (
    // Wrapper relatif pour que le div invisible soit bien positionné
    <div className={`relative ${className ?? ""}`}>
      {/* ✅ Vrai item — ne bouge JAMAIS */}
      <div
        style={{ opacity: isDragging ? 0.4 : 1, transition: "opacity 0.15s" }}
      >
        {children}
      </div>

      {/* 🔑 Div invisible qui capture le drag à la place */}
      <div
        ref={invisibleRef}
        style={{
          position: "absolute",
          inset: 0, // couvre tout le vrai item
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: 10,
          // complètement invisible mais cliquable
          background: "transparent",
        }}
      />

      {/* Ghost qui suit le curseur */}
      {isDragging && <DragGhost payload={{ nodeType, screenPos: ghostPos }} />}
    </div>
  );
}
