import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search message={"search"} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
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
          It will be hot this summer in Montreal. Find one-way tickets from
          Québec departure schedules for the festival's opening weekend.
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
            <code>Find a</code> <Link to="/search">ticket</Link>
          </h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
