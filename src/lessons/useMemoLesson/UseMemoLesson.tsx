import LessonLayout from "../../components/LessonLayout";
import Understand from "./Understand";
import Practice from "./Practice";
import Remember from "./Remember";
import "./UseMemo.css";

export default function UseMemoLesson() {
  return (
    <LessonLayout
      title="useMemo"
      summary="Cache the results of expensive calculations. Stop doing heavy math if the numbers haven't changed."
    >
      <Understand />
      <Practice />
      <Remember />
    </LessonLayout>
  );
}