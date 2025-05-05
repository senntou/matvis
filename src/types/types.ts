export interface Matrix {
  id: number;
  name?: string;
  rows: number;
  columns: number;
}

// 新しいChar型を追加
export interface Char {
  id: number;
  char: string;
}

// MatrixまたはCharを受け取れるようにする
export type MatrixOrChar = Matrix | Char;
