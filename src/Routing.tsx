import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchModule from "./modules/SearchModule";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="search/*" element={<SearchModule />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Routing;
