// app/nodesTypes/aksCluster.nodeType.tsx
"use client";
import { memo } from "react";
import { ContainerNode } from "./shared/ContainerNode";
import { AksClusterData } from "./nodeTypes.types";

const AksClusterNodeType = memo(
  ({ data, selected }: { data: AksClusterData; selected: boolean }) => (
    <ContainerNode
      selected={selected}
      label={data.name}
      sublabel={data.kubernetes_version ? `k8s ${data.kubernetes_version}` : undefined}
      icon="☸️"
      borderColor="#326ce5"
      bgColor="rgba(50, 108, 229, 0.04)"
      resizerColor="#326ce5"
      minWidth={280}
      minHeight={200}
    />
  ),
);

AksClusterNodeType.displayName = "AksClusterNodeType";
export default AksClusterNodeType;
