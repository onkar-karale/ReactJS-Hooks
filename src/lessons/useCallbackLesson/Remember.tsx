import { mistakes } from "./data";

export default function Remember() {
  return (
    <section className="example">
      <h3>4. Make it stick</h3>
      <p className="summary">The golden rules of the laminating machine.</p>

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
        <strong>The Rule of Thumb:</strong> Don't use <code>useCallback</code>{" "}
        everywhere! Memoization costs memory. Only use it when passing functions
        down to heavily optimized child components (like those wrapped in{" "}
        <code>React.memo</code>) or when a function is used in a{" "}
        <code>useEffect</code> dependency array.
      </div>
    </section>
  );
}
