import Code from "../../components/Code";
import { PlayerScoreDemo } from "./Demos";

export default function Practice() {
  return (
    <section className="example">
      <h3>3. See it in action</h3>
      <p>
        Let's build a scoreboard. Instead of writing multiple `useState`
        functions to find a player and update their score, we send a single
        action: <code>{`{ type: "INCREASE", id: 1 }`}</code>.
      </p>

      <PlayerScoreDemo />

      <h4>How it works under the hood:</h4>
      <Code>
        {`const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return state.map((player) => {
        if (player.id === action.id) {
          // Never modify directly! Always return a fresh copy.
          return { ...player, score: player.score + 1 };
        }
        return player;
      });
    case "DECREASE":
      // ... logic for decreasing
    default:
      return state; // Always have a fallback
  }
};`}
      </Code>
    </section>
  );
}
