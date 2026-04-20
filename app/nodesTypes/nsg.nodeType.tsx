// app/nodesTypes/nsg.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { NsgData } from "./nodeTypes.types";

const NsgNodeType = memo(
  ({ id, data, selected, type }: { id: string; data: NsgData; selected: boolean; type: string }) => (
    <BaseResourceNode id={id} type={type} selected={selected} data={data}>
      <NodeInfoRow
        label="Rules"
        value={
          Array.isArray(data.security_rules)
            ? `${data.security_rules.length} rule(s)`
            : "None"
        }
      />
    </BaseResourceNode>
  ),
);

NsgNodeType.displayName = "NsgNodeType";
export default NsgNodeType;
