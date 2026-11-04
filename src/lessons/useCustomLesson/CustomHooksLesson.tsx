import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./useCustom.css";

export default function UseCustomHookLesson() {
  return (
    <LessonLayout
      title="Custom Hooks"
      summary="Extract reusable logic. Build your own tools by combining React's built-in hooks."
    >
      <Understand />
      <Practice />
      <Remember />
    </LessonLayout>
  );
}
