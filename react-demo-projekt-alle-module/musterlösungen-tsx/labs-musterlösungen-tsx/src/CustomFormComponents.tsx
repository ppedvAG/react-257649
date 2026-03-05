/**
 * CustomFormComponents.tsx
 * -----------------------
 * Formular mit react-hook-form und eigenen Feld-Komponenten (TSX).
 *
 */

import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, CheckboxField, SelectField } from "./CustomFields";
import { JSX } from "react";

/* =========================================================
   Typdefinition: FormValues
   =========================================================
   - beschreibt die Form-Datenstruktur
   - jeder Key entspricht einem Feldnamen im Formular
   - TypeScript verhindert Tippfehler bei register("...") und watch("...")
*/
type FormValues = {
  firstName: string;
  email: string;
  country: string;
  acceptTerms: boolean;
};

/**
 * CustomFormComponents
 * -------------------
 * - verwaltet das Formular (react-hook-form)
 * - nutzt eigene UI-Felder (CustomFields)
 * - zeigt Fehlerzustände an
 * - zeigt Live-Vorschau des Vornamens
 */
export function CustomFormComponents(): JSX.Element {
  /**
   * useForm<FormValues>()
   * --------------------
   * register: verbindet Felder mit dem Formularzustand
   * handleSubmit: validiert und ruft onSubmit bei Erfolg auf
   * watch: beobachtet Feldwerte live
   * errors: Validierungsfehler pro Feld
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  /**
   * onSubmit(data)
   * --------------
   * - SubmitHandler<FormValues> typisiert data korrekt
   * - wird nur aufgerufen, wenn alle Regeln erfüllt sind
   */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Formulardaten:", data);
    alert(`Formular erfolgreich abgeschickt:\n${JSON.stringify(data, null, 2)}`);
  };

  /**
   * watch("firstName")
   * -----------------
   * - liefert den aktuellen Wert von firstName
   * - Änderungen triggern Re-Render -> Live-Vorschau aktualisiert sich
   */
  const watchedName = watch("firstName");

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>CustomFormComponents</h2>

      {/* Form:
          - onSubmit={handleSubmit(onSubmit)}: Validierung + dann Submit
          - noValidate: Browser-Validierung aus, damit RHF die Kontrolle hat */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* =========================================================
            TextField: Vorname
           ========================================================= */}
        <TextField
          label="Vorname"
          type="text"
          placeholder="Max"
          {...register("firstName", {
            required: "Vorname ist erforderlich.",
            minLength: { value: 2, message: "Vorname muss mindestens 2 Zeichen haben." },
          })}
          // errors.firstName?.message ist string | undefined -> passt zu error?: string
          error={errors.firstName?.message}
        />

        {/* =========================================================
            TextField: E-Mail
           ========================================================= */}
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
           ========================================================= */}
        <SelectField
          label="Land"
          defaultValue=""
          options={[
            { value: "", label: "Bitte auswählen" },
            { value: "de", label: "Deutschland" },
            { value: "at", label: "Österreich" },
            { value: "ch", label: "Schweiz" },
          ]}
          {...register("country", { required: "Bitte ein Land auswählen." })}
          error={errors.country?.message}
        />

        {/* =========================================================
            CheckboxField: Bedingungen akzeptieren
           ========================================================= */}
        <CheckboxField
          label="Ich akzeptiere die Bedingungen."
          {...register("acceptTerms", {
            required: "Du musst die Bedingungen akzeptieren.",
          })}
          error={errors.acceptTerms?.message}
        />

        {/* Submit */}
        <button type="submit">Absenden</button>

        {/* Live-Vorschau */}
        <div style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
          <strong>Live-Vorschau (watch):</strong> Vorname ={" "}
          {watchedName || "<noch nichts eingegeben>"}
        </div>
      </form>
    </div>
  );
}