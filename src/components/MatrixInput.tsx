import React from "react";
import { Matrix } from "../types/types";

interface MatrixInputProps {
  matrix: Matrix;
  onSizeChange: (id: number, type: "rows" | "columns", value: number) => void;
  onNameChange: (id: number, name: string) => void;
  onEnter: () => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  matrix,
  onSizeChange,
  onNameChange,
  onEnter,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div>
      <h2>行列 {matrix.id}</h2>
      <label>
        名前:
        <input
          type="text"
          value={matrix.name || ""}
          onChange={(e) => onNameChange(matrix.id, e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <label>
        縦方向のサイズ (1-10):
        <input
          type="number"
          value={matrix.rows}
          onChange={(e) =>
            onSizeChange(matrix.id, "rows", parseInt(e.target.value, 10))
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
          value={matrix.columns}
          onChange={(e) =>
            onSizeChange(matrix.id, "columns", parseInt(e.target.value, 10))
          }
          min="1"
          max="10"
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  );
};

export default MatrixInput;
