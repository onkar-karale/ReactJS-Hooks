import type { ReactNode } from "react";

// Props = the inputs a component receives. This is how a parent passes data DOWN to a child.
type LessonLayoutProps = {
  title: string;
  summary: string;
  children: ReactNode; // children = whatever you put between <LessonLayout> and </LessonLayout>
};

const LessonLayout = ({ title, summary, children }: LessonLayoutProps) => {
  return (
    <article>
      <h2>{title}</h2>
      <p className="summary">{summary}</p>
      <div className="lesson-body">{children}</div>
    </article>
  );
};

export default LessonLayout;
