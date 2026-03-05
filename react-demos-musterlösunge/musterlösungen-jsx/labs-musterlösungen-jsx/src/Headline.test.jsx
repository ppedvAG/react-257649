import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

/**
 * Fluent UI mocken
 * ----------------
 * Warum mocken?
 * - Fluent UI rendert intern oft komplex und erzeugt dynamische Klassen.
 * - Für Tests ist es hilfreich, den Output zu vereinfachen:
 *   - <Text> soll einfach ein echtes HTML-Element rendern (z. B. <h1>)
 *   - mergeStyleSets soll eine feste Klasse zurückgeben, damit className testbar ist
 *
 * Was macht der Mock genau?
 * - Text: rendert children in dem Tag, das über prop "as" kommt (Default: span)
 * - mergeStyleSets: gibt ein Objekt mit root-Klasse zurück ({ root: "headline-root" })
 */
 jest.mock("@fluentui/react", () => ({
   Text: ({ as: As = "span", children, className }) => (
     <As className={className}>{children}</As>
   ),
   mergeStyleSets: jest.fn(() => ({ root: "headline-root" })),
 }));

//Import NACH dem Mock, damit Headline beim Import schon den gemockten Fluent-UI-Code nutzt
import { Headline } from "./Headline";

/**
 * describe("Headline", ...)
 * -------------------------
 * Gruppiert alle Tests, die zur Headline-Komponente gehören.
 */
describe("Headline", () => {
  /**
   * Test 1: Semantik + Inhalt
   * ------------------------
   * Erwartung:
   * - Headline rendert als <h1> (über Text as="h1")
   * - children-Text wird angezeigt
   *
   * getByRole("heading", { level: 1 }) prüft Accessibility/Semantik:
   * - Ein <h1> hat die Rolle "heading" und level=1
   */
  test("rendert semantisch als <h1> und zeigt children an", () => {
    render(<Headline>Meine Überschrift</Headline>);

    // Screenreader-Sicht: heading mit level 1 und dem Namen "Meine Überschrift"
    const h1 = screen.getByRole("heading", {
      level: 1,
      name: "Meine Überschrift",
    });

    expect(h1).toBeInTheDocument();

    // Zusatzcheck: tagName ist wirklich H1 (großgeschrieben im DOM)
    expect(h1.tagName).toBe("H1");
  });

  /**
   * Test 2: Styling-Klasse
   * ---------------------
   * Erwartung:
   * - Headline nutzt className={classNames.root}
   * - unser mergeStyleSets-Mock liefert root = "headline-root"
   * - daher muss das gerenderte <h1> diese Klasse besitzen
   */
  test("wendet die von mergeStyleSets erzeugte root-Klasse an", () => {
    render(<Headline>Styled</Headline>);

    const h1 = screen.getByRole("heading", { level: 1, name: "Styled" });

    // jest-dom Matcher: prüft, ob die Klasse vorhanden ist
    expect(h1).toHaveClass("headline-root");
  });

  /**
   * Test 3: children kann auch JSX sein
   * ----------------------------------
   * Erwartung:
   * - children ist nicht nur ein String, sondern kann auch ein Element sein
   * - Headline rendert alles, was als children übergeben wird
   */
  test("akzeptiert auch komplexeres JSX als children", () => {
    render(
      <Headline>
        <span>Hallo</span>
      </Headline>
    );

    // Wir prüfen, ob der Text aus dem <span> im DOM auftaucht
    expect(screen.getByText("Hallo")).toBeInTheDocument();
  });
});