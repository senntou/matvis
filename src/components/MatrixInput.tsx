import React from "react";
import { MatrixOrChar } from "../types/types";

interface MatrixInputProps {
  item: MatrixOrChar;
  onSizeChange: (id: number, type: "rows" | "columns", value: number) => void;
  onNameChange: (id: number, name: string) => void;
  onCharChange: (id: number, char: string) => void;
  onAlignmentChange: (
    id: number,
    alignment: "top" | "middle" | "bottom",
  ) => void;
  onFontSizeChange: (id: number, fontSize: number) => void;
  onDelete: () => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  item,
  onSizeChange,
  onNameChange,
  onCharChange,
  onAlignmentChange,
  onFontSizeChange,
  onDelete,
}) => {
  return (
    <div className="matrix-input p-4 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        {"rows" in item && "columns" in item ? (
          <h2 className="text-lg font-semibold">行列</h2>
        ) : (
          <h2 className="text-lg font-semibold">文字</h2>
        )}
        <button
          className="h-8 w-16 bg-red-500 text-white flex items-center justify-center"
          onClick={() => onDelete()}
        >
          削除
        </button>
      </div>

      <label className="block mb-2">
        フォントサイズ:
        <input
          className="ml-2 p-1 border rounded"
          type="number"
          value={item.fontSize || 48}
          onChange={(e) => onFontSizeChange(item.id, parseInt(e.target.value, 10))}
          min="8"
          max="256"
        />
      </label>

      <label className="block mb-2">
        垂直方向の配置:
        <select
          className="ml-2 p-1 border rounded"
          value={item.verticalAlignment || "middle"}
          onChange={(e) =>
            onAlignmentChange(
              item.id,
              e.target.value as "top" | "middle" | "bottom",
            )
          }
        >
          <option value="top">上</option>
          <option value="middle">中央</option>
          <option value="bottom">下</option>
        </select>
      </label>

      {"rows" in item && "columns" in item ? (
        <>
          <label className="block mb-2">
            名前:
            <input
              className="ml-2 p-1 border rounded"
              type="text"
              value={item.name || ""}
              onChange={(e) => onNameChange(item.id, e.target.value)}
            />
          </label>

          <label className="block mb-2">
            縦方向のサイズ (1-10):
            <input
              className="ml-2 p-1 border rounded"
              type="number"
              value={item.rows}
              onChange={(e) =>
                onSizeChange(item.id, "rows", parseInt(e.target.value, 10))
              }
              min="1"
              max="10"
            />
          </label>

          <label className="block mb-2">
            横方向のサイズ (1-10):
            <input
              className="ml-2 p-1 border rounded"
              type="number"
              value={item.columns}
              onChange={(e) =>
                onSizeChange(item.id, "columns", parseInt(e.target.value, 10))
              }
              min="1"
              max="10"
            />
          </label>
        </>
      ) : (
        <label className="block mb-2">
          文字:
          <input
            className="ml-2 p-1 border rounded"
            type="text"
            value={item.char || ""}
            onChange={(e) => onCharChange(item.id, e.target.value)}
          />
        </label>
      )}
    </div>
  );
};

export default MatrixInput;
