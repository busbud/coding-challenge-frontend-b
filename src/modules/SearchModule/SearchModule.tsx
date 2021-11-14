import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";

function SearchModule(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Search />} />
    </Routes>
  );
}

export default SearchModule;
