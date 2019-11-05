import React, { useState } from "react";
import { Header } from "../components/header/Header";
import { SearchBar } from "../components/searchBar/SearchBar";
import { TripList } from "../components/tripList/TripList";
import styled, { keyframes } from "styled-components";
import background from "../assets/background.jpg";
import { useTranslation } from "react-i18next";
import search from "../assets/search.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  height: 100%;
`;

const TopSectionContainer = styled.div`
    background-image: url(${background});
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.6) 100%), url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: bottom;
    display: flex;
    width: 100%
    min-height: 50vh;
    align-items: center;
    justify-content: center;
    flex-direction: column
`;

const Title = styled.span`
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  display: flex;
  padding: 2vh 2vw;
  align-items: flex-end;
  height: 100%;
  align-items: center;
`;

const Dot = styled.div`
  background: #f19020;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px; /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
  box-shadow: 2px 5px 4px #d5d5d5;
`;

const Tips = styled.div`
  white-space: nowrap;
  padding: 2vh 2vw;
  align-items: flex-end;
  height: 100%;
  align-items: center;
  font-size: 13px;
  color: #696969;
`;

const Icon = styled.img`
  max-width: 15px;
  max-height: 15px;
  padding: 0 5px;
`;

export const HomePage = () => {
  const [trips, setTrips] = useState(null);
  const { t, _ } = useTranslation();
  return (
    <>
      <Header />
      <Container>
        <TopSectionContainer>
          <Title> {t("title")}</Title>
          <SearchBar setTrips={setTrips} />
        </TopSectionContainer>
        {trips &&
          (trips.length > 0 ? (
            <TripList trips={trips} />
          ) : (
            <DotWrapper>
              <Dot delay="0s" />
              <Dot delay=".1s" />
              <Dot delay=".2s" />
            </DotWrapper>
          ))}
        {!trips && (
          <Tips>
            {t("tips")} <Icon src={search} />
          </Tips>
        )}
      </Container>
    </>
  );
};
