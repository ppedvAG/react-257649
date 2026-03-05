import { render, screen } from "@testing-library/react"; // render: Komponente "mounten", screen: Zugriff auf Abfragen
import "@testing-library/jest-dom"; // erweitert expect() um Matcher wie toBeInTheDocument()
import { Blog } from "./Blog"; // die zu testende Komponente

/**
 * describe(...)
 * ------------
 * Gruppiert zusammengehörige Tests.
 * Der String "Blog" ist der Name der Test-Suite.
 */
describe("Blog", () => {
  /**
   * Testdaten
   * ---------
   * Ein Array von Blogposts, das wir in mehreren Tests wiederverwenden.
   * ids sind Strings (geht genauso wie Zahlen) – wichtig ist nur: eindeutig.
   */
  const posts = [
    { id: "p1", title: "Post 1", content: "Inhalt 1" },
    { id: "p2", title: "Post 2", content: "Inhalt 2" },
    { id: "p3", title: "Post 3", content: "Inhalt 3" },
  ];

  /**
   * Test 1: Rendert Titel und Inhalt
   * --------------------------------
   * Erwartung: Für jeden Post gibt es
   * - eine Überschrift <h3> mit dem Titel
   * - und einen <p> (oder Text) mit dem Content
   *
   * getByRole(...):
   * - "heading" sucht nach Überschriften (h1-h6)
   * - level: 3 => speziell h3
   * - name: ... => sichtbarer Text der Überschrift
   */
  test("rendert für jeden Post Titel (h3) und Content (p)", () => {
    // Rendern der Komponente mit Props (posts)
    render(<Blog posts={posts} />);

    // Wir prüfen alle Posts iterativ, damit der Test nicht dupliziert werden muss.
    posts.forEach((post) => {
      // Prüft: Gibt es eine h3-Überschrift mit genau diesem Titel?
      expect(
        screen.getByRole("heading", { level: 3, name: post.title })
      ).toBeInTheDocument();

      // Prüft: Ist der Content-Text irgendwo im gerenderten Output vorhanden?
      // (getByText ist ok, wenn der Text eindeutig ist)
      expect(screen.getByText(post.content)).toBeInTheDocument();
    });
  });

  /**
   * Test 2: Rendert eine Trennlinie
   * -------------------------------
   * Erwartung: Zwischen Titeln und Content existiert ein <hr>.
   *
   * Hier nutzen wir "container", um direkt im DOM nach einem Element zu suchen.
   * Alternative wäre: screen.getByRole("separator"), was semantischer ist.
   */
  test("rendert eine Trennlinie zwischen Titeln und Content", () => {
    const { container } = render(<Blog posts={posts} />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  /**
   * Test 3: Verhalten bei leeren Daten
   * ----------------------------------
   * Erwartung: Wenn posts = [],
   * - soll die Grundstruktur weiterhin gerendert werden (z.B. <ul>, <hr>),
   * - aber es soll keine Listeneinträge (<li>) geben.
   *
   * queryAllByRole(...) gibt immer ein Array zurück (auch wenn nichts gefunden wird),
   * daher eignet es sich gut für "soll 0 sein".
   */
  test("rendert bei leerem posts Array trotzdem Grundstruktur ohne Listitems", () => {
    render(<Blog posts={[]} />);

    // <ul> hat die Rolle "list"
    expect(screen.getByRole("list")).toBeInTheDocument();

    // <li> hat die Rolle "listitem" -> bei leerem Array erwarten wir 0 Elemente
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);

    // <hr> hat die Rolle "separator" -> die Trennlinie soll trotzdem existieren
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});