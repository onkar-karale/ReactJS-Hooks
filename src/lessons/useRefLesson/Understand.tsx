import Code from "../../components/Code";

const Understand = () => {
  return (
    <>
      {/* ---------- 1. THE BIG IDEA ---------- */}
      <div className="example">
        <h3>1. The big idea: a sticky note in your pocket</h3>
        <p>
          Remember the stadium scoreboard from <code>useState</code>? Every time
          the score changes, the whole stadium looks up and sees it. That is
          great for things the crowd must see.
        </p>
        <p>
          But sometimes you only need to{" "}
          <strong>remember something privately</strong>: how many times the
          board was updated, or the phone number of the person who runs the
          clock. You jot it on a <strong>sticky note in your pocket</strong>.
          You can rewrite it as often as you like, and nobody in the stadium
          looks up, because nothing on the board changed.
        </p>
        <p>
          That sticky note is <code>useRef</code>.
        </p>

        <table className="slots">
          <thead>
            <tr>
              <th>Everyday world</th>
              <th>React</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The sticky note in your pocket</td>
              <td>
                <strong>The ref</strong>, made with <code>useRef()</code>
              </td>
            </tr>
            <tr>
              <td>What is written on the note</td>
              <td>
                <strong>The value</strong>, stored in <code>ref.current</code>
              </td>
            </tr>
            <tr>
              <td>Rewriting the note</td>
              <td>
                <code>ref.current = newValue</code>:{" "}
                <strong>no re-render</strong>
              </td>
            </tr>
            <tr>
              <td>The note is still there after the crowd looks away</td>
              <td>The value survives every re-render</td>
            </tr>
            <tr>
              <td>A TV remote that controls one specific TV</td>
              <td>
                A ref attached to a DOM element, so you can control it directly
              </td>
            </tr>
          </tbody>
        </table>

        <div className="note">
          <strong>
            That is all <code>useRef</code> is:
          </strong>{" "}
          a box that keeps its value between renders and can be changed without
          redrawing the screen. It also doubles as a remote control for real
          elements on the page.
        </div>

        <div className="three-steps">
          <div>
            <h4>Job 1: Remember</h4>
            <p>Keep a value across renders without causing a re-render.</p>
          </div>
          <div>
            <h4>Job 2: Reach</h4>
            <p>Grab a real DOM element to focus it, read it, or scroll it.</p>
          </div>
          <div>
            <h4>Job 3: Compare</h4>
            <p>
              Hold the previous value so you can compare it with the new one.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- 2. THE PROBLEM ---------- */}
      <div className="example">
        <h3>2. The problem it solves</h3>
        <p>
          Say you want to count how many times your component has rendered. Your
          first instinct: use state.
        </p>

        <Code>{`function App() {
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    setRenders(renders + 1);   // changing state causes a re-render...
  });                          // ...which runs the effect again... forever

  return <h1>Renders: {renders}</h1>;
}`}</Code>

        <div className="note">
          <strong>Infinite loop.</strong> <code>setRenders</code> redraws the
          component, the redraw runs the effect, the effect calls{" "}
          <code>setRenders</code> again. The counter itself is what keeps
          causing renders.
        </div>

        <p>
          What about a normal variable? <code>let renders = 0</code> inside the
          component is created fresh on <em>every</em> render, so it is always 0
          again. It cannot remember anything.
        </p>

        <div className="compare">
          <div>
            <span className="badge bad">Normal variable</span>
            <Code>{`let renders = 0;
// forgotten on the next render`}</Code>
          </div>
          <div>
            <span className="badge good">useRef</span>
            <Code>{`const renders = useRef(0);
// remembered, and silent`}</Code>
          </div>
        </div>
      </div>

      {/* ---------- 3. ANATOMY ---------- */}
      <div className="example">
        <h3>3. Reading the one line of code</h3>

        <pre className="anatomy">
          <span className="t-kw">const </span>
          <span className="t-value">count</span>
          <span className="t-kw"> = </span>
          <span className="t-hook">useRef</span>
          {"("}
          <span className="t-init">0</span>
          {");"}
        </pre>

        <table className="slots">
          <thead>
            <tr>
              <th>Part</th>
              <th>What it is</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="t-value">count</span>
              </td>
              <td>
                The box. A plain object that React keeps the same on every
                render.
              </td>
            </tr>
            <tr>
              <td>
                <span className="t-hook">useRef</span>
              </td>
              <td>
                The hook that creates the box once and hands the same box back
                afterwards.
              </td>
            </tr>
            <tr>
              <td>
                <span className="t-init">0</span>
              </td>
              <td>The starting value, used only on the very first render.</td>
            </tr>
          </tbody>
        </table>

        <p>
          What is actually inside the box? Just one thing, called{" "}
          <code>current</code>:
        </p>
        <p>
          <span className="ref-obj">
            count = {"{ "}current: <b>0</b>
            {" }"}
          </span>
        </p>

        <Code>{`const count = useRef(0);

console.log(count.current);       // read  -> 0
count.current = count.current + 1; // write -> no re-render!
console.log(count.current);       // 1`}</Code>

        <p>
          Unlike <code>useState</code>, there is <strong>no setter</strong>. You
          change <code>current</code> directly, because nothing needs to be
          announced.
        </p>

        <h4>How is it different from state?</h4>
        <table className="slots">
          <thead>
            <tr>
              <th></th>
              <th>useState</th>
              <th>useRef</th>
              <th>Plain variable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Remembers across renders?</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Changing it redraws the screen?</td>
              <td>Yes</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td>How you change it</td>
              <td>
                <code>setValue(x)</code>
              </td>
              <td>
                <code>ref.current = x</code>
              </td>
              <td>
                <code>value = x</code>
              </td>
            </tr>
            <tr>
              <td>Use it for</td>
              <td>What the user sees</td>
              <td>What the user never sees</td>
              <td>Short calculations</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---------- 4. RULES ---------- */}
      <div className="example">
        <h3>4. The rules of useRef</h3>

        <div className="rule">
          <h4>Rule 1: Changing .current never redraws</h4>
          <p>
            React does not watch refs. If the user must <em>see</em> the change,
            use state instead.
          </p>
        </div>

        <div className="rule">
          <h4>Rule 2: It is the same box every render</h4>
          <p>
            The object returned by <code>useRef</code> never changes identity.
            Only what is inside <code>current</code> changes. That is why it
            remembers.
          </p>
        </div>

        <div className="rule">
          <h4>
            Rule 3: Change refs in handlers and effects, not while rendering
          </h4>
          <p>
            Rendering should only work out what to show. Writing to a ref there
            is a hidden side effect. Do it inside a click handler or{" "}
            <code>useEffect</code>. (Reading <code>current</code> to display it,
            as in the demos, is fine for learning, but the value is always from
            the last effect.)
          </p>
        </div>

        <div className="rule">
          <h4>Rule 4: A DOM ref is null until the element exists</h4>
          <p>
            During the first render the element is not on the page yet. Use the
            ref after mount: inside event handlers or <code>useEffect</code>. In
            TypeScript, write <code>useRef&lt;HTMLInputElement&gt;(null)</code>{" "}
            and check <code>inputRef.current?.</code> before using it.
          </p>
        </div>

        <div className="rule">
          <h4>Rule 5: Ask one question to choose</h4>
          <p>
            "Does the screen need to change when this value changes?" Yes means{" "}
            <code>useState</code>. No means <code>useRef</code>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Understand;
