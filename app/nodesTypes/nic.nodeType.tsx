"use client";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

const NicNodeType = memo(({ data }) => (
  <div
    className="bg-linear-to-br 
  from-teal-500 to-teal-700 border-2 
  border-teal-800 rounded-lg shadow-lg p-3 
  w-60 h-44 flex flex-col text-white"
  >
    <Handle
      type="target"
      position={Position.Top}
      className="bg-teal-400 w-4 h-4"
    />

    <div className="flex items-center justify-center mb-2">
      <div
        className="w-10 h-10 
      bg-white/20 rounded-lg flex 
      items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
    </div>

    <h3
      className="text-sm font-bold 
    text-center mb-1"
    >
      Network Interface
    </h3>

    <div className="space-y-1 text-xs flex-1">
      <div className="flex justify-between">
        <span>Name:</span>
        <span
          className="font-mono bg-black/30 
        px-1 py-0.5 rounded"
        >
          {data.name}
        </span>
      </div>
      <div className="text-xs text-teal-200 mt-2">
        azurerm_network_interface
      </div>
    </div>

    <Handle
      type="source"
      position={Position.Right}
      className="bg-blue-400 w-4 h-4"
      id="vm"
    />
  </div>
));

NicNodeType.displayName = "NicNodeType";
export default NicNodeType;
