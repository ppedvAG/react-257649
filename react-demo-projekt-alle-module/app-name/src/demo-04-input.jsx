import { useRef, useState } from "react";

export default function DemoControlledVsUncontrolled() {

// Warum „controlled“?
// Bei einem controlled Input ist der aktuelle Feldwert immer im React-State (Single Source of Truth).
// Vorteile:
// - Sofortige Validierung/Formatierung beim Tippen (z.B. nur Zahlen, max. Länge, Trim, Fehlermeldungen)
// - UI-Logik kann direkt am Wert hängen (Button disabled, Live-Vorschau, Counter, Fehleranzeige)
// - Werte lassen sich leicht von außen setzen/resetten (Prefill aus API, „Reset“-Button, Undo/Redo)
// - Vorhersagbares Verhalten und einfacher zu testen, weil React den Wert steuert (nicht das DOM)
//
// Uncontrolled dagegen speichert den Wert im DOM -> React liest ihn nur bei Bedarf (z.B. über Ref) aus.
// Das ist oft weniger Code und reicht, wenn man den Wert erst beim Submit braucht.

  // Controlled: React/State speichert den Wert
  const [controlledValue, setControlledValue] = useState("");

  // Uncontrolled: DOM speichert den Wert, wir lesen ihn per Ref aus
  const uncontrolledRef = useRef(null);

  function showUncontrolledValue() {
    alert("Uncontrolled Wert: " + uncontrolledRef.current.value);
  }

  return (
    <div>
      <h1>Controlled vs. Uncontrolled Input (Demo)</h1>

      <h2>Controlled Input</h2>
      <input
        type="text"
        value={controlledValue}
        onChange={(e) => setControlledValue(e.target.value)}
        placeholder="Tippe hier..."
      />
      <p>State-Wert: {controlledValue}</p>

      <h2>Uncontrolled Input</h2>
      <input
        type="text"
        defaultValue="Startwert"
        ref={uncontrolledRef}
        placeholder="Tippe hier..."
      />
      <button onClick={showUncontrolledValue}>Wert anzeigen</button>

      <p>Merksatz: Controlled = State, Uncontrolled = DOM/Ref auslesen</p>
    </div>
  );
}