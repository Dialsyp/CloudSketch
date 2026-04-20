// components/NodeItem.tsx

import { XYPosition } from "@xyflow/react";
import { nodeDefinitions } from "../contants/nodeDefinition";
import DraggableNode  from "./DraggableNode";
import { PropsWithChildren } from "react";

interface NodeItemPropsBase {
  nodeType: string;
  config: (typeof nodeDefinitions)[string];
  onDrop: (nodeType: string, position: XYPosition) => void;
}

type NodeItemProps = PropsWithChildren<NodeItemPropsBase>;
export function NodeItem({ nodeType, onDrop, config }: NodeItemProps) {
  //   const hasDetails = Object.values(config.defaults)[0];

  return (
    <DraggableNode
      nodeType={nodeType}
      onDrop={onDrop}
      className="z-50"
      isSku={config.isSku}
    >
      <div className="flex items-center">
        {/* Icône */}
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 shrink-0">
          <span className="text-2xl group-hover:animate-bounce">
            <config.icon />
          </span>
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0 ml-4">
          <h3 className="font-bold  truncate">{config.label}</h3>
          {/* {hasDetails && (
            <p className="text-xs opacity-90 truncate">
              {String(Object.values(config.defaults)[0]).split("/")[0]}
            </p>
          )} */}
        </div>

        {/* Badge Container */}
        {config.isContainer && config.badge && (
          <div className="ml-auto px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold border border-white/30 whitespace-nowrap">
            {config.badge}
          </div>
        )}

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </DraggableNode>
  );
}
