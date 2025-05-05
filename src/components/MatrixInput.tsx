import React from "react";
import { MatrixOrChar } from "../types/types";

interface MatrixInputProps {
  item: MatrixOrChar;
  onSizeChange: (id: number, type: "rows" | "columns", value: number) => void;
  onNameChange: (id: number, name: string) => void;
  onCharChange: (id: number, char: string) => void;
  onEnter: () => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  item,
  onSizeChange,
  onNameChange,
  onCharChange,
  onEnter,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className="matrix-input">
      <h2>ID: {item.id}</h2>
      {"rows" in item && "columns" in item ? (
        <>
          <label>
            名前:
            <input
              type="text"
              value={item.name || ""}
              onChange={(e) => onNameChange(item.id, e.target.value)}
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />
        </label>
      )}
    </div>
  );
};

export default MatrixInput;
