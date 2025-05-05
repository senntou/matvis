import React, { useRef, useEffect, useState } from "react";
import { Matrix } from "../types/types";

interface OutputHandlerProps {
  matrices: Matrix[];
}

// 定数
const RECT_MARGIN = 5; // マージン
const RECT_SCALE = 50; // 1セルあたりのピクセルサイズ
const TEXT_FONT = "bold 16px Arial";
const TEXT_COLOR = "black";
const RECT_COLOR = "black";

const OutputHandler: React.FC<OutputHandlerProps> = ({ matrices }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (matrices.length === 0) return;

    // サイズ計算
    let totalWidth = RECT_MARGIN;
    let maxHeight = 0;

    matrices.forEach((matrix) => {
      const rectWidth = matrix.columns * RECT_SCALE;
      const rectHeight = matrix.rows * RECT_SCALE;

      totalWidth += rectWidth + RECT_MARGIN;
      if (rectHeight > maxHeight) {
        maxHeight = rectHeight;
      }
    });

    setCanvasSize({
      width: totalWidth,
      height: maxHeight + 2 * RECT_MARGIN,
    });
  }, [matrices]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set styles
        context.strokeStyle = RECT_COLOR;
        context.lineWidth = 2;
        context.font = TEXT_FONT;
        context.fillStyle = TEXT_COLOR;
        context.textAlign = "center";
        context.textBaseline = "middle";

        // 描画処理
        let currentX = RECT_MARGIN;

        matrices.forEach((matrix, index) => {
          const rectWidth = matrix.columns * RECT_SCALE;
          const rectHeight = matrix.rows * RECT_SCALE;
          const x = currentX;
          const y = RECT_MARGIN;

          // 矩形
          context.strokeRect(x, y, rectWidth, rectHeight);

          // テキストラベル
          context.fillText(
            `${matrix.name || `A${index + 1}`}`,
            x + rectWidth / 2,
            y + rectHeight / 2,
          );

          currentX += rectWidth + RECT_MARGIN;
        });
      }
    }
  }, [matrices, canvasSize]);

  return (
    <div style={{ border: "1px solid gray", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </div>
  );
};

export default OutputHandler;
