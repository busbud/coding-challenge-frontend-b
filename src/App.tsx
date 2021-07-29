import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import styles from "./App.module.css";

const Search = lazy(() => import("./pages/SearchContainer"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      suspense: true,
    },
  },
});

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/search">
            <QueryClientProvider client={queryClient}>
              <Search />
            </QueryClientProvider>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src={
            "https://busbud-pubweb-assets.freetls.fastly.net/images/homepage/ca0d53f.editorial_block_2.svg"
          }
          className={styles.logo}
          alt="logo"
        />
        <p className={styles.p}>
          It will be hot this summer in Montreal. Find one-way tickets for the
          festival's opening weekend.
        </p>
        <a
          className={styles.link}
          href="http://www.osheaga.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Osheaga festival
        </a>
      </header>
      <footer className={styles.footer}>
        <div>
          <h1>
            <code>Find a</code>{" "}
            <Link className={styles.link} to="/search">
              ticket
            </Link>
          </h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
