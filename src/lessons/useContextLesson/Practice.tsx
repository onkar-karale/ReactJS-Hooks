import Code from "../../components/Code";
import {
  BroadcastDemo,
  DefaultValueDemo,
  DrillingDemo,
  NearestProviderDemo,
  ThemeDemo,
} from "./Demos";

const Practice = () => {
  return (
    <>
      {/* ---------- 5. SEE THE DIFFERENCE ---------- */}
      <div className="example">
        <h3>5. See the difference: props vs context</h3>
        <p>
          Below is a tree of four nested components. Component1 owns the{" "}
          <code>user</code> state and Component4 needs it. Switch between the
          two modes and watch what happens to the components in the middle.
        </p>
        <DrillingDemo />
        <div className="note">
          <strong>Spot the difference:</strong> with props, Component2 and
          Component3 are pulled into a job they never asked for. With context,
          they stay clean. They do not even know <code>user</code> exists.
        </div>
      </div>

      {/* ---------- 6. BUILD IT STEP BY STEP ---------- */}
      <div className="example">
        <h3>6. Build it in four steps</h3>
        <ol className="steps">
          <li>
            <strong>Import</strong> what you need.
          </li>
          <li>
            <strong>Create</strong> the context, once, outside any component.
          </li>
          <li>
            <strong>Provide</strong> a value by wrapping the components that
            need it.
          </li>
          <li>
            <strong>Use</strong> it with <code>useContext</code> wherever you
            want to read it.
          </li>
        </ol>

        <h4>Step 1 and 2: import and create</h4>
        <Code>{`import { useState, createContext, useContext } from "react";

const UserContext = createContext();   // the channel exists now`}</Code>

        <h4>Step 3: provide</h4>
        <Code>{`function Component1() {
  const [user, setUser] = useState("Linus");   // the state lives here

  return (
    <UserContext.Provider value={user}>        {/* start broadcasting */}
      <h1>Hello {user}!</h1>
      <Component2 />                           {/* no props! */}
    </UserContext.Provider>
  );
}`}</Code>

        <h4>Step 4: use</h4>
        <Code>{`function Component3() {
  const user = useContext(UserContext);        // tune in

  return <h2>Hello {user} again!</h2>;
}`}</Code>

        <div className="note">
          <strong>Component2 stays untouched.</strong> It simply renders{" "}
          <code>&lt;Component3 /&gt;</code>. That is the whole point.
        </div>
      </div>

      {/* ---------- 7. LIVE BROADCAST ---------- */}
      <div className="example">
        <h3>7. Try it: the live broadcast</h3>
        <p>
          This is real context running in the page. Type a name and watch it
          reach Component3, passing right through Component2, which receives
          zero props.
        </p>
        <BroadcastDemo />
        <div className="note">
          <strong>What happened when you typed?</strong> <code>setUser</code>{" "}
          changed the state, the Provider re-rendered with a new{" "}
          <code>value</code>, and React told every listener to redraw. You did
          not write any code to move the value around.
        </div>
      </div>

      {/* ---------- 8. SHARE THE SETTER ---------- */}
      <div className="example">
        <h3>8. Variation: share the setter too</h3>
        <p>
          Context can carry more than a value. If you put a{" "}
          <strong>function</strong> in it, a component deep in the tree can
          change state that lives far above. Here the button and the card are
          separate components, and both talk to the same context.
        </p>
        <ThemeDemo />
        <Code>{`const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const toggle = () => setMode(m => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>   {/* an object: value + action */}
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const { mode, toggle } = useContext(ThemeContext);   // destructure what you need
  return <button onClick={toggle}>Switch theme</button>;
}`}</Code>
        <div className="note">
          <strong>Pattern to remember:</strong> pass an object like{" "}
          <code>{"{ value, setValue }"}</code> when children need to both{" "}
          <em>read</em> and <em>change</em> the shared state.
        </div>
      </div>

      {/* ---------- 9. DEFAULT VALUE + CLOSEST PROVIDER ---------- */}
      <div className="example">
        <h3>9. Variation: the default value and the closest Provider</h3>

        <h4>The default value</h4>
        <p>
          The argument you give <code>createContext</code> is what a component
          hears when there is <strong>no Provider above it</strong>. Toggle the
          Provider on and off:
        </p>
        <DefaultValueDemo />
        <Code>{`const GreetingContext = createContext("Guest (the default value)");`}</Code>

        <h4>The closest Provider wins</h4>
        <p>
          Providers can be nested. Each badge below reads the same context, but
          hears the nearest Provider above it. Each <code>Section</code> adds
          one to the level it inherited.
        </p>
        <NearestProviderDemo />
        <Code>{`function Section({ children }) {
  const level = useContext(LevelContext);              // hear the parent's value
  return (
    <LevelContext.Provider value={level + 1}>          {/* broadcast a new one below */}
      {children}
    </LevelContext.Provider>
  );
}`}</Code>
      </div>

      {/* ---------- 10. CLEANER PATTERN ---------- */}
      <div className="example">
        <h3>10. The clean pattern: Provider component and custom hook</h3>
        <p>
          In real projects people wrap the Provider and the{" "}
          <code>useContext</code> call so the rest of the app never touches the
          raw context. The theme demo above already uses it.
        </p>

        <div className="compare">
          <div>
            <span className="badge bad">Repeated everywhere</span>
            <Code>{`// in every file that needs it:
import { ThemeContext } from "./ThemeContext";

const ctx = useContext(ThemeContext);
// ctx might be null. Check it again and again`}</Code>
          </div>
          <div>
            <span className="badge good">One hook</span>
            <Code>{`import { useTheme } from "./ThemeContext";

const { mode, toggle } = useTheme();
// safe: it already checked for you`}</Code>
          </div>
        </div>

        <Code>{`// ThemeContext.tsx
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const toggle = () => setMode(m => (m === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}`}</Code>

        <div className="note">
          <strong>Two wins:</strong> the state and Provider live in one file,
          and forgetting the Provider now gives you a clear error message
          instead of a mysterious <code>null</code>.
        </div>

        <h4>Several contexts at once</h4>
        <p>
          You can use as many contexts as you like. Each one is its own channel,
          and a component tunes into whichever it needs:
        </p>
        <Code>{`<ThemeProvider>
  <UserProvider>
    <App />
  </UserProvider>
</ThemeProvider>

// inside any component:
const { mode } = useTheme();
const { user } = useUser();`}</Code>
      </div>
    </>
  );
};

export default Practice;
