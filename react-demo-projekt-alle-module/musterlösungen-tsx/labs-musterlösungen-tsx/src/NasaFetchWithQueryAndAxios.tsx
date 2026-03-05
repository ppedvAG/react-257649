/**
 * NasaFetchWithQueryAndAxios.tsx
 * ------------------------------
 * NASA APOD laden mit:
 * - axios (HTTP-Client)
 * - TanStack Query / React Query (Caching, Loading/Error States, Re-Fetching)
 *
 */

import axios from "axios";
import { JSX } from "react";
import { useQuery } from "@tanstack/react-query";

/* =========================================================
   Typen: NASA APOD Response
   ========================================================= */

/**
 * NasaResponse
 * ------------
 * Struktur der Daten, die wir von der APOD-API erwarten.
 */
interface NasaResponse {
  url: string;
  title: string;
  explanation: string;
  date: string;
  media_type: string; // "image" oder "video"
}

/**
 * API Key aus .env
 * ---------------
 * In CRA müssen Env-Variablen mit REACT_APP_ beginnen.
 */
const apiKey = process.env.REACT_APP_API_KEY;

/* =========================================================
   Komponente
   ========================================================= */

export function NasaFetchWithQueryAndAxios(): JSX.Element {
  /**
   * useQuery<NasaResponse>(...)
   * --------------------------
   * - data: NasaResponse | undefined
   * - isLoading: boolean
   * - isError: boolean
   * - error: unknown (deshalb im Error-State casten oder absichern)
   */
  const {
    data: apodData,
    isLoading,
    isError,
    error,
  } = useQuery<NasaResponse>({
    /**
     * queryKey:
     * - eindeutige ID im Cache
     * - als Array, um später Parameter hinzufügen zu können
     */
    queryKey: ["nasaApod"],

    /**
     * queryFn:
     * - lädt die Daten wirklich (muss Promise zurückgeben)
     * - axios.get<NasaResponse> typisiert res.data korrekt
     */
    queryFn: async () => {
      const res = await axios.get<NasaResponse>(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      return res.data;
    },
  });

  /* =========================================================
     UI-States (frühe Returns)
     ========================================================= */

  // 1) Loading
  if (isLoading) {
    return <div>Lädt...</div>;
  }

  // 2) Error
  if (isError) {
    // error ist "unknown" -> sicher in Text verwandeln
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return <div>Fehler: {message}</div>;
  }

  // 3) No Data (theoretischer Edge Case)
  if (!apodData) {
    return <div>Keine Daten vorhanden.</div>;
  }

  /* =========================================================
     Success-State
     ========================================================= */
  return (
    <div>
      <h1>Axios und TanStack Query</h1>

      {/* JSON zum Debuggen/Lernen */}
      <pre>{JSON.stringify(apodData, null, 2)}</pre>

      {/* Bild nur anzeigen, wenn es wirklich ein Bild ist */}
      {apodData.media_type === "image" && (
        <img src={apodData.url} alt={apodData.title} />
      )}
    </div>
  );
}