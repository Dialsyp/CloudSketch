// app/nodesTypes/vm.nodeType.tsx
"use client";
import { memo } from "react";
import { BaseResourceNode, NodeInfoRow } from "./shared/BaseResourceNode";
import { VmData } from "./nodeTypes.types";

const VmNodeType = memo(
  ({
    id,
    data,
    selected,
    type,
  }: {
    id: string;
    data: VmData;
    selected: boolean;
    type: string;
  }) => {
    const isLinux = type === "azurerm_linux_virtual_machine";

    return (
      <BaseResourceNode id={id} type={type} selected={selected} data={data}>
        <NodeInfoRow label="Size" value={data.size} />
        <NodeInfoRow label="Admin" value={data.admin_username} />
        <NodeInfoRow label="OS" value={isLinux ? "Linux" : "Windows"} />
        {data.status && (
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${data.status === "running" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
            />
            <span className="text-[10px] uppercase font-bold opacity-80">
              {data.status}
            </span>
          </div>
        )}
      </BaseResourceNode>
    );
  },
);

VmNodeType.displayName = "VmNodeType";
export default VmNodeType;
