import Code from "../../components/Code";
import { MemoDemo } from "./Demos";

export default function Practice() {
  return (
    <section className="example">
      <h3>3. See it in action</h3>
      <p>
        Below is a component doing an intentionally massive loop (a heavy
        calculation). We also have a simple "Add Todo" button that has nothing
        to do with the calculation.
      </p>
      <p>
        Try the "Without useMemo" version. Clicking "Add Todo" feels horribly
        sluggish because React is forcing the heavy loop to run again just to
        add a simple string to a list. Then try the "With useMemo" version—the
        exact same heavy math is present, but "Add Todo" is instantly
        responsive.
      </p>

      <MemoDemo />

      <h4>How we fixed the performance bottleneck:</h4>
      <Code>
        {`// Without useMemo: This massive loop blocks the main thread on EVERY render.
// Typing in an input? Adding a todo? The whole app freezes.
const calculation = expensiveCalculation(count);

// With useMemo: React remembers the answer. 
// It ONLY runs the heavy loop when 'count' actually changes.
const calculation = useMemo(() => {
  return expensiveCalculation(count);
}, [count]);`}
      </Code>
    </section>
  );
}
