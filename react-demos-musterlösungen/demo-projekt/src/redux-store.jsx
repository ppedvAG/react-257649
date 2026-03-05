import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux-slice";

/**
 * Der Redux Store ist die zentrale "Datenhaltung" (Single Source of Truth).
 * - Er enthält den gesamten globalen State deiner App.
 * - Komponenten lesen daraus mit useSelector(...)
 * - Änderungen passieren über dispatch(...) von Actions.
 */
export const store = configureStore({
  /**
   * reducer:
   * - Hier wird festgelegt, aus welchen "Slices" (State-Teilen) der Store besteht.
   * - Dieses Objekt definiert die Struktur des globalen States.
   *
   * In diesem Beispiel gibt es nur einen Slice: counter
   */
  reducer: {
    /**
     * counter:
     * - Der Key "counter" bestimmt, wie der State-Zweig heißt.
     * - Heißt: Der Slice-State liegt später unter state.counter
     *
     * counterReducer:
     * - Das ist der default export aus deinem Slice (createSlice(...).reducer).
     * - Er weiß, wie er auf Actions wie "increment" reagiert.
     */
    counter: counterReducer,
  },
});

/**
 * Ergebnis (State-Struktur):
 * - Der globale State sieht so aus:
 *   {
 *     counter: { value: 0 }
 *   }
 *
 * Zugriff in Komponenten:
 * - const count = useSelector((state) => state.counter.value);
 *
 */