"use client";
import { Handle, Position} from "@xyflow/react";
import { memo } from "react";

const VmNodeType = memo(({ data }) => {
  return (
    <div className="bg-linear-to-br from-red-500 to-red-700 border-2 border-red-800 rounded-lg shadow-lg p-4 w-72 h-56 flex flex-col text-white relative overflow-hidden">
      {/* Handle cible depuis NIC/Storage */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="bg-red-400 w-4 h-4" 
      />
      
      {/* Badge "Running" ou statut */}
      <div className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded-full font-bold">
        Running
      </div>
      
      {/* Icône VM Ubuntu */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16V9h3l3-3 3 3h3v7h2V7H3v9h2zm3-7v5H6v-5h2zm7 0v5h-2v-5h2zm0 7v-5h2v5h-2zm-7 0v-5h2v5h-2z"/>
          </svg>
        </div>
      </div>
      
      {/* Titre */}
      <h3 className="text-xl font-bold text-center mb-3 truncate">Linux VM</h3>
      
      {/* Données principales */}
      <div className="space-y-2 text-sm flex-1 mb-4">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span className="font-mono bg-black/30 px-3 py-1 rounded-lg text-sm truncate">{data.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Size:</span>
          <span className="font-mono bg-black/30 px-3 py-1 rounded-lg text-sm">{data.size}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">User:</span>
          <span className="font-mono bg-black/30 px-3 py-1 rounded-lg text-sm truncate">{data.admin_username}</span>
        </div>
      </div>
      
      {/* Détails OS */}
      <div className="text-xs text-red-200 mb-4 bg-black/20 p-2 rounded-lg">
        <div className="flex justify-between">
          <span>Ubuntu 18.04 LTS</span>
          <span>Standard_LRS</span>
        </div>
      </div>
      
      {/* Type Terraform */}
      <div className="text-xs text-red-300 absolute bottom-2 left-2">
        azurerm_linux_virtual_machine
      </div>
      
      {/* Pas de handle source car VM = feuille finale */}
    </div>
  );
});

VmNodeType.displayName = "VmNodeType";

export default VmNodeType;
