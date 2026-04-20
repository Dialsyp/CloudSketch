import { create } from "zustand";
import { XYPosition, useReactFlow } from "@xyflow/react";

type OnDropAction = (args: { position: XYPosition }) => void;

interface DnDState {
  isDragging: boolean;
  dropAction: OnDropAction | null;

  onDragStart: (
    event: React.PointerEvent<HTMLDivElement>,
    onDrop: OnDropAction,
  ) => void;
  onDragEnd: (event: PointerEvent) => void;
  onDragMove: (event: PointerEvent) => void;

  dragPosition: XYPosition | null; // pour ton "drag ghost"
}

export const useDnDStore = create<DnDState>((set, get) => {
  const { screenToFlowPosition } = useReactFlow();

  const onDragStart = (
    event: React.PointerEvent<HTMLDivElement>,
    onDrop: OnDropAction,
  ) => {
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    set({ isDragging: true, dropAction: onDrop });
  };

  const onDragEnd = (event: PointerEvent) => {
    const { isDragging, dropAction } = get();

    if (!isDragging) {
      set({ isDragging: false });
      return;
    }

    (event.target as HTMLElement).releasePointerCapture(event.pointerId);

    const elementUnderPointer = document.elementFromPoint(
      event.clientX,
      event.clientY,
    );
    const isDroppingOnFlow = elementUnderPointer?.closest(".react-flow");

    event.preventDefault();

    if (isDroppingOnFlow && dropAction) {
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      dropAction({ position: flowPosition });
    }

    set({ isDragging: false, dropAction: null });
  };

  const onDragMove = (event: PointerEvent) => {
    event.preventDefault();
    set({ dragPosition: { x: event.clientX, y: event.clientY } });
  };

  return {
    isDragging: false,
    dropAction: null,
    dragPosition: null,

    onDragStart,
    onDragEnd,
    onDragMove,
  };
});
