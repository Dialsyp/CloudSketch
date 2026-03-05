"use client";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Sidebar } from "../components/sideBar";
import { useReactFlowHandlers } from "../components/useReactFlowHandlers";
import { config } from "../contants/config";
import ContextMenu from "../components/ContextMenu";

export default function Visuel() {
  const { nodes, edges, menu, reactFlowRef, handlers, onPaneClick } =
    useReactFlowHandlers([]);

  return (
    <div className="w-screen h-screen flex text-black">
      <div className="flex-1 h-full">
        <ReactFlow
          ref={reactFlowRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={config.nodeTypes}
          onNodesChange={handlers.onNodesChange}
          onEdgesChange={handlers.onEdgesChange}
          // onNodeMouseEnter={handlers.onNodeMouseEnter}
          // onNodeMouseLeave={handlers.onNodeMouseLeave}
          onNodeContextMenu={handlers.onNodeContextMenu}
          onPaneClick={handlers.onPaneClick}
          onConnect={handlers.onConnect}
          fitView
        >
          <Controls />
          <Background />
          {menu && (
            <ContextMenu {...menu} onClose={() => handlers.onPaneClick()} />
          )}
        </ReactFlow>
      </div>

      <div>
        <Sidebar />
      </div>
    </div>
  );
}
