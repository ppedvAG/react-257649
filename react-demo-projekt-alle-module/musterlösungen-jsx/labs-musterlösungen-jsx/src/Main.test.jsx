import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Main } from "./Main";

/**
 * DynamicList mocken
 * ------------------
 * Warum?
 * - Main soll getestet werden, nicht die Darstellung/Implementierung von DynamicList.
 * - Der Mock rendert eine einfache <ul> Liste mit <li>-Einträgen.
 * - Dadurch können wir im Test leicht prüfen, welche Items angezeigt werden.
 */
jest.mock("./DynamicList", () => ({
  DynamicList: ({ items }) => (
    <ul data-testid="dynamic-list">
      {items.map((item) => (
        // key: für React Listen-Rendering (hier ist item selbst eindeutig)
        <li key={item}>{item}</li>
      ))}
    </ul>
  ),
}));

/**
 * Fluent UI PrimaryButton mocken
 * -----------------------------
 * Warum?
 * - Fluent UI Buttons können intern komplex sein (Styles, Wrapper, DOM-Struktur).
 * - Für Komponententests ist ein einfaches HTML-<button> leichter zu prüfen.
 * - Wir behalten die wichtige API bei: onClick + children.
 */
jest.mock("@fluentui/react/lib/Button", () => ({
  PrimaryButton: ({ onClick, children }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

/**
 * Test-Suite: Main
 * ---------------
 * Wir prüfen hier:
 * - Überschrift wird gerendert
 * - initiale Items (initialItems aus Main.jsx) werden angezeigt
 */
describe("Main", () => {
  test("rendert Überschrift und initiale Items", () => {
    // Arrange: Komponente rendern
    render(<Main />);

    // Assert: Überschrift ist vorhanden (getByRole prüft semantisch)
    expect(
      screen.getByRole("heading", { name: "Was ich heute noch mache" })
    ).toBeInTheDocument();

    // Assert: Initiale Items sind sichtbar (kommen aus initialItems)
    expect(screen.getByText("React-Basics lernen")).toBeInTheDocument();
    expect(screen.getByText("Tests schreiben")).toBeInTheDocument();
    expect(screen.getByText("Serverseitig rendern")).toBeInTheDocument();
  });
});