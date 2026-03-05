"use client";
import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

const StorageNodeType = memo(({ data }) => (
  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 border-2 border-indigo-800 rounded-lg shadow-lg p-4 w-56 h-44 flex flex-col text-white">
    <Handle type="target" position={Position.Top} className="bg-indigo-400 w-4 h-4" />
    
    <div className="flex items-center justify-center mb-3">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <circle cx="7.5" cy="16.5" r="1.5"/>
          <circle cx="11.5" cy="16.5" r="1.5"/>
          <circle cx="15.5" cy="16.5" r="1.5"/>
        </svg>
      </div>
    </div>
    
    <h3 className="text-lg font-bold text-center mb-2">Storage Account</h3>
    
    <div className="space-y-1 text-sm flex-1">
      <div className="flex justify-between">
        <span className="font-medium">Name:</span>
        <span className="font-mono bg-black/30 px-2 py-1 rounded truncate">{data.name}</span>
      </div>
      <div className="flex justify-between">
        <span>Tier:</span>
        <span className="font-mono bg-black/30 px-2 py-1 rounded">{data.account_tier}</span>
      </div>
      <div className="text-xs text-indigo-200 mt-1">azurerm_storage_account</div>
    </div>
    
    <Handle type="source" position={Position.Bottom} className="bg-blue-400 w-4 h-4 mx-auto" id="vm" />
  </div>
));

StorageNodeType.displayName = "StorageNodeType";
export default StorageNodeType;
