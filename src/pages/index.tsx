import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

import { DepartureCard, SearchBar } from "@/components";
import { useDepartures } from "@/hooks/useDepartures";
import { breakpoints } from "@/theme";

const Container = styled.div`
  width: 1064px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
  max-width: 100%;
  height: auto;

  @media (min-width: ${breakpoints.tabletSmall}) {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const DeparturesWrap = styled.div<{ isVisible: boolean }>`
  @media (min-width: ${breakpoints.tablet}) {
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 0.8s ease;
  }
`;

const Home: NextPage = () => {
  const [passengers, setPassengers] = useState<number>(1);
  const { isLoading, onSearch, searchResults } = useDepartures(passengers);

  return (
    <main>
      <Container>
        <Logo src="/logo.png" width={304} height={89.5} />

        <SearchBar
          hasLoaded={!!searchResults.length}
          isLoading={isLoading}
          onPassengersDecrement={() => setPassengers((p) => Math.max(p - 1, 1))}
          onPassengersIncrement={() => setPassengers((p) => p + 1)}
          onSearchClick={onSearch}
          passengers={passengers}
        />

        <DeparturesWrap isVisible={!!searchResults.length}>
          {searchResults.map((result) => (
            <DepartureCard key={result.id} data={result} />
          ))}
        </DeparturesWrap>
      </Container>
    </main>
  );
};

export default Home;
