// app/nodesTypes/appInsights.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { AppInsightsData } from "./nodeTypes.types";

const AppInsightsNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: AppInsightsData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="Type" value={data.application_type} />
      <NodeInfoRow label="Workspace" value={data.workspace_id ? "Linked" : "Classic"} />
    </BaseResourceNode>
  ),
);

AppInsightsNodeType.displayName = "AppInsightsNodeType";
export default AppInsightsNodeType;
