import { useState } from "react";

/* ---------- 1. Scoreboard (Understand, section 1) ---------- */
export const Scoreboard = () => {
  // runs = what the board shows. setRuns = the scorer who updates it.
  const [runs, setRuns] = useState(0);

  return (
    <div className="demo">
      <div className="board">
        <span className="board-label">RUNS</span>
        <span className="board-number">{runs}</span>
      </div>
      {/* prev = the number currently on the board, so "add to it" is always correct */}
      <button onClick={() => setRuns((prev) => prev + 1)}>+1</button>
      <button onClick={() => setRuns((prev) => prev + 4)}>+4</button>
      <button onClick={() => setRuns((prev) => prev + 6)}>+6</button>
      <button onClick={() => setRuns(0)}>New match</button>
    </div>
  );
};

/* ---------- 2. Four steps with a replay log (Understand, section 3) ---------- */
export const FourStepsDemo = () => {
  const [color, setColor] = useState("red"); // STEP 2: initialize
  const [log, setLog] = useState<string[]>([]); // an array in state, used as an event log

  const pick = (next: string) => {
    setColor(next); // STEP 4: update, only via the setter
    // Add one line at the FRONT. A new array is created, the old one is never edited.
    setLog((prev) => [
      `setColor("${next}") and React redrew the screen`,
      ...prev,
    ]);
  };

  return (
    <div className="demo">
      {/* STEP 3: read state anywhere in the component with {color} */}
      <p className="color-line">
        My favorite color is <strong style={{ color }}>{color}</strong>!
      </p>
      {["red", "blue", "pink", "green"].map((c) => (
        <button key={c} onClick={() => pick(c)}>
          {c}
        </button>
      ))}

      <p className="small">Replay log (newest first):</p>
      <ul className="log">
        {log.length === 0 && <li>Nothing yet. Click a colour.</li>}
        {log.slice(0, 5).map((line, i) => (
          <li key={log.length - i}>
            #{log.length - i}: {line}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- 3. String, number and boolean (Practice, section 5) ---------- */
export const BasicTypesDemo = () => {
  const [name, setName] = useState(""); // string
  const [quantity, setQuantity] = useState(1); // number
  const [isOn, setIsOn] = useState(false); // boolean

  return (
    <div className="demo">
      <p>
        <strong>String:</strong>
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
      <p>Hello, {name === "" ? "stranger" : name}!</p>

      <p>
        <strong>Number:</strong>
      </p>
      {/* Math.max keeps the number from going below 1 */}
      <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
        -
      </button>
      <strong>{quantity}</strong>
      <button className="ml" onClick={() => setQuantity((prev) => prev + 1)}>
        +
      </button>
      <p className="small">
        Total for {quantity} item(s) at 50 each: {quantity * 50}
      </p>

      <p>
        <strong>Boolean:</strong>
      </p>
      {/* !prev flips true to false and false to true */}
      <button onClick={() => setIsOn((prev) => !prev)}>Toggle lamp</button>
      <span className={isOn ? "lamp on" : "lamp"} />
      {isOn ? "ON" : "OFF"}
    </div>
  );
};

/* ---------- 4. Array: shopping list (Practice, section 6) ---------- */
export const ShoppingList = () => {
  const [items, setItems] = useState<string[]>(["Milk", "Bread"]); // <string[]> = array of strings
  const [draft, setDraft] = useState(""); // what is being typed

  const addItem = () => {
    const text = draft.trim();
    if (text === "") return; // ignore empty input
    setItems((prev) => [...prev, text]); // NEW array: all old items, then the new one
    setDraft(""); // clear the input box
  };

  const removeItem = (index: number) => {
    // filter builds a NEW array without the item at this index
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="demo">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addItem()}
        placeholder="Add an item and press Enter"
      />
      <button className="ml" onClick={addItem}>
        Add
      </button>

      <ul className="chip-list">
        {items.length === 0 && <li className="small">The list is empty.</li>}
        {items.map((item, i) => (
          <li className="chip" key={`${item}-${i}`}>
            {item}
            <button onClick={() => removeItem(i)} aria-label={`Remove ${item}`}>
              x
            </button>
          </li>
        ))}
      </ul>
      <p className="small">{items.length} item(s) in state</p>
    </div>
  );
};

/* ---------- 5. Object: the car and the spread operator (Practice, section 7) ---------- */
type Car = { brand: string; model: string; year: string; color: string };
const initialCar: Car = {
  brand: "Ford",
  model: "Mustang",
  year: "1964",
  color: "red",
};

export const CarDemo = () => {
  const [car, setCar] = useState<Car>(initialCar);

  // WRONG: the new object REPLACES the old one. Brand, model and year are gone.
  // (The "as Car" is only here so TypeScript lets this deliberate bug run.)
  const paintWrong = () => setCar({ color: "blue" } as Car);

  // RIGHT: ...prev copies brand, model, year and color first. Then color overrides one field.
  const paintRight = () => setCar((prev) => ({ ...prev, color: "blue" }));

  return (
    <div className="demo">
      <p className="color-line">
        My <strong>{car.brand || "(gone!)"}</strong>: a{" "}
        <span className="swatch" style={{ background: car.color }} />
        <strong>{car.color}</strong> {car.model || "(gone!)"} from{" "}
        {car.year || "(gone!)"}.
      </p>
      <button onClick={paintWrong}>Paint blue (without spread)</button>
      <button onClick={paintRight}>Paint blue (with spread)</button>
      <button onClick={() => setCar(initialCar)}>Reset</button>
    </div>
  );
};

/* ---------- 6. Previous state: the +3 experiment (Practice, section 8) ---------- */
export const PreviousStateDemo = () => {
  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  // Three calls, but each reads the SAME snapshot (wrongCount is 0 for this whole click)
  const addThreeWrong = () => {
    setWrongCount(wrongCount + 1); // "set it to 0 + 1"
    setWrongCount(wrongCount + 1); // "set it to 0 + 1" again
    setWrongCount(wrongCount + 1); // and again. Final answer: 1
  };

  // Each call receives the result of the previous queued update, so they stack: 1, 2, 3
  const addThreeRight = () => {
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
  };

  return (
    <div className="compare">
      <div className="demo">
        <span className="badge bad">setCount(count + 1)</span>
        <p className="color-line">
          <strong>{wrongCount}</strong>
        </p>
        <button onClick={addThreeWrong}>Add 3</button>
        <button onClick={() => setWrongCount(0)}>Reset</button>
      </div>
      <div className="demo">
        <span className="badge good">setCount(prev + 1)</span>
        <p className="color-line">
          <strong>{rightCount}</strong>
        </p>
        <button onClick={addThreeRight}>Add 3</button>
        <button onClick={() => setRightCount(0)}>Reset</button>
      </div>
    </div>
  );
};

/* ---------- 7. Snapshot (Practice, section 9) ---------- */
export const SnapshotDemo = () => {
  const [count, setCount] = useState(0);
  const [report, setReport] = useState("Press the button.");

  const handleClick = () => {
    setCount(count + 1);
    // count is STILL the old value here: it belongs to this render's snapshot
    setReport(
      `Right after setCount(count + 1), the variable count still said ${count}.`,
    );
  };

  const reset = () => {
    setCount(0);
    setReport("Press the button.");
  };

  return (
    <div className="demo">
      <p className="color-line">
        count on screen: <strong>{count}</strong>
      </p>
      <button onClick={handleClick}>Add 1 and report</button>
      <button onClick={reset}>Reset</button>
      <p className="small">{report}</p>
    </div>
  );
};

/* ---------- 8. Derived value (Practice, section 10) ---------- */
export const DerivedDemo = () => {
  const [first, setFirst] = useState("Onkar");
  const [last, setLast] = useState("K");

  // NOT state. A plain variable recalculated on every render, so it can never go out of sync.
  const fullName = `${first} ${last}`.trim();

  return (
    <div className="demo">
      <input
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        placeholder="First name"
      />
      <input
        className="ml"
        value={last}
        onChange={(e) => setLast(e.target.value)}
        placeholder="Last name"
      />
      <p className="color-line">
        Full name: <strong>{fullName || "(empty)"}</strong>
      </p>
    </div>
  );
};
