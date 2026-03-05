/**
 * NasaFetch.jsx
 * -------------
 * Diese Komponente lädt Daten von der NASA-API (APOD = Astronomy Picture of the Day)
 * mit der Browser-Funktion fetch() und zeigt die Antwort an.
 *
 */

import React, { useEffect, useState } from "react";

/**
 * API-Key aus .env
 * ---------------
 * In Create React App werden Env-Variablen nur dann in den Build übernommen,
 * wenn sie mit REACT_APP_ beginnen.
 *
 * Beispiel in .env:
 * REACT_APP_API_KEY=DEIN_KEY
 */
const apiKey = process.env.REACT_APP_API_KEY;

/**
 * NasaFetch
 * --------
 * - lädt APOD-Daten beim Mount
 * - speichert die Antwort im State (curiosityData)
 * - zeigt JSON-Ausgabe + optional ein Bild
 */
export const NasaFetch = () => {
  /**
   * State: curiosityData
   * --------------------
   * - Startwert: null (noch nichts geladen)
   * - später: Objekt mit API-Antwort
   */
  const [curiosityData, setCuriosityData] = useState(null);

  /**
   * useEffect(..., [])
   * ------------------
   * - läuft genau einmal nach dem ersten Rendern (weil Abhängigkeitsarray leer ist)
   * - ideal zum “Daten laden beim Start”
   */
  useEffect(() => {
    /**
     * fetchData()
     * -----------
     * Innerhalb von useEffect definieren wir eine async-Funktion,
     * weil useEffect selbst nicht async sein soll (Cleanup/Return-Verhalten).
     */
    const fetchData = async () => {
      // HTTP Request an die NASA APOD-API
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // HTTP-Fehler abfangen (Status nicht 2xx)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // JSON Body lesen
      const data = await response.json();

      // State setzen -> löst Re-Render aus
      setCuriosityData(data);

      // Debug: Daten zusätzlich in der Konsole anzeigen
      console.log(data);
    };

    /**
     * fetchData ausführen
     * -------------------
     * In manchen TS-Setups schreibt man "void fetchData()" um zu zeigen:
     * “Promise absichtlich nicht awaiten”.
     * In JS ist das optional, wir lassen es hier bewusst klar stehen.
     */
    fetchData().catch((err) => {
      // Einfache Fehlerbehandlung:
      // In einer echten App würdest du hier oft einen error-State setzen,
      // damit du dem Nutzer eine Fehlermeldung anzeigen kannst.
      console.error("Fehler beim Laden der NASA-Daten:", err);
    });
  }, []);

  /**
   * Render
   * ------
   * - Überschrift
   * - Rohdaten als JSON (zum Lernen / Debuggen)
   * - optional ein Bild, wenn media_type === "image"
   */
  return (
    <div>
      <h1>Fetch-Api von der Browser Integration</h1>

      {/* JSON-Ausgabe:
          JSON.stringify(obj, null, 2) macht formatiertes JSON (mit Einrückung) */}
      <div>{JSON.stringify(curiosityData, null, 2)}</div>

      {/* Bedingtes Rendern:
          - nur wenn Daten vorhanden sind
          - und nur wenn es ein Bild ist */}
      {curiosityData && curiosityData.media_type === "image" && (
        <img
          src={curiosityData.url}
          alt={curiosityData.title} // alt-Text: wichtig für Accessibility
        />
      )}
    </div>
  );
};