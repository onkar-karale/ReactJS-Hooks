import { useState } from "react";
import LessonLayout from "../components/LessonLayout";

/* ============================================================
   PART 1: What is a Hook? (the idea and the analogy)
   ============================================================ */
const WhatIsAHook = () => (
  <div className="example">
    <h3>1. What is a Hook?</h3>
    <p>
      A <strong>Hook</strong> is a special function whose name starts with{" "}
      <code>use</code>. It lets a function component hook into React features:
      memory (state), side effects, shared data (context), and references to
      page elements (refs).
    </p>

    <div className="note">
      <strong>The picture to remember:</strong> a component is an actor who
      forgets everything between scenes. React keeps a <strong>notebook</strong>{" "}
      for each actor. A Hook is the actor opening that notebook to write
      something down, or to read it back.
    </div>

    <p>
      Before React 16.8 (2019), only <strong>class components</strong> could
      have state. Hooks gave plain functions the same powers with far less code.
      Today almost every new React component is a function with hooks.
    </p>
  </div>
);

const FavoriteColor = () => {
  const [color, setColor] = useState("red");

  const colors = ["red", "blue", "pink", "green"];

  return (
    <div className="example">
      <h3>2. A real Hook, running live</h3>
      <p className="color-line">
        My favorite color is <strong style={{ color }}>{color}</strong>!
      </p>

      {colors.map((c) => (
        // key helps React track each item in a list
        <button key={c} type="button" onClick={() => setColor(c)}>
          {c}
        </button>
      ))}

      <div className="note">
        <strong>What happens on a click:</strong> click, then{" "}
        <code>setColor("blue")</code> saves the new value and tells React to
        redraw, then the function runs again, then <code>useState</code> hands
        back <code>"blue"</code>, then the screen updates.
        <br />
      </div>
    </div>
  );
};

/* ============================================================
   PART 2: Why Hooks exist (a plain variable vs useState)
   ============================================================ */

// A plain variable declared OUTSIDE the component, so a click handler is allowed to change it.
// (Declaring it INSIDE the component and changing it in a handler is exactly what React's
// lint rule blocks, because it is a known bug pattern.)
let plainClicks = 0;

const ForgetfulCounter = () => {
  // useState used ONLY as a "redraw trigger" for this demo. We ignore its value on purpose.
  const [, setRedraw] = useState(0);

  return (
    <div>
      <p>
        Screen shows: <strong>{plainClicks}</strong>
      </p>

      <button
        onClick={() => {
          plainClicks += 1; // the variable really changes...
          console.log("plain variable is now", plainClicks); // ...open F12 to see it climb
        }}
      >
        Add click
      </button>

      {/* Asking React to redraw makes the screen read the variable's real value */}
      <button onClick={() => setRedraw((n) => n + 1)}>Force a redraw</button>
    </div>
  );
};

const RememberingCounter = () => {
  const [clicks, setClicks] = useState(0); // memory that React keeps for us

  return (
    <div>
      <p>
        Clicks: <strong>{clicks}</strong>
      </p>
      {/* the setter saves the value AND triggers a redraw */}
      <button onClick={() => setClicks((prev) => prev + 1)}>Add click</button>
    </div>
  );
};

const WhyHooks = () => (
  <div className="example">
    <h3>3. Why we need Hooks (try both counters)</h3>
    <div className="compare">
      <div>
        <span className="badge bad">Plain variable</span>
        <ForgetfulCounter />
        <p className="small">
          Press Add click a few times: the screen stays put while the console
          climbs. Then press Force a redraw: the screen suddenly jumps to the
          real number.
        </p>
      </div>
      <div>
        <span className="badge good">useState</span>
        <RememberingCounter />
        <p className="small">
          The screen updates on every click, and the value survives every
          redraw.
        </p>
      </div>
    </div>
    <div className="note">
      <strong>Two problems solved by one hook:</strong> (1) a variable declared
      inside a component is re-created as 0 on every run, and (2) changing a
      plain variable never tells React to redraw.
      <code>useState</code> fixes both. React's lint rule even blocks the
      inside-the-component version, because it is a known bug pattern.
    </div>
  </div>
);

/* ============================================================
   PART 3: The 3 Rules of Hooks (with correct and wrong code)
   ============================================================ */
type Rule = { title: string; why: string; good: string; bad: string };

const rules: Rule[] = [
  {
    title: "Only inside function components (or custom hooks)",
    why: "Hooks need a component to attach their memory to. A plain helper function has no notebook.",
    good: `const Profile = () => {
  const [name, setName] = useState("");
  return <p>{name}</p>;
};`,
    bad: `function helper() {
  const [x, setX] = useState(0);   // plain function
}`,
  },
  {
    title: "Only at the top level",
    why: "Never inside loops, nested functions or event handlers. They must run on every render, in the same place.",
    good: `const Box = () => {
  const [open, setOpen] = useState(false);   // top level
  return <button onClick={() => setOpen(!open)}>x</button>;
};`,
    bad: `<button onClick={() => {
  const [n, setN] = useState(0);   // inside a handler
}}>x</button>`,
  },
  {
    title: "Never conditional",
    why: "Every hook must run on every render, in the same order. Put the condition inside or after the hooks, never around them.",
    good: `const Card = ({ isLoggedIn }) => {
  const [user, setUser] = useState(null);    // always runs
  if (!isLoggedIn) return <p>Please log in</p>;  // early return AFTER hooks is fine
  return <p>{user}</p>;
};`,
    bad: `const Card = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    const [user, setUser] = useState(null);  // sometimes runs, sometimes not
  }
};`,
  },
];

const HookRules = () => (
  <div className="example">
    <h3>4. The 3 rules of Hooks</h3>

    {rules.map((rule, i) => (
      <div className="rule" key={rule.title}>
        <h4>
          Rule {i + 1}: {rule.title}
        </h4>
        <p>{rule.why}</p>
        <div className="compare">
          <div>
            <span className="badge good">Correct</span>
            <pre>{rule.good}</pre>
          </div>
          <div>
            <span className="badge bad">Wrong</span>
            <pre>{rule.bad}</pre>
          </div>
        </div>
      </div>
    ))}

    <h4>The one idea behind all three rules</h4>
    <p>
      React does not know your variable names. It remembers hooks{" "}
      <strong>by the order they are called</strong>: first call is page 1 of the
      notebook, second call is page 2, and so on. If a hook is skipped, every
      page after it shifts.
    </p>

    <table className="slots">
      <thead>
        <tr>
          <th>Hook call</th>
          <th>Render 1 (all hooks run)</th>
          <th>Render 2 (first hook skipped by an if)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1st</td>
          <td>name reads page 1: Onkar</td>
          <td>age reads page 1: Onkar (wrong)</td>
        </tr>
        <tr>
          <td>2nd</td>
          <td>age reads page 2: 23</td>
          <td>city reads page 2: 23 (wrong)</td>
        </tr>
        <tr>
          <td>3rd</td>
          <td>city reads page 3: Karad</td>
          <td>no call left: React throws an error</td>
        </tr>
      </tbody>
    </table>
  </div>
);

/* ============================================================
   PART 4: Remember in 10 seconds
   ============================================================ */
const Recap = () => (
  <div className="example">
    <h3>5. Remember it in 10 seconds</h3>
    <div className="recap">
      <p>
        <strong>Hook</strong> = a function that starts with <code>use</code> and
        gives a component React powers.
      </p>
      <p>
        <strong>Why</strong> = components forget everything on each run. Hooks
        are the notebook.
      </p>
      <p>
        <strong>Rules</strong> = <strong>F</strong>unction component,{" "}
        <strong>T</strong>op level, <strong>N</strong>o ifs.
      </p>
      <p>
        <strong>Reason</strong> = React tracks hooks by <strong>order</strong>,
        so the order must never change.
      </p>
    </div>
  </div>
);

// main component for this lesson, which stitches together the parts above
const HooksIntro = () => (
  <LessonLayout
    title="What are Hooks?"
    summary="Special functions that let components use React features like memory (state)."
  >
    <WhatIsAHook />
    <FavoriteColor />
    <WhyHooks />
    <HookRules />
    <Recap />
  </LessonLayout>
);

export default HooksIntro;
