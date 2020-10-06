import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PageLayout, OsheagaBackground } from "./shared/components";

import { HomePage } from "./pages/home/home-page";
import { SearchResultsPage } from "./pages/search-results/search-results-page";

export const AppRouting: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Switch>
          <Route exact path="/">
            <OsheagaBackground>
              <HomePage />
            </OsheagaBackground>
          </Route>
          <Route path="/departures">
            <SearchResultsPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </PageLayout>
    </BrowserRouter>
  );
};
