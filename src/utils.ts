export function concatMap<T>(
  map1: ReadonlyMap<string, T>,
  map2: ReadonlyMap<string, T>
) {
  return new Map([
    ...Array.from(map1.entries()),
    ...Array.from(map2.entries())
  ]);
}

const LANGUAGE_STORAGE_KEY = "lang";

export const getUserLanguage = () =>
  localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
export const saveSelectedLanguage = (lang: string) =>
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
