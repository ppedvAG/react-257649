/**
 * Headline.tsx
 */

import { ReactNode } from "react";
import { Text, mergeStyleSets } from "@fluentui/react";
import { JSX } from "react";

/* =========================================================
   Props-Typ
   ========================================================= */

/**
 * HeadlineProps
 * -------------
 * children:
 * - Inhalt der Überschrift
 * - ReactNode erlaubt Strings, Zahlen, JSX, Fragments, Arrays, etc.
 */
interface HeadlineProps {
  children: ReactNode;
}

/* =========================================================
   Styles (Fluent UI)
   ========================================================= */

/**
 * mergeStyleSets
 * --------------
 * - erzeugt CSS-Klassen aus einem JS-Objekt
 * - Rückgabe: Objekt mit Klassen-Namen (z.B. classNames.root)
 */
const classNames = mergeStyleSets({
  root: {
    textAlign: "center", // Text zentrieren
    color: "#a4262c", // rot/bordeaux
  },
});

/* =========================================================
   Komponente
   ========================================================= */

/**
 * Headline
 * --------
 * - rendert eine Überschrift
 * - kapselt Styling + semantisches Tag
 *
 * Verwendung:
 * <Headline>Meine Überschrift</Headline>
 */
export function Headline({ children }: HeadlineProps): JSX.Element {
  return (
    /**
     * Fluent UI <Text>
     * --------------
     * - as="h1": rendert semantisch ein echtes <h1> (Accessibility/SEO)
     * - variant="xxLarge": vordefinierte Typografie-Größe
     * - className: wendet unsere Styles an
     */
    <Text as="h1" variant="xxLarge" className={classNames.root}>
      {children}
    </Text>
  );
}