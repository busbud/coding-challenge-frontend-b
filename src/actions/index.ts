interface UpdateLanguageAction {
  type: "UPDATE_LANGUAGE";
  language: string;
}
export function updateLanguage(language: string): UpdateLanguageAction {
  return { type: "UPDATE_LANGUAGE", language };
}
