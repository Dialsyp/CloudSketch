"use client";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

const PublicIpNodeType = memo(({ data }) => (
  <div className="bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-800 rounded-lg shadow-lg p-4 w-56 h-44 flex flex-col text-white">
    <Handle type="target" position={Position.Top} className="bg-orange-400 w-4 h-4" />
    
    <div className="flex items-center justify-center mb-3">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
    </div>
    
    <h3 className="text-lg font-bold text-center mb-2">Public IP</h3>
    
    <div className="space-y-1 text-sm flex-1">
      <div className="flex justify-between">
        <span className="font-medium">Name:</span>
        <span className="font-mono bg-black/30 px-2 py-1 rounded">{data.name}</span>
      </div>
      <div className="flex justify-between">
        <span>Method:</span>
        <span className="font-mono bg-black/30 px-2 py-1 rounded">{data.allocation_method}</span>
      </div>
      <div className="text-xs text-orange-200 mt-1">azurerm_public_ip</div>
    </div>
    
    <Handle type="source" position={Position.Bottom} className="bg-orange-400 w-4 h-4 mx-auto" id="nic" />
  </div>
));

PublicIpNodeType.displayName = "PublicIpNodeType";
export default PublicIpNodeType;
