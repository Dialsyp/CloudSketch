// app/nodesTypes/rg.nodeType.tsx
"use client";
import { memo } from "react";
import { ContainerNode } from "./shared/ContainerNode";
import { RgData } from "./nodeTypes.types";

const RgNodeType = memo(
  ({ data, selected }: { data: RgData; selected: boolean }) => (
    <ContainerNode
      selected={selected}
      label={data.name}
      sublabel={`📍 ${data.location}`}
      icon="🗂️"
      borderColor="#6366f1"
      bgColor="rgba(99, 102, 241, 0.04)"
      resizerColor="#6366f1"
      minWidth={300}
      minHeight={200}
    />
  ),
);

RgNodeType.displayName = "RgNodeType";
export default RgNodeType;
