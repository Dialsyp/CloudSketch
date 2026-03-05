/* eslint-disable react-hooks/preserve-manual-memoization */
import React, { useCallback, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useReactFlowHandlers } from "./useReactFlowHandlers";

export default function ContextMenu({
  id,
  top = 0,
  left = 0,
  onClose,
  ...props
}: {
  id: string;
  top?: number;
  left?: number;
  onClose?: () => void;
  [key: string]: any;
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const node = getNode(id);
  const currentData = node?.data || {};

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    if (!node) return;
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);
  const closingMenu = () => {
    setIsEditing(false);
    onClose?.();
  };
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    closingMenu();
  }, [id, setNodes, setEdges]);

  const saveNode = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, ...editData },
            }
          : node,
      ),
    );
    closingMenu();
  }, [id, setNodes, editData]);

  const cancelEdit = () => {
    closingMenu();
    setEditData({});
  };

  return (
    <div
      style={{
        position: "fixed", // 🔥 FIXED au lieu d'absolute
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      }}
      className="bg-white border border-gray-300 shadow-2xl rounded-lg min-w-70 p-2 z-9999"
      {...props}
    >
      <p style={{ margin: "0.5em" }}>
        <small>node: {id}</small>
      </p>

      {!isEditing ? (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="border-none block p-2 text-left w-full hover:bg-gray-100 rounded-t-md"
          >
            ✏️ Modifier
          </button>
          <button
            onClick={duplicateNode}
            className="border-none block p-2 text-left w-full hover:bg-gray-100"
          >
            📋 Dupliquer
          </button>
          <button
            onClick={deleteNode}
            className="border-none block p-2 text-left w-full hover:bg-gray-100 rounded-b-md"
          >
            🗑️ Supprimer
          </button>
        </>
      ) : (
        <div className="p-3 space-y-3">
          {currentData &&
            Object.entries(currentData).map(([key, value], index) => (
              <div key={key || index} className="space-y-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                <input
                  type="text"
                  value={
                    editData[key] ??
                    (typeof value === "object" ? JSON.stringify(value) : value)
                  }
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      [key]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}

          <div className="flex gap-2 pt-2 border-t">
            <button
              onClick={saveNode}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              💾 Sauvegarder
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              ❌ Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
