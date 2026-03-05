"use client";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

const SubnetNodeType = memo(({ data }) => (
  <div className="bg-gradient-to-br from-green-500 to-green-700 border-2 border-green-800 rounded-lg shadow-lg p-3 w-56 h-44 flex flex-col text-white">
    <Handle type="target" position={Position.Top} className="bg-green-400 w-4 h-4" />
    
    <div className="flex items-center justify-center mb-2">
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        </svg>
      </div>
    </div>
    
    <h3 className="text-sm font-bold text-center mb-1 truncate">Subnet</h3>
    
    <div className="space-y-1 text-xs flex-1">
      <div className="flex justify-between">
        <span>Name:</span>
        <span className="font-mono bg-black/30 px-1 py-0.5 rounded text-xs">{data.name}</span>
      </div>
      <div className="flex justify-between">
        <span>Prefix:</span>
        <span className="font-mono bg-black/30 px-1 py-0.5 rounded text-xs">{data.address_prefixes}</span>
      </div>
      <div className="text-xs text-green-200 mt-1">azurerm_subnet</div>
    </div>
    
    <div className="flex justify-center mt-1">
      <Handle type="source" position={Position.Right} className="bg-orange-400 w-3 h-3" id="nic" />
    </div>
  </div>
));

SubnetNodeType.displayName = "SubnetNodeType";
export default SubnetNodeType;
