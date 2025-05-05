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
  onDelete: () => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  item,
  onSizeChange,
  onNameChange,
  onCharChange,
  onAlignmentChange,
  onDelete,
}) => {
  return (
    <div className="matrix-input">
      <div className="matrix-input-header">
        {"rows" in item && "columns" in item ? <h2>行列</h2> : <h2>文字</h2>}
        <button onClick={() => onDelete()}>削除</button>
      </div>

      <label>
        垂直方向の配置:
        <select
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
          <label>
            名前:
            <input
              type="text"
              value={item.name || ""}
              onChange={(e) => onNameChange(item.id, e.target.value)}
            />
          </label>

          <label>
            縦方向のサイズ (1-10):
            <input
              type="number"
              value={item.rows}
              onChange={(e) =>
                onSizeChange(item.id, "rows", parseInt(e.target.value, 10))
              }
              min="1"
              max="10"
            />
          </label>

          <label>
            横方向のサイズ (1-10):
            <input
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
        <label>
          文字:
          <input
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
