import { mistakes } from "./data";

export default function Remember() {
  return (
    <section className="example">
      <h3>4. Make it stick</h3>
      <p className="summary">The golden rules of the reducer vault.</p>

      {mistakes.map((rule, i) => (
        <div key={i} className="rule">
          <h4>{rule.title}</h4>
          <p>{rule.desc}</p>
          <div className="compare">
            <div>
              <span className="badge bad">Mistake</span>
              <pre className="bad-code">
                <code>{rule.bad}</code>
              </pre>
            </div>
            <div>
              <span className="badge good">Correct</span>
              <pre className="good-code">
                <code>{rule.good}</code>
              </pre>
            </div>
          </div>
        </div>
      ))}

      <div className="recap">
        <strong>The Rule of Thumb:</strong> If your next state depends on the
        previous state AND involves nested objects or arrays, drop{" "}
        <code>useState</code>. Reach for <code>useReducer</code>.
      </div>
    </section>
  );
}
