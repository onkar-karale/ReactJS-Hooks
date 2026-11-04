import Code from "../../components/Code";
import { DependencyDemo, FetchDemo, ResizeDemo, TimerDemo } from "./Demos";

// Stage 2: hands-on. Each section is a short explanation followed by a live demo.
const Practice = () => (
  <>
    {/* ---------- 5. Dependency modes ---------- */}
    <div className="example">
      <h3>5. The dependency array decides WHEN</h3>
      <table className="slots">
        <thead>
          <tr>
            <th>Code</th>
            <th>The effect runs</th>
            <th>Use it for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>{"useEffect(() => {...})"}</code>
            </td>
            <td>
              After <strong>every</strong> render
            </td>
            <td>Rarely. Almost always a mistake</td>
          </tr>
          <tr>
            <td>
              <code>{"useEffect(() => {...}, [])"}</code>
            </td>
            <td>
              Only after the <strong>first</strong> render
            </td>
            <td>Setup once: subscribe, load initial data</td>
          </tr>
          <tr>
            <td>
              <code>{"useEffect(() => {...}, [a, b])"}</code>
            </td>
            <td>
              First render, then whenever <strong>a or b changes</strong>
            </td>
            <td>Stay in sync with a value</td>
          </tr>
        </tbody>
      </table>
      <p>
        Press both counters, then <strong>Show</strong>. Notice that pressing{" "}
        <code>other</code> redraws the component, but the <code>[count]</code>{" "}
        effect ignores it:
      </p>
      <DependencyDemo />
      <div className="note">
        <strong>Why do the numbers start at 2?</strong> In development,{" "}
        <code>StrictMode</code> runs every effect twice on the first load. In a
        deployed app they would start at 1. Watch how the numbers{" "}
        <em>change</em>, not their starting value.
      </div>
    </div>

    {/* ---------- 6. Cleanup: timers ---------- */}
    <div className="example">
      <h3>6. Cleanup: always undo what you started</h3>
      <p>
        A timer keeps ticking until someone stops it. If an effect starts one
        and never stops it, you get a timer running forever, plus another one
        every time the effect re-runs. The returned function is where you stop
        it.
      </p>
      <div className="compare">
        <div>
          <span className="badge bad">No cleanup (timers pile up)</span>
          <Code>{`useEffect(() => {
  setInterval(() => tick(), 1000);
}, [running]);
// every re-run starts ANOTHER timer`}</Code>
        </div>
        <div>
          <span className="badge good">With cleanup</span>
          <Code>{`useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id);
}, [running]);
// the old timer is stopped first`}</Code>
        </div>
      </div>
      <p>
        <strong>Try the stopwatch.</strong> Start, Stop and Start again. It
        never counts double:
      </p>
      <TimerDemo />
    </div>

    {/* ---------- 7. Cleanup: listeners ---------- */}
    <div className="example">
      <h3>7. Cleanup: event listeners</h3>
      <p>
        Listening to the browser (window size, scrolling, keys) follows the same
        pattern: subscribe in the effect, unsubscribe in the cleanup. The empty
        array means "subscribe once".
      </p>
      <ResizeDemo />
      <Code>{`useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", onResize);               // DO
  return () => window.removeEventListener("resize", onResize);   // UNDO
}, []);                                                      // WHEN: once`}</Code>
    </div>

    {/* ---------- 8. Fetching ---------- */}
    <div className="example">
      <h3>8. Fetching data: the most common use</h3>
      <p>
        Click the user buttons. Each click changes <code>userId</code>, and
        because <code>userId</code> is in the dependency array, the effect
        fetches that user:
      </p>
      <FetchDemo />
      <h4>How the effect is built, piece by piece</h4>
      <ol className="steps">
        <li>
          <strong>An async function inside.</strong> The function you give to{" "}
          <code>useEffect</code> cannot be <code>async</code> itself, so you
          define one inside and call it.
        </li>
        <li>
          <strong>
            <code>[userId]</code> in the array.
          </strong>{" "}
          The effect uses <code>userId</code>, so it must be listed. A new id
          means a new fetch.
        </li>
        <li>
          <strong>
            <code>AbortController</code> in the cleanup.
          </strong>{" "}
          If you click User 3 and then User 4 quickly, the first request is
          cancelled, so a slow old answer can never overwrite a newer one.
        </li>
        <li>
          <strong>Loading is derived.</strong> We do not store an{" "}
          <code>isLoading</code> flag. We simply check whether the result
          belongs to the selected id.
        </li>
        <li>
          <strong>
            Check <code>res.ok</code>.
          </strong>{" "}
          <code>fetch</code> does not throw on a 404 or 500, so you must check.
        </li>
      </ol>
    </div>

    {/* ---------- 9. Do you need an effect? ---------- */}
    <div className="example">
      <h3>9. Do you even need an effect?</h3>
      <p>
        Beginners overuse <code>useEffect</code>. Before writing one, ask:{" "}
        <strong>is this reaching outside the component?</strong> If not, you
        probably do not need it.
      </p>
      <div className="compare">
        <div>
          <span className="badge bad">Effect for a calculation</span>
          <Code>{`const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);
// extra state + an extra render`}</Code>
        </div>
        <div>
          <span className="badge good">Just calculate it</span>
          <Code>{`const fullName = first + " " + last;
// always correct, zero extra code`}</Code>
        </div>
      </div>
      <table className="slots">
        <thead>
          <tr>
            <th>It happens because...</th>
            <th>Put it in</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The user did something (click, type, submit)</td>
            <td>
              An <strong>event handler</strong>
            </td>
          </tr>
          <tr>
            <td>It can be worked out from state or props</td>
            <td>
              A <strong>plain variable</strong> in the component
            </td>
          </tr>
          <tr>
            <td>The screen must stay in sync with something outside React</td>
            <td>
              <strong>useEffect</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

export default Practice;
