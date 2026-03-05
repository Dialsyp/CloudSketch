/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSidebarHandlers.ts
import { useCallback } from "react";
import { useReactFlow, XYPosition } from "@xyflow/react";
import { nodeDefinitions } from "../contants/nodeDefinition";

let id = 0;
export const getId = () => `dndnode_${id++}`;
const DEBUG_HITBOX = true;
export function useSidebarHandlers() {
  const { setNodes, screenToFlowPosition, getNodes } = useReactFlow();
  // 🔥 NOUVEAU : Hover pendant drag

  const handleDragHover = useCallback(
    (screenPosition: XYPosition) => {
      const dropPosition = screenToFlowPosition(screenPosition);
      const allNodes = getNodes();
      // Highlight parent container
      allNodes.forEach((node: any) => {
        console.log(node)
        if (!(node as any).isContainer) return;

        const w = node.measured?.width || 150;
        const h = node.measured?.height || 80;
        const absolutePos = getAbsolutePosition(node, allNodes);
        const isHovering =
          dropPosition.x >= absolutePos.x &&
          dropPosition.x <= absolutePos.x + w &&
          dropPosition.y >= absolutePos.y &&
          dropPosition.y <= absolutePos.y + h;
        // 🔥 UPDATE STYLE hover
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? {
                  ...n,
                  style: {
                    ...n.style,
                    border: isHovering ? "2px solid" : n.style?.border,
                    background: isHovering
                      ? "rgba(16, 185, 129, 0.2)"
                      : nodeDefinitions[n.type]?.background,
                    boxShadow: isHovering
                      ? "0 0 20px rgba(16, 185, 129, 0.4)"
                      : "none",
                  },
                }
              : n,
          ),
        );
      });
    },
    [setNodes, screenToFlowPosition, getNodes],
  );

  const handleNodeDrop = useCallback(
    (nodeType: string, screenPosition: XYPosition) => {
      // Vérif flow bounds
      const flow = document.querySelector(".react-flow") as HTMLElement;
      const flowRect = flow?.getBoundingClientRect();
      if (!flowRect || !isInFlowBounds(screenPosition, flowRect)) return;

      const position = screenToFlowPosition(screenPosition);
      const parentNode = findParentContainer(getNodes(), position);
      const def = nodeDefinitions[nodeType];
      let finalPosition = position;
      if (parentNode) {
        finalPosition = {
          x: Math.max(10, position.x - parentNode.position.x),
          y: Math.max(10, position.y - parentNode.position.y),
        };
      }
      const newNode = createNewNode(nodeType, finalPosition, def, parentNode);
      setNodes((nds) => {
        const cleanedDebug = nds.filter((n) => !n.data.isDebugHitbox);
        const newNodes = cleanedDebug.concat(newNode);

        // Reset style parent
        if (parentNode) {
          return newNodes.map((n) =>
            n.id === parentNode.id
              ? {
                  ...n,
                  style: {
                    ...parentNode.style,
                    border: parentNode.style?.border,
                    background: parentNode.style?.background,
                    boxShadow: "none",
                  },
                }
              : n,
          );
        }

        return newNodes;
      });
    },
    [setNodes, screenToFlowPosition, getNodes, nodeDefinitions],
  );

  return { handleNodeDrop, handleDragHover };
}
function getAbsolutePosition(node: any, allNodes: any[]): XYPosition {
  const pos: XYPosition = { x: node.position.x, y: node.position.y };
  if (node.parentId) {
    const parent = allNodes.find((n) => n.id === node.parentId);
    if (parent) {
      const parentPos = getAbsolutePosition(parent, allNodes);
      pos.x += parentPos.x;
      pos.y += parentPos.y;
    }
  }

  return pos;
}
function isInFlowBounds(position: XYPosition, flowRect: DOMRect): boolean {
  return (
    position.x >= flowRect.left &&
    position.x <= flowRect.right &&
    position.y >= flowRect.top &&
    position.y <= flowRect.bottom
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findParentContainer(allNodes: any[], dropPosition: XYPosition) {
  const candidates = allNodes
    .filter((node) => node.isContainer)
    .map((container) => {
      const absolutePos = getAbsolutePosition(container, allNodes);
      const w = container.measured?.width || 150;
      const h = container.measured?.height || 80;

      const isInside =
        dropPosition.x >= absolutePos.x &&
        dropPosition.x <= absolutePos.x + w &&
        dropPosition.y >= absolutePos.y &&
        dropPosition.y <= absolutePos.y + h;

      if (isInside) {
        const centerX = absolutePos.x + w / 2;
        const centerY = absolutePos.y + h / 2;
        const distance = Math.sqrt(
          Math.pow(dropPosition.x - centerX, 2) +
            Math.pow(dropPosition.y - centerY, 2),
        );

        return { node: container, distance, area: w * h };
      }
      return null;
    })
    .filter(Boolean);

  if (candidates.length === 0) return null;

  return candidates.sort((a, b) =>
    a!.distance !== b!.distance ? a!.distance - b!.distance : b!.area - a!.area,
  )[0]!.node;
}

function createNewNode(
  nodeType: string,
  position: XYPosition,
  def: any,
  parentNode?: any,
) {
  const nodeBase = {
    id: getId(),
    type: nodeType,
    position,
    data: {
      // label: def?.label || nodeType,
      name: `${nodeType.split("_").pop()}-${getId()}`,
      // isContainer: def?.isContainer || false,
      ...def?.defaults,
    },
    isContainer: def?.isContainer || false,
  };

  if (parentNode) {
    return {
      ...nodeBase,
      parentId: parentNode.id,
      extent: "parent",
      // expandParent: true,
    };
  }

  return nodeBase;
}
