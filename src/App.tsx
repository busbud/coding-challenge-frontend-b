import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";
import { languages } from "utils/languages";
import {
  BusbudContextValues,
  BusbudContext,
} from "./interfaces/context.interface";
import { handleNavClick } from "utils/utils";

// Initialize the History Browser History.
const history = createBrowserHistory();

// Check Local Store Language value.
const lang = () => {
  return localStorage.lang
    ? localStorage.lang
    : localStorage.setItem("lang", "en");
};

// Initialze i18next.
i18next.use(initReactI18next).init({
  resources: languages,
  lng: lang(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const App: React.FC = () => {
  const langRef = useRef<HTMLSelectElement>(null);
  const [langValue, setLangValue] = useState(localStorage.lang);
  const [currencyValue, setCurrencyValue] = useState("CAD");

  const { t } = useTranslation();

  useEffect(() => {
    lang();
  }, []);

  // Set Context values to be accessible throughout the entire application.
  const values: BusbudContextValues = useMemo(
    () => ({
      currencyValue,
    }),
    [currencyValue]
  );

  return (
    <BusbudContext.Provider value={values}>
      <div className="App">
        <nav className="nav">
          <div className="nav-container">
            <h1 onClick={handleNavClick("/", history)}>BusBud</h1>
            <div className="nav-container-selectors">
              <select
                ref={langRef}
                name="lang"
                id="lang"
                value={langValue}
                onChange={(e) => {
                  i18next.changeLanguage(e.target.value);
                  localStorage.setItem("lang", e.target.value);
                  setLangValue(e.target.value);
                }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
              <select
                name="currency"
                id="currency"
                value={currencyValue}
                onChange={(e) => {
                  setCurrencyValue(e.target.value);
                }}
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </nav>
        <article className="body">
          <Suspense fallback={<span>Loading...</span>}>
            <Router history={history}>
              <Switch>
                {routes(t).map((route, key) => (
                  <Route
                    key={key}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                ))}
              </Switch>
            </Router>
          </Suspense>
        </article>
        <footer className="footer">
          <div className="footer-container">
            &copy; BusBud {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </BusbudContext.Provider>
  );
};

export default App;
