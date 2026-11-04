export const mistakes = [
  {
    title: "Mutating state directly",
    desc: "A reducer must be pure. You cannot change the existing state object; you must construct and return a brand new one.",
    bad: "state.score = state.score + 1;\nreturn state;",
    good: "return { ...state, score: state.score + 1 };",
  },
  {
    title: "Forgetting the default case",
    desc: "If you dispatch an action the reducer doesn't recognize, it will return undefined and break your app unless you have a default case.",
    bad: "switch(action.type) {\n  case 'ADD': return newObj;\n}",
    good: "switch(action.type) {\n  case 'ADD': return newObj;\n  default: return state;\n}",
  },
];
