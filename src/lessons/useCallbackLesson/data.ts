export const mistakes = [
  {
    title: "The Stale Closure (Lying about dependencies)",
    desc: "If you use a state variable inside the callback but forget to put it in the dependency array, your laminated card will have outdated instructions. It will use the old state value forever.",
    bad: "const submit = useCallback(() => {\n  console.log(text);\n}, []); // forgot 'text'",
    good: "const submit = useCallback(() => {\n  console.log(text);\n}, [text]); // included 'text'",
  },
  {
    title: "Using it on standard HTML elements",
    desc: "Standard elements like <button> or <div> don't care about function reference equality. They don't have expensive re-render cycles. Wrapping their onClick handlers in useCallback is just wasting memory.",
    bad: "const click = useCallback(() => set(1), []);\nreturn <button onClick={click} />;",
    good: "const click = () => set(1);\nreturn <button onClick={click} />;",
  },
];
