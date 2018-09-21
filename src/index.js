/* global document */
import React    from "react";
import ReactDOM from "react-dom";
import App      from "./components/App";

import { I18nextProvider }  from "react-i18next";
import i18next              from "i18next";
import LngDetector          from 'i18next-browser-languagedetector';
import common_en            from "./translations/en.common.json";
import common_fr            from "./translations/fr.common.json";

import "./scss/styles.css";

i18next
  .use(LngDetector)
  .init({
    interpolation: { escapeValue: false },
    resources: {
      en: { common: common_en },
      fr: { common: common_fr },
    },
  });

const Main = props => (
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"),);