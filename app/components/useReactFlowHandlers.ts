/* eslint-disable react-hooks/preserve-manual-memoization */
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
    onNodesChange: useCallback(
      (changes: NodeChange<any>[]) =>
        setNodes((nds) => applyNodeChanges(changes, nds)),
      [],
    ),

    onEdgesChange: useCallback(
      (changes: EdgeChange<never>[]) =>
        setEdges((eds) => applyEdgeChanges(changes, eds)),
      [],
    ),

    onConnect: useCallback(
      (params: any) => setEdges((eds) => addEdge(params, eds)),
      [],
    ),

    // onNodeMouseEnter: useCallback(
    //   (event, node) => {
    //     if (node.data.isContainer) {
    //       setNodes((nds) =>
    //         nds.map((n) =>
    //           n.id === node.id
    //             ? {
    //                 ...n,
    //                 style: {
    //                   ...n.style,
    //                   border: "3px solid #10b981",
    //                   background: "rgba(16, 185, 129, 0.15)",
    //                 },
    //                 data: { ...n.data, isHovered: true },
    //               }
    //             : n,
    //         ),
    //       );
    //     }
    //   },
    //   [setNodes],
    // ),

    // onNodeMouseLeave: useCallback(
    //   (event, node) => {
    //     setNodes((nds) =>
    //       nds.map((n) =>
    //         n.id === node.id
    //           ? {
    //               ...n,
    //               style: n.style || {},
    //               data: { ...n.data, isHovered: false },
    //             }
    //           : n,
    //       ),
    //     );
    //   },
    //   [setNodes],
    // ),

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
  };
}
