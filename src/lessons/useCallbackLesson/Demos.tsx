import React, { useCallback, useState } from "react";

// The Child Component: Wrapped in React.memo so it only re-renders if props change.
const ChildButton = React.memo(
  ({
    onClick,
    text,
    type,
    renderCount,
  }: {
    onClick: () => void;
    text: string;
    type: "bad" | "good";
    renderCount: number;
  }) => {
    return (
      <button className={`demo-btn ${type}`} onClick={onClick}>
        {text}
        <span className="render-badge">Rendered {renderCount}x</span>
      </button>
    );
  },
);

export function CallbackDemo() {
  // States
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  // BAD: Recreated every time this parent renders
  const handleBadClick = () => setCountA(countA + 1);

  // GOOD: Memoized. Only recreated if countB changes[cite: 1]
  const handleGoodClick = useCallback(() => {
    setCountB(countB + 1);
  }, [countB]);

  return (
    <div className="demo callback-demo">
      <div className="compare">
        <div className="demo-panel">
          <h4>❌ Without useCallback</h4>
          <p className="small">
            Increments Count A. Watch this button re-render even when you click
            the green one.
          </p>
          <div className="demo-stat">
            Count A: <strong>{countA}</strong>
          </div>
          <ChildButton
            type="bad"
            onClick={handleBadClick}
            text="Update A"
            renderCount={countA + countB + 1}
          />
        </div>

        <div className="demo-panel">
          <h4>✅ With useCallback</h4>
          <p className="small">
            Increments Count B. This button only re-renders when Count B
            changes.
          </p>
          <div className="demo-stat">
            Count B: <strong>{countB}</strong>
          </div>
          <ChildButton
            type="good"
            onClick={handleGoodClick}
            text="Update B"
            renderCount={countB + 1}
          />
        </div>
      </div>
    </div>
  );
}
