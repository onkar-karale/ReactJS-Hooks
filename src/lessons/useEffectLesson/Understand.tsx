import Code from "../../components/Code";
import { LifecycleDemo, TitleDemo } from "./Demos";

// Stage 1: what useEffect is and why it exists.
const Understand = () => (
  <>
    {/* ---------- 1. The big idea ---------- */}
    <div className="example">
      <h3>1. The big idea: serve the dish, then run the errand</h3>
      <p>
        Picture a restaurant. A component's main job is the kitchen: take the
        ingredients (props and state) and <strong>serve a dish</strong> (the
        screen). Same ingredients, same dish, every time. That is called{" "}
        <strong>rendering</strong>.
      </p>
      <p>
        Sometimes there are <strong>errands</strong> outside the kitchen: phone
        the supplier, set a kitchen timer, hang a sign on the shop door. You
        never run errands <em>while</em> cooking, because they slow the dish and
        can repeat by accident. You run them{" "}
        <strong>after the dish is served</strong>.
      </p>
      <table className="slots">
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cooking and serving the dish</td>
            <td>
              <strong>Rendering</strong>: the component returns JSX
            </td>
          </tr>
          <tr>
            <td>An errand after serving</td>
            <td>
              <strong>The effect</strong>: the code inside{" "}
              <code>useEffect</code>
            </td>
          </tr>
          <tr>
            <td>Phoning the supplier</td>
            <td>Fetching data from a server</td>
          </tr>
          <tr>
            <td>Setting a kitchen timer</td>
            <td>
              <code>setInterval</code> or <code>setTimeout</code>
            </td>
          </tr>
          <tr>
            <td>A sign on the shop door</td>
            <td>
              Changing <code>document.title</code>
            </td>
          </tr>
          <tr>
            <td>Switching the timer off at closing time</td>
            <td>
              The <strong>cleanup function</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="note">
        <strong>
          That is all <code>useEffect</code> is:
        </strong>{" "}
        "after you draw this screen, go and do this errand."
      </div>
      <p>
        <strong>Try it:</strong> the errand here is changing the browser tab's
        title.
      </p>
      <TitleDemo />
    </div>

    {/* ---------- 2. What is a side effect ---------- */}
    <div className="example">
      <h3>2. What is a side effect?</h3>
      <p>
        A <strong>side effect</strong> is anything your component does that
        reaches <em>outside</em> its own screen output. Rendering must stay
        pure: just calculate the screen.
      </p>
      <table className="slots">
        <thead>
          <tr>
            <th>Side effect (belongs in useEffect)</th>
            <th>Not a side effect (just render)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fetching data from a server</td>
            <td>Adding two numbers</td>
          </tr>
          <tr>
            <td>Starting a timer</td>
            <td>Filtering a list to display</td>
          </tr>
          <tr>
            <td>Adding a window event listener</td>
            <td>Building JSX</td>
          </tr>
          <tr>
            <td>
              Changing <code>document.title</code>
            </td>
            <td>Formatting a date for display</td>
          </tr>
          <tr>
            <td>
              Reading or writing <code>localStorage</code>
            </td>
            <td>Reading props or state</td>
          </tr>
        </tbody>
      </table>
      <div className="note">
        <strong>Rule of thumb:</strong> if it touches something the component
        does not own (the network, the browser, a timer), it is a side effect.
      </div>
    </div>

    {/* ---------- 3. Anatomy ---------- */}
    <div className="example">
      <h3>3. Reading the shape: Do, When, Undo</h3>
      <p>
        Every <code>useEffect</code> has up to three parts. Each colour below is
        one part:
      </p>

      <pre className="anatomy">
        <span className="t-hook">useEffect</span>
        {"(() => {\n  "}
        <span className="t-value">
          {"// DO: the errand runs here, after the screen is drawn"}
        </span>
        {"\n\n  return () => {\n    "}
        <span className="t-setter">
          {"// UNDO: stop timers, remove listeners, cancel requests"}
        </span>
        {"\n  };\n}, ["}
        <span className="t-init">dependencies</span>
        {"]);  "}
        <span className="t-kw">
          {"// WHEN: run again if any of these change"}
        </span>
      </pre>

      <table className="slots">
        <thead>
          <tr>
            <th>Part</th>
            <th>Job</th>
            <th>Required?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="t-value">The function (DO)</span>
            </td>
            <td>The errand itself</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <span className="t-init">The array (WHEN)</span>
            </td>
            <td>Decides when the errand runs again</td>
            <td>Optional, but you should almost always write it</td>
          </tr>
          <tr>
            <td>
              <span className="t-setter">The returned function (UNDO)</span>
            </td>
            <td>Undoes what the errand started</td>
            <td>Only if the errand needs undoing</td>
          </tr>
        </tbody>
      </table>
      <div className="note">
        <strong>Memory trick:</strong> <strong>Do, When, Undo.</strong> What to
        do, when to do it, how to undo it.
      </div>
    </div>

    {/* ---------- 4. Timeline ---------- */}
    <div className="example">
      <h3>4. When exactly does it run?</h3>
      <ol className="steps">
        <li>
          <strong>First time on screen (mount):</strong> render, then React
          updates the screen, then your effect runs.
        </li>
        <li>
          <strong>A dependency changes (update):</strong> render, screen
          updates, then the <strong>previous effect's cleanup</strong> runs,
          then the new effect runs.
        </li>
        <li>
          <strong>The component disappears (unmount):</strong> the cleanup runs
          one last time.
        </li>
      </ol>
      <p>
        Press the buttons and read the log from the bottom up. The newest line
        is on top:
      </p>
      <LifecycleDemo />
      <div className="note">
        <strong>
          Why do I see an extra EFFECT, CLEANUP, EFFECT at the start?
        </strong>{" "}
        In development, <code>StrictMode</code> (it wraps your app in{" "}
        <code>main.tsx</code>) deliberately runs mount, cleanup, mount to prove
        your cleanup works. It happens in development only, never in a deployed
        app.
      </div>
      <Code>{`// The order, every time something changes:
// render  ->  screen updates  ->  OLD cleanup  ->  NEW effect`}</Code>
    </div>
  </>
);

export default Understand;
