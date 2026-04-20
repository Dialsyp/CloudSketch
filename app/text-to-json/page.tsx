"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  buildTree,
  Edge,
  Node,
  parseTerraform,
  RenderNode,
} from "../components/parseTerraform";
// import { buildTree, parseTerraform, RenderNode } from "./components/parseTerraform";

export default function Home() {
  const [input, setInput] = useState("");
  const [graph, setGraph] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({
    nodes: [],
    edges: [],
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="w-full max-w-3xl p-10 space-y-6">
        <textarea
          className="w-full h-60 p-3 border rounded text-black"
          placeholder="Paste Terraform here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => parseTerraform(input, setGraph)}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Parse Terraform
        </button>
        {graph.nodes.length > 0 ? (
          <div className="mt-8 space-y-6">
            {buildTree(graph.nodes, graph.edges).map((root: any) => (
              <RenderNode key={root.id} node={root} />
            ))}
          </div>
        ) : (
          <p className="text-red-500">
            No resources found in the Terraform input.
          </p>
        )}
      </main>
    </div>
  );
}
