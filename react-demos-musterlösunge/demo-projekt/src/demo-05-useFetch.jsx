import { useEffect, useState } from "react";

/**
 * Custom Hook: useFetch
 * - lädt JSON von einer URL
 * - gibt die geladene Antwort zurück
 */
function useFetch(url) {
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      setResponse(json);
    };

    fetchData();
  }, [url]); // Wenn sich die URL ändert, laden wir neu

  return response;
}

export default function DemoUseFetch() {
  const API_KEY = "jKI1Dse1ZqjybBkvKNdGj3Jdz2dr2k5vfOxqAOah";

  // NASA APOD liefert u.a.: title, url, media_type
  const apodData = useFetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  );

  if (!apodData) return <p>Lade...</p>;

  return (
    <div>
      <h1>NASA APOD Fetcher</h1>

      <h2>{apodData.title}</h2>

      {/* Wir prüfen zuerst media_type und rendern nur dann <img>, wenn es ein Bild ist */}
      {apodData.media_type === "image" ? (
        <img
          src={apodData.url}
          
          style={{ maxWidth: 600 }}
        />
      ) : (
        
        <p>Heute ist es kein Bild, sondern: {apodData.media_type}</p>
      )}

      <pre>{JSON.stringify(apodData, null, 2)}</pre>
    </div>
  );
}