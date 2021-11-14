import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

function SearchModule(): JSX.Element {
  return (
    <Routes>
      <Route index element={<SearchPage />} />
    </Routes>
  );
}

export default SearchModule;
