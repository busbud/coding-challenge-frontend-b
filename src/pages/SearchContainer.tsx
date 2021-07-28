import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

type Data = {
  description?: string;
};

const requestHeaders = {
  Accept: process.env.BUSBUD_ACCEPT_HEADER ?? "",
  "X-Busbud-Token": process.env.BUSBUD_API_TOKEN ?? "",
  "Access-Control-Allow-Origin": "*",
};

const origin = "dr5reg";
const destination = "f25dvfzcz";
const outboundDate = "2020-01-14";

const SearchContainer = () => {
  const { isLoading, error, data, isFetching } = useQuery<Data, Error>(
    ["repoData"],
    () =>
      fetch(
        `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`,
        {
          method: "get",
          headers: requestHeaders,
        }
      ).then((res) => res.json())
  );

  let message = "";

  if (isLoading) message = "Loading...";

  if (error) message = "An error has occurred: " + error.message;

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography component="div" style={{ height: "100vh" }}>
          {isLoading || error
            ? message
            : isFetching
            ? "Updating..."
            : data?.description}
        </Typography>
        <ReactQueryDevtools initialIsOpen />
      </Container>
    </React.Fragment>
  );
};

export default SearchContainer;
