import { JSX } from "react";
/**
 * Blog.tsx
 * --------
 * Diese Datei enthält:
 * 1) TypeScript-Typen (BlogPost, BlogProps)
 * 2) Die Blog-Komponente, die eine Liste von Posts rendert
 *
 */

/**
 * BlogPost
 * --------
 * Datentyp für einen einzelnen Blogeintrag.
 * - id: eindeutiger Schlüssel (wichtig für React keys)
 * - title/content: Textinhalte
 */
export interface BlogPost {
  id: number;
  title: string;
  content: string;
}

/**
 * BlogProps
 * --------
 * Props-Typ für die Blog-Komponente:
 * - posts ist ein Array von BlogPost-Objekten
 */
interface BlogProps {
  posts: BlogPost[];
}

/**
 * Blog-Komponente
 * --------------
 * - bekommt posts als Prop
 * - rendert zwei Bereiche:
 *   1) Titel: Liste der Titel
 *   2) Content: alle Posts komplett (Titel + Text)
 */
export function Blog({ posts }: BlogProps): JSX.Element {
  /**
   * Titel
   * -------
   * JSX für eine Liste (<ul>) mit Titeln.
   * posts.map(...) erzeugt aus jedem Post ein <li>.
   *
   * key={post.id}:
   * - React braucht pro Listenelement einen stabilen, eindeutigen key
   * - damit Updates effizient und korrekt funktionieren.
   */
  const titel = (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );

  /**
   * content
   * -------
   * Hier rendern wir jeden Post mit Titel (<h3>) und Inhalt (<p>).
   * Auch das ist wieder ein .map(...), nur mit mehr JSX pro Element.
   */
  const content = posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));

  /**
   * Render-Ergebnis
   * ---------------
   * Reihenfolge:
   * - Titel
   * - Trennlinie (<hr>)
   * - Content
   */
  return (
    <div>
      {titel}
      <hr />
      {content}
    </div>
  );
}