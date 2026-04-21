// app/nodesTypes/routeTable.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { RouteTableData } from "./nodeTypes.types";

const RouteTableNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: RouteTableData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow
        label="Routes"
        value={Array.isArray(data.routes) ? `${data.routes.length} route(s)` : "None"}
      />
    </BaseResourceNode>
  ),
);

RouteTableNodeType.displayName = "RouteTableNodeType";
export default RouteTableNodeType;
