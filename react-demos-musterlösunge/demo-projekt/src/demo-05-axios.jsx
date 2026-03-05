import { useEffect, useState } from "react";
import axios from "axios";

export default function DemoAxiosNasaApod() {
  const [apodData, setApodData] = useState();
  const [error, setError] = useState("");

  const API_KEY = "jKI1Dse1ZqjybBkvKNdGj3Jdz2dr2k5vfOxqAOah "; // oder deinen Key hier einsetzen
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  useEffect(() => {
    const load = async () => {
      try {
        setError("");

        // Axios: GET Request (bei 4xx/5xx -> wirft Fehler)
        const res = await axios.get(url);

        // Daten liegen bei Axios in res.data
        setApodData(res.data);
      } catch (e) {
        setError(e.message);
      }
    };

    load();
  }, [url]);

  if (error) return <p style={{ color: "red" }}>Fehler: {error}</p>;
  if (!apodData) return <p>Lade...</p>;

  return (
    <div>
      <h1>NASA APOD (Axios)</h1>

      <h2>{apodData.title}</h2>

      {/* Bild anzeigen (nur wenn media_type = "image") */}
      {apodData.media_type === "image" ? (
        <img src={apodData.url} alt={apodData.title} style={{ maxWidth: 600 }} />
      ) : (
        <p>Heute ist es kein Bild, sondern: {apodData.media_type}</p>
      )}

      <pre>{JSON.stringify(apodData, null, 2)}</pre>
    </div>
  );
}