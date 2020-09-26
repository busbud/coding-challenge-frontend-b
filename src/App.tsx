import React from "react";
import { DepartureSearchForm } from "./components/DepartureSearchForm";
import "./App.css";

// import { departureService } from "./services/departureService";

function App() {
  // const handleClick = async () => {
  //   const res = await departureService.searchInit({
  //     origin: "dpz88g",
  //     destination: "f25dvk",
  //     outboundDate: "2020-10-28",
  //   });
  //   console.log(res);
  // };
  return (
    <div className="app ">
      <DepartureSearchForm />
    </div>
  );
}

export default App;
