/**
 * Form-Feld-Komponenten (JSX)
 * ---------------------------
 * Diese Datei enthält drei wiederverwendbare Formularfelder:
 * - TextField     (<input type="text" ...>)
 * - CheckboxField (<input type="checkbox" ...>)
 * - SelectField   (<select>...</select>)
 *
 */

import React from "react";

/**
 * React.forwardRef – warum? 
 * Was macht React.forwardRef?
 * ist eine Hilfsfunktion, mit der eine Funktionskomponente einen ref von außen entgegennimmt 
 * und ihn an ein inneres DOM-Element (oder eine andere Komponente) weiterleitet
 * -------------------------
 * Normalerweise kann man einem eigenen React-Component-Tag keinen ref geben, der direkt
 * auf das innere DOM-Element zeigt.
 *
 * forwardRef löst das Problem: Der ref wird "durchgereicht" an ein inneres <input>/<select>.
 * Das ist besonders wichtig für Form-Libraries wie react-hook-form, die refs nutzen,
 * um Inputs zu registrieren und auszulesen.
 */

/* =========================================================
   TextField
   ========================================================= */

/**
 * TextField
 * ---------
 * - zeigt ein Label über einem normalen <input>
 * - zeigt optional einen Fehlertext unter dem Feld
 * - leitet alle normalen Input-Props weiter (name, value, onChange, type, placeholder, ...)
 * - ref zeigt am Ende auf das echte <input>-Element
 */
export const TextField = React.forwardRef(
  // Props-Destructuring:
  // - label und error holen wir direkt heraus
  // - ...inputProps enthält den "Rest" (alle anderen Input-Attribute)
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        {/* Label: beschreibt das Feld für Nutzer */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          {label}
        </label>

        {/* Input-Feld:
            - ref wird mit dem echten DOM-Input verbunden
            - ...inputProps reicht alle Input-Props durch */}
        <input
          ref={ref}
          {...inputProps}
          style={{
            width: "100%",
            padding: "0.4rem",
            // Visuelles Feedback: bei Fehler rote Umrandung
            border: error ? "1px solid red" : "1px solid #ccc",
            borderRadius: 4,
          }}
        />

        {/* Optionales Rendering:
            Nur wenn error "truthy" ist, wird der Fehlerbereich angezeigt */}
        {error && (
          <div
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginTop: "0.25rem",
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

/* =========================================================
   CheckboxField
   ========================================================= */

/**
 * CheckboxField
 * -------------
 * - rendert eine Checkbox + Label in einer Zeile
 * - zeigt optional Fehlertext
 * - erzwingt type="checkbox" (damit die Komponente zuverlässig eine Checkbox ist)
 * - ref zeigt auf das <input type="checkbox">
 */
export const CheckboxField = React.forwardRef(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        {/* Label umschließt Checkbox + Text:
            Klick auf den Text toggelt die Checkbox automatisch */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {/* Checkbox selbst */}
          <input
            ref={ref}
            type="checkbox"
            {...inputProps}
          />

          {/* Labeltext neben der Checkbox */}
          {label}
        </label>

        {/* Fehlertext, falls vorhanden */}
        {error && (
          <div
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginTop: "0.25rem",
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

/* =========================================================
   SelectField
   ========================================================= */

/**
 * SelectField
 * -----------
 * - rendert ein Dropdown (<select>) mit Label
 * - Optionen werden über props.options (Array) erzeugt
 * - zeigt optional Fehlertext
 * - ref zeigt auf das <select> (wichtig für Form-Libraries)
 */
export const SelectField = React.forwardRef(
  // options wird separat herausgezogen, der Rest geht in ...selectProps
  ({ label, error, options, ...selectProps }, ref) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        {/* Label oberhalb des Dropdowns */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          {label}
        </label>

        {/* Select/Dropdown */}
        <select
          ref={ref}
          {...selectProps}
          style={{
            width: "100%",
            padding: "0.4rem",
            border: error ? "1px solid red" : "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          {/* Optionen aus dem Array erzeugen:
              - key muss eindeutig sein (hier: opt.value)
              - value ist der Wert, der ins Formular übernommen wird */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {/* Sichtbarer Text im Dropdown */}
              {opt.label}
            </option>
          ))}
        </select>

        {/* Fehlertext unterhalb des Feldes */}
        {error && (
          <div
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginTop: "0.25rem",
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);