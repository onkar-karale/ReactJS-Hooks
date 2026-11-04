import { useMemo, useState } from "react";

// A deliberately slow function that blocks the thread to simulate heavy processing
const expensiveCalculation = (num: number) => {
  let result = num;
  for (let i = 0; i < 30000000; i++) {
    result += 1;
  }
  return result;
};

export function MemoDemo() {
  return (
    <div className="demo memo-demo">
      <div className="compare">
        <BadPerformanceDemo />
        <GoodPerformanceDemo />
      </div>
    </div>
  );
}

function BadPerformanceDemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>([]);

  // ❌ BAD: Runs on every single render, even when just adding a todo
  const calculation = expensiveCalculation(count);

  return (
    <div className="demo-panel bad-perf">
      <h4>❌ Without useMemo</h4>
      <p className="small">
        Adding a Todo feels slow because the heavy math runs every time.
      </p>

      <div className="perf-controls">
        <button
          className="action-btn"
          onClick={() => setTodos([...todos, "New Todo"])}
        >
          Add Todo ({todos.length})
        </button>
        <button
          className="action-btn danger"
          onClick={() => setCount((c) => c + 1)}
        >
          Update Count ({count})
        </button>
      </div>

      <div className="calc-result">
        Calculation Result: <strong>{calculation}</strong>
      </div>
    </div>
  );
}

function GoodPerformanceDemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>([]);

  // ✅ GOOD: Only runs when 'count' changes. Adding a todo is instant.
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div className="demo-panel good-perf">
      <h4>✅ With useMemo</h4>
      <p className="small">
        Adding a Todo is instant. The heavy math is bypassed.
      </p>

      <div className="perf-controls">
        <button
          className="action-btn"
          onClick={() => setTodos([...todos, "New Todo"])}
        >
          Add Todo ({todos.length})
        </button>
        <button
          className="action-btn success"
          onClick={() => setCount((c) => c + 1)}
        >
          Update Count ({count})
        </button>
      </div>

      <div className="calc-result">
        Calculation Result: <strong>{calculation}</strong>
      </div>
    </div>
  );
}
