export default function Gameboard({ setSelectBox, Board }) {
  //   const [gameChange, setGameChange] = useState(initialGameboard);
  //   function handleGameChange(rowIndex, colIndex) {
  //     setGameChange((prevGame) => {
  //       const updatedBoard = [...prevGame.map((innerArray) => [...innerArray])];
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });
  //     setSelectBox();
  //   }

  return (
    <ol id="game-board">
      {Board.map((items, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {items.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => setSelectBox(rowIndex, colIndex)}
                  disabled={playerSymbol != null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
