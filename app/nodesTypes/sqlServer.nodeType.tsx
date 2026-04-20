// app/nodesTypes/sqlServer.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { SqlServerData } from "./nodeTypes.types";

const SqlServerNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: SqlServerData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="Login" value={data.administrator_login} />
      <NodeInfoRow label="Version" value={data.version} />
    </BaseResourceNode>
  ),
);

SqlServerNodeType.displayName = "SqlServerNodeType";
export default SqlServerNodeType;
