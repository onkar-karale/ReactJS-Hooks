import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./UseRef.css";

const UseRefLesson = () => {
  return (
    <LessonLayout
      title="useRef"
      summary="A box that remembers a value without redrawing the screen, and a remote control for real elements."
    >
      <section className="stage">
        <h3 className="stage-title">
          <span className="stage-num">1</span>
          Understand <span className="stage-goal">the idea</span>
        </h3>
        <Understand />
      </section>

      <section className="stage">
        <h3 className="stage-title">
          <span className="stage-num">2</span>
          Practice <span className="stage-goal">hands-on</span>
        </h3>
        <Practice />
      </section>

      <section className="stage">
        <h3 className="stage-title">
          <span className="stage-num">3</span>
          Remember <span className="stage-goal">make it stick</span>
        </h3>
        <Remember />
      </section>
    </LessonLayout>
  );
};

export default UseRefLesson;
