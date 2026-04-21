// app/components/FlowCanvas.tsx
"use client";
import { ReactFlow, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ContextMenu from "./ContextMenu";
import { useEffect } from "react";
import { config } from "@/contants/config";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface FlowCanvasProps {
  nodes: any[];
  edges: any[];
  handlers: any;
  menu: any;
  reactFlowRef: any;
  onNodeDragStop?: (event: any, node: any) => void;
}

export function FlowCanvas({
  nodes,
  edges,
  handlers,
  menu,
  reactFlowRef,
  onNodeDragStop,
}: FlowCanvasProps) {
  useEffect(() => {
    console.log("FULL NODES JSON :", JSON.stringify(nodes, null, 2));
  }, [nodes]);
  return (
    <div className="flex-1 h-full relative">
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            parentId: node.parentId || "",
            nodeId: node.id,
            xPos: node.position.x,
            yPos: node.position.y,
          },
        }))}
        edges={edges}
        nodeTypes={config.nodeTypes}
        onNodesChange={handlers.onNodesChange}
        onEdgesChange={handlers.onEdgesChange}
        onNodeContextMenu={handlers.onNodeContextMenu}
        onPaneClick={handlers.onPaneClick}
        onConnect={handlers.onConnect}
        onNodeDragStop={onNodeDragStop}
        fitView
        snapToGrid={true}
        snapGrid={[15, 15]}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { strokeWidth: 2 },
        }}
      >
        <Controls
          position="bottom-right"
          className="bg-white shadow-xl border-none"
        />
        <Background color="#cbd5e1" gap={30} size={1.5} />

        {menu && <ContextMenu {...menu} onClose={handlers.onPaneClick} />}
      </ReactFlow>

      {/* Overlay info / Breadcrumbs (optionnel)
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-2xl font-black text-slate-800/20 uppercase tracking-tighter">
          Editor Canvas
        </h1>
      </div> */}
    </div>
  );
}
