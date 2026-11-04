import LessonLayout from "../../components/LessonLayout";
import Practice from "./Practice";
import Remember from "./Remember";
import Understand from "./Understand";
import "./UseContext.css";

const UseContextLesson = () => {
  return (
    <LessonLayout
      title="useContext"
      summary="Share a value with any component below you, without passing props through every layer."
    >
      <section className="stage">
        <h3 className="stage-title">
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

export default UseContextLesson;
