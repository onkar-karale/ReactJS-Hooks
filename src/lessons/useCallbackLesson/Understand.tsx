export default function Understand() {
  return (
    <section className="example">
      <h3>1. The big idea: The Laminated Recipe</h3>
      <p>
        Imagine you are a Head Chef (the Parent Component) and you have a
        Sous-Chef (a Child Component). Every time the kitchen gets a new order
        (a re-render), you write out instructions for the Sous-Chef on a sticky
        note.
      </p>
      <p>
        Even if the instructions are <em>exactly the same</em>, the Sous-Chef
        sees a brand new piece of paper, assumes it's a completely new recipe,
        and starts preparing their station from scratch (an unnecessary
        re-render).
      </p>
      <p>
        <code>useCallback</code> is a laminating machine. Instead of writing a
        new sticky note, you hand the Sous-Chef the exact same laminated card.
        The Sous-Chef recognizes it, says "I already know how to do this," and
        skips the prep work.
      </p>

      <table className="slots">
        <thead>
          <tr>
            <th>The Kitchen</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Writing a new sticky note</td>
            <td>
              <strong>Recreating a function:</strong> React creates a brand new
              function in memory on every render.
            </td>
          </tr>
          <tr>
            <td>The Sous-Chef checking the note</td>
            <td>
              <strong>React.memo:</strong> A wrapper that tells a child
              component to skip rendering if its props haven't changed.
            </td>
          </tr>
          <tr>
            <td>The Laminated Card</td>
            <td>
              <strong>useCallback:</strong> Caches the function[cite: 1] so its
              memory address stays exactly the same between renders.
            </td>
          </tr>
        </tbody>
      </table>

      <h4>2. Reading the one line of code</h4>
      <p>
        The hook accepts two arguments: the function you want to cache, and the
        rules for when to break the lamination and write a new one[cite: 1].
      </p>

      <div className="anatomy">
        <span className="t-kw">const</span>{" "}
        <span className="t-value">cachedFn</span> ={" "}
        <span className="t-hook">useCallback</span>( () =&gt; {"{ ... }"}, [{" "}
        <span className="t-init">dependencies</span> ] );
      </div>

      <ul className="steps">
        <li>
          <span className="t-value">cachedFn</span>: The returned memoized
          function[cite: 1].
        </li>
        <li>
          <strong>callback</strong>: The actual logic you want to save.
        </li>
        <li>
          <span className="t-init">dependencies</span>: An array of variables.
          The memoized callback will only change if one of these dependencies
          changes[cite: 1].
        </li>
      </ul>
    </section>
  );
}
