// app/nodesTypes/storageContainer.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { StorageContainerData } from "./nodeTypes.types";

const StorageContainerNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: StorageContainerData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="Access" value={data.container_access_type || "private"} />
      <NodeInfoRow label="Account" value={data.storage_account_name} />
    </BaseResourceNode>
  ),
);

StorageContainerNodeType.displayName = "StorageContainerNodeType";
export default StorageContainerNodeType;
