import { NextPage } from "next";
import { useState } from "react";

type SimpleDataStructure = Array<Record<string, string>>;

const Home: NextPage = () => {
  const [departures, setDepartures] = useState<SimpleDataStructure>([]);

  const [isLoading, setIsLoading] = useState(false);

  const loadResults = async (offset = 0) => {
    try {
      const response = await fetch(`/api/departures?offset=${offset}`, {
        method: "GET",
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      setDepartures(json.departures as []);

      if (!json.complete) {
        setTimeout(() => loadResults(offset + json.departures.length), 2500);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onLoadResultsClick = () => {
    setIsLoading(true);
    loadResults();
  };

  return (
    <div>
      <h1>Busbud test</h1>

      {isLoading && <p>Loading</p>}
      <button onClick={onLoadResultsClick}>Load results</button>
    </div>
  );
};

export default Home;
