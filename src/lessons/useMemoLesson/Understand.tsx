export default function Understand() {
  return (
    <section className="example">
      <h3>1. The big idea: The Mathematician's Notepad</h3>
      <p>
        Imagine a brilliant but literal-minded mathematician. You ask them to
        calculate the square root of 9,876,543. It takes them ten solid minutes
        of intense work to give you the answer.
      </p>
      <p>
        If you immediately ask them for the square root of 9,876,543 again, they
        erase their chalkboard and spend another ten minutes recalculating it
        from scratch. This is how React components behave by default—they
        recalculate everything on every render.
      </p>
      <p>
        <code>useMemo</code> is a notepad. It tells the mathematician: "When you
        finish calculating this, write the final answer down. If I ask you for
        the same calculation with the exact same starting numbers, just read the
        answer from the notepad."
      </p>

      <table className="slots">
        <thead>
          <tr>
            <th>The Mathematician</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The 10-minute calculation</td>
            <td>
              <strong>Expensive Function:</strong> Resource-intensive logic that
              slows down your app.
            </td>
          </tr>
          <tr>
            <td>The Notepad</td>
            <td>
              <strong>useMemo:</strong> Caches the returned value so it does not
              need to be recalculated.
            </td>
          </tr>
          <tr>
            <td>Checking the starting numbers</td>
            <td>
              <strong>Dependencies:</strong> The array of values React checks
              before deciding to recalculate.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="note">
        <strong>useCallback vs useMemo:</strong> They are almost identical
        siblings. <code>useCallback</code> caches a <em>function</em>, while{" "}
        <code>useMemo</code> calls the function and caches the{" "}
        <em>returned value</em>.
      </div>

      <h4>2. Reading the one line of code</h4>
      <div className="anatomy">
        <span className="t-kw">const</span>{" "}
        <span className="t-value">cachedValue</span> ={" "}
        <span className="t-hook">useMemo</span>( () =&gt;
        expensiveCalculation(num), [ <span className="t-init">num</span> ] );
      </div>

      <ul className="steps">
        <li>
          <span className="t-value">cachedValue</span>: The final, saved result.
        </li>
        <li>
          <strong>callback</strong>: A function that <em>returns</em> the value
          you want to calculate.
        </li>
        <li>
          <span className="t-init">dependencies</span>: The hook only re-runs
          the calculation when one of these values updates.
        </li>
      </ul>
    </section>
  );
}
