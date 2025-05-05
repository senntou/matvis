// types/types.ts
export interface Matrix {
  id: number;
  name?: string; // ← 追加
  rows: number;
  columns: number;
}
