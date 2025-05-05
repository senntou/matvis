import { useState } from "react";
import { Matrix } from "./types/types";
import OutputHandler from "./components/OutputHandler";
import MatrixInput from "./components/MatrixInput";

function App() {
  const [matrices, setMatrices] = useState<Matrix[]>([]);
  const [matricesOutput, setMatricesOutput] = useState<Matrix[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const handleAddMatrix = () => {
    setMatrices([...matrices, { id: nextId, rows: 1, columns: 1 }]);
    setNextId(nextId + 1);
  };

  const handleOutput = () => {
    console.log("出力処理");
    setMatricesOutput(matrices);
  };

  const handleNameChange = (id: number, name: string) => {
    setMatrices(
      matrices.map((matrix) =>
        matrix.id === id ? { ...matrix, name } : matrix,
      ),
    );
  };

  const handleSizeChange = (
    id: number,
    type: "rows" | "columns",
    value: number,
  ) => {
    setMatrices(
      matrices.map((matrix) =>
        matrix.id === id ? { ...matrix, [type]: value } : matrix,
      ),
    );
  };

  return (
    <div>
      <h1>Vite + React</h1>
      <button onClick={handleAddMatrix}>行列を追加</button>
      <button onClick={handleOutput}>出力</button>
      {matrices.map((matrix) => (
        <MatrixInput
          key={matrix.id}
          matrix={matrix}
          onSizeChange={handleSizeChange}
          onNameChange={handleNameChange}
          onEnter={handleOutput}
        />
      ))}
      {matricesOutput.length > 0 && <OutputHandler matrices={matricesOutput} />}
    </div>
  );
}

export default App;
