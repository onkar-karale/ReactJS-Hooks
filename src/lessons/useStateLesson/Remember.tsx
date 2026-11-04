import Code from "../../components/Code";
import { mistakes } from "./data";

// Stage 3: make it stick. Mistakes to avoid, how we used it for real, and a recap.
const Remember = () => (
  <>
    {/* ---------- 11. Common mistakes ---------- */}
    <div className="example">
      <h3>11. The 8 most common mistakes</h3>
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

    {/* ---------- 12. In our project ---------- */}
    <div className="example">
      <h3>12. Where we used useState in our registration form</h3>
      <p>
        The <code>UserForm</code> component uses <code>useState</code> four
        times. Each one exists because the screen must change when its value
        changes.
      </p>
      <Code>{`const [form, setForm] = useState<FormState>(initialForm);
const [status, setStatus] = useState<Status>("idle");
const [message, setMessage] = useState("");
const [ageError, setAgeError] = useState("");`}</Code>
      <table className="slots">
        <thead>
          <tr>
            <th>State</th>
            <th>Holds</th>
            <th>What changes on screen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>form</code>
            </td>
            <td>One object with all five fields</td>
            <td>Every input shows what was typed</td>
          </tr>
          <tr>
            <td>
              <code>status</code>
            </td>
            <td>"idle", "loading", "success" or "error"</td>
            <td>Button text and disabled state</td>
          </tr>
          <tr>
            <td>
              <code>message</code>
            </td>
            <td>Result text</td>
            <td>The green or red banner</td>
          </tr>
          <tr>
            <td>
              <code>ageError</code>
            </td>
            <td>Error text</td>
            <td>The red message under Age</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Why one object for the form?</strong> The five fields always
        change together and are sent together.{" "}
        <strong>Why separate states for the rest?</strong> They are unrelated,
        and each changes on its own schedule. The input handler uses exactly the
        spread pattern from Part 7:
      </p>
      <Code>{`setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//                    ^^^^^^^ copy the old form
//                             ^^^^^^^^^^^^^^^^^^ then replace ONE field, picked by the input's name`}</Code>
    </div>

    {/* ---------- 13. Recap ---------- */}
    <div className="example">
      <h3>13. Remember it forever</h3>
      <div className="recap">
        <p>
          <strong>What:</strong> <code>useState</code> is a scoreboard: it
          stores a value and redraws the screen when it changes.
        </p>
        <p>
          <strong>Shape:</strong>{" "}
          <code>const [value, setValue] = useState(startingValue)</code>
        </p>
        <p>
          <strong>The four rules:</strong>
        </p>
        <p>
          <strong>1. Read</strong> with the value. <strong>2. Change</strong>{" "}
          only with the setter. <strong>3. Copy</strong> objects and arrays,
          never edit them. <strong>4. Use prev</strong> when the new value
          depends on the old one.
        </p>
        <p>
          <strong>Two facts that surprise beginners:</strong> setting state
          replaces (it does not merge), and state is a snapshot (the new value
          arrives on the next render).
        </p>
      </div>
      <div className="note">
        <strong>Explain it in 20 seconds:</strong> "A component re-runs every
        time it redraws, so normal variables are forgotten. useState gives it
        memory. It returns the current value and a setter. Calling the setter
        saves the new value and makes React redraw. We never edit state
        directly, and for objects and arrays we always set a fresh copy."
      </div>
    </div>
  </>
);

export default Remember;
