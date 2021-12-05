import './App.css';
import logo from './logo.svg';
import HttpClient from './network/HttpClient';
import { formatISO } from 'date-fns';
import React, { useEffect, useState } from 'react';

const QUEBEC_GEO_HASH = 'f2m673';
const MONTREAL_GEO_HASH = 'f25dvk';

function App() {
  const [count, setCount] = useState(0);
  // const [departures, setDepartures] = useState<any>();

  useEffect(() => {
    (async () => {
      const testDepartureDate = new Date(2021, 7, 2);
      const departureDate = new Date();
      departureDate.setMinutes(testDepartureDate.getMinutes() + 30);
      const response = await HttpClient.get(
        `/x-departures/${QUEBEC_GEO_HASH}/${MONTREAL_GEO_HASH}/${formatISO(
          departureDate,
          { representation: 'date' },
        )}`,
      );

      // eslint-disable-next-line no-undef
      console.log(response);
    })();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
