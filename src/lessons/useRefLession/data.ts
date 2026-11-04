export type Mistake = {
  id: number;
  title: string;
  why: string;
  bad: string;
  good: string;
};

export const MISTAKES: Mistake[] = [
  {
    id: 1,
    title: "Using a ref for something the screen must show",
    why: "Changing ref.current never redraws the screen. The number changes in memory, but nobody is told. If the user should SEE the change, it belongs in state.",
    bad: `const score = useRef(0);

<button onClick={() => (score.current += 1)}>+1</button>
<h1>{score.current}</h1>   {/* stays stuck on screen */}`,
    good: `const [score, setScore] = useState(0);

<button onClick={() => setScore(score + 1)}>+1</button>
<h1>{score}</h1>`,
  },
  {
    id: 2,
    title: "Forgetting .current",
    why: "useRef gives you a box: { current: ... }. The box is not the value. Printing or comparing the box itself is a classic slip.",
    bad: `const count = useRef(0);
console.log(count + 1);     // "[object Object]1"`,
    good: `const count = useRef(0);
console.log(count.current + 1);   // 1`,
  },
  {
    id: 3,
    title: "Touching a DOM ref before the element exists",
    why: "While React is still drawing the first time, the element is not on the page yet, so inputRef.current is null. Use it later, inside event handlers or useEffect.",
    bad: `function App() {
  const inputRef = useRef(null);
  inputRef.current.focus();   // crash: null during render
  return <input ref={inputRef} />;
}`,
    good: `function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();   // runs after the element exists
  }, []);
  return <input ref={inputRef} />;
}`,
  },
  {
    id: 4,
    title: "Writing to a ref while rendering",
    why: "Rendering should only calculate what to show. Changing a ref in the middle of it is a hidden side effect that behaves oddly when React re-renders or double-checks your component. Change refs in effects and event handlers.",
    bad: `function App() {
  const renders = useRef(0);
  renders.current += 1;   // side effect during render
  ...
}`,
    good: `function App() {
  const renders = useRef(0);
  useEffect(() => {
    renders.current += 1;   // after the screen is drawn
  });
  ...
}`,
  },
  {
    id: 5,
    title: "Using state for a value the screen never shows",
    why: "Every setState redraws the component. For a timer id or a render counter, that is wasted work, and inside an effect with no dependency list it becomes an infinite loop.",
    bad: `const [renders, setRenders] = useState(0);

useEffect(() => {
  setRenders(renders + 1);   // re-render -> effect -> re-render -> ...
});`,
    good: `const renders = useRef(0);

useEffect(() => {
  renders.current += 1;      // no re-render, no loop
});`,
  },
  {
    id: 6,
    title: "Expecting a ref change to trigger useEffect",
    why: "Effects watch values that React knows changed. A ref changing is invisible to React, so an effect that lists ref.current in its dependencies will not run when it changes.",
    bad: `const count = useRef(0);

useEffect(() => {
  console.log("count changed");   // does not run on change
}, [count.current]);`,
    good: `const [count, setCount] = useState(0);

useEffect(() => {
  console.log("count changed");
}, [count]);`,
  },
  {
    id: 7,
    title: "Creating the ref but never attaching it",
    why: "A ref only points at an element once you give it to that element with the ref attribute. Without it, current stays null.",
    bad: `const inputRef = useRef(null);

<input type="text" />            {/* no ref attribute */}
<button onClick={() => inputRef.current.focus()}>Focus</button>`,
    good: `const inputRef = useRef(null);

<input type="text" ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>`,
  },
  {
    id: 8,
    title: "Keeping a timer id in a plain variable",
    why: "A normal variable inside a component is created fresh on every render. After one re-render, the interval id is gone and you can never stop the timer. A ref keeps the same box across renders.",
    bad: `function Clock() {
  let timerId;                        // new on every render
  const start = () => { timerId = setInterval(tick, 1000); };
  const stop = () => clearInterval(timerId);   // undefined by now
}`,
    good: `function Clock() {
  const timerId = useRef(null);       // same box every render
  const start = () => { timerId.current = setInterval(tick, 1000); };
  const stop = () => clearInterval(timerId.current);
}`,
  },
];
