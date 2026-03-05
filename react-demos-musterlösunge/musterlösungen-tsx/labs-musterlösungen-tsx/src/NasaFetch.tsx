/**
 * NasaFetch.tsx
 * -------------
 * Lädt Daten von der NASA-API (APOD = Astronomy Picture of the Day) mit fetch()
 * und zeigt sie im UI an.
 *
 */

import React, { useEffect, useState } from "react";
import { JSX } from "react";

/* =========================================================
   Typen: NASA API Response
   ========================================================= */

/**
 * NasaResponse
 * ------------
 * Minimale Struktur, die wir von der APOD-API erwarten.
 * Hinweis: media_type ist z.B. "image" oder "video".
 */
interface NasaResponse {
  url: string;
  title: string;
  explanation: string;
  date: string;
  media_type: string;
}

/**
 * API Key aus .env
 * ---------------
 * In Create React App müssen Env-Variablen mit REACT_APP_ beginnen.
 */
const apiKey = process.env.REACT_APP_API_KEY;

/* =========================================================
   Komponente: NasaFetch
   ========================================================= */

export const NasaFetch = (): JSX.Element => {
  /**
   * State: curiosityData
   * --------------------
   * - null: noch nichts geladen
   * - NasaResponse: sobald Daten da sind
   */
  const [curiosityData, setCuriosityData] = useState<NasaResponse | null>(null);

  /**
   * useEffect(..., [])
   * ------------------
   * - wird genau einmal nach dem ersten Render ausgeführt
   * - ideal für: “Daten beim Start laden”
   */
  useEffect(() => {
    /**
     * fetchData
     * ---------
     * useEffect darf selbst nicht async sein, deshalb definieren wir eine async Funktion innen.
     */
    const fetchData = async (): Promise<void> => {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      // HTTP-Fehler abfangen
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // JSON parsen und typisieren
      const data: NasaResponse = await response.json();

      // State setzen -> Re-Render
      setCuriosityData(data);

      // Debug-Ausgabe
      console.log(data);
    };

    /**
     * Aufrufen ohne await:
     * - wir starten den Request
     * - und fangen Fehler über catch ab, damit es keine “Unhandled Promise Rejection” gibt
     */
    void fetchData().catch((err) => {
      console.error("Fehler beim Laden der NASA-Daten:", err);
    });
  }, []);

  return (
    <div>
      <h1>Fetch-Api von der Browser Integration</h1>

      {/* JSON-Ausgabe zum Lernen/Debuggen */}
      <div>{JSON.stringify(curiosityData, null, 2)}</div>

      {/* Bild nur anzeigen, wenn Daten da sind und es ein Bild ist */}
      {curiosityData && curiosityData.media_type === "image" && (
        <img src={curiosityData.url} alt={curiosityData.title} />
      )}
    </div>
  );
};