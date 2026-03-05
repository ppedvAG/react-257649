/**
 * Blog.jsx
 * --------
 * Diese Komponente zeigt eine einfache Blog-Ansicht mit zwei Bereichen:
 * 1) Titeln: Liste aller Post-Titel
 * 2) Content: vollständiger Inhalt jedes Posts
 *
 * Die Daten kommen über Props als Array "posts".
 */

// Destructuring: Wir holen "posts" direkt aus den Props heraus.
export function Blog({ posts }) {
  /**
   * Titel
   * -------
   * JSX für die Titel.
   * - posts.map(...) erzeugt aus jedem Post ein <li>
   * - key={post.id} hilft React, Listen effizient zu aktualisieren
   */
  const title = (
    <ul>
      {posts.map((post) => (
        // key muss pro Listenelement eindeutig sein.
        // React nutzt den key, um Elemente bei Änderungen wiederzuerkennen
        // (z. B. wenn ein Post hinzugefügt/entfernt wird).
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );

  /**
   * content
   * -------
   * JSX für den Hauptbereich (alle Posts komplett).
   * Auch hier nutzen wir map, um aus jedem Post ein JSX-Element zu bauen.
   */
  const content = posts.map((post) => (
    <div key={post.id}>
      {/* Titel des Posts */}
      <h3>{post.title}</h3>

      {/* Text/Inhalt des Posts */}
      <p>{post.content}</p>
    </div>
  ));

  /**
   * Return (Render-Ergebnis)
   * -----------------------
   * Wir geben ein übergeordnetes <div> zurück, das die beiden Bereiche enthält:
   * - Titel
   * - Trennlinie
   * - Content
   */
  return (
    <div>
      {title}
      <hr />
      {content}
    </div>
  );
}