/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDraggable } from "@neodrag/react";
import { XYPosition } from "@xyflow/react";
import { useRef, useState } from "react";
import { DragGhost } from "./DragGhost";
import { useSidebarHandlers } from "./useSidebarHandlers";

export interface DraggableNodeProps {
  className?: string;
  children: React.ReactNode;
  nodeType: string;
  onDrop: (
    nodeType: string,
    position: XYPosition,
    extras?: Record<string, any>,
  ) => void;
}

export default function DraggableNode({
  className,
  children,
  nodeType,
  onDrop,
}: DraggableNodeProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });
  const [dragPayload, setDragPayload] = useState<{
    nodeType: string;
    screenPos: XYPosition;
  } | null>(null);
  const { handleDragHover } = useSidebarHandlers();
  useDraggable(draggableRef as React.RefObject<HTMLElement>, {
    position: position,
    onDragStart: ({ event }) => {
      setDragPayload({
        nodeType,
        screenPos: { x: event.clientX, y: event.clientY },
      });
    },
    onDrag: ({ event, offsetX, offsetY }) => {
      setPosition({ x: offsetX, y: offsetY });

      // 🔥 PENDANT DRAG → Update position pour hover
      if (dragPayload) {
        setDragPayload({
          nodeType,
          screenPos: { x: event.clientX, y: event.clientY },
        });
      }
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 });
      setDragPayload(null);
      onDrop(nodeType, {
        x: event.clientX,
        y: event.clientY,
      });
    },
  });
  return (
    <>
      <div
        ref={draggableRef}
        className="draggable-node"
        style={{ zIndex: 9999 }}
      >
        {children}
      </div>

      {/* 🔥 DRAG GHOST → Envoie payload pour hover */}
      {dragPayload && (
        <DragGhost
          payload={dragPayload}
          onHoverParent={handleDragHover} // Callback vers Sidebar
        />
      )}
    </>
  );
}
