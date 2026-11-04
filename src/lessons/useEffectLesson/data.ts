export type Mistake = { title: string; why: string; bad: string; good: string };

// Plain data, no JSX. Add a mistake here and it appears in the lesson automatically.
export const mistakes: Mistake[] = [
  {
    title: "Forgetting the dependency array",
    why: "With no array the effect runs after every render. If it also sets state, that causes another render, and you get an infinite loop.",
    bad: `useEffect(() => {
  setCount(count + 1);   // render, effect, new state, render... forever
});`,
    good: `// Decide WHEN it should run, then say so:
useEffect(() => {
  document.title = "Count " + count;
}, [count]);`,
  },
  {
    title: "Changing a value that is in your own dependency list",
    why: "The effect changes count, count changed, so the effect runs again, and it changes count again.",
    bad: `useEffect(() => {
  setCount(count + 1);
}, [count]);   // loops forever`,
    good: `// Change state from an event, or calculate the value:
const doubled = count * 2;`,
  },
  {
    title: "Leaving out a dependency (a stale value)",
    why: "An effect only sees the values from the render it was created in. List every value it reads.",
    bad: `useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []);   // always logs the FIRST count`,
    good: `useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, [count]);   // restarts with the fresh count`,
  },
  {
    title: "Forgetting the cleanup",
    why: "Timers, listeners and subscriptions outlive the component unless you undo them. They pile up and leak memory.",
    bad: `useEffect(() => {
  window.addEventListener("resize", onResize);
}, []);   // the listener stays forever`,
    good: `useEffect(() => {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);`,
  },
  {
    title: "Making the effect function async",
    why: "An async function returns a Promise, but React expects nothing or a cleanup function.",
    bad: `useEffect(async () => {     // TypeScript error
  const res = await fetch(url);
}, []);`,
    good: `useEffect(() => {
  const load = async () => {
    const res = await fetch(url);
  };
  load();
}, []);`,
  },
  {
    title: "Putting objects or functions made in render into the array",
    why: "A new object is created on every render, so React sees a change every time and the effect runs every time.",
    bad: `const options = { page: 1 };          // new object each render
useEffect(() => {
  load(options);
}, [options]);                         // runs every render`,
    good: `useEffect(() => {
  load({ page });
}, [page]);                            // depend on the simple value`,
  },
  {
    title: "Using an effect for work that belongs elsewhere",
    why: "Calculations belong in a plain variable, and user actions belong in event handlers. An effect adds an extra render and extra bugs.",
    bad: `const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);`,
    good: `const fullName = first + " " + last;   // just calculate it`,
  },
  {
    title: "Thinking the double run in development is a bug",
    why: "StrictMode runs mount, cleanup, mount in development only, to prove your cleanup works. A deployed app runs once.",
    bad: `// "My effect runs twice! I will remove StrictMode."`,
    good: `// Write a correct cleanup. The extra run proves it works.`,
  },
];
