/**
 * App.tsx
 * -------
 * Hauptkomponente der Anwendung (Root Component).
 *
 * In dieser Datei passiert:
 * 1) Globale Provider einbinden (TanStack Query / React Query)
 * 2) Client-Side-Routing definieren (react-router-dom)
 * 3) Demo-Komponenten für die Schulung zusammensetzen (ToDoList, Blog, Forms, NASA-Beispiele)
 *
 */

import "./App.css";
import { Main } from "./Main";
import { ToDoList } from "./ToDoList";
import { DynamicList } from "./DynamicList";
import { Blog, BlogPost } from "./Blog";
import { CustomForm } from "./CustomForm";
import { CustomFormComponents } from "./CustomFormComponents";
import { NasaFetch } from "./NasaFetch";
import { NasaUseFetchWithAxios } from "./NasaUseFetchWithAxios";
import { NasaFetchWithQueryAndAxios } from "./NasaFetchWithQueryAndAxios";

/**
 * TanStack Query (React Query)
 * ----------------------------
 * QueryClient:
 * - verwaltet Cache, Request-Status, Re-Fetching usw.
 *
 * QueryClientProvider:
 * - stellt den QueryClient via React Context bereit,
 *   damit Kind-Komponenten Hooks wie useQuery nutzen können.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * React Router
 * ------------
 * BrowserRouter: aktiviert Routing (URL-Wechsel ohne Page Reload)
 * Routes/Route: definieren, welches Element bei welcher URL gerendert wird
 * Link: Navigation zwischen Routen ohne vollständigen Seiten-Neuladevorgang
 */
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { JSX } from "react";

/**
 * QueryClient Instanz (einmalig)
 * ------------------------------
 * Wichtig: außerhalb der App-Komponente erstellen,
 * damit der Cache nicht bei jedem Render zurückgesetzt wird.
 */
const queryClient = new QueryClient();

/**
 * Beispiel-Daten (TypeScript-typisiert)
 * ------------------------------------
 * dynamicItems: Array von Strings
 * posts: Array von BlogPost-Objekten (Typ kommt aus Blog.tsx)
 */
const dynamicItems: string[] = [
  "React-Basics lernen",
  "Tests schreiben",
  "Serverseitig rendern",
];

const posts: BlogPost[] = [
  {
    id: 1, // eindeutige ID (wichtig als key in Listen)
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
 * Aufbau von außen nach innen:
 * 1) <QueryClientProvider> (React Query für alle Kinder)
 * 2) <BrowserRouter> (Routing für alle Kinder)
 * 3) Navigation (Links)
 * 4) <Routes> mit einzelnen <Route>-Definitionen
 */
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Root-Container: Styles über App.css */}
        <div className="App">
          {/* Navigation: Links ändern die URL (ohne Reload) */}
          <nav>
            <ul>
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

          {/* Routes: entscheidet anhand der URL, was gerendert wird */}
          <Routes>
            {/* Startseite ("/"):
                element bekommt JSX (hier ein Fragment mit mehreren Komponenten) */}
            <Route
              path="/"
              element={
                <>
                  {/* ToDoList demonstriert Props + children */}
                  <ToDoList item1="Hallo" item2="Bergsteigen" item3="Blumen pflücken">
                    {/* children: alles zwischen <ToDoList>...</ToDoList> */}
                    Meine Liste
                  </ToDoList>

                  <ToDoList item1="Einkaufen" item2="Rasen mähen" item3="React">
                    Done
                  </ToDoList>

                  {/* DynamicList: Listen-Rendering mit übergebenem Array */}
                  <h2>DynamicList Beispiel</h2>
                  <DynamicList items={dynamicItems} />

                  {/* Blog: Rendern einer Objekt-Liste (posts) */}
                  <h2>Blog Beispiel</h2>
                  <Blog posts={posts} />

                  <hr />

                  {/* Weitere Schulungsbeispiele */}
                  <Main />
                  <CustomForm />
                  <CustomFormComponents />
                </>
              }
            />

            {/* NASA-Seiten */}
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