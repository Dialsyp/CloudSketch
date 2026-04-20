// app/nodesTypes/logAnalytics.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { LogAnalyticsData } from "./nodeTypes.types";

const LogAnalyticsNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: LogAnalyticsData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="SKU" value={data.sku} />
      <NodeInfoRow label="Retention" value={data.retention_in_days ? `${data.retention_in_days} days` : undefined} />
    </BaseResourceNode>
  ),
);

LogAnalyticsNodeType.displayName = "LogAnalyticsNodeType";
export default LogAnalyticsNodeType;
