export const mistakes = [
  {
    title: "Not starting the name with 'use'",
    desc: "React's linter uses the 'use' prefix to verify that hook rules are being followed. If you call it 'fetchData', React thinks it's a normal function and won't warn you if you misuse useEffect inside it.",
    bad: "function fetchData(url) {\n  const [data] = useState(null);\n}",
    good: "function useFetch(url) {\n  const [data] = useState(null);\n}",
  },
  {
    title: "Returning JSX instead of data",
    desc: "Components return UI (JSX). Custom hooks return logic and data (arrays, objects, or primitives). Do not render divs or buttons inside a custom hook.",
    bad: "function useWindowSize() {\n  return <div>{width}</div>;\n}",
    good: "function useWindowSize() {\n  return { width, height };\n}",
  },
];
