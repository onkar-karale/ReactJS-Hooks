import Code from "../../components/Code";
import { MISTAKES } from "./data";

const Remember = () => {
  return (
    <>
      {/* ---------- 11. COMMON MISTAKES ---------- */}
      <div className="example">
        <h3>11. Eight common mistakes</h3>
        <p>
          Almost every context bug is one of these. Skim them now and you will
          spot them fast later.
        </p>

        {MISTAKES.map((m) => (
          <div className="example" key={m.id}>
            <h4>
              Mistake {m.id}: {m.title}
            </h4>
            <p className="mistake-why">{m.why}</p>
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

      {/* ---------- 12. USE IN OUR PROJECT ---------- */}
      <div className="example">
        <h3>12. Where you would use it in real apps (and in this one)</h3>
        <p>
          Context shines for data that many far-apart components need and that
          changes rarely or in simple ways:
        </p>

        <table className="slots">
          <thead>
            <tr>
              <th>Shared data</th>
              <th>Who reads it</th>
              <th>Who changes it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Theme (dark or light)</td>
              <td>Almost every component</td>
              <td>A settings toggle</td>
            </tr>
            <tr>
              <td>Logged-in user</td>
              <td>Navbar, profile, protected pages</td>
              <td>Login and logout</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>Every piece of text</td>
              <td>A language picker</td>
            </tr>
            <tr>
              <td>Shopping cart</td>
              <td>Header badge, cart page, checkout</td>
              <td>Any "Add to cart" button</td>
            </tr>
          </tbody>
        </table>

        <h4>An idea for this learning app</h4>
        <p>
          Right now the sidebar and the lesson both depend on which lesson is
          open. Suppose you also want a "completed lessons" tick in the sidebar
          that any lesson can set when the learner reaches the recap. That is
          perfect for context:
        </p>
        <Code>{`// context/ProgressContext.tsx
const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [done, setDone] = useState([]);                      // e.g. ["useState"]
  const markDone = (id) => setDone(d => (d.includes(id) ? d : [...d, id]));
  return (
    <ProgressContext.Provider value={{ done, markDone }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}

// main.tsx:     <ProgressProvider><App /></ProgressProvider>
// Sidebar:      const { done } = useProgress();      // show a tick
// Any lesson:   const { markDone } = useProgress();  // mark it finished`}</Code>
        <div className="note">
          <strong>Why it fits:</strong> the sidebar and a lesson are far apart
          in the tree. Without context you would pass <code>done</code> and{" "}
          <code>markDone</code> through <code>App</code> and{" "}
          <code>LessonLayout</code>, which do not care about them.
        </div>
      </div>

      {/* ---------- 13. RECAP ---------- */}
      <div className="example">
        <h3>13. Recap: lock it in</h3>
        <div className="recap">
          <p className="takeaway">Create. Provide. Use.</p>
          <ul>
            <li>
              <strong>Problem:</strong> prop drilling forces middle components
              to carry data they do not need.
            </li>
            <li>
              <strong>Create:</strong>{" "}
              <code>const MyContext = createContext(default)</code>, once,
              outside components.
            </li>
            <li>
              <strong>Provide:</strong>{" "}
              <code>&lt;MyContext.Provider value={"{x}"}&gt;</code> around the
              components that need it.
            </li>
            <li>
              <strong>Use:</strong> <code>const x = useContext(MyContext)</code>{" "}
              anywhere inside.
            </li>
            <li>
              <strong>Remember:</strong> context delivers, state remembers. Pair
              it with <code>useState</code>.
            </li>
            <li>
              <strong>Closest Provider wins</strong>, and outside every Provider
              you get the default value.
            </li>
            <li>
              <strong>Share a function</strong> in the value when children must
              change the state.
            </li>
            <li>
              <strong>Tidy up</strong> with a Provider component and a custom
              hook like <code>useTheme()</code>.
            </li>
          </ul>
        </div>

        <h4>When NOT to use context</h4>
        <ul className="steps">
          <li>
            The data is only needed one or two levels down. A plain prop is
            simpler.
          </li>
          <li>
            The value changes many times per second (mouse position, typing).
            Every listener re-renders each time.
          </li>
          <li>
            You are tempted to put the whole app's state in one context. Split
            it by topic instead.
          </li>
        </ul>

        <div className="note">
          <strong>One sentence to take with you:</strong> context is a radio
          station for your component tree. One component broadcasts, and any
          component below can tune in without anyone in the middle passing it
          along.
        </div>
      </div>
    </>
  );
};

export default Remember;
