import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./UseState.css";

// Every lesson has the same three stages: understand the idea, practise it, remember it.
const UseStateLesson = () => (
  <LessonLayout
    title="useState"
    summary="Give a component memory that redraws the screen whenever it changes."
  >
    <Understand />
    <Practice />
    <Remember />
  </LessonLayout>
);

export default UseStateLesson;
