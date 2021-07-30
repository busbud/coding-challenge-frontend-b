import { useEffect, useRef } from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";
import { languages } from "utils/languages";

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
  const langValue = useRef<HTMLSelectElement>(null);

  // Initialize the History Browser History.
  const history = createBrowserHistory();

  useEffect(() => {
    lang();
  }, []);

  return (
    <div className="App">
      <nav className="nav">
        <div className="nav-container">
          <h1>BusBud</h1>
          <select
            ref={langValue}
            name="lang"
            id="lang"
            value={localStorage.lang}
            onChange={(e) => {
              i18next.changeLanguage(e.target.value);
              localStorage.setItem("lang", e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
      </nav>

      <article className="body">
        <Router history={history}>
          <Switch>
            {routes().map((route, key) => (
              <Route
                key={key}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Switch>
        </Router>
      </article>
      <footer className="footer">
        <div className="footer-container">
          &copy; BusBud {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default App;
