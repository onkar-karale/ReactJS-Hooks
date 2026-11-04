import Code from "../../components/Code";
import { CallbackDemo } from "./Demos";

export default function Practice() {
  return (
    <section className="example">
      <h3>3. See it in action</h3>
      <p>
        Here we have two counters. The buttons that update them are wrapped in{" "}
        <code>React.memo</code>, meaning they are supposed to be smart enough to
        skip rendering if their props don't change.
      </p>
      <p>
        Click the buttons. Notice how the "Without useCallback" child re-renders
        even when you click the <em>other</em> button. The "With useCallback"
        child stays perfectly still.
      </p>

      <CallbackDemo />

      <h4>How we fixed the wasted renders:</h4>
      <Code>
        {`// Without useCallback: handleClick1 is a brand new function every render.
const handleClick1 = () => {
  setCount1(count1 + 1);
};

// With useCallback: handleClick1 is the EXACT SAME function, 
// unless count1 changes.
const handleClick1 = useCallback(() => {
  setCount1(count1 + 1);
}, [count1]);`}
      </Code>
    </section>
  );
}
