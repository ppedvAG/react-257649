import { useState } from "react";
// useSelector: liest Daten aus dem Redux Store
// useDispatch: liefert die dispatch-Funktion, um Actions auszulösen
import { useSelector, useDispatch } from "react-redux";

// Actions aus dem Slice 
// increment/decrement: verändern den Zähler um 1
// incrementByAmount: verändert den Zähler um einen beliebigen Wert (payload)
import { increment, decrement, incrementByAmount } from "./redux-slice";

export default function ReduxCounter() {
  /**
   * 1) State aus dem Redux Store lesen
   * - useSelector bekommt eine Funktion (Selector), die den globalen Store-State erhält.
   * - Wir greifen hier auf state.counter.value zu.
   *
   * Voraussetzung im Store:
   * configureStore({ reducer: { counter: counterReducer } })
   * und im Slice initialState: { value: 0 }
   */
  const count = useSelector((state) => state.counter.value);

  /**
   * 2) dispatch-Funktion holen
   * - dispatch ist die "Schnittstelle", um dem Store mitzuteilen:
   *   "Führe diese Action aus."
   * - Reducer im Slice entscheiden dann, wie sich der State ändert.
   */
  const dispatch = useDispatch();

  /**
   * 3) Lokaler React State für das Input-Feld
   * - Dieser State ist NUR für die UI (das Eingabefeld).
   * - Er liegt absichtlich NICHT im Redux Store, weil:
   *   - es nur diese Komponente betrifft,
   *   - es kein globaler App-State ist.
   */
  const [amount, setAmount] = useState(5);

  return (
    <div style={{ padding: 16 }}>
      <h2>Redux Counter</h2>

      {/* 4) Anzeige des globalen Redux States */}
      <p>Count: {count}</p>

      {/* 5) Buttons, die Actions dispatchen */}
      <div style={{ display: "flex", gap: 8 }}>
        {/**
         * decrement() ist eine Action-Creator-Funktion aus dem Slice.
         * dispatch(decrement()) schickt die Action an den Store.
         * Der Reducer im Slice verarbeitet sie und reduziert state.value um 1.
         */}
        <button onClick={() => dispatch(decrement())}>-1</button>

        {/**
         * increment() analog: erhöht state.value um 1
         */}
        <button onClick={() => dispatch(increment())}>+1</button>
      </div>

      {/* 6) Bereich für "increment by amount" */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {/**
         * Input-Feld:
         * - value={amount} macht das Feld "controlled" (Wert kommt aus React State)
         * - onChange aktualisiert amount bei jeder Eingabe
         *
         * Wichtig:
         * e.target.value ist immer ein STRING.
         * Darum Number(...) -> wir speichern eine echte Zahl in amount.
         */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ width: 80 }}
        />

        {/**
         * dispatch(incrementByAmount(amount))
         * - incrementByAmount(...) erzeugt eine Action mit payload
         * - payload = amount (z.B. 5)
         * - Reducer addiert payload auf state.value
         *
         * Beispiel:
         * count = 10, amount = 5 -> nach Klick count = 15
         */}
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          +{amount}
        </button>
      </div>

      {/**
       * Zusammenfassung des Workflows:
       * - UI liest count aus Redux: useSelector(...)
       * - UI löst Änderungen aus: dispatch(ActionCreator(...))
       * - Slice-Reducer berechnet neuen State
       * - Store speichert neuen State
       * - useSelector liefert neuen count -> Komponente rendert neu
       */}
    </div>
  );
}