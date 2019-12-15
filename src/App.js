import React, { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import DepartureList from "./components/DeparturesList";
import { useDeparturesData } from "./hooks/useDeparturesData";

function App() {
  const [showDeparturesResult, setShowDeparturesResult] = useState(false);
  const [searchResult] = useDeparturesData();
  return (
    <div>
      {!showDeparturesResult && <LandingPage setShowDeparturesResult={setShowDeparturesResult} />}
      {showDeparturesResult && (
        <>
          <Header />
          <DepartureList searchResult={searchResult} />
        </>
      )}
    </div>
  );
}

export default App;
