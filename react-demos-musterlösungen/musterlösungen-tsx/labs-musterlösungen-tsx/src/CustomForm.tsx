/**
 * CustomForm.tsx
 * --------------
 * Komplettes Formular-Beispiel mit react-hook-form + TypeScript.
 *
 */

import { useForm, SubmitHandler } from "react-hook-form";
import { JSX } from "react";

/**
 * FormValues
 * ----------
 * Beschreibt die Form-Datenstruktur.
 * Jeder Key entspricht einem Feldnamen im Formular.
 *
 * Vorteil:
 * - register("...") erlaubt nur Keys aus FormValues
 * - errors.<feld> ist typsicher
 * - onSubmit bekommt sauber typisierte Daten
 */
type FormValues = {
  firstName: string;
  email: string;
  country: string;
  acceptTerms: boolean;
};

export function CustomForm(): JSX.Element {
  /**
   * useForm<FormValues>()
   * --------------------
   * register: verbindet ein Feld mit dem Formularzustand
   * handleSubmit: validiert und ruft onSubmit bei Erfolg
   * watch: beobachtet Werte in Echtzeit
   * errors: enthält Validierungsfehler pro Feld
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  /**
   * onSubmit
   * --------
   * SubmitHandler<FormValues> sorgt dafür, dass "data" korrekt typisiert ist.
   * Diese Funktion wird nur aufgerufen, wenn alle Validierungen erfüllt sind.
   */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Formulardaten:", data);
    alert(`Formular erfolgreich abgeschickt:\n${JSON.stringify(data, null, 2)}`);
  };

  /**
   * watch("firstName")
   * -----------------
   * Liest den aktuellen Wert von firstName aus dem Formularzustand.
   * Bei jeder Änderung wird neu gerendert und watchedName aktualisiert sich.
   */
  const watchedName = watch("firstName");

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>CustomForm</h2>

      {/* Form:
          - onSubmit={handleSubmit(onSubmit)}: Validierung + dann onSubmit
          - noValidate: deaktiviert Browser-Validierung (wir wollen RHF-Validierung) */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* =========================================================
            Feld: Vorname
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="firstName" style={{ display: "block", marginBottom: "0.25rem" }}>
            Vorname
          </label>

          <input
            id="firstName"
            type="text"
            {...register("firstName", {
              required: "Vorname ist erforderlich.",
              minLength: {
                value: 2,
                message: "Vorname muss mindestens 2 Zeichen lang sein.",
              },
            })}
            style={{
              width: "100%",
              padding: "0.4rem",
              // Fehler optisch markieren, wenn errors.firstName existiert
              border: errors.firstName ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />

          {/* Fehlertext nur anzeigen, wenn vorhanden */}
          {errors.firstName && (
            <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
              {errors.firstName.message}
            </div>
          )}
        </div>

        {/* =========================================================
            Feld: E-Mail
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
            E-Mail
          </label>

          <input
            id="email"
            type="email"
            {...register("email", {
              required: "E-Mail ist erforderlich.",
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

          {errors.email && (
            <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
              {errors.email.message}
            </div>
          )}
        </div>

        {/* =========================================================
            Feld: Land (Select)
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="country" style={{ display: "block", marginBottom: "0.25rem" }}>
            Land
          </label>

          <select
            id="country"
            {...register("country", {
              required: "Bitte ein Land auswählen.",
            })}
            style={{
              width: "100%",
              padding: "0.4rem",
              border: errors.country ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            {/* Platzhalter-Option: value="" => “nichts ausgewählt” */}
            <option value="">Bitte auswählen</option>
            <option value="de">Deutschland</option>
            <option value="at">Österreich</option>
            <option value="ch">Schweiz</option>
          </select>

          {errors.country && (
            <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
              {errors.country.message}
            </div>
          )}
        </div>

        {/* =========================================================
            Feld: Checkbox (Bedingungen akzeptieren)
           ========================================================= */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              {...register("acceptTerms", {
                required: "Du musst die Bedingungen akzeptieren.",
              })}
            />
            Ich akzeptiere die Bedingungen.
          </label>

          {errors.acceptTerms && (
            <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
              {errors.acceptTerms.message}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit">Absenden</button>
      </form>

      {/* Live-Vorschau */}
      <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
        <strong>Live-Vorschau (watch):</strong> Vorname ={" "}
        {watchedName || "<noch nichts eingegeben>"}
      </div>
    </div>
  );
}