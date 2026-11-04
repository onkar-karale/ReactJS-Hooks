import Code from "../../components/Code";
import { FourStepsDemo, Scoreboard } from "./Demos";

// Stage 1: what useState is and why it exists. Teaching text only; Demos hold the state.
const Understand = () => (
  <>
    {/* ---------- 1. The big idea ---------- */}
    <div className="example">
      <h3>1. The big idea: a stadium scoreboard</h3>
      <p>
        Think of a cricket stadium. The big <strong>scoreboard</strong> shows
        the current score. When a batter hits a six, the <strong>scorer</strong>{" "}
        updates the board, and every person in the stadium instantly sees the
        new number.
      </p>
      <table className="slots">
        <thead>
          <tr>
            <th>Stadium</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The number on the scoreboard</td>
            <td>
              <strong>State</strong>, the value (<code>runs</code>)
            </td>
          </tr>
          <tr>
            <td>The scorer who updates the board</td>
            <td>
              <strong>The setter</strong> (<code>setRuns</code>)
            </td>
          </tr>
          <tr>
            <td>The board lighting up for the crowd</td>
            <td>
              <strong>A re-render</strong>, the screen redraws
            </td>
          </tr>
          <tr>
            <td>Remembering the score in your head</td>
            <td>A plain variable: nobody sees a change</td>
          </tr>
        </tbody>
      </table>
      <div className="note">
        <strong>
          That is all <code>useState</code> is:
        </strong>{" "}
        a scoreboard for your component. It stores a value, gives you a scorer
        to change it, and redraws the screen whenever the scorer does their job.
      </div>
      <p>
        <strong>Try the scoreboard:</strong>
      </p>
      <Scoreboard />
    </div>

    <div className="example">
      <h3>2. Reading the one line of code</h3>
      <p>
        Everything about <code>useState</code> lives in a single line. Each
        colour below is one piece:
      </p>

      <pre className="anatomy">
        <span className="t-kw">const</span> [
        <span className="t-value">color</span>,{" "}
        <span className="t-setter">setColor</span>] ={" "}
        <span className="t-hook">useState</span>(
        <span className="t-init">"red"</span>);
      </pre>

      <table className="slots">
        <thead>
          <tr>
            <th>Piece</th>
            <th>What it is</th>
            <th>Can you rename it?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="t-hook">useState</span>
            </td>
            <td>The hook itself, imported from React</td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <span className="t-init">"red"</span>
            </td>
            <td>
              The starting value. Used <strong>only the first time</strong>
            </td>
            <td>Yes: any string, number, array, object...</td>
          </tr>
          <tr>
            <td>
              <span className="t-value">color</span>
            </td>
            <td>
              The <strong>current value</strong>. You read it
            </td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <span className="t-setter">setColor</span>
            </td>
            <td>
              The <strong>updater function</strong>. You change state only
              through it
            </td>
            <td>
              Yes. Convention: <code>set</code> + the value name
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Why square brackets?</h4>
      <p>
        <code>useState</code> returns an{" "}
        <strong>array with exactly two items</strong>: the value and the setter.
        The square brackets are JavaScript <strong>destructuring</strong>, a
        shortcut for pulling items out of an array and naming them.
      </p>
      <div className="compare">
        <div>
          <span className="badge bad">The long way</span>
          <Code>{`const pair = useState("red");
const color = pair[0];       // item 1: the value
const setColor = pair[1];    // item 2: the setter`}</Code>
        </div>
        <div>
          <span className="badge good">
            The short way (what everyone writes)
          </span>
          <Code>{`const [color, setColor] = useState("red");

// Names are YOUR choice. This works too:
const [mood, setMood] = useState("happy");`}</Code>
        </div>
      </div>
    </div>

    {/* ---------- 3. The four steps ---------- */}
    <div className="example">
      <h3>3. The four steps to use useState</h3>
      <ol className="steps">
        <li>
          <strong>Import it:</strong>{" "}
          <code>{'import { useState } from "react";'}</code> (curly braces
          because it is a named export)
        </li>
        <li>
          <strong>Initialize it:</strong>{" "}
          <code>{'const [color, setColor] = useState("red");'}</code> at the{" "}
          <em>top</em> of your component
        </li>
        <li>
          <strong>Read it:</strong> <code>{"<h1>{color}</h1>"}</code> anywhere
          inside the component
        </li>
        <li>
          <strong>Update it:</strong> <code>{'setColor("blue")'}</code> from an
          event like a click
        </li>
      </ol>
      <p>Here is the real thing running. Click a colour and watch the log:</p>
      <FourStepsDemo />
      <div className="note">
        <strong>The cycle you just watched:</strong> click, then the setter
        saves the new value, then React runs your component function again, then{" "}
        <code>useState</code> returns the new value, then the screen shows it.
        Every state change follows this exact loop.
      </div>
    </div>

    {/* ---------- 4. The golden rule ---------- */}
    <div className="example">
      <h3>4. The golden rule: only change state with the setter</h3>
      <div className="compare">
        <div>
          <span className="badge bad">Never</span>
          <Code>{`color = "blue";        // not allowed (it is const)
color = color + "!";   // React is never told`}</Code>
        </div>
        <div>
          <span className="badge good">Always</span>
          <Code>{`setColor("blue");
setCount((prev) => prev + 1);`}</Code>
        </div>
      </div>
      <p>There are two separate reasons:</p>
      <ol className="steps">
        <li>
          <strong>Nothing redraws.</strong> React only learns about a change
          when the setter is called.
        </li>
        <li>
          <strong>The value is lost.</strong> On the next run of the component,
          React hands back its own saved copy and ignores what you assigned.
        </li>
      </ol>
      <div className="note">
        <strong>Scoreboard version:</strong> you cannot walk onto the field and
        repaint the digits yourself. You must ask the scorer, and the scorer is
        the setter.
      </div>
    </div>
  </>
);

export default Understand;
