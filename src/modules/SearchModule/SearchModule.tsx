import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import TicketsPage from "./pages/TicketsPage";

function SearchModule(): JSX.Element {
  return (
    <Routes>
      <Route index element={<SearchPage />} />
      <Route path="tickets" element={<TicketsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default SearchModule;
