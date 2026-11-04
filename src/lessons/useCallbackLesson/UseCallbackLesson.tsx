import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./UseCallback.css";

export default function UseCallbackLesson() {
  return (
    <LessonLayout
      title="useCallback"
      summary="Memoize your functions. Stop rewriting the exact same instructions on every render."
    >
      <Understand />
      <Practice />
      <Remember />
    </LessonLayout>
  );
}
