/**
 * Main.tsx
 * --------
 * Diese Komponente zeigt eine Liste (DynamicList) und tauscht sie per Button-Klick aus.
 *
 */

import { useEffect, useState } from "react";
import { DynamicList } from "./DynamicList";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { JSX } from "react";

/* =========================================================
   Beispiel-Daten (außerhalb der Komponente)
   =========================================================
   Vorteil: Arrays werden nicht bei jedem Render neu erzeugt.
*/

const initialItems: string[] = [
  "React-Basics lernen",
  "Tests schreiben",
  "Serverseitig rendern",
];

const alternativeItems: string[] = ["schlafen", "ausruhen", "essen"];

/* =========================================================
   Main-Komponente
   ========================================================= */

export function Main(): JSX.Element {
  /**
   * useState<string[]>(initialItems)
   * -------------------------------
   * - newItems: aktueller State (Liste, die wir anzeigen)
   * - setNewItems: Setter zum Aktualisieren der Liste
   *
   * TypeScript:
   * - <string[]> sagt: State ist immer ein Array aus Strings
   */
  const [newItems, setNewItems] = useState<string[]>(initialItems);

  /**
   * useEffect(..., [newItems])
   * -------------------------
   * - läuft nach dem ersten Rendern
   * - und danach immer, wenn sich newItems ändert
   *
   * Hier: nur Logging (zum Nachvollziehen beim Lernen)
   */
  useEffect(() => {
    console.log("Items wurden geändert:", newItems);
  }, [newItems]);

  return (
    <div>
      <h1>Was ich heute noch mache</h1>

      {/* DynamicList bekommt den aktuellen State als Prop.
          Bei setNewItems(...) wird Main neu gerendert und DynamicList erhält neue Items. */}
      <DynamicList items={newItems} />

      {/* Button:
          Beim Klick setzen wir den State auf alternativeItems -> Liste wechselt im UI. */}
      <PrimaryButton onClick={() => setNewItems(alternativeItems)}>
        Items aktualisieren
      </PrimaryButton>
    </div>
  );
}