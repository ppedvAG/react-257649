import { useState } from "react";

export default function DemoEventhandlingKlassisch() {
  const [text, setText] = useState("Noch nichts passiert");

  function handleSubmit(event) {
    event.preventDefault(); 

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    data.terms = formData.has("terms");

    const errors = {};
    if (!data.username || data.username.trim().length < 3)
      errors.username = "Username: mind. 3 Zeichen.";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
      errors.email = "E-Mail: ungültig.";
    if (!data.age || Number(data.age) < 1 || Number(data.age) > 120)
      errors.age = "Alter: 1–120.";
    if (!data.password || data.password.length < 6)
      errors.password = "Passwort: mind. 6 Zeichen.";
    if (!data.terms) errors.terms = "AGB müssen akzeptiert werden.";

    if (Object.keys(errors).length > 0) {
      setText("Fehler im Formular ❌");
      alert(Object.values(errors).join("\n"));
      return;
    }

    console.log("Formular-Daten:", data);
    setText(`Formular abgeschickt ✅ Nutzer: ${data.username}`);
  }

  return (
    <div>
      <h1>Eventhandling (klassisch, ohne react-hook-form)</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" placeholder="z.B. melina123" />
        </label>

        <label>
          E-Mail:
          <input name="email" placeholder="z.B. test@mail.de" />
        </label>

        <label>
          Alter:
          <input name="age" type="number" placeholder="z.B. 18" />
        </label>

        <label>
          Passwort:
          <input name="password" type="password" placeholder="mind. 6 Zeichen" />
        </label>

        <label>
          <input name="terms" type="checkbox" /> AGB akzeptieren
        </label>

        <button type="submit">Absenden</button>
      </form>

      <p>{text}</p>
    </div>
  );
}