export type Mistake = { title: string; why: string; bad: string; good: string };

// Plain data, no JSX. Add a mistake here and it appears in the lesson automatically.
export const mistakes: Mistake[] = [
  {
    title: "Changing state directly",
    why: "React is never told, so nothing redraws, and the value is lost on the next render.",
    bad: `count = count + 1;
count++;`,
    good: `setCount((prev) => prev + 1);`,
  },
  {
    title: "Editing an object or array in place",
    why: "It is the same object, so React sees no change. Make a copy instead.",
    bad: `car.color = "blue";
setCar(car);          // same object

items.push("Eggs");
setItems(items);      // same array`,
    good: `setCar((prev) => ({ ...prev, color: "blue" }));
setItems((prev) => [...prev, "Eggs"]);`,
  },
  {
    title: "Forgetting the spread on objects",
    why: "The new value replaces the old one completely. Every other field disappears.",
    bad: `setCar({ color: "blue" });   // brand, model, year gone`,
    good: `setCar((prev) => ({ ...prev, color: "blue" }));`,
  },
  {
    title: "Calling the setter while rendering",
    why: "Setting state redraws, the redraw sets state again, and you get an infinite loop. Call setters from events.",
    bad: `const App = () => {
  const [n, setN] = useState(0);
  setN(n + 1);          // runs on every render: infinite loop
  return <p>{n}</p>;
};`,
    good: `<button onClick={() => setN((prev) => prev + 1)}>+1</button>`,
  },
  {
    title: "Calling the setter immediately in onClick",
    why: "Parentheses run the function right now, during render. onClick needs a function to run LATER.",
    bad: `<button onClick={setCount(5)}>Set</button>   // runs at once`,
    good: `<button onClick={() => setCount(5)}>Set</button>   // runs on click`,
  },
  {
    title: "Expecting the new value on the next line",
    why: "State is a photograph. The new value arrives on the next render.",
    bad: `setCount(count + 1);
console.log(count);   // still the OLD value`,
    good: `// Need the new value? Calculate it first:
const next = count + 1;
setCount(next);
console.log(next);`,
  },
  {
    title: "Starting with null and forgetting the type",
    why: "TypeScript infers the type from the first value. Tell it both possibilities.",
    bad: `const [user, setUser] = useState(null);
setUser("Onkar");   // TypeScript error`,
    good: `const [user, setUser] = useState<string | null>(null);
setUser("Onkar");   // fine`,
  },
  {
    title: "Calling useState inside an if or a loop",
    why: "React tracks hooks by order. They must run on every render, in the same order.",
    bad: `if (isLoggedIn) {
  const [name, setName] = useState("");
}`,
    good: `const [name, setName] = useState("");   // top level, always
if (!isLoggedIn) return <p>Please log in</p>;`,
  },
];
