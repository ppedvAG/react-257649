import { useQuery } from "@tanstack/react-query";

export default function Demo05ReactQuery() {
  const API_KEY = "jKI1Dse1ZqjybBkvKNdGj3Jdz2dr2k5vfOxqAOah ";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["nasa-apod"], // Cache-Key
    queryFn: async () => {
      console.log("Query läuft (neuer Request)"); 
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP Fehler: " + res.status);
      return res.json();
    },
  });

  if (isLoading) return <p>Lade...</p>;
  if (isError) return <p style={{ color: "red" }}>Fehler: {error.message}</p>;

  return (
    <div>
      <h1>NASA APOD (React Query)</h1>

      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Lade neu..." : "Refetch"}
      </button>

      <p>
        Letztes Update: {new Date(dataUpdatedAt).toLocaleTimeString()}
      </p>

      <h2>{data.title}</h2>

      {data.media_type === "image" ? (
        <img src={data.url} alt={data.title} style={{ maxWidth: 600 }} />
      ) : (
        <p>Heute ist es kein Bild, sondern: {data.media_type}</p>
      )}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}