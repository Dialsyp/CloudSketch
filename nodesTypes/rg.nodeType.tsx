// app/nodesTypes/rg.nodeType.tsx
"use client";
import { memo } from "react";
import { ContainerNode } from "./shared/ContainerNode";
import { RgData } from "./nodeTypes.types";

const RgNodeType = memo(
  ({ data, selected }: { data: RgData & { xPos: number; yPos: number , nodeId: string, parentId: string }; selected: boolean }) => {
    
    return (
      <ContainerNode
        selected={selected}
        label={`${data.name} (node id: ${data.nodeId}) (parent: ${data.parentId || "none"})`}
        sublabel={`📍 ${data.location} | (${Math.round(data.xPos)}, ${Math.round(data.yPos)})`}
        icon="🗂️"
        borderColor="#6366f1"
        bgColor="rgba(99, 102, 241, 0.04)"
        resizerColor="#6366f1"
        minWidth={300}
        minHeight={200}
      />
    );
  },
);

RgNodeType.displayName = "RgNodeType";
export default RgNodeType;
