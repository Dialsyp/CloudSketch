// app/nodesTypes/cosmosDb.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { CosmosDbData } from "./nodeTypes.types";

const CosmosDbNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: CosmosDbData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow label="Kind" value={data.kind} />
      <NodeInfoRow label="Offer" value={data.offer_type} />
      <NodeInfoRow label="Consistency" value={data.consistency_level} />
    </BaseResourceNode>
  ),
);

CosmosDbNodeType.displayName = "CosmosDbNodeType";
export default CosmosDbNodeType;
