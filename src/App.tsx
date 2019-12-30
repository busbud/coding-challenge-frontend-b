import React, { lazy, Suspense } from "react";
import { Router } from "@reach/router";
import { IntlProvider } from "react-intl";

import { IntlContext } from "./i18n/IntlContext";
import messages_fr from "./i18n/messages/fr.json";
import messages_en from "./i18n/messages/en.json";
import Loader from "./components/Loader";
import { getUserLanguage, saveSelectedLanguage } from "./utils";
import * as Routes from "./constants/Routes";

const Search = lazy(() => import("./screens/Search"));
const SearchResults = lazy(() => import("./screens/SearchResults"));
const Purchase = lazy(() => import("./screens/Purchase"));

const App: React.FC = () => {
  const [language, setLanguage] = React.useState(() => getUserLanguage());

  const getMessages = (lang: string) => {
    switch (lang) {
      case "fr":
        return messages_fr;
      default:
        return messages_en;
    }
  };

  return (
    <IntlContext.Provider
      value={{
        lang: language,
        setLanguage: (lang: string) => {
          setLanguage(_ => lang);
          saveSelectedLanguage(lang);
        }
      }}
    >
      <IntlProvider locale={language} messages={getMessages(language)}>
        <Suspense fallback={<Loader />}>
          <Router>
            <Search path={Routes.HOME} />
            <SearchResults path={Routes.SEARCH} />
            <Purchase path={Routes.PURCHASE} />
          </Router>
        </Suspense>
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export default App;
