/**
 * CustomFields.tsx
 * ----------------
 * Wiederverwendbare Formular-Feld-Komponenten in TypeScript (TSX):
 * - TextField     (Input + Label + Fehlertext)
 * - CheckboxField (Checkbox + Label + Fehlertext)
 * - SelectField   (Select + Optionen + Fehlertext)
 *
 */

import React from "react";

/* =========================================================
   TextField
   ========================================================= */

/**
 * TextFieldProps
 * --------------
 * Intersection Type:
 * - React.InputHTMLAttributes<HTMLInputElement> enthält alle normalen <input>-Props
 *   (name, value, onChange, placeholder, type, disabled, ...)
 * - Wir erweitern diese um eigene Props: label und error
 *
 * Ergebnis: TextField kann alle normalen Input-Props annehmen + label/error.
 */
type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string; // Text oberhalb des Inputs
  error?: string; // optionaler Fehlertext unter dem Input
};

/**
 * TextField
 * ---------
 * - forwardRef sorgt dafür, dass ein ref von außen auf das innere <input> zeigt
 * - Typen bei forwardRef:
 *   <HTMLInputElement, TextFieldProps>
 *   => ref.current ist ein HTMLInputElement
 *   => Props werden als TextFieldProps geprüft
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  /**
   * Props-Destructuring:
   * - label und error ziehen wir heraus
   * - ...inputProps enthält alle restlichen Input-Attribute (name, onChange, ...)
   */
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        {/* Label für bessere Usability/Lesbarkeit */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          {label}
        </label>

        {/* Input:
            - ref wird auf das echte DOM-Input gesetzt
            - inputProps werden komplett durchgereicht */}
        <input
          ref={ref}
          {...inputProps}
          style={{
            width: "100%",
            padding: "0.4rem",
            // UI-Feedback: roter Rahmen bei Fehler
            border: error ? "1px solid red" : "1px solid #ccc",
            borderRadius: 4,
          }}
        />

        {/* Optional: Fehlertext nur rendern, wenn error vorhanden ist */}
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
 * CheckboxFieldProps
 * ------------------
 * Wieder: Standard-Input-Props + eigene Props (label/error).
 */
type CheckboxFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

/**
 * CheckboxField
 * -------------
 * - forwardRef: ref zeigt auf <input type="checkbox">
 * - type="checkbox" ist fix, damit die Komponente immer eine Checkbox ist
 */
export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
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
            ref={ref}
            type="checkbox"
            {...inputProps}
          />
          {label}
        </label>

        {/* Optionaler Fehlertext */}
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
 * Option
 * ------
 * Datentyp für eine Dropdown-Option:
 * - value: interner Wert (wird ins Formular geschrieben)
 * - label: sichtbarer Text
 */
type Option = {
  value: string;
  label: string;
};

/**
 * SelectFieldProps
 * ----------------
 * - React.SelectHTMLAttributes<HTMLSelectElement> liefert Standard-Select-Props
 *   (value, defaultValue, onChange, name, disabled, multiple, ...)
 * - + eigene Props: label, error, options
 */
type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: Option[];
};

/**
 * SelectField
 * -----------
 * - forwardRef: ref zeigt auf das echte <select>
 * - options werden zu <option>-Elementen gemappt
 */
export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, options, ...selectProps }, ref) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          {label}
        </label>

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
          {/* options.map(...) erzeugt die Dropdown-Einträge */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Optionaler Fehlertext */}
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