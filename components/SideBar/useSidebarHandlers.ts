/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSidebarHandlers.ts
"use client";
import { useCallback } from "react";
import { useReactFlow, XYPosition, Node } from "@xyflow/react";
import { nodeDefinitions } from "@/contants/nodeDefinition";
import { findParentContainer, getAbsolutePosition, isInFlowBounds } from "@/utils/flowUtils";



let nodeCounter = 0;
export const getId = () => `node_${Date.now()}_${nodeCounter++}`;

export function useSidebarHandlers() {
  const { setNodes, screenToFlowPosition, flowToScreenPosition, getNodes, setEdges } = useReactFlow();

  const handleDragHover = useCallback(
    (screenPosition: XYPosition) => {
      const dropPosition = screenToFlowPosition(screenPosition);
      const allNodes = getNodes();

      setNodes((nds) =>
        nds.map((n) => {
          if (!isContainer(n)) return n;

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

      const def = nodeDefinitions[nodeType];
      if (!def) return;
      const allNodes = getNodes();

      /** conteneur parent le plus proche de la position de dépôt */
      const parent = findParentContainer(allNodes, position);

      /** est ce qu'il s'agit d'un Resource Group */
      const isRG = nodeType === "azurerm_resource_group";


      /** Vérification de la validité du dépôt si ce n'est pas un Resource Group 
       * et qu'aucun parent n'est trouvé c'est une action impossible */
      if (!isRG && !parent) {
        alert(
          "🚫 Action impossible : Sur Azure, toutes les ressources doivent être créées à l'intérieur d'un Resource Group.",
        );
        return;
      }


      let finalPos = position;
      /** Position finale du nœud si un parent est trouvé */
      if (parent) {
        const absParent = getAbsolutePosition(parent, allNodes);
        finalPos = {
          x: Math.round(position.x - absParent.x),
          y: Math.round(position.y - absParent.y),
        };
      }

      /** Nouveau nœud à créer */
      const newNode = {
        id: getId(),
        type: nodeType,
        position: finalPos,
        data: {
          label: def.label,
          ...def.defaults,
        },
        isContainer: def.isContainer ?? false,
        ...(def.isContainer && {
          style: {
            width: def.defaultSize?.width,
            height: def.defaultSize?.height,
            background: (def.color ?? "#3b82f6") + "15",
            border: `2px dashed ${def.color ?? "#3b82f6"}80`,
            borderRadius: "12px",
            zIndex: 0,
          },
          width: def.defaultSize?.width,
          height: def.defaultSize?.height,
          measured: {                              
            width: def.defaultSize?.width,
            height: def.defaultSize?.height,
          },
        }),
        selected: false,
        dragging: false,
        resizing: false,
        ...(parent && { parentId: parent.id, extent: "parent" as const }),
      };

      /** Mise à jour des nœuds */
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

      /** Mise à jour des edges si un parent est trouvé pour cree une relation entre le parent et le nouveau nœud */
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
   * 
   * @argument _event : l'événement de fin de drag (non utilisé ici mais nécessaire pour la signature)
   * @argument node : le nœud qui a été déplacé
   * 
   * @returns Met à jour le parentId du nœud déplacé et ajuste sa position pour qu'elle soit relative au nouveau parent.
   * 
   */
  const handleNodeDragStop = useCallback(
    (_event: any, node: Node) => {

      const allNodes = getNodes();

      /** position par rapport au flow */
      const absPos = getAbsolutePosition(node, allNodes);
      /** position par rapport à l'écran */
      const screenPos = flowToScreenPosition(absPos);


      const newParent = findParentContainer(
        allNodes.filter((n) => n.id !== node.id),
        screenPos,
      );

      if (newParent && newParent.id !== node.parentId) {
        const absParent = getAbsolutePosition(newParent, allNodes);
        const relativePos = {
          x: Math.round(absPos.x - absParent.x),
          y: Math.round(absPos.y - absParent.y),
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
                parentId: newParent.id,
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
    [getNodes, setNodes, setEdges, flowToScreenPosition],
  );

  return { handleNodeDrop, handleDragHover, handleNodeDragStop };
}


export function isContainer(node: Node) {


  if (!node.data) return false;
  const def = nodeDefinitions[node.type as keyof typeof nodeDefinitions];

  return def?.isContainer === true;
}