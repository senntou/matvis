import React, { useRef, useEffect, useState } from "react";
import { MatrixOrChar } from "../types/types";

interface OutputHandlerProps {
  matrices: MatrixOrChar[];
  margin: number; // 行列間のマージンを追加
}

const RECT_MARGIN = 5;
const RECT_SCALE = 100;
const DEFAULT_FONT_SIZE = 48;
const TEXT_COLOR = "black";
const RECT_COLOR = "black";

const OutputHandler: React.FC<OutputHandlerProps> = ({ matrices, margin }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (matrices.length === 0) return;

    let totalWidth = RECT_MARGIN; // 初期値を元に戻す
    let maxHeight = 0;

    matrices.forEach((item) => {
      if ("rows" in item && "columns" in item) {
        const rectWidth = item.columns * RECT_SCALE;
        const rectHeight = item.rows * RECT_SCALE;
        totalWidth += rectWidth + margin; // 行列間のマージンを適用
        maxHeight = Math.max(maxHeight, rectHeight);
      } else if ("char" in item) {
        const charWidth = RECT_SCALE; // 固定サイズで表示
        const charHeight = RECT_SCALE;
        totalWidth += charWidth + margin; // 行列間のマージンを適用
        maxHeight = Math.max(maxHeight, charHeight);
      }
    });

    setCanvasSize({
      width: totalWidth,
      height: maxHeight + 2 * RECT_MARGIN,
    });
  }, [matrices, margin]); // marginを依存関係に追加

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentX = RECT_MARGIN; // 初期値を元に戻す
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
        const fontSize = item.fontSize || DEFAULT_FONT_SIZE;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          item.name || `A${index + 1}`,
          currentX + rectWidth / 2,
          y + rectHeight / 2,
        );

        currentX += rectWidth + margin; // 行列間のマージンを適用
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
        const fontSize = item.fontSize || DEFAULT_FONT_SIZE;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.char, currentX + boxWidth / 2, y + boxHeight / 2);

        currentX += boxWidth + margin; // 行列間のマージンを適用
      }
    });
  }, [matrices, canvasSize, margin]); // marginを依存関係に追加

  const handleOutput = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "output.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-fit w-fit border border-gray-400 rounded-lg p-4">
      <canvas
        className="sm:w-full w-80"
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleOutput}
      >
        ダウンロード
      </button>
    </div>
  );
};

export default OutputHandler;
