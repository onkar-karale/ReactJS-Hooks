import Code from "../../components/Code";
import {
  FocusDemo,
  PreviousDemo,
  ReadOnSubmitDemo,
  RenderCountDemo,
  StopwatchDemo,
  ThreeWayDemo,
} from "./Demos";

const Practice = () => {
  return (
    <>
      {/* ---------- 5. COUNT RENDERS ---------- */}
      <div className="example">
        <h3>5. Try it: count renders without a loop</h3>
        <p>
          Here is the fix for the problem from section 2. The counter lives in a
          ref, so updating it never triggers another render.
        </p>
        <RenderCountDemo />
        <Code>{`function App() {
  const [text, setText] = useState("");
  const renders = useRef(0);          // 1. create the box

  useEffect(() => {
    renders.current += 1;             // 2. update it after each render
  });

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <h1>Renders: {renders.current}</h1>   {/* 3. read it */}
    </>
  );
}`}</Code>
        <div className="note">
          <strong>Why is it one behind?</strong> React draws the screen first.
          Only afterwards does the effect add 1, and a ref change does not
          redraw. So the number you see is the count from the previous render.
          That is the "silent" part of useRef in action.
        </div>
      </div>

      {/* ---------- 6. THREE WAY COMPARE ---------- */}
      <div className="example">
        <h3>6. State vs ref vs plain variable, side by side</h3>
        <p>
          The best way to feel the difference is to poke all three. Each card
          holds a counter. Click the buttons, then press <em>Force a redraw</em>
          .
        </p>
        <ThreeWayDemo />
      </div>

      {/* ---------- 7. DOM ACCESS ---------- */}
      <div className="example">
        <h3>7. Reaching into the page: the remote control</h3>
        <p>
          The second job of <code>useRef</code> is grabbing a real element. Try
          the buttons. They control the input directly:
        </p>
        <FocusDemo />

        <h4>Three steps</h4>
        <ol className="steps">
          <li>
            <strong>Create</strong> the ref:{" "}
            <code>const inputRef = useRef(null)</code>
          </li>
          <li>
            <strong>Attach</strong> it to an element with the <code>ref</code>{" "}
            attribute
          </li>
          <li>
            <strong>Use</strong> <code>inputRef.current</code>, which is now the
            real DOM element
          </li>
        </ol>

        <Code>{`function App() {
  const inputRef = useRef(null);                   // 1. create

  const focusInput = () => {
    inputRef.current.focus();                      // 3. use the real element
  };

  return (
    <>
      <input type="text" ref={inputRef} />         {/* 2. attach */}
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}`}</Code>
        <div className="note">
          <strong>Why not just document.getElementById?</strong> A ref is tied
          to this exact component instance, so two copies of the component never
          grab each other's input. It also works before you have to worry about
          ids.
        </div>
      </div>

      {/* ---------- 8. PREVIOUS VALUE ---------- */}
      <div className="example">
        <h3>8. Variation: remember the previous value</h3>
        <p>
          Type a few letters. The "previous" line always shows what the box held
          one change ago.
        </p>
        <PreviousDemo />
        <Code>{`function App() {
  const [value, setValue] = useState("");
  const previous = useRef("");

  useEffect(() => {
    previous.current = value;      // runs AFTER the screen shows the old one
  }, [value]);

  return (
    <>
      <h2>Current: {value}</h2>
      <h2>Previous: {previous.current}</h2>
    </>
  );
}`}</Code>
        <div className="note">
          <strong>The trick is the order.</strong> 1) You type, state changes.
          2) React draws the screen, and the ref still holds the old value, so
          that is what appears. 3) The effect runs and puts the new value in the
          ref, ready for next time.
        </div>
      </div>

      {/* ---------- 9. TIMER ID ---------- */}
      <div className="example">
        <h3>9. Variation: remember a timer so you can stop it</h3>
        <p>
          A very common real-world use. <code>setInterval</code> gives back an
          id, and you need that same id later to stop the clock. The screen
          never shows the id, so it belongs in a ref.
        </p>
        <StopwatchDemo />
        <Code>{`const [seconds, setSeconds] = useState(0);   // the screen shows this
const timerId = useRef(null);                  // the screen never shows this

const start = () => {
  timerId.current = setInterval(() => setSeconds(s => s + 1), 1000);
};

const stop = () => {
  clearInterval(timerId.current);              // same id, even after re-renders
  timerId.current = null;
};`}</Code>
        <div className="note">
          <strong>Rule of thumb:</strong> things the user sees go in state, and
          things only your code needs go in a ref.
        </div>
      </div>

      {/* ---------- 10. UNCONTROLLED INPUT + CHOOSING ---------- */}
      <div className="example">
        <h3>10. Variation: read an input only when you need it</h3>
        <p>
          With state, every keystroke redraws the component. If you only need
          the text when the user presses a button, a ref can read it on demand:
        </p>
        <ReadOnSubmitDemo />

        <div className="compare">
          <div>
            <span className="badge good">State (controlled)</span>
            <Code>{`const [name, setName] = useState("");

<input
  value={name}
  onChange={e => setName(e.target.value)}
/>
// redraws on every keystroke`}</Code>
          </div>
          <div>
            <span className="badge good">Ref (uncontrolled)</span>
            <Code>{`const nameRef = useRef(null);

<input ref={nameRef} />
// read once, when needed:
nameRef.current.value`}</Code>
          </div>
        </div>

        <table className="slots">
          <thead>
            <tr>
              <th>Choose state when...</th>
              <th>Choose a ref when...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The screen must change with the value</td>
              <td>The screen never needs to show the value</td>
            </tr>
            <tr>
              <td>You validate or filter while typing</td>
              <td>You read the value once, on submit</td>
            </tr>
            <tr>
              <td>Other components depend on it</td>
              <td>It is a timer id, a previous value or a counter</td>
            </tr>
            <tr>
              <td>You want React to track it</td>
              <td>You need to control a DOM element (focus, scroll, play)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Practice;
