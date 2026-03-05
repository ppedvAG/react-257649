/**
 * index.tsx (Entry Point)
 * -----------------------
 * Zentraler Einstiegspunkt der React-Anwendung im Browser.
 *
 * Hier passiert typischerweise:
 * 1) Globale CSS-Datei laden (index.css)
 * 2) Root-DOM-Element (#root) finden
 * 3) React Root erstellen (createRoot, React 18)
 * 4) <App /> in dieses Root rendern
 * 5) Optional: Performance-Messung (Web Vitals) starten
 */

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* =========================================================
   Root-DOM-Element finden
   ========================================================= */

/**
 * In public/index.html steht normalerweise:
 * <div id="root"></div>
 *
 * TypeScript:
 * - document.getElementById(...) kann null zurückgeben
 * - hier nutzen wir "as HTMLElement", weil wir davon ausgehen,
 *   dass #root in der HTML-Datei sicher existiert
 */
const rootElement = document.getElementById("root") as HTMLElement;

/**
 * React Root erstellen (React 18)
 * ------------------------------
 * createRoot(...) ersetzt das alte ReactDOM.render(...) aus React < 18.
 */
const root = ReactDOM.createRoot(rootElement);

/* =========================================================
   App rendern
   ========================================================= */

/**
 * root.render(...)
 * ---------------
 * Rendert die gesamte React-Komponenten-Hierarchie in #root.
 *
 * React.StrictMode:
 * - nur in Development aktiv
 * - hilft beim Finden von Problemen (Warnungen, zusätzliche Checks)
 * - kann bestimmte Effekte/Funktionen im Dev-Mode doppelt ausführen,
 *   um Seiteneffekte sichtbar zu machen
 * - hat keinen Effekt im Production-Build
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* =========================================================
   Web Vitals (optional)
   ========================================================= */

/**
 * reportWebVitals()
 * -----------------
 * - Standard aus CRA-Template
 * - misst Performance-Kennzahlen (Web Vitals)
 *
 * Ohne Callback passiert nichts Sichtbares:
 * reportWebVitals();
 *
 * Mit Callback z.B. Log in Konsole:
 * reportWebVitals(console.log);
 */
reportWebVitals();