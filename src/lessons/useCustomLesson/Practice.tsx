import Code from "../../components/Code";
import { CustomHookDemo } from "./Demos";

export default function Practice() {
  return (
    <section className="example">
      <h3>3. See it in action</h3>
      <p>
        Fetching data requires tracking at least three things: the data itself,
        a loading state, and potential errors. If you write this in every
        component, your files become massive. Let's see how much cleaner a
        component gets when we extract that logic into a <code>useFetch</code>{" "}
        hook.
      </p>

      <CustomHookDemo />

      <h4>How we extracted the logic:</h4>
      <Code>
        {`// 1. We create the Custom Hook in its own file
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading }; // Return an object with the states
}

// 2. We use it in our component
function App() {
  const { data, loading } = useFetch("https://api.example.com/users");
  
  if (loading) return <p>Loading...</p>;
  return <div>{data.name}</div>;
}`}
      </Code>
    </section>
  );
}
