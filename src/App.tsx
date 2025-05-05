import { useState } from "react";
import OutputHandler from "./components/OutputHandler";
import MatrixInput from "./components/MatrixInput";
import { MatrixOrChar } from "./types/types";

function App() {
  const [items, setItems] = useState<MatrixOrChar[]>([]);
  const [itemsOutput, setItemsOutput] = useState<MatrixOrChar[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const handleAddMatrix = () => {
    setItems([...items, { id: nextId, rows: 1, columns: 1 }]);
    setNextId(nextId + 1);
  };

  const handleAddChar = () => {
    setItems([...items, { id: nextId, char: "" }]);
    setNextId(nextId + 1);
  };

  const handleOutput = () => {
    console.log("出力処理");
    setItemsOutput(items);
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

  return (
    <div className="App">
      <h1>行列ビジュアライザー</h1>
      <button onClick={handleAddMatrix}>行列を追加</button>
      <button onClick={handleAddChar}>文字を追加</button>
      <button onClick={handleOutput}>出力</button>
      <div className="input-list">
        {items.map((item) => (
          <MatrixInput
            key={item.id}
            item={item}
            onSizeChange={handleSizeChange}
            onNameChange={handleNameChange}
            onCharChange={handleCharChange}
            onAlignmentChange={handleAlignmentChange}
            onEnter={handleOutput}
            onDelete={() => setItems(items.filter((i) => i.id !== item.id))}
          />
        ))}
      </div>
      <h2>出力</h2>
      {itemsOutput.length > 0 && <OutputHandler matrices={itemsOutput} />}
    </div>
  );
}

export default App;
