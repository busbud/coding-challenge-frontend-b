import React, { FC, useState } from "react";
import { DepartureSearchForm } from "./components/DepartureSearchForm";
import DepartureOutput from "./components/DepartureOutput";
import "./App.css";
import LoadingIndicator from "./components/LoadingIndicator";
import HeroContent from "./components/HeroConent";
import Footer from "./components/Footer";

const App: FC = () => {
  const [
    searchResult,
    setSearchResult,
  ] = useState<DepartureSearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(searchResult);
  return (
    <div>
      <div className="min-h-screen">
        <div
          className="relative bg-cover bg-center"
          style={{
            height: "60vh",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
          }}
        >
          <HeroContent />
          <div
            className="absolute bottom-0 container mx-auto max-w-screen-lg"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 90%)",
            }}
          >
            <DepartureSearchForm
              setLoading={setLoading}
              setSearchResult={setSearchResult}
            />
          </div>
        </div>

        <div className="mt-20 pt-40 sm:pt-40 sm:mt-0 md:pt-20 w-screen ">
          <div className="container mx-auto max-w-screen-lg">
            {loading && <LoadingIndicator />}

            {searchResult && <DepartureOutput searchResult={searchResult} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
