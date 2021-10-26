import Board from "./Board";
import { useState, useEffect } from "react";

function calculateWinner(squares) {
  const condition = [
    [3, 4, 5],
    [0, 1, 2],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [0, 4, 8],
  ];
  for (let i = 0; i < condition.length; i++) {
    const [x, y, z] = condition[i];
    if (squares[x] === squares[y] && squares[x] === squares[z] && squares[x]) {
      return squares[x];
    }
  }
  return null;
}

function calculateNextValue(squares) {
  if (squares.filter(Boolean).length % 2 === 0) {
    return "X";
  } else {
    return "O";
  }
}

function calculateStatus(winner, squares, nextValue) {
  if (winner) {
    return `Winner:${winner}`;
  }
  // return draw if every place in board is filled
  if (squares.every(Boolean)) {
    return "Draw";
  } else {
    return `Next player:${nextValue}`;
  }
}

function Game() {
  // const [squares,setSquares] = useState(()=>JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null))
  const [currentStep, setCurrentStep] = useState(
    () => JSON.parse(window.localStorage.getItem("game:step")) || 0
  );
  const [history, setHistory] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("game:history")) || [
        Array(9).fill(null),
      ]
  );

  const currentSquares = history[currentStep];

  useEffect(() => {
    window.localStorage.setItem("game:step", JSON.stringify(currentStep));
    window.localStorage.setItem("game:history", JSON.stringify(history));
  }, [currentStep, history]);

  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return;
    }
    const newHistory = history.slice(0, currentStep + 1);
    const squaresCopy = [...currentSquares];
    squaresCopy[square] = nextValue;

    setHistory([...newHistory, squaresCopy]);
    setCurrentStep(newHistory.length);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  const moves = history.map((stepSquares, step) => {
    const desc = step === 0 ? "Go to game start" : `Go to move #${step}`;
    const isCurrentStep = step === currentStep;
    return (
      <li key={step}>
        <button
          className="historyBtn"
          onClick={() => setCurrentStep(step)}
          disabled={isCurrentStep}
        >
          {desc} {isCurrentStep ? "(current)" : null}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          Restart
        </button>
      </div>
      <div className="game-info">
        <div className="game-status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
