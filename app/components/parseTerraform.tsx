import hclToJson from "hcl-to-json";
import { getCategoryResource } from "../contants/ressourceMap";

export type Node = {
  id: string;
  type: string;
  categoryResource: string;
  properties: any;
};

export type Edge = {
  from: string;
  to: string;
  relation: string;
};
export function parseTerraform(input: string, setGraph: any) {
  try {
    const parsed = hclToJson(input);
    const resources = parsed.resource || {};

    const graph = extractRelations(resources);
    console.log("Extracted Graph:", graph);
    console.log("parsed", parsed)
    setGraph(graph);
    // console.log("category", categories);
  } catch (err) {
    console.error(err);
  }
}

export function extractRelations(resources: any) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const resourceMap: any = {};

  for (const type in resources) {
    for (const name in resources[type]) {
      // const properties
      const properties = resources[type][name];
      console.log("properties", properties);
      resourceMap[name] = { type, properties };
      nodes.push({
        id: name,
        type,
        categoryResource:
          type === "azurerm_resource_group"
            ? "Resource group"
            : getCategoryResource(type),
        properties,
      });
    }
  }

  function detectReference(
    value: string,
    currentNodeId: string,
    relationKey: string,
  ) {
    const match = value.match(/^([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\./);
    if (match) {
      const target = match[2];
      if (resourceMap[target]) {
        edges.push({
          from: target,
          to: currentNodeId,
          relation: relationKey,
        });
      }
    }
  }
  for (const node of nodes) {
    const props = node.properties;
    for (const key in props) {
      const value = props[key];

      if (typeof value === "string") {
        detectReference(value, node.id, key);
      }
      // 🔹 Cas ARRAY (🔥 ton problème)
      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === "string") {
            detectReference(item, node.id, key);
          }
        }
      }

      // 🔹 Cas OBJET (ex: ip_configuration {})
      if (typeof value === "object" && !Array.isArray(value)) {
        for (const subKey in value) {
          console.log(`Inspecting ${node.id}.${key}.${subKey}:`, value[subKey]);
          const subValue = value[subKey];
          console.log("Inspecting subValue:", subValue);
          if (typeof subValue === "string") {
            detectReference(subValue, node.id, subKey);
          }

          if (Array.isArray(subValue)) {
            for (const item of subValue) {
              if (typeof item === "string") {
                detectReference(item, node.id, subKey);
              }
            }
          }
        }
      }
    }
  }

  return { nodes, edges };
}

export function buildTree(nodes: Node[], edges: Edge[]) {
  const nodeMap: any = {};
  const parentMap: any = {};
  nodes.forEach((node) => {
    nodeMap[node.id] = {
      ...node,
      children: [],
    };
  });
  // 2️⃣ Construire relation parent → child (UNE seule fois)
  edges.forEach((edge) => {
    if (nodeMap[edge.from] && nodeMap[edge.to]) {
      parentMap[edge.to] = edge.from;
    }
  });

  Object.keys(parentMap).forEach((childId) => {
    const parentId = parentMap[childId];
    if (nodeMap[parentId] && nodeMap[childId]) {
      nodeMap[parentId].children.push(nodeMap[childId]);
    }
  });

  const roots = nodes
    .filter((node) => !parentMap[node.id])
    .map((node) => nodeMap[node.id]);

  return roots;
}

export function RenderNode({ node }: any) {
  return (
    <div className="border-2 border-blue-500 rounded-xl p-4 bg-white shadow-md">
      <div className="font-bold text-blue-600">{node.type}</div>

      <div className="text-sm font-semibold text-gray-700 mb-4">{node.id}</div>

      {node.children.length > 0 && (
        <div className="ml-6 mt-4 space-y-4 border-l-4 border-gray-300 pl-4">
          {node.children.map((child: any) => (
            <RenderNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
