import React, { useRef, useEffect, useState } from "react";
import { MatrixOrChar } from "../types/types";

interface OutputHandlerProps {
  matrices: MatrixOrChar[];
}

const RECT_MARGIN = 5;
const RECT_SCALE = 100;
const TEXT_FONT = "bold 48px Arial";
const TEXT_COLOR = "black";
const RECT_COLOR = "black";
const CHAR_FONT = "bold 64px Arial"; // Char用のフォント

const OutputHandler: React.FC<OutputHandlerProps> = ({ matrices }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (matrices.length === 0) return;

    let totalWidth = RECT_MARGIN;
    let maxHeight = 0;

    matrices.forEach((item) => {
      if ("rows" in item && "columns" in item) {
        const rectWidth = item.columns * RECT_SCALE;
        const rectHeight = item.rows * RECT_SCALE;
        totalWidth += rectWidth + RECT_MARGIN;
        maxHeight = Math.max(maxHeight, rectHeight);
      } else if ("char" in item) {
        const charWidth = RECT_SCALE; // 固定サイズで表示
        const charHeight = RECT_SCALE;
        totalWidth += charWidth + RECT_MARGIN;
        maxHeight = Math.max(maxHeight, charHeight);
      }
    });

    setCanvasSize({
      width: totalWidth,
      height: maxHeight + 2 * RECT_MARGIN,
    });
  }, [matrices]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentX = RECT_MARGIN;
    const centerY = canvasSize.height / 2;

    matrices.forEach((item, index) => {
      if ("rows" in item && "columns" in item) {
        const rectWidth = item.columns * RECT_SCALE;
        const rectHeight = item.rows * RECT_SCALE;

        let y = centerY - rectHeight / 2;
        switch (item.verticalAlignment) {
          case "top":
            y = RECT_MARGIN;
            break;
          case "bottom":
            y = canvasSize.height - rectHeight - RECT_MARGIN;
            break;
        }

        ctx.strokeStyle = RECT_COLOR;
        ctx.lineWidth = 2;
        ctx.strokeRect(currentX, y, rectWidth, rectHeight);

        ctx.fillStyle = TEXT_COLOR;
        ctx.font = TEXT_FONT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          item.name || `A${index + 1}`,
          currentX + rectWidth / 2,
          y + rectHeight / 2,
        );

        currentX += rectWidth + RECT_MARGIN;
      } else if ("char" in item) {
        const boxWidth = RECT_SCALE;
        const boxHeight = RECT_SCALE;

        let y = centerY - boxHeight / 2;
        switch (item.verticalAlignment) {
          case "top":
            y = RECT_MARGIN;
            break;
          case "bottom":
            y = canvasSize.height - boxHeight - RECT_MARGIN;
            break;
        }

        ctx.strokeStyle = RECT_COLOR;
        // ctx.strokeRect(currentX, y, boxWidth, boxHeight);

        ctx.fillStyle = TEXT_COLOR;
        ctx.font = CHAR_FONT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.char, currentX + boxWidth / 2, y + boxHeight / 2);

        currentX += boxWidth + RECT_MARGIN;
      }
    });
  }, [matrices, canvasSize]);

  return (
    <div className="border">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </div>
  );
};

export default OutputHandler;
