import React from "react";
import { Route } from "react-router-dom";
// Components imports
import Header from "./header/Header";

export default function DefaultLayout({ component: MatchedPage, ...rest }) {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Header />
          <MatchedPage {...matchProps} />
        </div>
      )}
    />
  );
}
