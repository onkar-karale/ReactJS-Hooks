import type { ComponentType } from "react";
import HooksIntro from "./HooksIntro";
import UseCallbackLesson from "./useCallbackLesson/UseCallbackLesson";
import UseContextLesson from "./useContextLesson/UseContextLesson";
import CustomHooksLesson from "./UseCustomLesson/CustomHooksLesson";
import UseEffectLesson from "./useEffectLesson/UseEffectLesson";
import UseMemoLesson from "./useMemoLesson/UseMemoLesson";
import UseReducerLesson from "./useReducerLesson/UseReducerLesson";
import UseRefLesson from "./useRefLession/UseRefLesson";
import UseStateLesson from "./useStateLesson/UseStateLesson";

// The shape of one entry in the menu
export type Lesson = { id: string; title: string; component: ComponentType };

// The ORDER here is the order of the sidebar. This is the only file you edit to add a lesson.
export const lessons: Lesson[] = [
  { id: "intro", title: "What are Hooks?", component: HooksIntro },
  { id: "use-state", title: "useState", component: UseStateLesson },
  { id: "use-effect", title: "useEffect", component: UseEffectLesson },
  { id: "use-context", title: "useContext", component: UseContextLesson },
  { id: "use-ref", title: "useRef", component: UseRefLesson },
  { id: "use-reducer", title: "useReducer", component: UseReducerLesson },
  { id: "use-callback", title: "useCallback", component: UseCallbackLesson },
  { id: "use-memo", title: "useMemo", component: UseMemoLesson },
  { id: "custom-hooks", title: "Custom Hooks", component: CustomHooksLesson },
];
