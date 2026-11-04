import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./UseReducer.css";

export default function UseReducerLesson() {
  return (
    <LessonLayout
      title="useReducer"
      summary="Centralize complex state logic. Give your component a rulebook."
    >
      <Understand />
      <Practice />
      <Remember />
    </LessonLayout>
  );
}
