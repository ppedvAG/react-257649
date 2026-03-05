/**
 * reportWebVitals.ts
 * ------------------
 * Optionales Performance-Monitoring in einer React-App (CRA-Standard).
 *
 * Was macht diese Datei?
 * - Sie exportiert eine Funktion reportWebVitals(...)
 * - Wenn du einen Callback übergibst (z.B. console.log),
 *   werden Web-Vitals-Metriken gemessen und an diesen Callback übergeben.
 *
 * Warum ist das optional?
 * - Ohne Callback: es wird nichts gemessen und nichts geladen.
 * - Mit Callback: das Paket "web-vitals" wird dynamisch nachgeladen (lazy import).
 *
 * Typische Nutzung in index.tsx:
 *   reportWebVitals(console.log);
 *   // oder:
 *   reportWebVitals((metric) => sendToAnalytics(metric));
 */

import { ReportHandler } from "web-vitals";

/**
 * reportWebVitals
 * ---------------
 * Parameter:
 * - onPerfEntry?: ReportHandler
 *   -> optionaler Callback, der pro Metrik aufgerufen wird
 *
 * ReportHandler (aus web-vitals) beschreibt die Funktion:
 *   (metric) => void
 * wobei metric z.B. name, value, id, delta usw. enthält.
 */
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  /**
   * Safety-Check:
   * - Nur wenn ein Callback existiert UND wirklich eine Funktion ist,
   *   starten wir die Messung.
   *
   * Vorteil:
   * - Falls reportWebVitals() ohne Argument aufgerufen wird,
   *   passiert nichts (kein zusätzlicher Code, kein Bundle-Overhead).
   */
  if (onPerfEntry && onPerfEntry instanceof Function) {
    /**
     * Dynamischer Import (Lazy Loading / Code Splitting)
     * --------------------------------------------------
     * - import("web-vitals") lädt das Modul erst zur Laufzeit
     * - das Modul wird nur geladen, wenn wir es wirklich brauchen
     */
    import("web-vitals").then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        /**
         * Die "getX"-Funktionen starten Messungen und rufen den Callback auf,
         * sobald die jeweilige Metrik gemessen werden kann.
         *
         * Alle Funktionen bekommen denselben Callback (onPerfEntry),
         * dadurch landen alle Metriken in derselben Auswertung (z.B. console.log).
         */

        // CLS: Layout-Verschiebungen (Stabilität)
        getCLS(onPerfEntry);

        // FID: Verzögerung beim ersten Input (Interaktivität)
        getFID(onPerfEntry);

        // FCP: erster sichtbarer Content (Wahrgenommene Ladezeit)
        getFCP(onPerfEntry);

        // LCP: größtes sichtbares Content-Element (wichtige Lade-Metrik)
        getLCP(onPerfEntry);

        // TTFB: Zeit bis zum ersten Byte vom Server (Server/Netzwerk)
        getTTFB(onPerfEntry);
      }
    );
  }
};

export default reportWebVitals;