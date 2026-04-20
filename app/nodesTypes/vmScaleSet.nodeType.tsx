// app/nodesTypes/vmScaleSet.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { VmScaleSetData } from "./nodeTypes.types";

const VmScaleSetNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: VmScaleSetData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="SKU" value={data.sku} />
      <NodeInfoRow label="Capacity" value={data.capacity} />
      <NodeInfoRow label="Admin" value={data.admin_username} />
    </BaseResourceNode>
  ),
);

VmScaleSetNodeType.displayName = "VmScaleSetNodeType";
export default VmScaleSetNodeType;
