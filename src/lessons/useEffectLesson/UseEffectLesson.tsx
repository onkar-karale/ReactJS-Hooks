import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./UseEffect.css";

const UseEffectLesson = () => (
  <LessonLayout
    title="useEffect"
    summary="Run code after the screen is drawn, and clean up after it."
  >
    <Understand />
    <Practice />
    <Remember />
  </LessonLayout>
);

export default UseEffectLesson;
