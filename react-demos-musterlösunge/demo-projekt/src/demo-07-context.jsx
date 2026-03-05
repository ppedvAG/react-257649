import { createContext, useContext, useState } from "react";

/**
 * 1) Context anlegen
 * - Der Context ist wie ein "gemeinsamer Speicher", auf den Komponenten zugreifen können,
 *   ohne Props durch viele Ebenen weiterzureichen (Prop Drilling).
 * - Default-Wert hier: null (damit wir später erkennen, ob der Provider fehlt).
 */
const ThemeContext = createContext(null);

/**
 * 2) Provider-Komponente
 * - Der Provider "stellt" den Context-Wert für alle Kind-Komponenten bereit.
 * - Alles, was innerhalb von <ThemeProvider> gerendert wird, kann den Context nutzen.
 */
export function ThemeProvider({ children }) {
  /**
   * 3) State im Provider
   * - Hier liegt die zentrale Theme-Quelle ("Single Source of Truth").
   * - Startwert: "light"
   */
  const [theme, setTheme] = useState("light");

  /**
   * 4) Funktion zum Umschalten
   * - Wir nutzen das funktionale setState-Update, um immer den aktuellen Wert zu verwenden.
   * - Wenn "light" -> "dark", sonst zurück zu "light".
   */
  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  /**
   * 5) Provider liefert "value"
   * - Alles, was wir hier reinpacken, können Consumer später auslesen:
   *   - theme: aktuelles Theme ("light"/"dark")
   *   - setTheme: Theme direkt setzen (z.B. setTheme("dark"))
   *   - toggleTheme: Theme umschalten
   */
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 6) Custom Hook für den Context-Zugriff
 * - Vereinfachung: Komponenten rufen nur useTheme() statt useContext(ThemeContext) auf.
 * - Vorteil: zentrale Stelle für Fehlerprüfung + bessere Lesbarkeit.
 */
export function useTheme() {
  // 7) Context-Wert auslesen
  const ctx = useContext(ThemeContext);

  /**
   * 8) Schutz: Wenn kein Provider vorhanden ist, ist ctx == null
   * - Dann werfen wir einen hilfreichen Fehler, statt "undefined is not a function".
   */
  if (!ctx) {
    throw new Error("useTheme muss innerhalb von <ThemeProvider> genutzt werden.");
  }

  // 9) Context-Daten zurückgeben (theme, setTheme, toggleTheme)
  return ctx;
}