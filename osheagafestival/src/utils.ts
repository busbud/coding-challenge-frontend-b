export function concatMap<T>(
  map1: ReadonlyMap<string, T>,
  map2: ReadonlyMap<string, T>
) {
  return new Map([
    ...Array.from(map1.entries()),
    ...Array.from(map2.entries())
  ]);
}

export const getUserLanguage = () => localStorage.getItem("lang") || "en";
export const saveSelectedLanguage = (lang: string) =>
  localStorage.setItem("lang", lang);
