/**
 * ToDoList.tsx
 * ------------
 * Kombiniert mehrere Bausteine zu einer “ToDo-Karte”:
 * - styled-components: Hintergrundfläche
 * - Fluent UI Stack: Layout + Abstände
 * - mergeStyleSets: CSS-Klassen für Root/Card
 * - Headline: eigene Überschrift-Komponente
 * - DynamicList: eigene Listen-Komponente
 *
 */

import { ReactNode } from "react";
import { Headline } from "./Headline";
import { Stack, mergeStyleSets, IStackTokens } from "@fluentui/react";
import { styled } from "styled-components";
import { DynamicList } from "./DynamicList";
import { JSX } from "react";

/* =========================================================
   Props-Typ
   ========================================================= */

/**
 * ToDoListProps
 * -------------
 * - children: Titelbereich (kann String oder JSX sein)
 * - item1..item3: drei Einträge der Liste
 */
interface ToDoListProps {
  children: ReactNode;
  item1: string;
  item2: string;
  item3: string;
}

/* =========================================================
   Styles (Fluent UI: mergeStyleSets)
   ========================================================= */

/**
 * classNames.root:
 * - zentriert die “Karte” im Viewport (Flexbox)
 *
 * classNames.card:
 * - sieht aus wie eine Karte (Breite, Padding, Shadow, Background)
 */
const classNames = mergeStyleSets({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 360,
    padding: 24,
    borderRadius: 4,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    background: "white",
  },
});

/* =========================================================
   Layout Tokens (Stack)
   ========================================================= */

/**
 * cardTokens
 * ----------
 * childrenGap = Abstand zwischen Headline und Liste in der Karte.
 */
const cardTokens: IStackTokens = {
  childrenGap: 12,
};

/* =========================================================
   styled-components
   ========================================================= */

/**
 * Background
 * ----------
 * Wrapper-Div mit Hintergrundfarbe.
 * Alles innerhalb liegt auf dieser Hintergrundfläche.
 */
const Background = styled.div`
  background-color: #e0f7fa;
`;

/* =========================================================
   Komponente
   ========================================================= */

export function ToDoList({
  children,
  item1,
  item2,
  item3,
}: ToDoListProps): JSX.Element {
  /**
   * items-Array
   * ----------
   * DynamicList erwartet items: string[]
   * => wir bauen aus item1..item3 ein Array.
   */
  const items: string[] = [item1, item2, item3];

  return (
    <Background style={{ padding: 32 }}>
      {/* Outer Stack:
          - nutzt classNames.root (zentriert die Karte)
          - horizontalAlign/verticalAlign sind Fluent UI Ausrichtungs-Props */}
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        className={classNames.root}
        style={{ marginTop: 50, marginBottom: 16 }}
      >
        {/* Card Stack:
            - classNames.card macht es zur “Karte”
            - tokens={cardTokens}: Abstand zwischen Headline und Liste */}
        <Stack className={classNames.card} tokens={cardTokens}>
          {/* children wird als Titel gerendert */}
          <Headline>{children}</Headline>

          {/* Liste mit den drei Items */}
          <DynamicList items={items} />
        </Stack>
      </Stack>
    </Background>
  );
}