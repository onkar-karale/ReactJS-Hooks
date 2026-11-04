export default function Understand() {
  return (
    <section className="example">
      <h3>1. The big idea: The Hired Contractor</h3>
      <p>
        Imagine you are managing a restaurant. If the plumbing breaks, you don't
        grab a wrench and fix it yourself. You hire a plumber. The plumber
        brings their own toolbox, does the messy work behind the walls, and just
        tells you when the sink is working again.
      </p>
      <p>
        A <strong>Custom Hook</strong> is a contractor you hire to handle
        complex logic. Instead of cluttering your component with fetch requests,
        loading states, and error handling every time you need data, you bundle
        that logic into a custom hook. Your component just asks for the data,
        and the hook handles the messy plumbing.
      </p>

      <table className="slots">
        <thead>
          <tr>
            <th>The Restaurant</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Restaurant Manager</td>
            <td>
              <strong>Your Component:</strong> Only cares about displaying the
              UI, not how data is fetched.
            </td>
          </tr>
          <tr>
            <td>The Plumber's Toolbox</td>
            <td>
              <strong>Built-in Hooks:</strong> <code>useState</code>,{" "}
              <code>useEffect</code>, etc., used <em>inside</em> your custom
              hook.
            </td>
          </tr>
          <tr>
            <td>The Plumber (The Contractor)</td>
            <td>
              <strong>Custom Hook:</strong> A JavaScript function starting with
              "use" that contains reusable logic.
            </td>
          </tr>
        </tbody>
      </table>

      <h4>2. Reading the structure</h4>
      <p>
        Custom hooks are just standard JavaScript functions that follow two
        specific rules: they must start with "use", and they can call other
        hooks inside them.
      </p>

      <div className="anatomy">
        <span className="t-kw">function</span>{" "}
        <span className="t-hook">useFetch</span>(
        <span className="t-init">url</span>) {"{"}
        <br />
        <span className="ml" />
        <span className="t-kw">const</span> [
        <span className="t-value">data</span>,{" "}
        <span className="t-setter">setData</span>] ={" "}
        <span className="t-hook">useState</span>(null);
        <br />
        <span className="ml" />
        <span className="t-muted">// ... fetch logic inside useEffect ...</span>
        <br />
        <span className="ml" />
        <span className="t-kw">return</span>{" "}
        <span className="t-value">data</span>;
        <br />
        {"}"}
      </div>

      <ul className="steps">
        <li>
          <strong>useFetch</strong>: The custom name you give your hook.
        </li>
        <li>
          <span className="t-init">url</span>: Arguments you pass in, just like
          a normal function.
        </li>
        <li>
          <strong>return</strong>: Unlike components that return JSX, custom
          hooks return data (arrays, objects, or single values).
        </li>
      </ul>
    </section>
  );
}
