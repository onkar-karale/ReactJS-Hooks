export type Mistake = {
  id: number;
  title: string;
  why: string; // plain-English explanation of what goes wrong
  bad: string;
  good: string;
};

export const MISTAKES: Mistake[] = [
  {
    id: 1,
    title: "Reading context outside the Provider",
    why: "A component only hears the broadcast if it sits INSIDE the Provider. Outside it, useContext quietly returns the default value, so you get undefined or a placeholder and no error.",
    bad: `function App() {
  return (
    <>
      <UserContext.Provider value="Linus">
        <Header />
      </UserContext.Provider>
      <Footer /> {/* outside! gets the default value */}
    </>
  );
}`,
    good: `function App() {
  return (
    <UserContext.Provider value="Linus">
      <Header />
      <Footer /> {/* inside, so it hears the value */}
    </UserContext.Provider>
  );
}`,
  },
  {
    id: 2,
    title: "Giving useContext the Provider instead of the context",
    why: "useContext wants the context object, the thing createContext returned. The Provider is only the 'broadcaster' and is not what you tune into.",
    bad: `const user = useContext(UserContext.Provider);`,
    good: `const user = useContext(UserContext);`,
  },
  {
    id: 3,
    title: "Creating the context inside a component",
    why: "Each render would build a brand-new context, so the Provider and the consumers stop matching. Create the context once, at the top of the file, outside any component.",
    bad: `function App() {
  const UserContext = createContext(); // new one every render
  ...
}`,
    good: `const UserContext = createContext(); // created once

function App() {
  ...
}`,
  },
  {
    id: 4,
    title: "Forgetting the value prop",
    why: "A Provider without value broadcasts undefined. Everything below it receives nothing, even though the code looks right.",
    bad: `<UserContext.Provider>
  <Component2 />
</UserContext.Provider>`,
    good: `<UserContext.Provider value={user}>
  <Component2 />
</UserContext.Provider>`,
  },
  {
    id: 5,
    title: "Changing a plain variable instead of state",
    why: "Context only delivers a value. It does not make the screen redraw. If the value is not backed by useState (or useReducer), changing it updates nothing on screen.",
    bad: `let user = "Linus";
function rename() {
  user = "Ada"; // nobody is told, no re-render
}
<UserContext.Provider value={user}>...</UserContext.Provider>`,
    good: `const [user, setUser] = useState("Linus");
// setUser("Ada") re-renders the Provider,
// so every consumer gets the new value
<UserContext.Provider value={user}>...</UserContext.Provider>`,
  },
  {
    id: 6,
    title: "One giant context for everything",
    why: "Every consumer re-renders whenever ANY part of the value changes. A huge context makes unrelated components redraw for no reason. Split it by topic.",
    bad: `<AppContext.Provider value={{ user, theme, cart, language }}>
  <App />
</AppContext.Provider>`,
    good: `<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <CartContext.Provider value={cart}>
      <App />
    </CartContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>`,
  },
  {
    id: 7,
    title: "Reaching for context too early",
    why: "Passing a prop down one or two levels is simple and clear. Context adds indirection. Use it when data is needed by many components, or by components far from the owner.",
    bad: `// Parent -> Child, just one level
<UserContext.Provider value={user}>
  <Child />
</UserContext.Provider>`,
    good: `// One level? A plain prop is clearer.
<Child user={user} />`,
  },
  {
    id: 8,
    title: "Creating a new object in value on every render",
    why: "An object literal like { a, b } is a brand-new object each render. React sees a 'change' and re-renders every consumer, even when a and b are the same. For bigger apps, memoise it with useMemo.",
    bad: `<ThemeContext.Provider value={{ mode, toggle }}>
  ...
</ThemeContext.Provider>`,
    good: `const value = useMemo(() => ({ mode, toggle }), [mode]);

<ThemeContext.Provider value={value}>
  ...
</ThemeContext.Provider>`,
  },
];
