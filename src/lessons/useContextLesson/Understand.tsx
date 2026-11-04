import Code from "../../components/Code";

const Understand = () => {
  return (
    <>
      {/* ---------- 1. THE BIG IDEA ---------- */}
      <div className="example">
        <h3>1. The big idea: a radio station</h3>
        <p>
          Imagine you want to share a song with 100 people. You could whisper it
          to one person, who whispers it to the next, and so on down the line.
          Slow, and if anyone mishears, the song is ruined. Or you could{" "}
          <strong>broadcast it on a radio station</strong>. Anyone who tunes in
          hears it instantly, and nobody in between has to pass anything along.
        </p>
        <p>
          That is exactly what <strong>Context</strong> does for your data.
        </p>

        <table className="slots">
          <thead>
            <tr>
              <th>Radio world</th>
              <th>React</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The frequency (the channel itself)</td>
              <td>
                <strong>The context</strong>, made with{" "}
                <code>createContext()</code>
              </td>
            </tr>
            <tr>
              <td>The radio station that broadcasts</td>
              <td>
                <strong>The Provider</strong>,{" "}
                <code>&lt;UserContext.Provider&gt;</code>
              </td>
            </tr>
            <tr>
              <td>The song being played</td>
              <td>
                <strong>The value</strong>, <code>value={"{user}"}</code>
              </td>
            </tr>
            <tr>
              <td>Any radio tuned to that frequency</td>
              <td>
                <strong>A consumer</strong>, any component that calls{" "}
                <code>useContext()</code>
              </td>
            </tr>
            <tr>
              <td>Whispering the song down a long line</td>
              <td>A pile of props: this is called prop drilling</td>
            </tr>
          </tbody>
        </table>

        <div className="note">
          <strong>
            That is all <code>useContext</code> is:
          </strong>{" "}
          a way for one component to broadcast a value, so any component below
          it can tune in and read it directly, without every component in
          between passing it along.
        </div>

        <div className="three-steps">
          <div>
            <h4>Create</h4>
            <p>Make the channel. Done once.</p>
          </div>
          <div>
            <h4>Provide</h4>
            <p>Start broadcasting a value on it.</p>
          </div>
          <div>
            <h4>Use</h4>
            <p>Tune in anywhere below and read it.</p>
          </div>
        </div>
      </div>

      {/* ---------- 2. THE PROBLEM ---------- */}
      <div className="example">
        <h3>2. The problem it solves: prop drilling</h3>
        <p>
          State should live in the highest component that needs it. But what if
          a component <em>deep</em> in the tree needs that state too? Without
          context, every component in between must carry the prop, even if it
          never uses it.
        </p>

        <Code>{`function Component1() {
  const [user, setUser] = useState("Linus");
  return (
    <>
      <h1>Hello {user}!</h1>
      <Component2 user={user} />      {/* passes it on */}
    </>
  );
}

function Component2({ user }) {        // never uses user!
  return <Component3 user={user} />;   // only relays it
}

function Component3({ user }) {
  return <h2>Hello {user} again!</h2>; // finally uses it
}`}</Code>

        <div className="note">
          <strong>Component2 is a middleman.</strong> It does not care about{" "}
          <code>user</code>, but it has to accept it and hand it over, like a
          delivery person carrying a parcel for someone else. Now imagine 6
          layers and 5 different values. Renaming one prop means editing every
          file along the way. That pain is called <strong>prop drilling</strong>
          .
        </div>
      </div>

      {/* ---------- 3. ANATOMY ---------- */}
      <div className="example">
        <h3>3. The three pieces of context</h3>
        <p>
          Context is always these three lines, in this order. Read each one
          slowly:
        </p>

        <pre className="anatomy">
          <span className="t-kw">const </span>
          <span className="t-value">UserContext</span>
          <span className="t-kw"> = </span>
          <span className="t-hook">createContext</span>
          {"("}
          <span className="t-init">"Guest"</span>
          {");"}
          {"\n"}
          <span className="t-kw">{"<"}</span>
          <span className="t-value">UserContext</span>.
          <span className="t-setter">Provider</span>
          <span className="t-kw"> value</span>={"{"}user{"}"}
          <span className="t-kw">{">"}</span>
          {" ... "}
          <span className="t-kw">{"</"}</span>
          <span className="t-value">UserContext</span>.
          <span className="t-setter">Provider</span>
          <span className="t-kw">{">"}</span>
          {"\n"}
          <span className="t-kw">const </span>user
          <span className="t-kw"> = </span>
          <span className="t-hook">useContext</span>
          {"("}
          <span className="t-value">UserContext</span>
          {");"}
        </pre>

        <table className="slots">
          <thead>
            <tr>
              <th>Step</th>
              <th>Code</th>
              <th>What it does</th>
              <th>Where it lives</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Create</td>
              <td>
                <code>createContext("Guest")</code>
              </td>
              <td>
                Builds the channel. The argument is the{" "}
                <strong>default value</strong>, used only when no Provider is
                above.
              </td>
              <td>Top of the file, outside any component</td>
            </tr>
            <tr>
              <td>2. Provide</td>
              <td>
                <code>&lt;UserContext.Provider value={"{user}"}&gt;</code>
              </td>
              <td>
                Starts broadcasting. Everything wrapped inside can tune in.
              </td>
              <td>In the component that owns the state</td>
            </tr>
            <tr>
              <td>3. Use</td>
              <td>
                <code>useContext(UserContext)</code>
              </td>
              <td>
                Tunes in and returns whatever value is currently being
                broadcast.
              </td>
              <td>In any component below the Provider</td>
            </tr>
          </tbody>
        </table>

        <div className="note">
          <strong>Why a hook?</strong> <code>useContext</code> is how a
          component says "I want to listen to this channel". When the broadcast
          changes, React re-renders the listener automatically.
        </div>
      </div>

      {/* ---------- 4. RULES ---------- */}
      <div className="example">
        <h3>4. The rules of context</h3>

        <div className="rule">
          <h4>Rule 1: Listeners must be inside the Provider</h4>
          <p>
            Only components <em>wrapped by</em> the Provider can hear it.
            Outside, a radio hears static, and <code>useContext</code> returns
            the default value.
          </p>
        </div>

        <div className="rule">
          <h4>Rule 2: The closest Provider wins</h4>
          <p>
            If two Providers of the same context are nested, a component hears
            the nearest one above it. You can override a value for just one part
            of the tree.
          </p>
        </div>

        <div className="rule">
          <h4>Rule 3: A new value re-renders every listener</h4>
          <p>
            When the Provider's <code>value</code> changes, every component that
            called <code>useContext</code> for it redraws. That is how the
            screen stays in sync.
          </p>
        </div>

        <div className="rule">
          <h4>Rule 4: useContext takes the context, not the Provider</h4>
          <p>
            Write <code>useContext(UserContext)</code>. Not{" "}
            <code>useContext(UserContext.Provider)</code>, and not{" "}
            <code>useContext(user)</code>.
          </p>
        </div>

        <div className="rule">
          <h4>Rule 5: Context delivers, state remembers</h4>
          <p>
            Context does not store anything itself. It is a delivery truck. The
            value still lives in <code>useState</code> (or{" "}
            <code>useReducer</code>) inside the Provider's component. That is
            why the two hooks are always used together.
          </p>
        </div>
      </div>
    </>
  );
};

export default Understand;
