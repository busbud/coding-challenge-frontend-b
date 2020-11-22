import DayJsUtils from '@date-io/dayjs';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import Search from '../components/search/Search';
import Tickets from '../components/tickets/tickets';
import './App.css';
import osheagaLogo from './osheaga-logo.png';

function App() {
  return (
    <>
      <CssBaseline />
        <MuiPickersUtilsProvider utils={DayJsUtils}>
        <div className="App">
          <header className="App-header">
            <img src={osheagaLogo} className="App-logo" alt="logo" />
          </header>
          <div>
            <Search />
            <Tickets />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
