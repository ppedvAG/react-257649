import { Stack, Text, mergeStyleSets } from "@fluentui/react";

/**
 * Styles (CSS-in-JS) mit mergeStyleSets
 * ------------------------------------
 * mergeStyleSets erzeugt CSS-Klassen aus einem JS-Objekt.
 * Rückgabewert: ein Objekt, dessen Keys (list/item) später als className genutzt werden.
 */
const classNames = mergeStyleSets({
  // Style für den äußeren Container der Liste
  list: {
    width: "100%", // Liste nutzt die volle Breite des übergeordneten Containers
  },

  // Style für jeden einzelnen Eintrag (eine Art "Karte")
  item: {
    padding: "8px 12px", // Innenabstand (oben/unten 8px, links/rechts 12px)
    borderRadius: 4, // leicht abgerundete Ecken
    border: "1px solid #edebe9", // dünner, hellgrauer Rahmen
  },
});

/**
 * Stack-Tokens
 * ------------
 * Fluent UI nutzt "tokens", um Layout-Werte wie Abstände zu konfigurieren.
 * childrenGap = Abstand zwischen direkten Kindern innerhalb des Stack.
 */
const listTokens = {
  childrenGap: 8, // 8px Abstand zwischen den Listeneinträgen
};

/**
 * DynamicList
 * -----------
 * Props:
 * - items: Array von Strings, das wir als Liste darstellen
 *
 * Beispiel:
 * <DynamicList items={["Eintrag 1", "Eintrag 2"]} />
 */
export function DynamicList({ items }) {
  return (
    // Äußerer Stack:
    // - className: Styles für die Liste
    // - tokens: Abstand zwischen den Einträgen
    <Stack className={classNames.list} tokens={listTokens}>
      {/* items.map(...)
          - Wir gehen jedes Element im Array durch
          - und erzeugen daraus JSX (ein Listeneintrag pro Element) */}
      {items.map((item, index) => (
        // Pro Listeneintrag ein eigener Stack:
        // - key: React benötigt einen stabilen Schlüssel pro Element in Listen
        //   Hier wird der Index genutzt (ok für statische Listen).
        //   Bei echten dynamischen Listen (Einfügen/Löschen/Sortieren) besser:
        //   einen eindeutigen Identifier verwenden (z. B. itemId).
        <Stack key={index} className={classNames.item}>
          {/* Text: Fluent UI Typografie-Komponente */}
          <Text>{item}</Text>
        </Stack>
      ))}
    </Stack>
  );
}