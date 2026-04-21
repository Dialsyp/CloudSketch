// app/nodesTypes/sqlDatabase.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { SqlDatabaseData } from "./nodeTypes.types";

const SqlDatabaseNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: SqlDatabaseData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="SKU" value={data.sku_name} />
      <NodeInfoRow label="Max Size" value={data.max_size_gb ? `${data.max_size_gb} GB` : undefined} />
      <NodeInfoRow label="Collation" value={data.collation} />
    </BaseResourceNode>
  ),
);

SqlDatabaseNodeType.displayName = "SqlDatabaseNodeType";
export default SqlDatabaseNodeType;
