import { useEffect, useState } from "react";

// 2) Fluent UI
import { DefaultButton } from "@fluentui/react";

// 3) CSS Klassen
import "./demo-03.css";

// 4) CSS Modules
import styles from "./demo-03.module.css";

// Child Komponente
function Hello({ name }) {
  return <p>Hallo {name}!</p>;
}

// Child Komponente
// Destructuring im Funktionsparameter:
// React übergibt der Komponente immer ein props-Objekt.
// Mit ({ items }) wird props.items direkt als Variable "items" herausgezogen.
// Würde hier nur (items) stehen, wäre "items" in Wirklichkeit das ganze props-Objekt
// und man müsste auf items.items zugreifen.
//
// Beispiel:
// <List items={["A", "B"]} />
// - List({ items }): items === ["A", "B"]  -> items.map(...)
// - List( props )  : props === { items: ["A", "B"] } -> props.items.map(...)
function List({ items }) {
  return (
    <ul>
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export default function Demo02({ name, items }) {
  const [message, setMessage] = useState("Noch nicht geklickt");

  useEffect(() => {console.log("Demo02 wurde geladen (mount).");}, []);

  return (
    <div>
      <h1>Styling Demo (4 Methoden)</h1>

      <h2>Props</h2>
      <Hello name={name} />
      <List items={items} />

      <h2>State</h2>
      <p>State-Text: {message}</p>

      {/* 1) Inline Styles */}
      <h2>Inline Styles</h2>
      <p style={{ color: "blue", fontWeight: "bold" }}>
        Dieser Text ist inline gestylt.
      </p>
      <button onClick={() => setMessage("Inline-Button geklickt!")}>
        Inline Button
      </button>

      {/* 2) Fluent UI */}
      <p>Button kommt aus Fluent UI.</p>
      <DefaultButton
      text="Fluent Button"
      styles={{
        root: { background: "yellow", border: "2px solid black" },
        rootHovered: { background: "gold" },
      }}
      onClick={() => setMessage("Fluent UI Button geklickt!")}
    />

      {/* 3) CSS Klassen */}
      <h2 className="cssTitle">CSS Klassen</h2>
      <p className="cssText">Dieser Text kommt aus demo-02.css.</p>
      <button className="cssBtn" onClick={() => setMessage("CSS-Klassen Button geklickt!")}>
        CSS Klassen Button
      </button>

      {/* 4) CSS Modules */}
      <h2 className={styles.moduleTitle}>CSS Modules</h2>
      <p className={styles.moduleText}>Dieser Text kommt aus demo-02.module.css.</p>
      <button
        className={styles.moduleBtn}
        onClick={() => setMessage("CSS Modules Button geklickt!")}
      >
        CSS Modules Button
      </button>
    </div>
  );
}