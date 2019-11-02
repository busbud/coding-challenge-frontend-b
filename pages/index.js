import React, { useContext } from "react";
import styled from "styled-components";
import { Facebook } from "react-content-loader";

import HtmlHead from "../components/HtmlHead";
import ScheduleCard from "../components/ScheduleCard";
import Header from "../components/Header";
import {
  PageContainer,
  SiteWidth
} from "../components/common-styled/Containers";
import { getTransaltion } from "../utils/translation";
import { IntlContext } from "./_app";
import useFetchSchedules from "../hooks/useFetchSchedules";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;
const Home = () => {
  const { language } = useContext(IntlContext);
  const { departures, isLoading } = useFetchSchedules(
    "dr5reg",
    "f25dvk",
    "2020-08-15",
    1
  );
  return (
    <PageContainer>
      <HtmlHead />
      <Header title={getTransaltion("siteName", language)} />
      <SiteWidth>
        {isLoading && <Facebook />}
        {departures &&
          departures.map(schedule => <ScheduleCard schedule={schedule} />)}
      </SiteWidth>
    </PageContainer>
  );
};

export default Home;
