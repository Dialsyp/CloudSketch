// app/nodesTypes/nic.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
/* eslint-disable @typescript-eslint/no-explicit-any */
const NicNodeType = memo(({ id, data, selected, type }: any) => (
  <BaseResourceNode id={id} type={type} selected={selected} data={data}>
    <NodeInfoRow label="Private IP" value={data.private_ip || "Dynamic"} />
    <NodeInfoRow
      label="Acceleration"
      value={data.enable_accelerated_networking ? "Yes" : "No"}
    />
  </BaseResourceNode>
));

NicNodeType.displayName = "NicNodeType";
export default NicNodeType;
