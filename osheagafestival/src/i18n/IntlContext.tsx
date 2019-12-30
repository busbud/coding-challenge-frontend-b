import React from "react";
import { getUserLanguage, saveSelectedLanguage } from "./../utils";

export const IntlContext = React.createContext({
  lang: getUserLanguage(),
  setLanguage: saveSelectedLanguage
});
