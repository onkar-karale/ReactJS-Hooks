import { useReducer } from "react";

const initialScore = [
  { id: 1, score: 0, name: "John" },
  { id: 2, score: 0, name: "Sally" },
];

const reducer = (
  state: typeof initialScore,
  action: { type: string; id: number },
) => {
  switch (action.type) {
    case "INCREASE":
      return state.map((player) =>
        player.id === action.id
          ? { ...player, score: player.score + 1 }
          : player,
      );
    case "DECREASE":
      return state.map((player) =>
        player.id === action.id && player.score > 0
          ? { ...player, score: player.score - 1 }
          : player,
      );
    default:
      return state;
  }
};

export function PlayerScoreDemo() {
  const [score, dispatch] = useReducer(reducer, initialScore);

  return (
    <div className="demo score-demo">
      <div className="score-board">
        {score.map((player) => (
          <div key={player.id} className="player-row">
            <span className="player-name">{player.name}</span>
            <div className="score-controls">
              <button
                onClick={() => dispatch({ type: "DECREASE", id: player.id })}
                disabled={player.score === 0}
              >
                -
              </button>
              <span className="player-score">{player.score}</span>
              <button
                onClick={() => dispatch({ type: "INCREASE", id: player.id })}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
