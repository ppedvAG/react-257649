import { useForm } from "react-hook-form";
import { TextField, CheckboxField, SelectField } from "./CustomFields";

/**
 * CustomFormComponents
 * -------------------
 * - Initialisiert react-hook-form
 * - Definiert Submit-Logik (onSubmit)
 * - Übergibt register(...) an eigene UI-Felder (über Props-Spread)
 * - Übergibt Fehlermeldungen als error-Prop an die Feld-Komponenten
 */
export function CustomFormComponents() {
  /**
   * useForm()
   * ---------
   * Gibt zentrale Helfer für Formulare zurück:
   * - register: verbindet ein Feld mit dem Formularzustand
   * - handleSubmit: führt Validierung aus und ruft onSubmit bei Erfolg auf
   * - watch: liest Feldwerte “live” aus
   * - formState.errors: Objekt mit Validierungsfehlern pro Feld
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
   * Wird nur aufgerufen, wenn alle Validierungsregeln erfüllt sind.
   * data enthält dann die finalen Formularwerte.
   */
  const onSubmit = (data) => {
    console.log("Formulardaten:", data);
    alert(`Formular erfolgreich abgeschickt:\n${JSON.stringify(data, null, 2)}`);
  };

  /**
   * watch("firstName")
   * -----------------
   * Beobachtet den aktuellen Wert des Feldes "firstName".
   * Bei jeder Änderung rendert die Komponente neu und watchedName aktualisiert sich.
   */
  const watchedName = watch("firstName");

  return (
    // Layout-Container: Breite begrenzen, zentrieren, einfache Schrift
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>CustomFormComponents</h2>

      {/* Form:
          - onSubmit nutzt handleSubmit als “Gatekeeper” (Validierung + Daten sammeln)
          - noValidate deaktiviert Browser-Validierung, damit react-hook-form die Kontrolle hat */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* =========================================================
            TextField: Vorname
           =========================================================
           - TextField ist eine eigene Komponente (Label + Input + optionaler Fehlertext)
           - {...register(...)} liefert Props zurück, die an das Feld weitergereicht werden:
             z. B. onChange, onBlur, name, ref, ...
           - error bekommt die Fehlermeldung als String (oder undefined) */}
        <TextField
          label="Vorname"
          type="text"
          placeholder="Max"
          {...register("firstName", {
            required: "Vorname ist erforderlich.",
            minLength: {
              value: 2,
              message: "Vorname muss mindestens 2 Zeichen haben.",
            },
          })}
          // Optional Chaining: wenn errors.firstName existiert, lies message -> sonst undefined
          error={errors.firstName?.message}
        />

        {/* =========================================================
            TextField: E-Mail
           =========================================================
           - Validierung über required + pattern (RegEx)
           - type="email" hilft z. B. mobilen Tastaturen, ist aber nicht “die” Validierung
             (bewusst über react-hook-form) */}
        <TextField
          label="E-Mail"
          type="email"
          placeholder="max@example.com"
          {...register("email", {
            required: "E-Mail ist erforderlich.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Bitte eine gültige E-Mail-Adresse eingeben.",
            },
          })}
          error={errors.email?.message}
        />

        {/* =========================================================
            SelectField: Land
           =========================================================
           - options: definiert die Dropdown-Einträge (value = gespeicherter Wert, label = Text)
           - defaultValue="" startet bei “Bitte auswählen”
           - required verhindert, dass "" (leere Auswahl) akzeptiert wird */}
        <SelectField
          label="Land"
          defaultValue=""
          options={[
            { value: "", label: "Bitte auswählen" },
            { value: "de", label: "Deutschland" },
            { value: "at", label: "Österreich" },
            { value: "ch", label: "Schweiz" },
          ]}
          {...register("country", {
            required: "Bitte ein Land auswählen.",
          })}
          error={errors.country?.message}
        />

        {/* =========================================================
            CheckboxField: Bedingungen akzeptieren
           =========================================================
           - required bedeutet bei Checkbox: Wert muss true sein (angehakt)
           - Fehlermeldung wird über error-Prop angezeigt */}
        <CheckboxField
          label="Ich akzeptiere die Bedingungen."
          {...register("acceptTerms", {
            required: "Du musst die Bedingungen akzeptieren.",
          })}
          error={errors.acceptTerms?.message}
        />

        {/* Submit:
            type="submit" löst Submit-Event aus -> handleSubmit prüft Validierung */}
        <button type="submit">Absenden</button>

        {/* =========================================================
            Live-Vorschau (watch)
           =========================================================
           - zeigt den aktuellen Vornamen in Echtzeit
           - Fallback über || wenn noch nichts eingegeben ist */}
        <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
          <strong>Live-Vorschau (watch):</strong> Vorname ={" "}
          {watchedName || "<noch nichts eingegeben>"}
        </div>
      </form>
    </div>
  );
}