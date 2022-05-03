/**
    Gibt den ersten Vornamen zurück, falls vorhanden.
    Praktisch für Vornamen mit mehreren Komponenten (z.B. Zweitnamen).
*/
const getFirstName = (name: string) => {
    return name.trim().split(" ")[0];
};

export default getFirstName;