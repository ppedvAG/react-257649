import "./App.css";
import { Link, Routes, Route } from "react-router-dom";

import Demo01 from "./demo-01";
import Demo02 from "./demo-02-03";
import Demo05Fetch from "./demo-05-fetch";
import Demo05UseFetch from "./demo-05-useFetch";
import Demo05Axios from "./demo-05-axios";
/**
 * Default Import (ohne {}):
 *    import Demo05ReactQuery from "./demo-05-react-query";
 *    -> Funktioniert nur, wenn das Modul einen `export default ...` hat.
 *    -> Der Name links ist frei wählbar (kann also auch anders heißen).
 */
import Demo05ReactQuery from "./demo-05-react-query";
/**
 * Named Import (mit {}):
 *    import { useTheme } from "./demo-07-context";
 *    -> Funktioniert nur, wenn das Modul einen benannten Export hat:
 *       `export function useTheme() { ... }` oder `export const useTheme = ...`
 *    -> Der Name muss exakt passen (oder per Alias umbenennen):
 *       import { useTheme as useAppTheme } from "./demo-07-context";
 */
import { useTheme } from "./demo-07-context";
import Demo07ReduxCounter from "./demo-07-redux";
import Demo04FormsClassic from "./demo-04-forms-classic";
import Demo04FormValidation from "./demo-04-form-validation";
import Demo04ReactHookForm from "./demo-04-react-hook-form";
import Demo04ControlledVsUncontrolled from "./demo-04-input";

function Home() {
  const studentName = "Melina";
  const fruits = ["Apfel", "Banane", "Orange"];

  return (
    <div>
      <h2>Home (andere Demos)</h2>
      <Demo01 />
      <hr />
      <Demo02 name={studentName} items={fruits} />
      <hr />
      <Demo04FormsClassic />
      <hr />
      <Demo04FormValidation />
      <hr />
      <Demo04ReactHookForm />
      <hr />
      <Demo04ControlledVsUncontrolled />
      <hr />
      <Demo07ReduxCounter />
    </div>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    // Theme nutzen (z.B. CSS-Klasse oder data-Attribut)
    <div className={`App ${theme}`}>
      <h1>React Demos</h1>

      {/* Theme Controls: Hier kannst du die Funktion einsetzen */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <strong>Theme:</strong> <span>{theme}</span>

        <button onClick={toggleTheme}>Toggle Theme</button>

      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/fetch">Fetch</Link>
        <Link to="/usefetch">useFetch</Link>
        <Link to="/axios">Axios</Link>
        <Link to="/react-query">React Query</Link>
      </nav>

      <hr />

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/fetch"
          element={
            <div>
              <h2>Demo: fetch()</h2>
              <Demo05Fetch />
            </div>
          }
        />

        <Route
          path="/usefetch"
          element={
            <div>
              <h2>Demo: Custom Hook (useFetch)</h2>
              <Demo05UseFetch />
            </div>
          }
        />

        <Route
          path="/axios"
          element={
            <div>
              <h2>Demo: Axios</h2>
              <Demo05Axios />
            </div>
          }
        />

        <Route
          path="/react-query"
          element={
            <div>
              <h2>Demo: React Query</h2>
              <Demo05ReactQuery />
            </div>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<p>404 – Seite nicht gefunden</p>} />
      </Routes>
    </div>
  );
}