import { render, screen } from "@testing-library/react";
import Demo02 from "./demo-02-03";

/**
 * Was wird hier getestet?
 * - Demo02 ist eine React-Komponente mit:
 *   - Props (name, items)
 *   - State (message)
 *   - useEffect (console.log beim Mount)
 *   - Styling-Demos (Inline Styles, CSS Klassen, CSS Modules, Fluent UI)
 *
 * Ziel der Tests:
 * - Sicherstellen, dass wichtige Texte/Elemente gerendert werden
 * - Sicherstellen, dass Props korrekt angezeigt werden
 * - Sicherstellen, dass Listen korrekt gerendert und aktualisiert werden
 * - Sicherstellen, dass Effekte (useEffect) ausgeführt werden
 * - Styling nur auf "vorhandene classNames / inline style" prüfen (nicht echte Optik)
 */

/**
 * WICHTIG zu CSS in Tests (Jest + JSDOM):
 * - JSDOM rendert keinen echten Browser, d.h. CSS wird nicht "berechnet" wie im Browser.
 * - Deshalb testen wir bei CSS meist nur:
 *   - "Hat das Element die richtige className?"
 *   - "Sind inline styles gesetzt?"
 *
 * Zusätzlich mocken wir die CSS-Imports:
 * - Normale CSS-Dateien: leeres Objekt
 * - CSS-Modules: definierte Klassennamen, damit Tests stabile Strings haben
 */
jest.mock("./demo-03.css", () => ({}));
jest.mock("./demo-03.module.css", () => ({
  moduleTitle: "moduleTitle",
  moduleText: "moduleText",
  moduleBtn: "moduleBtn",
}));

describe("Demo02 – breite Testabdeckung", () => {
  /**
   * Standard-Props für die meisten Tests:
   * - Vermeidet Wiederholung in jedem einzelnen Test
   * - Macht Tests leichter lesbar
   */
  const defaultProps = {
    name: "Melina",
    items: ["Apfel", "Banane", "Orange"],
  };

  /**
   * Grundlagen: Render + Query-Strategie
   * - render(<Component />) mountet die Komponente in eine Test-DOM-Umgebung
   * - screen.* sucht Elemente im gerenderten DOM
   *
   * Best Practice:
   * - getByRole(...) bevorzugen (ähnlich wie Nutzer:innen Elemente finden)
   * - getByText(...) für klare Texte, wenn Rollen nicht sinnvoll sind
   *
   * getBy... wirft Fehler, wenn Element fehlt -> gut für "muss existieren"
   * queryBy... gibt null zurück -> gut für "darf nicht existieren"
   */

  test("rendert die Hauptüberschrift und grundlegende Abschnitte", () => {
    render(<Demo02 {...defaultProps} />);

    // getByRole: testet gleichzeitig "existiert" und "ist semantisch korrekt" (Heading)
    expect(
      screen.getByRole("heading", { level: 1, name: "Styling Demo (4 Methoden)" })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 2, name: "Props" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "State" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Inline Styles" })).toBeInTheDocument();
  });

  test("zeigt den Hello-Text basierend auf dem Prop 'name' (Props-Demo)", () => {
    render(<Demo02 {...defaultProps} />);
    expect(screen.getByText("Hallo Melina!")).toBeInTheDocument();
  });

  test("rendert alle Listeneinträge aus dem Prop 'items'", () => {
    render(<Demo02 {...defaultProps} />);

    // Inhaltstest: alle Items sind im DOM sichtbar
    expect(screen.getByText("Apfel")).toBeInTheDocument();
    expect(screen.getByText("Banane")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toBeInTheDocument();

    // Strukturtest: <li> Elemente (Role "listitem") entsprechen der Anzahl
    expect(screen.getAllByRole("listitem")).toHaveLength(defaultProps.items.length);
  });

  test("zeigt den initialen State-Text", () => {
    render(<Demo02 {...defaultProps} />);
    expect(screen.getByText("State-Text: Noch nicht geklickt")).toBeInTheDocument();
  });

  test("Inline-Styles: prüft, ob der Text die erwarteten Styles hat", () => {
    render(<Demo02 {...defaultProps} />);

    // Inline Styles sind in JSDOM gut testbar, weil sie direkt am Element hängen
    const inlineText = screen.getByText("Dieser Text ist inline gestylt.");
    expect(inlineText).toHaveStyle({ color: "blue", fontWeight: "bold" });
  });

  test("CSS-Klassen: prüft, ob className gesetzt ist (nicht das Aussehen!)", () => {
    render(<Demo02 {...defaultProps} />);

    // CSS-Klassen testet man meist nur auf "className vorhanden"
    expect(screen.getByRole("heading", { level: 2, name: "CSS Klassen" })).toHaveClass("cssTitle");
    expect(screen.getByText("Dieser Text kommt aus demo-02.css.")).toHaveClass("cssText");
    expect(screen.getByRole("button", { name: "CSS Klassen Button" })).toHaveClass("cssBtn");
  });

  test("CSS Modules: prüft, ob die 'gemockten' Modul-Klassen gesetzt sind", () => {
    render(<Demo02 {...defaultProps} />);

    // Bei CSS Modules kommt die Klasse aus einem Import-Objekt (styles.xyz)
    // Deshalb mocken wir diese Werte oben, damit Tests stabil sind.
    expect(screen.getByRole("heading", { level: 2, name: "CSS Modules" })).toHaveClass("moduleTitle");
    expect(screen.getByText("Dieser Text kommt aus demo-02.module.css.")).toHaveClass("moduleText");
    expect(screen.getByRole("button", { name: "CSS Modules Button" })).toHaveClass("moduleBtn");
  });

  test("Fluent UI: rendert den DefaultButton mit dem Text 'Fluent Button'", () => {
    render(<Demo02 {...defaultProps} />);

    /**
     * Wir testen hier nur die Existenz und den zugänglichen Namen.
     * Warum nicht Styling testen?
     * - Fluent UI erzeugt Styles zur Laufzeit, JSDOM bildet das nicht wie ein Browser ab.
     */
    expect(screen.getByRole("button", { name: "Fluent Button" })).toBeInTheDocument();
  });

  test("Props-Update: rerender zeigt neuen Namen an (One-way dataflow sichtbar)", () => {
    /**
     * render(...) liefert ein rerender(...) zurück:
     * - damit simulieren wir: "Parent gibt neue Props"
     */
    const { rerender } = render(<Demo02 {...defaultProps} />);

    expect(screen.getByText("Hallo Melina!")).toBeInTheDocument();

    rerender(<Demo02 name="Sarah" items={defaultProps.items} />);

    expect(screen.getByText("Hallo Sarah!")).toBeInTheDocument();
  });

  test("List-Update: rerender zeigt neue Items an", () => {
    const { rerender } = render(<Demo02 {...defaultProps} />);
    expect(screen.getByText("Apfel")).toBeInTheDocument();

    rerender(<Demo02 name={defaultProps.name} items={["Kiwi"]} />);

    // queryByText: Element sollte NICHT mehr existieren
    expect(screen.queryByText("Apfel")).not.toBeInTheDocument();

    // getByText: neues Element MUSS existieren
    expect(screen.getByText("Kiwi")).toBeInTheDocument();
  });

  test("Edge Case: leere Items-Liste => keine listitems", () => {
    render(<Demo02 name="Melina" items={[]} />);

    // Role "list" steht für <ul>
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Keine <li> Elemente -> leeres Array
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});