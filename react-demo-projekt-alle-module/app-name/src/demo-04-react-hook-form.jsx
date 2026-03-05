import { useForm } from "react-hook-form";

export default function DemoReactHookForm() {
  /**
   * useForm() ist der "Controller" für das Formular.
   * - register: verbindet Inputs mit react-hook-form
   * - handleSubmit: übernimmt preventDefault + Validierung + ruft onSubmit nur bei Erfolg
   * - errors: enthält Validierungsfehler pro Feld
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    /**
     * mode bestimmt, wann validiert wird:
     * - "onSubmit" (Standard): Fehler erst nach Submit sichtbar
     * - "onChange": bei jeder Eingabe
     * - "onBlur": wenn man das Feld verlässt
     */
    mode: "onSubmit",
  });

  /**
   * onSubmit wird NUR aufgerufen, wenn alle Validierungen erfolgreich sind.
   * data enthält die Werte aller registrierten Felder.
   */
  function onSubmit(data) {
    console.log("Formular-Daten:", data);
    alert("Erfolgreich! Nutzer: " + data.username);
  }

  return (
    <div>
      <h1>React Hook Form - Validierungen (Demo)</h1>

      {/* handleSubmit übernimmt preventDefault + prüft alle Regeln */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ------------------------------------------
            1) USERNAME (typisch: required + minLength)
           ------------------------------------------ */}
        <label>
          Username:
          <input
            placeholder="z.B. melina123"
            /**
             * register("username", { ...Regeln })
             *
             * Typische Regeln:
             * - required: Pflichtfeld
             * - minLength: Mindestlänge
             */
            {...register("username", {
              required: "Username ist Pflicht.",
              minLength: {
                value: 3,
                message: "Mindestens 3 Zeichen.",
              },
            })}
          />
        </label>

        {/* Fehlertext nur anzeigen, wenn es einen Fehler gibt */}
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}

        {/* ------------------------------------------
            2) EMAIL (typisch: required + pattern)
           ------------------------------------------ */}
        <label>
          E-Mail:
          <input
            placeholder="z.B. test@mail.de"
            /**
             * pattern: Regex-Prüfung (z.B. grob für Email)
             * Hinweis: Das ist eine simple Regex für Demo-Zwecke.
             */
            {...register("email", {
              required: "E-Mail ist Pflicht.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Bitte eine gültige E-Mail eingeben.",
              },
            })}
          />
        </label>

        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        {/* ------------------------------------------
            3) AGE (typisch: required + min/max, valueAsNumber)
           ------------------------------------------ */}
        <label>
          Alter:
          <input
            type="number"
            placeholder="z.B. 18"
            /**
             * valueAsNumber: wandelt die Eingabe in eine Number um
             * min/max: Bereichsprüfung
             */
            {...register("age", {
              required: "Alter ist Pflicht.",
              valueAsNumber: true,
              min: { value: 1, message: "Muss mindestens 1 sein." },
              max: { value: 120, message: "Maximal 120." },
            })}
          />
        </label>

        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}

        {/* ------------------------------------------
            4) PASSWORD (typisch: required + minLength)
           ------------------------------------------ */}
        <label>
          Passwort:
          <input
            type="password"
            placeholder="mind. 6 Zeichen"
            {...register("password", {
              required: "Passwort ist Pflicht.",
              minLength: { value: 6, message: "Mindestens 6 Zeichen." },
            })}
          />
        </label>

        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}


        {/* ------------------------------------------
            5) TERMS (typisch: Checkbox muss true sein)
           ------------------------------------------ */}
        <label>
          <input
            type="checkbox"
            /**
             * validate: eigene Prüfung (true/false)
             * Hier: Checkbox muss angehakt sein.
             */
            {...register("terms", {
              validate: (value) => value === true || "Bitte AGB akzeptieren.",
            })}
          />
          AGB akzeptieren
        </label>

        {errors.terms && <p style={{ color: "red" }}>{errors.terms.message}</p>}

        {/* Submit-Button */}
        <button type="submit">Absenden</button>
      </form>

      <p>
        Hinweis: Fehler erscheinen hier erst nach Submit (mode: "onSubmit").
      </p>
    </div>
  );
}