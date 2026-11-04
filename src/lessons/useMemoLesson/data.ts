export const mistakes = [
  {
    title: "Premature Optimization (Using it for cheap operations)",
    desc: "React is incredibly fast. Caching a simple string concatenation or a basic math operation actually makes your app slower, because managing the cache takes more effort than just doing the simple math.",
    bad: "const greeting = useMemo(() => `Hi ${name}`, [name]);",
    good: "const greeting = `Hi ${name}`; // Let React just render it",
  },
  {
    title: "Mutating variables inside useMemo",
    desc: "useMemo should be a pure function that only returns a value. You should never use it to set other state variables, trigger side effects, or fetch data. That is what useEffect is for.",
    bad: "useMemo(() => {\n  setOtherState(val);\n  return data;\n}, [val]);",
    good: "const data = useMemo(() => {\n  return compute(val);\n}, [val]);",
  }
];