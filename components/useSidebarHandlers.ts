/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSidebarHandlers.ts
"use client";
import { useCallback } from "react";
import { useReactFlow, XYPosition, Node } from "@xyflow/react";
import { nodeDefinitions } from "@/app/contants/nodeDefinition";
import { findNodeAtPosition, findParentContainer, getAbsolutePosition, isInFlowBounds } from "@/app/utils/flowUtils";


let nodeCounter = 0;
export const getId = () => `node_${Date.now()}_${nodeCounter++}`;

export function useSidebarHandlers() {
  const { setNodes, screenToFlowPosition, getNodes, setEdges } = useReactFlow();

  const handleDragHover = useCallback(
    (screenPosition: XYPosition) => {
      const dropPosition = screenToFlowPosition(screenPosition);
      const allNodes = getNodes();

      setNodes((nds) =>
        nds.map((n) => {
          if (!n.data?.isContainer) return n;

          const def = nodeDefinitions[n.type as keyof typeof nodeDefinitions];
          const abs = getAbsolutePosition(n, allNodes);
          const w = n.measured?.width ?? (n.style?.width as number) ?? 300;
          const h = n.measured?.height ?? (n.style?.height as number) ?? 200;

          const isHovering =
            dropPosition.x >= abs.x &&
            dropPosition.x <= abs.x + w &&
            dropPosition.y >= abs.y &&
            dropPosition.y <= abs.y + h;

          return {
            ...n,
            style: {
              ...n.style,
              background: isHovering ? def?.color + "30" : def?.color + "15",
              border: isHovering
                ? `2.5px dashed ${def?.color}`
                : `2px dashed ${def?.color}80`,
              boxShadow: isHovering ? `0 0 20px ${def?.color}40` : "none",
              transition: "all 0.2s ease",
            },
          };
        }),
      );
    },
    [setNodes, screenToFlowPosition, getNodes],
  );

  const handleNodeDrop = useCallback(
    (nodeType: string, screenPosition: XYPosition) => {
      const flow = document.querySelector(".react-flow") as HTMLElement;
      console.log("Drop detected:", { nodeType, screenPosition, flow });

      const flowRect = flow?.getBoundingClientRect();
      if (!flowRect || !isInFlowBounds(screenPosition, flowRect)) return;

      const position = screenToFlowPosition(screenPosition);
      console.log("Calculated flow position:", position);
      const def = nodeDefinitions[nodeType];
      if (!def) return;
      const allNodes = getNodes();

      // Node Creation
      const parent = findParentContainer(allNodes, position);
      const isRG = nodeType === "azurerm_resource_group";
      if (!isRG && !parent) {
        alert(
          "🚫 Action impossible : Sur Azure, toutes les ressources doivent être créées à l'intérieur d'un Resource Group.",
        );
        return;
      }
      
      let finalPos = position;
      let inheritedData = {};
      console.log("Parent container found:", parent);
      if (parent) {
        const absParent = getAbsolutePosition(parent, allNodes);
        finalPos = {
          x: Math.max(20, position.x - absParent.x),
          y: Math.max(40, position.y - absParent.y),
        };
        inheritedData = {
          location: parent.data?.location,
          resource_group_name: parent.data?.name,
        };
      }

      const newNode = {
        id: getId(),
        type: nodeType,
        position: finalPos,
        data: {
          label: def.label,
          isContainer: def.isContainer ?? false,
          ...def.defaults,
          ...inheritedData,
        },
        ...(def.isContainer && {
          style: {
            width: def.defaultSize?.width ?? 400,
            height: def.defaultSize?.height ?? 300,
            background: (def.color ?? "#3b82f6") + "15",
            border: `2px dashed ${def.color ?? "#3b82f6"}80`,
            borderRadius: "12px",
            zIndex: 0,
          },
        }),
        ...(parent && { parentId: parent.id, extent: "parent" as const }),
      };

      setNodes((nds) => {
        const resetNodes = parent
          ? nds.map((n) => {
              if (n.id !== parent.id) return n;
              const d = nodeDefinitions[n.type as keyof typeof nodeDefinitions];
              return {
                ...n,
                style: {
                  ...n.style,
                  background: (d?.color ?? "#3b82f6") + "15",
                  border: `2px dashed ${d?.color ?? "#3b82f6"}80`,
                  boxShadow: "none",
                },
              };
            })
          : nds;
        return [...resetNodes, newNode] as Node[];
      });

      console.log("all nodes: ", allNodes);

      if (parent) {
        setEdges((eds) => [
          ...eds,
          {
            id: `e_${parent.id}_${newNode.id}`,
            source: parent.id,
            target: newNode.id,
            // Unification des handles
            sourceHandle: "source",
            targetHandle: "target",
            type: "smoothstep",
            style: {
              stroke: "#94a3b8",
              strokeWidth: 1.5,
              strokeDasharray: "4 2",
            },
          },
        ]);
      }
    },
    [setNodes, setEdges, screenToFlowPosition, getNodes],
  );

  /**
   * 🔥 REPARENTING LOGIC
   * Détecte si un nœud a été déplacé sur un nouveau parent sur le canvas.
   */
  const handleNodeDragStop = useCallback(
    (event: any, node: Node) => {
      const allNodes = getNodes();
      const absPos = getAbsolutePosition(node, allNodes);

      const newParent = findParentContainer(
        allNodes.filter((n) => n.id !== node.id),
        absPos,
      );

      if (newParent && newParent.id !== node.parentId) {
        const absParent = getAbsolutePosition(newParent, allNodes);
        const relativePos = {
          x: Math.max(20, absPos.x - absParent.x),
          y: Math.max(40, absPos.y - absParent.y),
        };

        setNodes((nds) =>
          nds.map((n) => {
            if (n.id !== node.id) return n;
            return {
              ...n,
              parentId: newParent.id,
              position: relativePos,
              extent: "parent" as const,
              data: {
                ...n.data,
                location: newParent.data?.location,
                resource_group_name: newParent.data?.name,
              },
            };
          }),
        );

        // Mettre à jour le edge hiérarchique avec handles unifiés
        setEdges((eds) => {
          const filtered = eds.filter((e) => e.target !== node.id);
          return [
            ...filtered,
            {
              id: `e_${newParent.id}_${node.id}`,
              source: newParent.id,
              target: node.id,
              sourceHandle: "source",
              targetHandle: "target",
              type: "smoothstep",
              style: {
                stroke: "#94a3b8",
                strokeWidth: 1.5,
                strokeDasharray: "4 2",
              },
            },
          ];
        });
      }
    },
    [getNodes, setNodes, setEdges],
  );

  return { handleNodeDrop, handleDragHover, handleNodeDragStop };
}
