/**
 * Main.jsx
 * --------
 * Diese Komponente zeigt eine Liste an und kann die Liste per Button-Klick austauschen.
 *
 */

import { useEffect, useState } from "react";
import { DynamicList } from "./DynamicList";
import { PrimaryButton } from "@fluentui/react/lib/Button";

/**
 * Statische Startdaten
 * --------------------
 * Diese Arrays sind Konstanten außerhalb der Komponente.
 * Vorteil: werden nicht bei jedem Render neu erstellt.
 */
const initialItems = ["React-Basics lernen", "Tests schreiben", "Serverseitig rendern"];
const alternativeItems = ["schlafen", "ausruhen", "essen"];

/**
 * Main-Komponente
 * --------------
 * Verantwortlichkeiten:
 * - hält die aktuell angezeigte Liste im State (newItems)
 * - rendert DynamicList mit diesem State
 * - ändert den State per Button-Klick
 * - loggt State-Änderungen via useEffect
 */
export function Main() {
  /**
   * useState(initialItems)
   * ----------------------
   * - newItems: aktueller State (Liste, die gerendert wird)
   * - setNewItems: Funktion, um den State zu ändern
   *
   * Wichtig: Wenn setNewItems aufgerufen wird, rendert React die Komponente neu.
   */
  const [newItems, setNewItems] = useState(initialItems);

  /**
   * useEffect(..., [newItems])
   * -------------------------
   * - läuft nach dem ersten Render (Mount)
   * - und danach immer, wenn sich newItems ändert
   *
   * Typischer Einsatz: Logging, API-Aufrufe, Subscription, DOM-Interaktion, etc.
   */
  useEffect(() => {
    console.log("Items wurden geändert:", newItems);
  }, [newItems]); // Abhängigkeitsarray: Effekt läuft nur bei Änderung von newItems

  return (
    <div>
      {/* Überschrift: beschreibt den Inhalt der Seite */}
      <h1>Was ich heute noch mache</h1>

      {/* DynamicList:
          - bekommt den aktuellen State als Prop
          - wenn newItems sich ändert, rendert DynamicList automatisch mit den neuen Werten */}
      <DynamicList items={newItems} />

      {/* PrimaryButton (Fluent UI):
          - onClick bekommt eine Funktion
          - beim Klick setzen wir den State auf alternativeItems
          - Ergebnis: UI zeigt danach die alternative Liste */}
      <PrimaryButton onClick={() => setNewItems(alternativeItems)}>
        Items aktualisieren
      </PrimaryButton>
    </div>
  );
}