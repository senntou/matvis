import { useState } from "react";
import OutputHandler from "./components/OutputHandler";
import MatrixInput from "./components/MatrixInput";
import { MatrixOrChar } from "./types/types";

const INITIAL_ITEMS: MatrixOrChar[] = [
  { id: -1, rows: 4, columns: 4, name: "U", fontSize: 48 },
  { id: -2, char: "=", verticalAlignment: "middle", fontSize: 64 },
  { id: -3, rows: 4, columns: 2, name: "V", fontSize: 48 },
  { id: -4, rows: 2, columns: 4, name: "W", verticalAlignment: "top", fontSize: 48 },
];

function App() {
  const [items, setItems] = useState<MatrixOrChar[]>(INITIAL_ITEMS);
  const [nextId, setNextId] = useState<number>(1);
  const [margin, setMargin] = useState<number>(10); // 行列間のマージンを管理

  const handleAddMatrix = () => {
    setItems([...items, { id: nextId, rows: 1, columns: 1, fontSize: 16 }]);
    setNextId(nextId + 1);
  };

  const handleAddChar = () => {
    setItems([...items, { id: nextId, char: "", fontSize: 16 }]);
    setNextId(nextId + 1);
  };

  const handleNameChange = (id: number, name: string) => {
    setItems(
      items.map((item) =>
        "rows" in item && item.id === id ? { ...item, name } : item,
      ),
    );
  };

  const handleSizeChange = (
    id: number,
    type: "rows" | "columns",
    value: number,
  ) => {
    setItems(
      items.map((item) =>
        "rows" in item && item.id === id ? { ...item, [type]: value } : item,
      ),
    );
  };

  const handleCharChange = (id: number, char: string) => {
    setItems(
      items.map((item) =>
        "char" in item && item.id === id ? { ...item, char } : item,
      ),
    );
  };

  const handleAlignmentChange = (
    id: number,
    alignment: "top" | "middle" | "bottom",
  ) => {
    setItems(
      items.map((item) =>
        ("rows" in item || "char" in item) && item.id === id
          ? { ...item, verticalAlignment: alignment }
          : item,
      ),
    );
  };

  const handleFontSizeChange = (id: number, fontSize: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, fontSize } : item,
      ),
    );
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-4">
        行列ビジュアライザー
      </h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={handleAddMatrix}
      >
        行列を追加
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={handleAddChar}
      >
        文字を追加
      </button>

      <label className="block mb-4">
        行列間のマージン (px):
        <input
          className="ml-2 p-1 border rounded"
          type="number"
          value={margin}
          onChange={(e) => setMargin(parseInt(e.target.value, 10))}
          min="0"
          max="100"
        />
      </label>

      <div className="flex gap-1">
        {items.map((item) => (
          <MatrixInput
            key={item.id}
            item={item}
            onSizeChange={handleSizeChange}
            onNameChange={handleNameChange}
            onCharChange={handleCharChange}
            onAlignmentChange={handleAlignmentChange}
            onFontSizeChange={handleFontSizeChange}
            onDelete={() => setItems(items.filter((i) => i.id !== item.id))}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold my-4">出力</h2>
      {items.length > 0 && <OutputHandler matrices={items} margin={margin} />}
    </div>
  );
}

export default App;
