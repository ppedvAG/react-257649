/**
 * DynamicList.test.tsx
 * --------------------
 * Einfache Tests für die DynamicList-Komponente.
 *
 * Herausforderung:
 * - DynamicList nutzt Fluent UI (<Stack>, <Text>, mergeStyleSets).
 * - Für Anfänger-Tests ist es oft einfacher, Fluent UI zu mocken,
 *   damit wir stabiles HTML bekommen und nicht von Fluent-Interna abhängen.
 *
 * Lernziele:
 * 1) Rendern der Komponente mit Beispiel-Items
 * 2) Prüfen, dass alle Items als Text im DOM erscheinen
 * 3) Edge Case: leeres Array -> keine Einträge
 * 4) Optional: prüfen, dass die Wrapper-Struktur existiert (data-testid)
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { DynamicList } from "./DynamicList";

/* =========================================================
   Fluent UI Mock
   =========================================================
   Warum mocken?
   - Fluent UI Komponenten sind echte React-Komponenten mit interner Logik.
   - Für Unit-Tests wollen wir möglichst "nur unsere Logik" testen.
   - Wir ersetzen <Stack> und <Text> durch einfache HTML-Elemente.
   - mergeStyleSets gibt feste Klassen zurück, damit className testbar ist.
*/
jest.mock("@fluentui/react", () => ({
  // Stack wird zu einem <div> (nimmt className und children an)
  Stack: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),

  // Text wird zu einem <span>
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,

  // mergeStyleSets liefert feste Klassennamen, damit wir sie prüfen können
  mergeStyleSets: jest.fn(() => ({
    list: "dynamic-list",
    item: "dynamic-list-item",
  })),

  // Tokens-Typ ist für Tests irrelevant; wir liefern einfach etwas zurück
  // (IStackTokens ist nur ein TypeScript-Typ und existiert zur Laufzeit nicht)
}));

/* =========================================================
   Tests
   ========================================================= */

describe("DynamicList", () => {
  test("rendert alle Items als Text", () => {
    const items = ["Eintrag 1", "Eintrag 2", "Eintrag 3"];

    // Arrange + Act
    render(<DynamicList items={items} />);

    // Assert: Jeder String muss im DOM erscheinen
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("rendert bei leerem Array keine Einträge", () => {
    // Arrange + Act
    render(<DynamicList items={[]} />);

    /**
     * Es gibt dann keinen Text im DOM, der einem Item entspricht.
     * Da wir keine Items haben, prüfen wir strukturell:
     * - Es sollen 0 Elemente mit der Item-Klasse existieren.
     *
     * Dafür nutzen wir container.querySelectorAll(...),
     * weil Rollen/Tags in unserem Mock sehr generisch sind.
     */
    const { container } = render(<DynamicList items={[]} />);
    expect(container.querySelectorAll(".dynamic-list-item")).toHaveLength(0);
  });

  test("wendet die Klassen aus mergeStyleSets an (list und item)", () => {
    const items = ["A", "B"];

    const { container } = render(<DynamicList items={items} />);

    /**
     * Outer Container:
     * - sollte die "list"-Klasse bekommen
     */
    const list = container.querySelector(".dynamic-list");
    expect(list).toBeInTheDocument();

    /**
     * Pro Item ein Element mit "item"-Klasse
     */
    const listItems = container.querySelectorAll(".dynamic-list-item");
    expect(listItems).toHaveLength(items.length);
  });
});