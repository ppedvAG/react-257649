/**
 * NasaFetchWithQueryAndAxios.jsx
 * ------------------------------
 * NASA APOD (Astronomy Picture of the Day) laden mit:
 * - axios (HTTP-Client)
 * - TanStack Query / React Query (Caching + Loading/Error-States)
 *
 */

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

/**
 * API-Key aus .env
 * ---------------
 * In CRA muss der Key mit REACT_APP_ beginnen, damit er verfügbar ist.
 */
const apiKey = process.env.REACT_APP_API_KEY;

/**
 * NasaFetchWithQueryAndAxios
 * -------------------------
 * - Startet eine Query (useQuery)
 * - React Query übernimmt: Laden, Fehlerstatus, Cache, Re-Fetch, etc.
 */
export function NasaFetchWithQueryAndAxios() {
  /**
   * useQuery(...)
   * ------------
   * queryKey:
   * - eindeutiger Schlüssel im Cache
   * - als Array, damit man später leicht Parameter ergänzen kann
   *
   * queryFn:
   * - async Funktion, die die Daten wirklich lädt
   * - muss ein Promise zurückgeben
   *
   * Rückgabe (Destructuring):
   * - data: die geladenen Daten (hier umbenannt zu apodData)
   * - isLoading: true während des Ladens
   * - isError: true wenn ein Fehler geworfen wurde
   * - error: Fehlerobjekt (Typ ist in react-query meist "unknown")
   */
  const {
    data: apodData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["nasaApod"],
    queryFn: async () => {
      /**
       * axios.get(url)
       * -------------
       * - führt einen GET-Request aus
       * - axios parsed JSON automatisch
       * - Ergebnis steckt in res.data
       */
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      return res.data;
    },
  });

  /* =========================================================
     UI-States (frühe Returns)
     ========================================================= */

  // 1) Loading-State: Request läuft noch
  if (isLoading) {
    return <div>Lädt...</div>;
  }

  // 2) Error-State: queryFn hat einen Fehler geworfen (Netzwerk, HTTP, etc.)
  if (isError) {
    // error ist häufig unknown -> String(...) macht daraus sicher Text
    return <div>Fehler: {String(error?.message || error)}</div>;
  }

  // 3) "No Data"-State: selten, aber möglich (z.B. unerwartete Response)
  if (!apodData) {
    return <div>Keine Daten vorhanden.</div>;
  }

  /* =========================================================
     Success-State: Daten sind da
     ========================================================= */
  return (
    <div>
      <h1>Axios und TanStack Query</h1>

      {/* Debug-/Lern-Ausgabe:
          <pre> behält Zeilenumbrüche/Whitespace, daher gut für JSON */}
      <pre>{JSON.stringify(apodData, null, 2)}</pre>

      {/* Bedingtes Rendern:
          nur wenn der Medientyp wirklich ein Bild ist */}
      {apodData.media_type === "image" && (
        <img src={apodData.url} alt={apodData.title} />
      )}
    </div>
  );
}