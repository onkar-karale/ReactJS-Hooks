import { mistakes } from "./data";

export default function Remember() {
  return (
    <section className="example">
      <h3>4. Make it stick</h3>
      <p className="summary">
        The golden rules of the mathematician's notepad.
      </p>

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
        <strong>The Rule of Thumb:</strong> Do not wrap every variable in{" "}
        <code>useMemo</code>. Caching data takes up memory and has its own
        performance cost. Only reach for it when you are filtering large arrays,
        doing heavy math, or passing objects down to heavily optimized child
        components.
      </div>
    </section>
  );
}
