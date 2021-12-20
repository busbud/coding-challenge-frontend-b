import React from "react";
import ReactDOM from 'react-dom';
import { Router } from "@reach/router";
import MainApp from 'views/MainApp';
import './index.css';

/*
export const User = (props: any): JSX.Element => <h2>{props.userId}</h2>;
    <nav>
      <Link to="/">Home</Link>{" "}
      <Link to="users/123">Bob</Link>
      <Link to="users/abc">Sally</Link>
    </nav>
    */
// <Search path="search/:originName/:destinationId" />

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainApp path="/"/>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
