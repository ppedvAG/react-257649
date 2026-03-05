import { useForm } from "react-hook-form";

/**
 * CustomForm-Komponente
 * ---------------------
 * - Rendert ein Formular (Vorname, E-Mail, Land, AGB-Checkbox)
 * - Validiert die Felder beim Submit
 * - Zeigt Fehlermeldungen an
 * - Zeigt eine Live-Vorschau für "firstName" über watch()
 */
export function CustomForm() {
  /**
   * useForm()
   * ---------
   * initialisiert den Formular-Controller von react-hook-form.
   *
   * Wichtige Rückgabewerte:
   * - register: verbindet ein Feld (<input>, <select>, ...) mit de Formularzustanmd
   * - handleSubmit: Wrapper um onSubmit -> führt Validierung aus und verhindert Page-Reload
   * - watch: liest Feldwerte “live” aus (triggert Re-Renders bei Änderungen)
   * - formState.errors: enthält Validierungsfehler pro Feld
   *
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  /**
   * onSubmit(data)
   * --------------
   * Wird NUR aufgerufen, wenn alle Validierungen erfolgreich sind.
   * data enthält dann die gesammelten Formularwerte.
   */
  const onSubmit = (data) => {
    console.log("Formulardaten:", data);
    alert(`Formular erfolgreich abgeschickt:\n${JSON.stringify(data, null, 2)}`);
  };

  /**
   * watch("firstName")
   * -----------------
   * Beobachtet den aktuellen Wert des Feldes "firstName".
   * Wenn sich der Wert ändert, rendert die Komponente neu und watchedName aktualisiert sich.
   */
  const watchedName = watch("firstName");

  return (
    // Container: begrenzt Breite, zentriert und setzt eine einfache Schrift
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>CustomForm</h2>

      {/* Formular:
          - onSubmit wird über handleSubmit “eingehängt”
          - noValidate deaktiviert Browser-Validierung, damit nur react-hook-form steuert */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* =========================================================
            Feld 1: Vorname (Text)
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          {/* Label + Input-Verknüpfung über htmlFor/id (Accessibility & Usability) */}
          <label htmlFor="firstName" style={{ display: "block", marginBottom: "0.25rem" }}>
            Vorname
          </label>

          {/* Input wird mit register("firstName", Regeln) an react-hook-form angebunden */}
          <input
            id="firstName"
            type="text"
            {...register("firstName", {
              // required: Feld darf nicht leer sein
              required: "Vorname ist erforderlich.",
              // minLength: Mindestens 2 Zeichen
              minLength: {
                value: 2,
                message: "Vorname muss mindestens 2 Zeichen lang sein.",
              },
            })}
            style={{
              width: "100%",
              padding: "0.4rem",
              // Fehler visualisieren: roter Rahmen, wenn errors.firstName existiert
              border: errors.firstName ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />

          {/* Fehleranzeige (optional):
              errors.firstName ist nur gesetzt, wenn eine Regel verletzt ist */}
          {errors.firstName && (
            <div
              style={{
                color: "red",
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.firstName.message}
            </div>
          )}
        </div>

        {/* =========================================================
            Feld 2: E-Mail (Email-Input + Pattern)
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
            E-Mail
          </label>

          <input
            id="email"
            type="email" // HTML5-Typ (zusätzlich zur eigenen RegEx-Validierung)
            {...register("email", {
              required: "E-Mail ist erforderlich.",
              // pattern: einfache E-Mail-Regel über RegEx
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Bitte eine gültige E-Mail-Adresse eingeben.",
              },
            })}
            style={{
              width: "100%",
              padding: "0.4rem",
              border: errors.email ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />

          {/* Fehleranzeige für E-Mail */}
          {errors.email && (
            <div
              style={{
                color: "red",
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.email.message}
            </div>
          )}
        </div>

        {/* =========================================================
            Feld 3: Land (Select/Dropdown)
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="country" style={{ display: "block", marginBottom: "0.25rem" }}>
            Land
          </label>

          <select
            id="country"
            {...register("country", {
              // required bei Select: es muss ein Wert gewählt werden, der nicht leer ist
              required: "Bitte ein Land auswählen.",
            })}
            style={{
              width: "100%",
              padding: "0.4rem",
              border: errors.country ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            {/* Platzhalter-Option:
                value="" bedeutet “nichts ausgewählt” -> required erzwingt eine echte Auswahl */}
            <option value="">Bitte auswählen</option>
            <option value="de">Deutschland</option>
            <option value="at">Österreich</option>
            <option value="ch">Schweiz</option>
          </select>

          {/* Fehleranzeige für Land */}
          {errors.country && (
            <div
              style={{
                color: "red",
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.country.message}
            </div>
          )}
        </div>

        {/* =========================================================
            Feld 4: Checkbox (Bedingungen akzeptieren)
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          {/* Label umschließt Checkbox + Text:
              Klick auf den Text toggelt die Checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <input
              type="checkbox"
              {...register("acceptTerms", {
                // required bei Checkbox: muss true sein (angehakt)
                required: "Du musst die Bedingungen akzeptieren.",
              })}
            />
            Ich akzeptiere die Bedingungen.
          </label>

          {/* Fehleranzeige für Checkbox */}
          {errors.acceptTerms && (
            <div
              style={{
                color: "red",
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.acceptTerms.message}
            </div>
          )}
        </div>

        {/* Submit Button:
            type="submit" löst das Submit-Event aus -> handleSubmit prüft Validierung */}
        <button type="submit">Absenden</button>
      </form>

      {/* Live-Vorschau:
          zeigt den aktuellen Wert von firstName (über watch) */}
      <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
        <strong>Live-Vorschau (watch):</strong> Vorname ={" "}
        {/* Fallback, falls noch nichts eingegeben wurde */}
        {watchedName || "<noch nichts eingegeben>"}
      </div>
    </div>
  );
}