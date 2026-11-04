import { useState } from "react";
import { lessons } from "./lessons";

const App = () => {
  // Remember which lesson is open. Start with the first one.
  const [activeId, setActiveId] = useState(lessons[0].id);

  // Find the lesson object that matches. ?? falls back to the first lesson if nothing matches.
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const ActiveLesson = active.component; // a component stored in a variable must start with a capital

  return (
    <div className="layout">
      <aside>
        <h1>React Hooks</h1>
        <nav>
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id} // key lets React track each list item
              className={lesson.id === activeId ? "active" : ""} // highlight the open lesson
              onClick={() => setActiveId(lesson.id)}
            >
              {index + 1}. {lesson.title}
            </button>
          ))}
        </nav>
      </aside>

      <main>
        <ActiveLesson />
      </main>
    </div>
  );
};

export default App;
