/**
 * NasaUseFetchWithAxios.tsx
 * -------------------------
 * Diese Datei enthält:
 * 1) Einen eigenen Custom Hook: useFetch(url)
 * 2) Eine Beispielkomponente: NasaUseFetchWithAxios
 *
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { JSX } from "react";
/* =========================================================
   Typen: NASA APOD Response
   ========================================================= */

interface NasaResponse {
  url: string;
  title: string;
  explanation: string;
  date: string;
  media_type: string; // "image" oder "video"
}

/**
 * API Key aus .env
 */
const apiKey = process.env.REACT_APP_API_KEY;

/* =========================================================
   Custom Hook: useFetch
   ========================================================= */

/**
 * useFetch(url)
 * -------------
 * - nimmt eine URL als Parameter
 * - lädt Daten (GET) und speichert sie im State
 * - liefert den aktuellen State zurück
 *
 * Typisierung:
 * - Rückgabe ist NasaResponse | null
 * - null bedeutet: noch keine Daten geladen
 */
export function useFetch(url: string): NasaResponse | null {
  // response startet als null (noch keine Daten)
  const [response, setResponse] = useState<NasaResponse | null>(null);

  /**
   * useEffect(..., [url])
   * --------------------
   * - läuft beim ersten Render (Mount)
   * - und danach immer, wenn sich die URL ändert
   * => URL ist die “Abhängigkeit” des Effekts
   */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      /**
       * axios.get<NasaResponse>(...)
       * ---------------------------
       * - Generic <NasaResponse> sagt TypeScript:
       *   res.data entspricht diesem Interface
       */
      const res = await axios.get<NasaResponse>(url, {
        headers: { "Content-Type": "application/json" },
      });

      // State setzen -> Komponenten, die den Hook nutzen, rendern neu
      setResponse(res.data);
    };

    /**
     * Request starten + Fehler abfangen
     * (sonst kann es unhandled promise rejections geben)
     */
    void fetchData().catch((err) => {
      console.error("useFetch: Fehler beim Laden:", err);
      // optional: setResponse(null) oder extra error-State im Hook
    });
  }, [url]);

  return response;
}

/* =========================================================
   Beispiel-Komponente: NasaUseFetchWithAxios
   ========================================================= */

export function NasaUseFetchWithAxios(): JSX.Element {
  /**
   * Hook-Nutzung:
   * - Rückgabe ist bereits NasaResponse | null
   * - dadurch ist ein "as NasaResponse | null" eigentlich nicht nötig,
   *   wenn useFetch korrekt typisiert ist
   */
  const apodData = useFetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  );

  return (
    <div>
      <h1>Eigener UseFetch Hook (mit axios)</h1>

      {/* JSON-Ausgabe zum Lernen/Debuggen */}
      <pre>{JSON.stringify(apodData, null, 2)}</pre>

      {/* Bild nur anzeigen, wenn Daten vorhanden sind und media_type "image" ist */}
      {apodData && apodData.media_type === "image" && (
        <img src={apodData.url} alt={apodData.title} />
      )}
    </div>
  );
}