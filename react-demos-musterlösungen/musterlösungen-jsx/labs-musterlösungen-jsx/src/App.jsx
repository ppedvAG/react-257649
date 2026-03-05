import "./App.css";
import { Main } from "./Main";
import { ToDoList } from "./ToDoList";
import { DynamicList } from "./DynamicList";
import { Blog } from "./Blog";
import { CustomForm } from "./CustomForm";
import { CustomFormComponents } from "./CustomFormWithCustomFormComponents";
import { NasaFetch } from "./NasaFetch";
import { NasaUseFetchWithAxios } from "./NasaUseFetchWithAxios";
import { NasaFetchWithQueryAndAxios } from "./NasaFetchWithQueryAndAxios";

/**
 * React Query (TanStack Query)
 * ---------------------------
 * QueryClient: zentrale Instanz, die Cache / Requests / Status verwaltet
 * QueryClientProvider: stellt den QueryClient via React Context allen
 * Kind-Komponenten bereit (damit Hooks wie useQuery funktionieren).
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * React Router
 * ------------
 * BrowserRouter: aktiviert Client-Side-Routing (URL-Wechsel ohne Reload)
 * Routes/Route: definieren, welche Komponente bei welcher URL gerendert wird
 * Link: Navigation zwischen Routen ohne vollständiges Neuladen der Seite
 */
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/**
 * QueryClient einmalig erstellen
 * ------------------------------
 * Wichtig: außerhalb von App() definieren, damit der Client nicht bei jedem
 * Render neu erzeugt wird (sonst geht Cache/Status verloren).
 */
const queryClient = new QueryClient();

/**
 * Beispiel-Daten (für Props-Übergabe und Listen-Rendering)
 * -------------------------------------------------------
 * Diese Arrays werden an Komponenten übergeben, um typische React-Konzepte zu zeigen:
 * - Props (items, posts)
 * - Rendering von Listen (.map in der jeweiligen Komponente)
 */
const dynamicItems = ["React-Basics lernen", "Tests schreiben", "Serverseitig rendern"];

const posts = [
  {
    id: 1, // Eindeutige ID (wichtig als key beim Rendern von Listen)
    title: "Hallo Welt",
    content: "Willkommen beim Lernen von React!",
  },
  {
    id: 2,
    title: "Installation",
    content: "Du kannst React via npm installieren.",
  },
];

/**
 * App-Komponente
 * --------------
 * Struktur von außen nach innen:
 * 1) QueryClientProvider: macht React Query überall nutzbar
 * 2) BrowserRouter: aktiviert Routing in der gesamten App
 * 3) Navigation (Links)
 * 4) Routes: entscheidet, welche “Seite” gerendert wird
 */
function App() {
  return (
    // Provider-Hülle für alle Komponenten, die React Query nutzen (z.B. useQuery)
    <QueryClientProvider client={queryClient}>
      {/* Router-Hülle: ermöglicht URL-basierte Navigation ohne Seiten-Reload */}
      <BrowserRouter>
        {/* Root-Container: Styling über App.css (Klasse "App") */}
        <div className="App">
          {/* Navigation: Links ändern die URL und wechseln die Route */}
          <nav>
            <ul>
              {/* Link statt <a> für interne Navigation (kein Reload) */}
              <li>
                <Link to="/">Startseite</Link>
              </li>
              <li>
                <Link to="/nasa-fetch">NASA Fetch</Link>
              </li>
              <li>
                <Link to="/nasa-usefetch-axios">NASA useFetch + Axios</Link>
              </li>
              <li>
                <Link to="/nasa-query-axios">NASA React Query + Axios</Link>
              </li>
            </ul>
          </nav>

          {/* Routes enthält alle möglichen “Seiten” der App */}
          <Routes>
            {/* Startseite ("/")
                element erwartet JSX.
                Hier zeigen wir mehrere Beispiel-Komponenten in einem Fragment (<>...</>) */}
            <Route
              path="/"
              element={
                <>
                  {/* ToDoList: Props + children 
                      - item1..item3 sind Props
                      - Text zwischen den Tags wird zu props.children */}
                  <ToDoList item1="Hallo" item2="Bergsteigen" item3="Blumen pflücken">
                    {/* children: Inhalt zwischen öffnendem und schließendem Tag */}
                    Meine Liste
                  </ToDoList>

                  <ToDoList item1="Einkaufen" item2="Rasen mähen" item3="React">
                    Done
                  </ToDoList>

                  {/* DynamicList: Beispiel für Listen-Rendering mit übergebenem Array */}
                  <h2>DynamicList Beispiel</h2>
                  <DynamicList items={dynamicItems} />

                  {/* Blog: Beispiel für Rendern von “Objekt-Listen” (posts) */}
                  <h2>Blog Beispiel</h2>
                  <Blog posts={posts} />

                  <hr />

                  <Main />
                  <CustomForm />
                  <CustomFormComponents />
                </>
              }
            />

            {/* Weitere Routen: jede Route rendert genau eine “Seiten”-Komponente */}
            <Route path="/nasa-fetch" element={<NasaFetch />} />
            <Route path="/nasa-usefetch-axios" element={<NasaUseFetchWithAxios />} />
            <Route path="/nasa-query-axios" element={<NasaFetchWithQueryAndAxios />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;