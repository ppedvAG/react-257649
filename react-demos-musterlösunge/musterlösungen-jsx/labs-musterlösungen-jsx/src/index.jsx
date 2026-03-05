/**
 * index.jsx (Entry Point)
 * -----------------------
 * Das ist der Einstiegspunkt der React-Anwendung im Browser.
 *
 * Hier passiert typischerweise:
 * 1) Globales CSS laden (index.css)
 * 2) Root-DOM-Element (#root) finden
 * 3) React Root erstellen (createRoot, React 18)
 * 4) <App /> in dieses Root rendern
 * 5) Optional: Performance-Messung (Web Vitals) starten
 */

import React from "react"; // notwendig, damit JSX in manchen Setups korrekt verarbeitet wird
import ReactDOM from "react-dom/client"; // React 18: createRoot API
import "./index.css"; // globale Styles (z.B. body, Schrift, Standardabstände)
import App from "./App"; // Root-Komponente der Anwendung (enthält z.B. Router / Layout / Seiten)
import reportWebVitals from "./reportWebVitals"; // optionales Performance-Monitoring (CRA/Template)

/**
 * Root-DOM-Element finden
 * ----------------------
 * In public/index.html gibt es normalerweise:
 * <div id="root"></div>
 *
 * Genau in dieses Element “mountet” React die komplette Anwendung.
 */
const rootElement = document.getElementById("root");

/**
 * React Root erstellen
 * -------------------
 * React 18 nutzt createRoot() (statt ReactDOM.render aus älteren Versionen).
 * Das ist die Basis für das neue Root-Rendering und ermöglicht u.a. “Concurrent Features”.
 *
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * App rendern
 * -----------
 * root.render(...) startet das Rendern der React-Komponenten-Hierarchie.
 *
 * React.StrictMode:
 * - ist eine “Entwicklungs-Hülle”
 * - hilft, potenzielle Probleme zu finden (Warnungen, zusätzliche Checks)
 * - kann in Dev bestimmte Dinge absichtlich zweimal ausführen, um Seiteneffekte aufzudecken
 * - hat keinen Effekt in der Production-Build
 */
root.render(
  <React.StrictMode>
    {/* <App /> ist die Wurzelkomponente deiner Anwendung */}
    <App />
  </React.StrictMode>
);

/**
 * Web Vitals (optional)
 * --------------------
 * reportWebVitals kann Performance-Kennzahlen messen (z.B. LCP, CLS, ...).
 *
 * Ohne Callback passiert praktisch “nichts Sichtbares”:
 * reportWebVitals();
 *
 * Wenn man Werte sehen will, kann man z.B.:
 * reportWebVitals(console.log);
 *
 * oder die Werte an ein Analytics/Monitoring-System senden.
 */
reportWebVitals();