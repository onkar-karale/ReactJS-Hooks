import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================
   All interactive Demos for the useEffect lesson.
   ============================================================ */

/* ---------- 1. Change the browser tab title (Understand, section 1) ---------- */
export const TitleDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const original = document.title; // remember the old title // THE SIDE EFFECT: touch the browser tab
    return () => {
      document.title = original; // CLEANUP: put the old title back
    };
  }, [count]); // run again whenever count changes

  return (
    <div className="demo">
      <p className="color-line">
        Count: <strong>{count}</strong>
      </p>
      <button onClick={() => setCount((prev) => prev + 1)}>Click me</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p className="small">
        Look at the title of this browser tab while you click.
      </p>
    </div>
  );
};

/* ---------- 2. Mount, update, unmount (Understand, section 4) ---------- */
type ChildProps = { onLog: (message: string) => void };

const LifecycleChild = ({ onLog }: ChildProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onLog(`EFFECT: runs after the screen shows count = ${count}`);
    // The returned function is the CLEANUP. It runs before the next effect and on removal.
    return () =>
      onLog(`CLEANUP: undoing the effect that used count = ${count}`);
  }, [count, onLog]);

  return (
    <p>
      Child component: count = <strong>{count}</strong>{" "}
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
    </p>
  );
};

export const LifecycleDemo = () => {
  const [show, setShow] = useState(true);
  const [log, setLog] = useState<string[]>([]);

  // useCallback keeps the SAME function between renders (you will learn it soon).
  // Without it, onLog would change every render and the child effect would re-run constantly.
  const addLog = useCallback((message: string) => {
    setLog((prev) => [message, ...prev].slice(0, 8)); // newest first, keep 8 lines
  }, []);

  return (
    <div className="demo">
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Remove the child" : "Show the child"}
      </button>
      <button onClick={() => setLog([])}>Clear log</button>

      {show && <LifecycleChild onLog={addLog} />}

      <p className="small">Log (newest first):</p>
      <ul className="log">
        {log.length === 0 && <li>Nothing yet.</li>}
        {log.map((line, i) => (
          <li key={`${log.length - i}-${line}`}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- 3. The three dependency modes (Practice, section 5) ---------- */
export const DependencyDemo = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  const [report, setReport] = useState("Click around, then press Show.");

  // useRef = a box that survives redraws WITHOUT causing one (you will learn it soon).
  // We use it as three counters, because setting state inside these effects would loop.
  const runs = useRef({ every: 0, once: 0, onCount: 0 });

  useEffect(() => {
    runs.current.every += 1;
  }); // no array: after EVERY render
  useEffect(() => {
    runs.current.once += 1;
  }, []); // []: only after the first render
  useEffect(() => {
    runs.current.onCount += 1;
  }, [count]); // [count]: first render + when count changes

  // Reading the box inside a click handler is fine
  const show = () => {
    const r = runs.current;
    setReport(
      `no array: ${r.every}  |  []: ${r.once}  |  [count]: ${r.onCount}`,
    );
  };

  return (
    <div className="demo">
      <button onClick={() => setCount((prev) => prev + 1)}>
        count + 1 ({count})
      </button>
      <button onClick={() => setOther((prev) => prev + 1)}>
        other + 1 ({other})
      </button>
      <button onClick={show}>Show how often each effect ran</button>
      <p className="small">{report}</p>
    </div>
  );
};

/* ---------- 4. Cleanup: a stopwatch (Practice, section 6) ---------- */
export const TimerDemo = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return; // stopped: nothing to set up
    const id = setInterval(() => setSeconds((prev) => prev + 1), 1000); // start ticking
    return () => clearInterval(id); // CLEANUP: stop THIS timer
  }, [running]); // re-run when start/stop changes

  return (
    <div className="demo">
      <p className="color-line">
        Seconds: <strong>{seconds}</strong>
      </p>
      <button onClick={() => setRunning(true)} disabled={running}>
        Start
      </button>
      <button onClick={() => setRunning(false)} disabled={!running}>
        Stop
      </button>
      <button
        onClick={() => {
          setRunning(false);
          setSeconds(0);
        }}
      >
        Reset
      </button>
    </div>
  );
};

/* ---------- 5. Cleanup: an event listener (Practice, section 7) ---------- */
export const ResizeDemo = () => {
  // Function form: runs only once, to compute the starting value
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize); // SUBSCRIBE to the browser
    return () => window.removeEventListener("resize", onResize); // UNSUBSCRIBE in the cleanup
  }, []); // [] = subscribe once

  return (
    <div className="demo">
      <p className="color-line">
        Window width: <strong>{width}px</strong> (
        {width >= 700 ? "wide" : "narrow"})
      </p>
      <p className="small">
        Drag the edge of your browser window and watch the number change.
      </p>
    </div>
  );
};

/* ---------- 6. Fetching data (Practice, section 8) ---------- */
type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};
type Result = { id: number; user?: User; error?: string }; // remembers WHICH user it belongs to

export const FetchDemo = () => {
  const [userId, setUserId] = useState(1);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // lets us cancel the request

    // The function given to useEffect cannot be async, so we define an async one inside
    const load = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error(`Server said ${res.status}`); // fetch does not throw on 404/500
        const user: User = await res.json();
        setResult({ id: userId, user });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return; // cancelled: ignore
        setResult({
          id: userId,
          error: err instanceof Error ? err.message : "Request failed",
        });
      }
    };
    load();

    return () => controller.abort(); // CLEANUP: cancel if the user clicks another id mid-request
  }, [userId]); // fetch again whenever userId changes

  // Loading is DERIVED, not stored: we are loading until the result matches the chosen id
  const isLoading = result === null || result.id !== userId;

  return (
    <div className="demo">
      {[1, 2, 3, 4, 5].map((id) => (
        <button
          key={id}
          className={id === userId ? "selected" : ""}
          onClick={() => setUserId(id)}
        >
          User {id}
        </button>
      ))}
      {isLoading && <p className="small">Loading...</p>}
      {!isLoading && result?.error && (
        <p>Something went wrong: {result.error}</p>
      )}
      {!isLoading && result?.user && (
        <p>
          <strong>{result.user.name}</strong>
          <br />
          {result.user.email}
          <br />
          <span className="small">Works at {result.user.company.name}</span>
        </p>
      )}
      <p className="small">This demo needs an internet connection.</p>
    </div>
  );
};
