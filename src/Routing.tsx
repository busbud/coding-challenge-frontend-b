import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}

export default Routing;
