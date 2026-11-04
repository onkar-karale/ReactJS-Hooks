import { useEffect, useState } from "react";

// The Custom Hook (normally in a separate file like hooks/useFetch.ts)
function useSimulatedFetch(dataType: "users" | "posts") {
  const [result, setResult] = useState<{
    dataType: "users" | "posts";
    data: string[];
  } | null>(null);

  useEffect(() => {
    // Simulating a network request delay
    const timer = setTimeout(() => {
      let data: string[];
      if (dataType === "users") {
        data = ["Alex", "Jordan", "Taylor"];
      } else {
        data = [
          "React 19 Released",
          "Understanding Custom Hooks",
          "CSS Variables Guide",
        ];
      }
      setResult({ dataType, data });
    }, 1200);

    return () => clearTimeout(timer);
  }, [dataType]);

  const loading = result?.dataType !== dataType;
  const data = loading ? [] : result.data;

  return { data, loading };
}

export function CustomHookDemo() {
  const [dataType, setDataType] = useState<"users" | "posts">("users");

  // Consuming our custom hook
  const { data, loading } = useSimulatedFetch(dataType);

  return (
    <div className="demo custom-demo">
      <div className="demo-header">
        <button
          className={dataType === "users" ? "selected" : ""}
          onClick={() => setDataType("users")}
        >
          Fetch Users
        </button>
        <button
          className={dataType === "posts" ? "selected" : ""}
          onClick={() => setDataType("posts")}
        >
          Fetch Posts
        </button>
      </div>

      <div className="data-display">
        {loading ? (
          <div className="skeleton-loader">
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
        ) : (
          <ul className="data-list">
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
