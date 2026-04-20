// app/nodesTypes/storage.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
/* eslint-disable @typescript-eslint/no-explicit-any */
const StorageNodeType = memo(({ id, data, selected, type }: any) => (
  <BaseResourceNode id={id} type={type} selected={selected} data={data}>
    <NodeInfoRow label="Tier" value={data.account_tier} />
    <NodeInfoRow label="Replication" value={data.account_replication_type} />
    <NodeInfoRow label="Access" value={data.access_tier} />
  </BaseResourceNode>
));

StorageNodeType.displayName = "StorageNodeType";
export default StorageNodeType;
