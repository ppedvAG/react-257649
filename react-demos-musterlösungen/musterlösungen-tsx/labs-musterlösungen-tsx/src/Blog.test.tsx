/**
 * Blog.test.tsx
 * -------------
 * Einfache Tests für die Blog-Komponente mit React Testing Library.
 *
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Blog, BlogPost } from "./Blog";

/* =========================================================
   Testdaten (Fixture)
   =========================================================
   - Wiederverwendbare Beispieldaten für mehrere Tests
   - Typisiert als BlogPost[], damit TS direkt Tippfehler erkennt
*/
const posts: BlogPost[] = [
  { id: 1, title: "Post 1", content: "Inhalt 1" },
  { id: 2, title: "Post 2", content: "Inhalt 2" },
  { id: 3, title: "Post 3", content: "Inhalt 3" },
];

describe("Blog", () => {
  
  test("rendert für jeden Post einen <h3> Titel und einen <p> Content", () => {
    render(<Blog posts={posts} />);

    /**
     * Blog rendert pro Post:
     * - <h3>{post.title}</h3>
     * - <p>{post.content}</p>
     *
     * getByRole("heading", { level: 3, name: ... })
     * - findet Überschriften semantisch (nicht nur nach Tag-Namen).
     */
    posts.forEach((post) => {
      expect(
        screen.getByRole("heading", { level: 3, name: post.title })
      ).toBeInTheDocument();

      expect(screen.getByText(post.content)).toBeInTheDocument();
    });
  });

  test("rendert eine Trennlinie (<hr>) zwischen Titel-Liste und Content", () => {
    render(<Blog posts={posts} />);

    /**
     * <hr> hat die semantische Role "separator".
     * => so testen wir das Element ohne querySelector.
     */
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  test("rendert bei leerem posts-Array die Grundstruktur, aber keine Listitems", () => {
    render(<Blog posts={[]} />);

    /**
     * Titel-Bereich:
     * - <ul> existiert immer
     * - aber es gibt keine <li>, wenn posts leer ist
     */
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);

    /**
     * Trennlinie existiert weiterhin,
     * weil <hr /> immer gerendert wird.
     */
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
