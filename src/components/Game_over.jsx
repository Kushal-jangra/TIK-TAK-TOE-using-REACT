export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>GameOver!</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && <p>It's a draw</p>}
      <p>
        <button onClick={onRestart}>Restart</button>
      </p>
    </div>
  );
}
