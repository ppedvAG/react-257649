import { createSlice } from "@reduxjs/toolkit";

/**
 * Dieser "Slice" fasst 3 Dinge zusammen:
 * 1) Ein Stück State (hier: counter)
 * 2) Reducer-Funktionen, die den State ändern
 * 3) Automatisch erzeugte Actions (Action Creators)
 */
const counterSlice = createSlice({
  /**
   * name:
   * - Name des Slices im Redux-Kontext.
   * - Wird z.B. für Action-Typen genutzt (intern etwa: "counter/increment").
   */
  name: "counter",

  /**
   * initialState:
   * - Startzustand dieses Slices.
   * - Hier speichern wir den Zählerstand in state.value.
   */
  initialState: { value: 0 },

  /**
   * reducers:
   * - Ein Objekt mit Funktionen, die den State "verändern".
   * - Jede Funktion erzeugt automatisch:
   *   a) einen Action Creator (z.B. increment())
   *   b) einen passenden Reducer-Case für den Store
   */
  reducers: {
    /**
     * increment:
     * - Erhöht den Zähler um 1.
     * - Wird später in der UI via dispatch(increment()) ausgelöst.
     */
    increment: (state) => {
      state.value += 1;
    },

    /**
     * decrement:
     * - Verringert den Zähler um 1.
     * - Wird später via dispatch(decrement()) ausgelöst.
     */
    decrement: (state) => {
      state.value -= 1;
    },

    /**
     * incrementByAmount:
     * - Erhöht den Zähler um einen frei wählbaren Betrag.
     * - Der Betrag steckt in action.payload.
     *
     * Beispiel:
     * dispatch(incrementByAmount(5))
     * -> action.payload ist 5
     * -> state.value wird um 5 erhöht
     */
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

/**
 * createSlice erzeugt automatisch Actions.
 * - counterSlice.actions enthält Action Creators mit den gleichen Namen wie die reducer-Funktionen.
 * - Durch Destructuring exportieren wir sie direkt:
 *   increment(), decrement(), incrementByAmount()
 *
 * Diese werden in Komponenten importiert und mit dispatch(...) verwendet.
 */
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

/**
 * Der "Reducer" ist die Funktion, die der Redux Store benötigt.
 * - In configureStore wird sie registriert, z.B.:
 *   configureStore({ reducer: { counter: counterSlice.reducer } })
 *
 * Danach ist der State unter state.counter.value erreichbar.
 */
export default counterSlice.reducer;