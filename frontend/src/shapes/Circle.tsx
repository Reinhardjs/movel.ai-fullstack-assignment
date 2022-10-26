import { useRef, useEffect, useCallback } from "react";
import { Circle as KonvaCircle, Transformer } from "react-konva";

import { selectShape, moveShape, useStates } from "../utils/stateUtils";

export function Circle({ id, isSelected, type, ...shapeProps }: { id: string, isSelected: boolean, type: string }) {
  const isDrawing = useStates((state) => state.isDrawing);
  const shapeRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleSelect = useCallback(
    (event: any) => {
      event.cancelBubble = true;
      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (event: any) => {
      moveShape(id, event);
    },
    [id]
  );

  return (
    <>
      <KonvaCircle
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={!isDrawing}
        onDragEnd={handleDrag}
      />
      {isSelected && (
        <Transformer
          anchorSize={5}
          borderDash={[6, 2]}
          ref={transformerRef}
          rotateEnabled={false}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-right",
            "bottom-left",
          ]}
        // boundBoxFunc={boundBoxCallbackForCircle}
        />
      )}
    </>
  );
}
