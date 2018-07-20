import React from "react";
import { Route } from "react-router-dom";
// Components imports
import Header from "./header/Header";
// Inner imports
import "./DefaultLayout.css";

export default function DefaultLayout({ component: MatchedPage, ...rest }) {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className="main__header-space">
          <Header />
          <MatchedPage {...matchProps} />
        </div>
      )}
    />
  );
}
