import { useEffect, useRef, useState } from "react";

/* ============================================================
   DEMO 1: Counting renders (the job state can't do)
   ============================================================ */
export function RenderCountDemo() {
  const [text, setText] = useState("");
  const [updatesObserved, setUpdatesObserved] = useState(0);

  return (
    <div className="demo">
      <p>Type in the box and watch the counter:</p>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setUpdatesObserved((count) => count + 1);
        }}
        placeholder="Type anything..."
        aria-label="Type to cause renders"
      />
      <p className="readout">
        Updates observed: <strong>{updatesObserved}</strong>
      </p>
      <p className="small">
        The counter tracks input changes directly in the event handler. It
        starts at 0 and does not count the initial render.
      </p>
    </div>
  );
}

/* ============================================================
   DEMO 2: State vs ref vs plain variable
   ============================================================ */
export function ThreeWayDemo() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  const [displayedRefCount, setDisplayedRefCount] = useState(0);
  const [, setRenderTick] = useState(0);
  const plainCount = 0; // a normal variable: reborn as 0 on every render

  return (
    <div className="demo">
      <div className="tri">
        <div className="tri-card state">
          <h4>useState</h4>
          <p className="small">Remembers and redraws</p>
          <div className="tri-value">{stateCount}</div>
          <button onClick={() => setStateCount(stateCount + 1)}>+1</button>
        </div>

        <div className="tri-card ref">
          <h4>useRef</h4>
          <p className="small">Remembers, never redraws</p>
          <div className="tri-value">{displayedRefCount}</div>
          <button
            onClick={() => {
              refCount.current += 1;
            }}
          >
            +1
          </button>
        </div>

        <div className="tri-card plain">
          <h4>plain variable</h4>
          <p className="small">Forgets on every render</p>
          <div className="tri-value">{plainCount}</div>
          <button
            onClick={() => {
              setRenderTick((tick) => tick + 1);
            }}
          >
            +1 (redraw)
          </button>
        </div>
      </div>

      <button onClick={() => setDisplayedRefCount(refCount.current)}>
        Force a redraw
      </button>

      <div className="note">
        <strong>Try this:</strong> click the ref's +1 a few times. The screen
        does not move. Now click <em>Force a redraw</em>. The ref jumps to the
        right number because it kept the count all along. The plain variable
        resets to 0, and state updates instantly.
      </div>
    </div>
  );
}

/* ============================================================
   DEMO 3: Reaching into the DOM
   ============================================================ */
export function FocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="demo">
      <input
        ref={inputRef}
        defaultValue="Hello, ref!"
        aria-label="Field controlled by the buttons"
      />
      <p>
        <button onClick={() => inputRef.current?.focus()}>Focus</button>
        <button onClick={() => inputRef.current?.select()}>Select text</button>
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.focus();
            }
          }}
        >
          Clear and focus
        </button>
      </p>
    </div>
  );
}

/* ============================================================
   DEMO 4: Remembering the previous value
   ============================================================ */
export function PreviousDemo() {
  const [value, setValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");

  return (
    <div className="demo">
      <input
        value={value}
        onChange={(e) => {
          setPreviousValue(value);
          setValue(e.target.value);
        }}
        placeholder="Type, then keep typing"
        aria-label="Value to track"
      />
      <p className="readout">
        Current value: <strong>{value || "(empty)"}</strong>
      </p>
      <p className="readout">
        Previous value: <strong>{previousValue || "(empty)"}</strong>
      </p>
    </div>
  );
}

/* ============================================================
   DEMO 5: A stopwatch that keeps its timer id in a ref
   ============================================================ */
const format = (total: number) => {
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export function StopwatchDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timerId.current !== null) return; // already running
    setRunning(true);
    timerId.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = () => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
    setRunning(false);
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  // Clean up if the lesson is closed while the timer is running.
  useEffect(() => {
    return () => {
      if (timerId.current !== null) clearInterval(timerId.current);
    };
  }, []);

  return (
    <div className="demo">
      <span className="stopwatch">{format(seconds)}</span>
      <button onClick={start} disabled={running}>
        Start
      </button>
      <button onClick={stop} disabled={!running}>
        Stop
      </button>
      <button onClick={reset}>Reset</button>
      <p className="small">
        The seconds are state (the screen must show them). The timer id is a ref
        (the screen never shows it, but we must remember it to stop the clock).
      </p>
    </div>
  );
}

/* ============================================================
   DEMO 6: Reading an input only when needed
   ============================================================ */
export function ReadOnSubmitDemo() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [greeting, setGreeting] = useState("");

  return (
    <div className="demo">
      <input ref={nameRef} placeholder="Your name" aria-label="Your name" />
      <button onClick={() => setGreeting(nameRef.current?.value ?? "")}>
        Say hello
      </button>
      <p className="readout">
        {greeting ? `Hello, ${greeting}!` : "Type a name and press the button."}
      </p>
      <p className="small">
        Typing in this box causes zero re-renders. The value is read from the
        DOM only when you click.
      </p>
    </div>
  );
}
