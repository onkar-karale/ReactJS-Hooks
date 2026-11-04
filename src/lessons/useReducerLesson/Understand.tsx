export default function Understand() {
  return (
    <section className="example">
      <h3>1. The big idea: The Bank Teller</h3>
      <p>
        If <code>useState</code> is managing cash in your own wallet,{" "}
        <code>useReducer</code> is dealing with a bank teller. You don't just
        walk into the vault and grab money (changing state directly). Instead,
        you hand the teller a slip with instructions (an <strong>action</strong>
        ). The teller reads the slip, checks the bank's strict rulebook (the{" "}
        <strong>reducer</strong>), and updates the vault balance (the{" "}
        <strong>state</strong>).
      </p>

      <table className="slots">
        <thead>
          <tr>
            <th>The Bank</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Vault Balance</td>
            <td>
              <strong>State:</strong> The current data you are tracking.
            </td>
          </tr>
          <tr>
            <td>The Instruction Slip ("Deposit $50")</td>
            <td>
              <strong>Action:</strong> An object describing <em>what</em>{" "}
              happened.
            </td>
          </tr>
          <tr>
            <td>Handing the slip to the teller</td>
            <td>
              <strong>Dispatch:</strong> The function you call to send the
              action[cite: 1].
            </td>
          </tr>
          <tr>
            <td>The Rulebook</td>
            <td>
              <strong>Reducer:</strong> A function containing custom state
              logic[cite: 1]. It decides how state changes based on the action.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="note">
        <strong>Why use this?</strong> If you find yourself keeping track of
        multiple pieces of state that rely on complex logic,{" "}
        <code>useReducer</code> is a lifesaver[cite: 1]. It keeps your
        components clean by moving the "how things change" logic outside.
      </div>

      <h4>2. Reading the one line of code</h4>
      <p>
        The hook accepts three arguments, though we mostly use the first
        two[cite: 1].
      </p>

      <div className="anatomy">
        <span className="t-kw">const</span> [
        <span className="t-value">state</span>,{" "}
        <span className="t-setter">dispatch</span>] ={" "}
        <span className="t-hook">useReducer</span>( reducer,{" "}
        <span className="t-init">initialState</span>);
      </div>

      <ul className="steps">
        <li>
          <span className="t-value">state</span>: The current data (like the
          vault balance).
        </li>
        <li>
          <span className="t-setter">dispatch</span>: The function you call to
          trigger a change.
        </li>
        <li>
          <strong>reducer</strong>: The rulebook function you write.
        </li>
        <li>
          <span className="t-init">initialState</span>: What the state starts as
          (often an object)[cite: 1].
        </li>
      </ul>
    </section>
  );
}
