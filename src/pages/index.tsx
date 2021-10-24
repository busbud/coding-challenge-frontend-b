import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { rgba } from "polished";

import { SearchBar } from "@/components/SearchBar";
import { useDepartures } from "@/hooks/useDepartures";
import { colors } from "@/theme";

const PageWrap = styled.main`
  min-height: 100vh;
  background: url("/bg.svg") no-repeat center center / cover;
  background-attachment: fixed;
`;

const Container = styled.div`
  width: 1064px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  position: relative;
`;

const Logo = styled.img`
  display: block;
  margin: 50px auto;
`;

const ResultCard = styled.div`
  width: 840px;
  max-width: 100%;
  margin: 0 auto 20px;
  padding: 16px 24px;
  border-radius: 4px;
  background: ${colors.white};
  box-shadow: 0 2px 0 0 ${colors.lightAlt}, 0 4px 14px ${rgba(colors.grey, 0.2)};
`;

const Home: NextPage = () => {
  const [passengers, setPassengers] = useState<number>(1);
  const { isLoading, onSearch, searchResults } = useDepartures(passengers);

  return (
    <PageWrap>
      <Container>
        <Logo src="/logo.png" width={304} height={89.5} />

        <SearchBar
          isLoading={isLoading}
          onPassengersDecrement={() => setPassengers((p) => Math.max(p - 1, 1))}
          onPassengersIncrement={() => setPassengers((p) => p + 1)}
          onSearchClick={onSearch}
          passengers={passengers}
        />

        {searchResults.map((result) => (
          <ResultCard key={result.id}>
            <p>
              {result.from} → {result.to}
            </p>

            <p>{result.price}</p>

            <img src={result.operatorLogo} alt={result.operatorName} />

            <a href={result.url} target="_blank">
              Reserve
            </a>
          </ResultCard>
        ))}
      </Container>
    </PageWrap>
  );
};

export default Home;
