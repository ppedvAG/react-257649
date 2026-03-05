import { Text, mergeStyleSets } from "@fluentui/react";

/**
 * Styles mit mergeStyleSets
 * ------------------------
 * - Definiert CSS-in-JS Styles
 * - Liefert automatisch generierte Klassen-Namen zurück
 * - Diese Klassen werden dann per className an Komponenten gebunden
 */
const classNames = mergeStyleSets({
  // root = Basisklasse für die Headline
  root: {
    textAlign: "center", // Text zentrieren
    color: "#a4262c", // Textfarbe (rot/bordeaux)
  },
});

/**
 * Headline-Komponente
 * -------------------
 * Props:
 * - children: der Inhalt der Überschrift (Text oder JSX)
 *
 * Verwendung:
 * <Headline>Meine Überschrift</Headline>
 */
export function Headline({ children }) {
  return (
    /**
     * Fluent UI <Text>
     * --------------
     * - as="h1": rendert semantisch ein echtes <h1> (gut für Accessibility/SEO)
     * - variant="xxLarge": vordefinierte Schriftgröße/Typografie von Fluent UI
     * - className: wendet unser Styling (center + Farbe) an
     */
    <Text as="h1" variant="xxLarge" className={classNames.root}>
      {/* children = Inhalt zwischen den Component-Tags */}
      {children}
    </Text>
  );
}