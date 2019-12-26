import React, { lazy, Suspense } from "react";
import { Router } from "@reach/router";

import Loader from "./components/Loader";
const Search = lazy(() => import("./screens/Search"));
const SearchResults = lazy(() => import("./screens/SearchResults"));
const Purchase = lazy(() => import("./screens/Purchase"));

const App: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <Router>
      <Search path="/" />
      <SearchResults path="/search" />
      <Purchase path="/purchase" />
    </Router>
  </Suspense>
);

export default App;
