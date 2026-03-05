export default function Demo01() {
  const fruits = ["Apfel", "Banane"];
  const isLoggedIn = true;
  const name = "Melina";

  return (
    <div>

      <h2>JSX in React</h2>
      <p>JSX sieht aus wie HTML, ist aber JavaScript.</p>
      <h3>Hallo aus React</h3>

      <h2>JavaScript in JSX mit {"{ }"}</h2>
      <p>
        Name: <b>{name}</b>
      </p>

      <h2>camelCase Attribute</h2>
      <div className="box">
        Das ist ein div mit className.
      </div>

      <h2>map, &&, ?: </h2>

      <p>Liste mit map:</p>
      <ul>
        {fruits.map((f) => ( <li key={f}>{f}</li>))}
      </ul>

      {isLoggedIn && <p>Du bist eingeloggt.</p>}

      <p>{isLoggedIn ? "Zugriff erlaubt" : "Bitte einloggen"}</p>

    </div>
  );
}