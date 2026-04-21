// app/nodesTypes/publicIp.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
/* eslint-disable @typescript-eslint/no-explicit-any */
const PublicIpNodeType = memo(({ id, data, selected, type }: any) => (
  <BaseResourceNode id={id} type={type} selected={selected} data={data}>
    <NodeInfoRow label="Method" value={data.allocation_method} />
    <NodeInfoRow label="SKU" value={data.sku?.name || "Basic"} />
    <NodeInfoRow label="IP" value={data.ip_address || "Pending..."} />
  </BaseResourceNode>
));

PublicIpNodeType.displayName = "PublicIpNodeType";
export default PublicIpNodeType;
