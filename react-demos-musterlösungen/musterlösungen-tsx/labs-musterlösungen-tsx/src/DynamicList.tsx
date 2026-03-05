/**
 * DynamicList.tsx
 * ---------------
 * Eine einfache Listen-Komponente mit Fluent UI.
 *
 */

import { Stack, Text, mergeStyleSets, IStackTokens } from "@fluentui/react";
import { JSX } from "react";
/* =========================================================
   Props-Typen
   ========================================================= */

/**
 * DynamicListProps
 * ----------------
 * items: Array von Strings, die als Listeneinträge angezeigt werden sollen.
 */
interface DynamicListProps {
  items: string[];
}

/* =========================================================
   Styling (Fluent UI)
   ========================================================= */

/**
 * mergeStyleSets
 * --------------
 * - nimmt ein Style-Objekt entgegen
 * - erzeugt daraus CSS-Klassen
 * - Rückgabe: Objekt mit Klassen-Namen (classNames.list, classNames.item)
 */
const classNames = mergeStyleSets({
  list: {
    width: "100%", // Liste nutzt die volle Breite
  },
  item: {
    padding: "8px 12px",
    borderRadius: 4,
    border: "1px solid #edebe9",
  },
});

/* =========================================================
   Layout Tokens (Fluent UI Stack)
   ========================================================= */

/**
 * listTokens
 * ----------
 * IStackTokens typisiert das tokens-Objekt.
 * childrenGap legt den Abstand zwischen den direkten Kindern im Stack fest.
 */
const listTokens: IStackTokens = {
  childrenGap: 8,
};

/* =========================================================
   Komponente
   ========================================================= */

/**
 * DynamicList
 * -----------
 * - bekommt items als Prop
 * - rendert pro Item eine kleine “Karte” (Stack + Text)
 */
export function DynamicList({ items }: DynamicListProps): JSX.Element {
  return (
    // Outer Stack = Container der Liste
    <Stack className={classNames.list} tokens={listTokens}>
      {/* items.map(...) erzeugt JSX pro Eintrag */}
      {items.map((item, index) => (
        /**
         * Innerer Stack = ein Listeneintrag
         *
         * key:
         * - React benötigt einen stabilen Schlüssel pro Element in Listen.
         * - Hier: index (ok bei statischen Listen).
         * - Wenn die Liste dynamisch verändert wird (Einfügen/Löschen/Sortieren),
         *   besser einen stabilen Identifier nutzen (z.B. itemId).
         */
        <Stack key={index} className={classNames.item}>
          <Text>{item}</Text>
        </Stack>
      ))}
    </Stack>
  );
}