/**
 * NasaUseFetchWithAxios.jsx
 * --------------------------------------
 * Diese Datei enthält:
 * 1) Einen eigenen Custom Hook: useFetch(url)
 * 2) Eine Beispiel-Komponente: NasaUseFetchWithAxios
 *
 */

import { useState, useEffect } from "react";
import axios from "axios";

/**
 * API-Key aus .env
 * ---------------
 * In CRA muss die Variable REACT_APP_ heißen, sonst ist sie nicht verfügbar.
 */
const apiKey = process.env.REACT_APP_API_KEY;

/* =========================================================
   Custom Hook: useFetch
   ========================================================= */

/**
 * useFetch(url)
 * -------------
 * Ein Custom Hook, der:
 * - eine URL annimmt
 * - beim Mount und bei URL-Änderung Daten lädt
 * - die Antwort im State speichert
 * - den aktuellen response-State zurückgibt
 *
 * Hinweis:
 * Dieser Hook ist “halb-generic”:
 * - Er ist allgemein genug für viele GET-Requests
 * - aber es gibt keinen error/loading State (nur response)
 * - und es gibt keine Typisierung (in JS sowieso nicht)
 */
export function useFetch(url) {
  /**
   * response-State
   * --------------
   * - Start: null (noch keine Daten)
   * - später: Response-Daten aus dem Request
   */
  const [response, setResponse] = useState(null);

  /**
   * useEffect(..., [url])
   * --------------------
   * - läuft beim ersten Render (Mount)
   * - und danach immer, wenn sich die URL ändert
   *
   * Dadurch ist der Hook “reaktiv”: neue URL => neuer Request.
   */
  useEffect(() => {
    /**
     * fetchData()
     * -----------
     * async Funktion, die den Request ausführt.
     * useEffect selbst ist nicht async, daher definieren wir die async Funktion innen.
     */
    const fetchData = async () => {
      // axios.get(url) lädt Daten; JSON wird automatisch geparsed.
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // res.data enthält den eigentlichen Response-Body
      setResponse(res.data);
    };

    // Request starten; einfache Fehlerbehandlung über catch
    fetchData().catch((err) => {
      // In einer “echten” Variante würdest du hier z.B. setError(err) setzen
      console.error("useFetch: Fehler beim Laden:", err);
    });
  }, [url]);

  // Der Hook liefert immer den aktuellen State zurück:
  // - null (solange noch nicht geladen)
  // - oder die geladenen Daten
  return response;
}

/* =========================================================
   Komponente: NasaUseFetchWithAxios
   ========================================================= */

/**
 * NasaUseFetchWithAxios
 * ---------------------
 * - nutzt useFetch(...) um APOD-Daten zu laden
 * - zeigt JSON im UI
 * - rendert ein Bild, wenn media_type === "image"
 */
export function NasaUseFetchWithAxios() {
  /**
   * Hook-Nutzung:
   * - URL enthält API-Key
   * - Rückgabe ist anfangs null, später das APOD-Objekt
   */
  const apodData = useFetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  );

  return (
    <div>
      <h1>Eigener UseFetch Hook (mit axios)</h1>

      {/* JSON-Ausgabe zum Lernen/Debuggen */}
      <pre>{JSON.stringify(apodData, null, 2)}</pre>

      {/* Bedingtes Rendern:
          - apodData muss existieren (nicht null)
          - media_type muss "image" sein */}
      {apodData && apodData.media_type === "image" && (
        <img src={apodData.url} alt={apodData.title} />
      )}
    </div>
  );
}