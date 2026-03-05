import { useState } from "react";

export default function DemoFormValidation() {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  function onSubmit(e) {
    e.preventDefault(); // verhindert Seiten-Reload

    // sehr einfache Validierung: darf nicht leer sein
    if (value.trim() === "") {
      setHasError(true);
      return;
    }

    setHasError(false);
    alert("Abgesendet: " + value);
  }

  return (
    <div>
      <h1>Form Validierung (Demo)</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Text eingeben..."
        />
        <button type="submit">Absenden</button>

        {/* Fehlermeldung nur anzeigen, wenn hasError true ist */}
        {hasError && <p style={{ color: "red" }}>Bitte etwas eingeben.</p>}
      </form>
    </div>
  );
}