// app/nodesTypes/subnet.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";

const SubnetNodeType = memo(({ id, data, selected, type }: any) => (
  <BaseResourceNode id={id} type={type} selected={selected} data={data}>
    <NodeInfoRow label="Prefixes" value={data.address_prefixes} />
  </BaseResourceNode>
));

SubnetNodeType.displayName = "SubnetNodeType";
export default SubnetNodeType;
