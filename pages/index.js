import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Facebook } from "react-content-loader";

import HtmlHead from "../components/HtmlHead";
import ScheduleCard from "../components/ScheduleCard";
import Header from "../components/Header";
import {
  PageContainer,
  SiteWidth
} from "../components/common-styled/Containers";
import { BoldText } from "../components/common-styled/Texts";
import { getTransaltion } from "../utils/translation";
import { IntlContext } from "./_app";
import usePollingApi from "../hooks/usePollingApi";
import { bakeDepartureResults } from "../utils/bakeResults";
import { formatedDate } from "../utils/date";

export const Search = styled(BoldText)`
  padding: 20px 0;
`;

const Home = () => {
  const { language } = useContext(IntlContext);
  const date = "2020-08-02";
  const { results, isLoading } = usePollingApi(
    ["dr5reg", "f25dvk", date],
    ["?adult=1"],
    bakeDepartureResults
  );
  return (
    <PageContainer>
      <HtmlHead />
      <Header title={getTransaltion("siteName", language)} />
      <SiteWidth>
        <Search>
          {/* TODO write utility function for replacement based on params */}
          {getTransaltion("search_header", language).replace(
            "{0}",
            formatedDate(date)
          )}
        </Search>
        {isLoading && <Facebook style={{ width: "60%" }} />}
        {results &&
          results.departures &&
          results.departures.map((schedule, index) => (
            <ScheduleCard
              key={index + "schedulecard"}
              schedule={schedule}
              operator={results.operators[schedule.operator_id]}
              origin={
                results.locations &&
                schedule.origin_location_id &&
                results.locations[schedule.origin_location_id]
              }
              destination={
                results.locations &&
                schedule.destination_location_id &&
                results.locations[schedule.destination_location_id]
              }
            />
          ))}
      </SiteWidth>
    </PageContainer>
  );
};

export default Home;
