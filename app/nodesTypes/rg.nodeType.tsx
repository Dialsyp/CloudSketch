"use client";
import { NodeResizer } from "@xyflow/react";
import { memo } from "react";

const RgNodeType = memo(
  ({
    data,
    selected,
  }: {
    data: { name: string; location: string };
    selected: boolean;
  }) => {
    return (
      <>
        {/* 🔥 NodeResizer TOUJOURS EN PREMIER (sans children) */}
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={200}
          minHeight={80}
          lineClassName="border-blue-500/50"
          handleClassName="bg-pink-500 hover:bg-pink-400 w-4 h-4"
        />
        <div className="w-full h-full min-h-40 min-w-52 ">
          <div className="text-black absolute -top-6">{data.name}</div>

          <div className="text-black absolute -top-6 right-0">
            {data.location}
          </div>
        </div>
      </>
    );
  },
);

RgNodeType.displayName = "RgNodeType";
export default RgNodeType;
