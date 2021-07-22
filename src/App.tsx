import React from "react";
// import logo from "./logo.svg";
import styles from "./App.module.css";

function App() {
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
        <h1>
          <code>Find a</code> ticket.
        </h1>
      </footer>
    </div>
  );
}

export default App;
