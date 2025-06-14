import Players from "./components/player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/Game_over";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winning_combinations.jsx";
const PLAYER = {
  X: "PLAYER1",
  O: "PLAYER2",
};
const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  const gameBoard = [...initialGameboard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      gameBoard[row][col] = player;
    }
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  function handleActive(rowIndex, colIndex) {
    //   setActivePlayer((current) => (current === "X" ? "O" : "X"));

    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updated = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updated;
    });
  }

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length == 9 && !winner;
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChange={handlePlayerChange}
          />
          <Players
            initialName={PLAYER.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChange={handlePlayerChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <Gameboard setSelectBox={handleActive} Board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
