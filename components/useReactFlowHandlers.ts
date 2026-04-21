
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useRef, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

export function useReactFlowHandlers(initialNodes: any[]) {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const [edges, setEdges] = useState<any[]>([]);
  const [menu, setMenu] = useState<{ id: any; top: any; left: any } | null>(
    null,
  );
  const reactFlowRef = useRef<HTMLDivElement>(null);

  // 🔥 Handlers factorisés
  const handlers = {
    /********************************/
    /******* Nodes changes ******/
    /********************************/
    onNodesChange: useCallback(
      (changes: NodeChange<any>[]) =>
        setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes],
    ),

    /********************************/
    /******* Edges changes ******/
    /********************************/
    onEdgesChange: useCallback(
      (changes: EdgeChange<never>[]) =>
        setEdges((eds) => applyEdgeChanges(changes, eds)),
      [],
    ),

    /********************************/
    /******* Edge Connection ******/
    /********************************/
    onConnect: useCallback(
      (params: any) => setEdges((eds) => addEdge(params, eds)),
      [],
    ),

   
    /********************************/
    /******* Context Menu Open ******/
    /********************************/
    onNodeContextMenu: useCallback(
      (
        event: { preventDefault: () => void; clientY: any; clientX: any },
        node: { id: any },
      ) => {
        event.preventDefault();
        const rect = reactFlowRef.current?.getBoundingClientRect();
        if (!rect) return;

        setMenu({
          id: node.id,
          top: event.clientY,
          left: event.clientX,
        });
      },
      [setMenu],
    ),

    /********************************/
    /******* Context Menu Close ******/
    /********************************/
    onPaneClick: useCallback(() => setMenu(null), []),
  };

  return {
    nodes,
    edges,
    menu,
    reactFlowRef,
    handlers,
    screenToFlowPosition,
    getNodes,
    setNodes,
    setEdges,
  };
}
