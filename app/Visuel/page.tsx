// app/Visuel/page.tsx
"use client";
import Link from "next/link";
import { useReactFlowHandlers } from "../components/useReactFlowHandlers";
import { useSidebarHandlers } from "../components/useSidebarHandlers";
import { Sidebar } from "../components/sideBar";
import { FlowCanvas } from "../components/FlowCanvas";
import { config } from "../contants/config";
import { HeaderSection } from "../components/Visuel/Sections";

export default function Visuel() {
  const { nodes, edges, menu, reactFlowRef, handlers } = useReactFlowHandlers(
    config.initialNodes,
  );
  const { handleNodeDragStop } = useSidebarHandlers();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0a0a0f] overflow-hidden">
      {/* ── TOPBAR ───────────────────────────────────────────────── */}
      <HeaderSection />

      {/* ── EDITOR BODY ──────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <main className="flex-1 relative overflow-hidden">
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            handlers={handlers}
            menu={menu}
            reactFlowRef={reactFlowRef}
            onNodeDragStop={handleNodeDragStop}
          />

          {/* Floating hint — bottom center */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2
                          pointer-events-none z-10"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-[#0d0d14]/90 border border-white/5
                            backdrop-blur-sm text-xs text-white/30"
            >
              <kbd
                className="px-1.5 py-0.5 rounded bg-white/5 text-white/40
                              font-mono text-[10px]"
              >
                Scroll
              </kbd>
              to zoom ·
              <kbd
                className="px-1.5 py-0.5 rounded bg-white/5 text-white/40
                              font-mono text-[10px]"
              >
                Right-click
              </kbd>
              on a node for options
            </div>
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
