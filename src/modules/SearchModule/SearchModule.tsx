import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TicketsPage from "./pages/TicketsPage";

function SearchModule(): JSX.Element {
  return (
    <Routes>
      <Route index element={<TicketsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default SearchModule;
