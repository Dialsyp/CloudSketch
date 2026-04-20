// app/nodesTypes/Vnet.nodeType.tsx
"use client";
import { memo } from "react";
import { ContainerNode } from "./shared/ContainerNode";
import { VnetData } from "./nodeTypes.types";

const VnetNodeType = memo(({
  data,
  selected,
}: {
  data: VnetData;
  selected: boolean;
}) => (
  <ContainerNode
    selected={selected}
    label={data.name}
    sublabel={data.address_space}
    icon="🌐"
    borderColor="#0ea5e9"
    bgColor="rgba(14, 165, 233, 0.04)"
    resizerColor="#0ea5e9"
    minWidth={250}
    minHeight={180}
  />
));

VnetNodeType.displayName = "VnetNodeType";
export default VnetNodeType;
