/**
 * ToDoList.jsx
 * ------------
 * Diese Komponente rendert eine kleine “ToDo-Karte”:
 * - Hintergrund (styled-components)
 * - zentrierte Karte (Fluent UI Stack + Styles)
 * - Headline (Titel über children)
 * - DynamicList (zeigt die Items als Liste)
 *
 */

import { Headline } from "./Headline";
import { Stack, mergeStyleSets } from "@fluentui/react";
import { styled } from "styled-components";
import { DynamicList } from "./DynamicList";

/**
 * Fluent UI Styles: mergeStyleSets
 * -------------------------------
 * - erzeugt Klassen-Namen für definierte Styles
 * - wird später via className={classNames.root} / classNames.card verwendet
 */
const classNames = mergeStyleSets({
  // root: Zentriert die Karte im Viewport
  root: {
    minHeight: "100vh", // mindestens volle Viewport-Höhe
    display: "flex", // Flexbox aktivieren
    justifyContent: "center", // horizontal zentrieren
    alignItems: "center", // vertikal zentrieren
  },

  // card: Styling für die “Karte”
  card: {
    width: 360, // feste Breite (px)
    padding: 24, // Innenabstand
    borderRadius: 4, // abgerundete Ecken
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)", // leichter Schatten
    background: "white", // weißer Hintergrund für Kontrast
  },
});

/**
 * Fluent UI Tokens
 * ----------------
 * childrenGap: Abstand zwischen direkten Kindern im Stack.
 * Hier: Abstand zwischen <Headline> und <DynamicList>.
 */
const cardTokens = {
  childrenGap: 12,
};

/**
 * styled-components: Background
 * ----------------------------
 * - erzeugt eine React-Komponente (Wrapper-DIV) mit CSS
 * - wird als äußerster Container verwendet
 *
 * Hinweis: Hier ist nur background-color definiert.
 * Padding wird später zusätzlich per style prop gesetzt.
 */
const Background = styled.div`
  background-color: #e0f7fa;
`;

/**
 * ToDoList
 * --------
 * Props:
 * - children: Titel/Text zwischen <ToDoList>...</ToDoList> (wird als Headline verwendet)
 * - item1, item2, item3: drei ToDo-Einträge als Strings
 *
 * Beispiel:
 * <ToDoList item1="A" item2="B" item3="C">Meine Liste</ToDoList>
 */
export function ToDoList({ children, item1, item2, item3 }) {
  /**
   * Aus den Einzel-Props bauen wir ein Array.
   * Das Array ist praktisch, weil wir es direkt an DynamicList geben können.
   */
  const items = [item1, item2, item3];

  return (
    // Hintergrund-Wrapper (styled-components) + etwas Außenabstand per inline style
    <Background style={{ padding: 32 }}>
      {/* Äußerer Stack:
          - sorgt zusammen mit classNames.root für Zentrierung der Karte im Viewport
          - horizontalAlign/verticalAlign sind Fluent UI Props für die Ausrichtung */}
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        className={classNames.root}
        style={{ marginTop: 50, marginBottom: 16 }}
      >
        {/* Innerer Stack = “Karte”
            - tokens: Abstand zwischen Headline und Liste
            - className: Card-Styles (Breite, Padding, Schatten, ...) */}
        <Stack className={classNames.card} tokens={cardTokens}>
          {/* Headline:
              - children wird hier als Überschrift gerendert */}
          <Headline>{children}</Headline>

          {/* DynamicList:
              - rendert die Items als Liste */}
          <DynamicList items={items} />
        </Stack>
      </Stack>
    </Background>
  );
}