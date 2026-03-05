import { useEffect, useState } from "react";

/**
 * DemoFetch – Beispiel für Daten holen (fetch) in React mit useEffect + async/await
 *
 * Was passiert hier?
 * - Beim ersten Rendern (Mount) wird genau 1x ein Request an die NASA-APOD-API geschickt.
 * - Die Antwort kommt als JSON zurück und wird im State gespeichert.
 * - Sobald der State gesetzt ist, rendert React neu und zeigt die Daten an.
 *
 * async/await kurz erklärt:
 * - `async` vor einer Funktion bedeutet, dass sie asynchron ist und Promises zurückgibt.
 * - `await` kann nur in async-Funktionen verwendet werden und „wartet“ auf die Erfüllung einer Promise, ohne den Browser zu blockieren.
 * - `fetch(...)` gibt eine Promise zurück -> `await` wartet auf die fertige HTTP-Response.
 * - `response.json()` gibt ebenfalls eine Promise zurück -> `await` wartet auf das geparste JSON.
 * - Während `await` „wartet“, blockiert es NICHT den Browser (nur diese Funktion pausiert).
 */

export default function DemoFetch() {
  // State: Hier speichern wir die Daten, die von der API kommen.
  // Startwert: undefined (noch nichts geladen)
  const [apodData, setApodData] = useState();

  // useEffect: Code darin läuft nach dem ersten Rendern (Mount).
  // Mit [] am Ende läuft es nur 1x beim Start.
  useEffect(() => {
    // Async-Funktion innerhalb von useEffect (weil useEffect selbst nicht async sein soll)
    const fetchData = async () => {
      const API_KEY = "jKI1Dse1ZqjybBkvKNdGj3Jdz2dr2k5vfOxqAOah";

      // fetch = HTTP Request
      // Wir holen uns "Astronomy Picture of the Day" (APOD)
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      );

      // Response in JSON umwandeln (Promise -> await)
      const json = await response.json();

      // State setzen -> React rendert danach neu und zeigt die Daten an
      setApodData(json);
    };

    // Funktion ausführen (Request starten)
    fetchData();
  }, []); // leere Dependency-Liste: nur einmal beim Start

  // Solange die Daten noch nicht da sind, zeigen wir "Lade..."
  if (!apodData) return <p>Lade...</p>;

  return (
    <div>
      <h1>NASA APOD Demo</h1>

      {/* Beispiel: Ein Feld aus der API anzeigen */}
      <h2>{apodData.title}</h2>

      {/* 
        media_type kann "image" oder "video" sein.
        Nur wenn es ein Bild ist, rendern wir ein <img>.
      */}
      {apodData.media_type === "image" ? (
        <img
          // Bild-URL aus der API
          src={apodData.url}
          // einfache Inline-Styles 
          style={{ maxWidth: 600 }}
        />
      ) : (
        // Falls es kein Bild ist, zeigen wir einen Hinweis an
        <p>Heute ist es kein Bild, sondern: {apodData.media_type}</p>
      )}

      {/* Optional: Ganze Antwort als JSON anzeigen (gut für Debugging) */}
      <pre>{JSON.stringify(apodData, null, 2)}</pre>

      {/*
        MERKSÄTZE:
        1) fetch liefert eine Promise -> deshalb async/await oder then/catch.
        2) response.json() liefert auch eine Promise -> deshalb await.
        3) setState (setApodData) löst ein neues Rendern aus.
        4) useEffect mit [] läuft nur einmal beim Start (Mount).
      */}
    </div>
  );
}