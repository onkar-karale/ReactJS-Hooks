import Code from "../../components/Code";
import { MISTAKES } from "./data";

const Remember = () => {
  return (
    <>
      {/* ---------- 11. COMMON MISTAKES ---------- */}
      <div className="example">
        <h3>11. Eight common mistakes</h3>
        <p>
          Nearly every useRef bug is one of these. Skim them now and you will
          recognise them instantly later.
        </p>

        {MISTAKES.map((m) => (
          <div className="example" key={m.id}>
            <h4>
              Mistake {m.id}: {m.title}
            </h4>
            <p className="mistake-why">{m.why}</p>
            <div className="compare">
              <div>
                <span className="badge bad">Wrong</span>
                <Code>{m.bad}</Code>
              </div>
              <div>
                <span className="badge good">Right</span>
                <Code>{m.good}</Code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- 12. USE IN OUR PROJECT ---------- */}
      <div className="example">
        <h3>12. Where you would use it in real apps (and in this one)</h3>

        <table className="slots">
          <thead>
            <tr>
              <th>Situation</th>
              <th>What the ref holds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open a login form and put the cursor in the email field</td>
              <td>The input element</td>
            </tr>
            <tr>
              <td>Play and pause a video with your own buttons</td>
              <td>The video element</td>
            </tr>
            <tr>
              <td>Scroll a chat to the newest message</td>
              <td>An empty element at the bottom</td>
            </tr>
            <tr>
              <td>Stop a timer or cancel a pending request</td>
              <td>The timer id or controller</td>
            </tr>
            <tr>
              <td>Show "was 5, now 8" after a change</td>
              <td>The previous value</td>
            </tr>
          </tbody>
        </table>

        <h4>An idea for this learning app</h4>
        <p>
          When the learner clicks a different lesson in the sidebar, the page
          keeps its old scroll position and they land in the middle of the new
          lesson. A ref fixes that by scrolling the article back to the top
          whenever the title changes:
        </p>
        <Code>{`// components/LessonLayout.tsx
import { useEffect, useRef } from "react";

const LessonLayout = ({ title, summary, children }: LessonLayoutProps) => {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    articleRef.current?.scrollIntoView({ block: "start" });
  }, [title]);                                  // runs when the lesson changes

  return (
    <article ref={articleRef}>
      <h2>{title}</h2>
      <p className="summary">{summary}</p>
      <div className="lesson-body">{children}</div>
    </article>
  );
};`}</Code>
        <div className="note">
          <strong>Why a ref and not state?</strong> Scrolling is something the
          browser does to a real element. React has nothing to redraw, so there
          is nothing for state to do.
        </div>
      </div>

      {/* ---------- 13. RECAP ---------- */}
      <div className="example">
        <h3>13. Recap: lock it in</h3>
        <div className="recap">
          <p className="takeaway">
            A ref is a box you can change without anyone noticing.
          </p>
          <ul>
            <li>
              <strong>Create:</strong> <code>const box = useRef(initial)</code>,
              giving <code>{"{ current: initial }"}</code>.
            </li>
            <li>
              <strong>Read and write:</strong> <code>box.current</code>. There
              is no setter.
            </li>
            <li>
              <strong>Silent:</strong> changing <code>current</code> never
              re-renders.
            </li>
            <li>
              <strong>Persistent:</strong> the same box survives every render,
              unlike a plain variable.
            </li>
            <li>
              <strong>Reach the DOM:</strong> attach with{" "}
              <code>ref={"{box}"}</code>, then use{" "}
              <code>box.current.focus()</code> in handlers or effects.
            </li>
            <li>
              <strong>Previous value:</strong> update the ref inside{" "}
              <code>useEffect</code> so the screen still sees the old one.
            </li>
            <li>
              <strong>Choose with one question:</strong> does the screen need to
              change? Yes means state. No means ref.
            </li>
          </ul>
        </div>

        <h4>When NOT to use a ref</h4>
        <ul className="steps">
          <li>
            The value is shown on screen. Use state, or the screen will go
            stale.
          </li>
          <li>
            You want an effect to run when the value changes. Refs do not
            trigger effects.
          </li>
          <li>
            You are tempted to write to <code>current</code> during rendering.
            Move it into an effect or handler.
          </li>
        </ul>

        <div className="note">
          <strong>One sentence to take with you:</strong> use state for what the
          user sees and a ref for what only your code needs to remember, or to
          grab a real element on the page.
        </div>
      </div>
    </>
  );
};

export default Remember;
