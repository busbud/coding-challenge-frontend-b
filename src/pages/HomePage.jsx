import React, { useState } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { SearchBar } from "../components/searchBar/SearchBar";
import { TripList } from "../components/tripList/TripList";
import styled from "styled-components";
import background from "../assets/background.jpg";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
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

export const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const { t, i18n } = useTranslation();
  return (
    <>
      <Header />
      <Container>
        <TopSectionContainer>
          <Title> {t("title")}</Title>
          <SearchBar setTrips={setTrips} />
        </TopSectionContainer>
        <TripList trips={trips} />
      </Container>
      <Footer />
    </>
  );
};
