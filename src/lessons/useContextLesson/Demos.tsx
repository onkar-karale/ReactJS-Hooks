import { createContext, useContext, useState, type ReactNode } from "react";

/* ============================================================
   DEMO 1: Prop drilling vs context (a visual explainer)
   ============================================================ */
const NAMES = ["Linus", "Ada", "Grace"];
const LEVELS = ["Component1", "Component2", "Component3", "Component4"];

type Mode = "props" | "context";
type Role = "owns" | "relay" | "ignores" | "uses";

const roleOf = (depth: number, mode: Mode): Role => {
  if (depth === 0) return "owns";
  if (depth === LEVELS.length - 1) return "uses";
  return mode === "props" ? "relay" : "ignores";
};

const tagText = (role: Role, mode: Mode) => {
  if (role === "owns") return "owns the state";
  if (role === "uses")
    return mode === "props" ? "receives the prop" : "useContext(UserContext)";
  if (role === "relay") return "forced to pass user along";
  return "knows nothing, needs nothing";
};

type LayerProps = { depth: number; mode: Mode; user: string };

function Layer({ depth, mode, user }: LayerProps) {
  const role = roleOf(depth, mode);
  const isBottom = depth === LEVELS.length - 1;
  return (
    <div className={`chain-box ${role}`}>
      <div className="chain-label">
        <strong>{LEVELS[depth]}</strong>
        <span className={`chain-tag ${role}`}>{tagText(role, mode)}</span>
      </div>
      {isBottom ? (
        <p>Hello {user} again!</p>
      ) : (
        <Layer depth={depth + 1} mode={mode} user={user} />
      )}
    </div>
  );
}

export function DrillingDemo() {
  const [mode, setMode] = useState<Mode>("props");
  const [i, setI] = useState(0);
  const user = NAMES[i];
  const relays = mode === "props" ? LEVELS.length - 2 : 0;

  return (
    <div className="demo">
      <div>
        <button
          className={mode === "props" ? "selected" : ""}
          onClick={() => setMode("props")}
        >
          Without context (props)
        </button>
        <button
          className={mode === "context" ? "selected" : ""}
          onClick={() => setMode("context")}
        >
          With context
        </button>
      </div>
      <p className="counter">
        Middle components forced to carry <code>user</code> without needing it:{" "}
        <strong>{relays}</strong>
      </p>
      <button onClick={() => setI((i + 1) % NAMES.length)}>
        Change user (now: {user})
      </button>
      <Layer depth={0} mode={mode} user={user} />
    </div>
  );
}

/* ============================================================
   DEMO 2: The real thing, a working Provider and consumer
   ============================================================ */
const UserContext = createContext<string>("nobody");

function MiddleBox() {
  // Notice: no props at all. This component does not know user exists.
  return (
    <div className="chain-box ignores">
      <div className="chain-label">
        <strong>Component2</strong>
        <span className="chain-tag">receives 0 props</span>
      </div>
      <LeafBox />
    </div>
  );
}

function LeafBox() {
  const user = useContext(UserContext);
  return (
    <div className="chain-box uses">
      <div className="chain-label">
        <strong>Component3</strong>
        <span className="chain-tag uses">useContext(UserContext)</span>
      </div>
      <p>Hello {user} again!</p>
    </div>
  );
}

export function BroadcastDemo() {
  const [user, setUser] = useState("Linus");
  return (
    <div className="demo">
      <UserContext.Provider value={user}>
        <div className="chain-box owns">
          <div className="chain-label">
            <strong>Component1</strong>
            <span className="chain-tag owns">
              Provider broadcasting "{user}"
            </span>
          </div>
          <p>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              aria-label="User name"
              placeholder="Type a name"
            />
          </p>
          <p>Hello {user}!</p>
          <MiddleBox />
        </div>
      </UserContext.Provider>
    </div>
  );
}

/* ============================================================
   DEMO 3: Share the setter too (theme switch)
   Also shows the "custom Provider + custom hook" pattern.
   ============================================================ */
type ThemeValue = { mode: "light" | "dark"; toggle: () => void };

const ThemeContext = createContext<ThemeValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeValue["mode"]>("dark");
  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

function ThemeButton() {
  const { mode, toggle } = useTheme();
  return (
    <button onClick={toggle}>
      Switch to {mode === "dark" ? "light" : "dark"}
    </button>
  );
}

function ThemeCard() {
  const { mode } = useTheme();
  return (
    <div className={`theme-card ${mode}`}>
      <strong>I am a card far away from the button.</strong>
      <p>Current theme: {mode}</p>
    </div>
  );
}

export function ThemeDemo() {
  return (
    <ThemeProvider>
      <div className="demo">
        <ThemeButton />
        <ThemeCard />
      </div>
    </ThemeProvider>
  );
}

/* ============================================================
   DEMO 4: The default value
   ============================================================ */
const GreetingContext = createContext<string>("Guest (the default value)");

function Greeting() {
  const who = useContext(GreetingContext);
  return (
    <p>
      Hello, <strong>{who}</strong>!
    </p>
  );
}

export function DefaultValueDemo() {
  const [wrapped, setWrapped] = useState(false);
  return (
    <div className="demo">
      <button
        className={wrapped ? "selected" : ""}
        onClick={() => setWrapped(!wrapped)}
      >
        {wrapped ? "Provider is ON" : "Provider is OFF"} (click to toggle)
      </button>
      {wrapped ? (
        <GreetingContext.Provider value="Linus">
          <Greeting />
        </GreetingContext.Provider>
      ) : (
        <Greeting />
      )}
    </div>
  );
}

/* ============================================================
   DEMO 5: The closest Provider wins (nested Providers)
   ============================================================ */
const LevelContext = createContext<number>(0);

function LevelBadge({ label }: { label: string }) {
  const level = useContext(LevelContext);
  return (
    <div className="chain-box uses">
      {label}: level <strong>{level}</strong>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  const level = useContext(LevelContext);
  return (
    <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
  );
}

export function NearestProviderDemo() {
  return (
    <div className="demo">
      <LevelBadge label="Outside every Section" />
      <Section>
        <LevelBadge label="Inside 1 Section" />
        <Section>
          <LevelBadge label="Inside 2 Sections" />
        </Section>
      </Section>
    </div>
  );
}
