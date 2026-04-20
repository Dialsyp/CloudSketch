import { XYPosition } from "@xyflow/react";

/**
 * Calcule la position absolue d'un nœud dans le canvas, 
 * en tenant compte de l'imbrication dans des parents.
 */
export function getAbsolutePosition(node: any, allNodes: any[]): XYPosition {
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

/**
 * Vérifie si une position (écran) est à l'intérieur des limites du canvas React Flow.
 */
export function isInFlowBounds(position: XYPosition, flowRect: DOMRect): boolean {
  return (
    position.x >= flowRect.left &&
    position.x <= flowRect.right &&
    position.y >= flowRect.top &&
    position.y <= flowRect.bottom
  );
}

/**
 * Trouve le container le plus spécifique (plus petite surface ou plus haute priorité)
 * à une position donnée.
 */
export function findParentContainer(
  allNodes: any[],
  dropPosition: XYPosition
): any | null {
  const CONTAINER_PRIORITY: Record<string, number> = {
    azurerm_subnet: 0,
    azurerm_virtual_network: 1,
    azurerm_resource_group: 2,
  };

  const candidates = allNodes
    .filter((node) => node.data?.isContainer === true)
    .map((container) => {
      const absolutePos = getAbsolutePosition(container, allNodes);
      const w = container.measured?.width ?? (container.style?.width as number) ?? 300;
      const h = container.measured?.height ?? (container.style?.height as number) ?? 200;

      const isInside =
        dropPosition.x >= absolutePos.x &&
        dropPosition.x <= absolutePos.x + w &&
        dropPosition.y >= absolutePos.y &&
        dropPosition.y <= absolutePos.y + h;

      if (!isInside) return null;

      return {
        node: container,
        priority: CONTAINER_PRIORITY[container.type] ?? 99,
        area: w * h,
      };
    })
    .filter(Boolean) as { node: any; priority: number; area: number }[];

  if (candidates.length === 0) return null;

  candidates.sort((a, b) =>
    a.priority !== b.priority ? a.priority - b.priority : a.area - b.area
  );

  return candidates[0].node;
}

/**
 * Trouve un nœud spécifique à une position donnée (pour les SKUs).
 */
export function findNodeAtPosition(
  allNodes: any[],
  dropPosition: XYPosition,
  compatibleTypes?: string[]
): any | null {
  const candidates = allNodes
    .filter((node) => !compatibleTypes || compatibleTypes.includes(node.type))
    .map((node) => {
      const absolutePos = getAbsolutePosition(node, allNodes);
      const w = node.measured?.width ?? 150;
      const h = node.measured?.height ?? 80;

      const isInside =
        dropPosition.x >= absolutePos.x &&
        dropPosition.x <= absolutePos.x + w &&
        dropPosition.y >= absolutePos.y &&
        dropPosition.y <= absolutePos.y + h;

      return isInside ? { node, area: w * h } : null;
    })
    .filter(Boolean) as { node: any; area: number }[];

  if (candidates.length === 0) return null;
  return candidates.sort((a, b) => a.area - b.area)[0].node;
}
