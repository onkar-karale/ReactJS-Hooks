import Code from "../../components/Code";
import { mistakes } from "./data";

// Stage 3: make it stick. Mistakes to avoid, where it fits in our project, and a recap.
const Remember = () => (
  <>
    {/* ---------- 10. Common mistakes ---------- */}
    <div className="example">
      <h3>10. The 8 most common mistakes</h3>
      {mistakes.map((m, i) => (
        <div className="rule" key={m.title}>
          <h4>
            {i + 1}. {m.title}
          </h4>
          <p>{m.why}</p>
          <div className="compare">
            <div>
              <span className="badge bad">Wrong</span>
              <Code>{m.bad}</Code>
            </div>
            <div>
              <span className="badge good">Right</span>
              <Code>{m.good}</Code>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* ---------- 11. In our project ---------- */}
    <div className="example">
      <h3>11. Where useEffect fits in our registration project</h3>
      <p>
        An honest answer: our registration form{" "}
        <strong>
          does not use <code>useEffect</code>
        </strong>
        , and that is correct. Every action in it starts from something the user
        does, which belongs in an event handler:
      </p>
      <table className="slots">
        <thead>
          <tr>
            <th>What happens in UserForm</th>
            <th>Where the code lives</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The user types in a field</td>
            <td>
              <code>onChange</code> handler
            </td>
          </tr>
          <tr>
            <td>The user leaves the Age field</td>
            <td>
              <code>onBlur</code> handler
            </td>
          </tr>
          <tr>
            <td>The user presses Submit and we call the API</td>
            <td>
              <code>onSubmit</code> handler
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Where we would add it:</strong> a table of saved entries that
        loads when the page opens. Nobody clicks to start that; the screen
        simply needs data, so it is a job for an effect:
      </p>
      <Code>{`useEffect(() => {
  const controller = new AbortController();

  const load = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/submissions", { signal: controller.signal });
      setEntries(await res.json());
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error(err);
    }
  };
  load();

  return () => controller.abort();   // UNDO: cancel if the component leaves early
}, []);                              // WHEN: once, when the page loads`}</Code>
      <div className="note">
        <strong>The rule:</strong> an event handler is for something the{" "}
        <em>user did</em>. An effect is for something the{" "}
        <em>screen needs to stay in sync with</em>.
      </div>
    </div>

    {/* ---------- 12. Recap ---------- */}
    <div className="example">
      <h3>12. Remember it forever</h3>
      <div className="recap">
        <p>
          <strong>What:</strong> <code>useEffect</code> runs an errand{" "}
          <strong>after</strong> the screen is drawn.
        </p>
        <p>
          <strong>Shape:</strong> <strong>Do, When, Undo</strong>:{" "}
          <code>{"useEffect(() => { DO; return () => UNDO; }, [WHEN])"}</code>
        </p>
        <p>
          <strong>The four rules:</strong>
        </p>
        <p>
          <strong>1. After drawing:</strong> effects run once the screen is
          updated. <strong>2. The array decides when:</strong> none means every
          render, <code>[]</code> means once, <code>[a, b]</code> means when
          they change. <strong>3. Return a function to undo</strong> timers,
          listeners and requests. <strong>4. Skip the effect</strong> if an
          event handler or a plain variable will do.
        </p>
        <p>
          <strong>Surprise to remember:</strong> in development, StrictMode runs
          effects an extra time on purpose. It is not a bug.
        </p>
      </div>
      <div className="note">
        <strong>Explain it in 20 seconds:</strong> "Rendering should only
        calculate the screen. For anything outside that, like fetching data,
        timers or changing the page title, we use useEffect. It runs after the
        screen is drawn. The dependency array controls when it re-runs, and the
        function we return cleans up, so we never leave timers or listeners
        behind."
      </div>
    </div>
  </>
);

export default Remember;
