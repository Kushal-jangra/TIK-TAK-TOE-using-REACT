import { useState } from "react";

export default function Players({ initialName, symbol, isActive, onChange }) {
  const [playerName, setplayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleEditing() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChange(symbol, playerName);
    }
  }
  let displayName;
  function handleName(event) {
    setplayerName(event.target.value);
  }
  if (isEditing) {
    displayName = (
      <input type="text" required value={playerName} onChange={handleName} />
    );
  } else {
    displayName = <span className="player-name">{playerName}</span>;
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player">{displayName}</span>
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}
