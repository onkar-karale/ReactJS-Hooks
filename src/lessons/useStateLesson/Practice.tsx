import Code from "../../components/Code";
import {
  BasicTypesDemo,
  CarDemo,
  DerivedDemo,
  PreviousStateDemo,
  ShoppingList,
  SnapshotDemo,
} from "./Demos";

// Stage 2: hands-on. Each section is a short explanation followed by a live demo.
const Practice = () => (
  <>
    {/* ---------- 5. What can state hold? ---------- */}
    <div className="example">
      <h3>5. What can state hold?</h3>
      <p>
        Anything: strings, numbers, booleans, arrays, objects, or a mix. Pick
        the type that matches all the data.
      </p>
      <table className="slots">
        <thead>
          <tr>
            <th>Type</th>
            <th>Example</th>
            <th>Typical use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>string</td>
            <td>
              <code>{'useState("")'}</code>
            </td>
            <td>Text typed in an input</td>
          </tr>
          <tr>
            <td>number</td>
            <td>
              <code>useState(0)</code>
            </td>
            <td>Counters, quantity, age</td>
          </tr>
          <tr>
            <td>boolean</td>
            <td>
              <code>useState(false)</code>
            </td>
            <td>Open/closed, on/off, loading</td>
          </tr>
          <tr>
            <td>array</td>
            <td>
              <code>{"useState<string[]>([])"}</code>
            </td>
            <td>Lists, cart items</td>
          </tr>
          <tr>
            <td>object</td>
            <td>
              <code>{"useState({ name: '', age: 0 })"}</code>
            </td>
            <td>A whole form, a user profile</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Try three of them at once:</strong>
      </p>
      <BasicTypesDemo />
    </div>

    {/* ---------- 6. Arrays ---------- */}
    <div className="example">
      <h3>6. Arrays in state: always make a new one</h3>
      <p>
        React decides whether something changed by checking if it is a{" "}
        <strong>different object</strong>. If you edit the same array in place,
        it is still the same array, so React sees no change and does not redraw.
      </p>
      <ShoppingList />
      <h4>The copy cheat sheet</h4>
      <table className="slots">
        <thead>
          <tr>
            <th>Goal</th>
            <th>Wrong (edits in place)</th>
            <th>Right (makes a copy)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Add an item</td>
            <td>
              <code>items.push(x)</code>
            </td>
            <td>
              <code>{"setItems(prev => [...prev, x])"}</code>
            </td>
          </tr>
          <tr>
            <td>Remove an item</td>
            <td>
              <code>items.splice(i, 1)</code>
            </td>
            <td>
              <code>{"setItems(prev => prev.filter((_, n) => n !== i))"}</code>
            </td>
          </tr>
          <tr>
            <td>Change an item</td>
            <td>
              <code>items[i] = x</code>
            </td>
            <td>
              <code>
                {"setItems(prev => prev.map((v, n) => n === i ? x : v))"}
              </code>
            </td>
          </tr>
          <tr>
            <td>Change an object field</td>
            <td>
              <code>user.age = 30</code>
            </td>
            <td>
              <code>{"setUser(prev => ({ ...prev, age: 30 }))"}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* ---------- 7. Objects ---------- */}
    <div className="example">
      <h3>7. Objects in state and the spread operator</h3>
      <p>
        You can keep several values as <strong>separate states</strong>, or
        group related ones into <strong>one object</strong>:
      </p>
      <div className="compare">
        <div>
          <span className="badge good">Separate states</span>
          <Code>{`const [brand, setBrand] = useState("Ford");
const [model, setModel] = useState("Mustang");
const [color, setColor] = useState("red");

setColor("blue");   // simple, one value`}</Code>
        </div>
        <div>
          <span className="badge good">One object</span>
          <Code>{`const [car, setCar] = useState({
  brand: "Ford",
  model: "Mustang",
  color: "red",
});

// needs the spread operator (below)`}</Code>
        </div>
      </div>
      <div className="note">
        <strong>Big surprise:</strong> when you set state, the new value{" "}
        <strong>replaces</strong> the old one entirely. It is not merged.
        Updating one field of an object by passing only that field erases the
        rest.
      </div>
      <p>
        <strong>Break it on purpose, then fix it:</strong>
      </p>
      <CarDemo />
      <Code>{`// Spread = "copy everything from the old object, then override what I name"
setCar((prev) => ({ ...prev, color: "blue" }));
//                    ^^^^^^^ copies brand, model, year, color
//                             ^^^^^^^^^^^^^ then replaces only color`}</Code>
      <p>
        <strong>Rule of thumb:</strong> unrelated values get their own state.
        Values that always change together (like form fields) can share one
        object.
      </p>
    </div>

    {/* ---------- 8. Previous state ---------- */}
    <div className="example">
      <h3>8. Updating from the previous value</h3>
      <p>
        Both buttons below call the setter <strong>three times</strong> to add
        3. Click each one and watch the numbers:
      </p>
      <PreviousStateDemo />
      <div className="note">
        <strong>Why the left one adds only 1:</strong> inside one click,{" "}
        <code>count</code> is a frozen number (a photograph taken at the start
        of the render). Three calls of <code>count + 1</code> are three copies
        of the same instruction: "set it to 1". The right one passes a{" "}
        <strong>function</strong>, and React feeds each call the latest value.
      </div>
      <Code>{`// Rule: if the new value DEPENDS on the old value, pass a function.
setCount((prev) => prev + 1);
setItems((prev) => [...prev, newItem]);
setCar((prev) => ({ ...prev, color: "blue" }));

// If the new value does NOT depend on the old one, a plain value is fine.
setColor("blue");
setCount(0);`}</Code>
    </div>

    {/* ---------- 9. Snapshot ---------- */}
    <div className="example">
      <h3>9. State is a photograph, not a live feed</h3>
      <p>
        Each time your component runs, React hands it a{" "}
        <strong>photograph</strong> of the state at that moment. Calling the
        setter does not edit the photograph in your hand. It asks React to take
        a <strong>new photo</strong> and run the component again.
      </p>
      <SnapshotDemo />
      <div className="note">
        Notice the report always lags one step behind the screen. The new value
        appears on the <strong>next render</strong>, not on the next line of
        code.
      </div>
    </div>

    {/* ---------- 10. Derived values ---------- */}
    <div className="example">
      <h3>10. Do not put it in state if you can calculate it</h3>
      <p>
        State is for values you <strong>cannot</strong> work out from other
        values: what the user typed, which tab is open, what a server returned.
        Anything you <em>can</em> compute is just a regular variable.
      </p>
      <DerivedDemo />
      <div className="compare">
        <div>
          <span className="badge bad">Extra state (can drift apart)</span>
          <Code>{`const [fullName, setFullName] = useState("");
// now you must remember to update it
// every time first OR last changes`}</Code>
        </div>
        <div>
          <span className="badge good">A plain variable</span>
          <Code>{`const fullName = first + " " + last;
// always correct, zero extra code`}</Code>
        </div>
      </div>
    </div>
  </>
);

export default Practice;
