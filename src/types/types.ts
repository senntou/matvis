export interface Matrix {
  id: number;
  name?: string;
  rows: number;
  columns: number;
  verticalAlignment?: "top" | "middle" | "bottom";
}

// 新しいChar型を追加
export interface Char {
  id: number;
  char: string;
  verticalAlignment?: "top" | "middle" | "bottom";
}

// MatrixまたはCharを受け取れるようにする
export type MatrixOrChar = Matrix | Char;
