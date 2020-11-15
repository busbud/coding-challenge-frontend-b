import { shallowEqual, useSelector } from "react-redux";
import { EmptyNotice } from "../EmptyNotice";
import { Loading } from "../Loading";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { ResultsCard } from "../ResultsCard";
import { TDeparture } from "../../types";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

export const ResultsList = (): React.ReactElement<"div"> => {
  const classes = useStyles();
  const [currentRequest, results, loading, loaded, error, cities]: [
    TDeparture[],
    boolean
  ] = useSelector((state: TApplicationState) => {
    return [
      state.schedules.currentRequest,
      state.schedules.data,
      state.schedules.loading,
      state.schedules.loaded,
      state.schedules.error,
      state.city.data,
    ];
  }, shallowEqual);

  if (loading) return <Loading />;
  if (!results.length || !loaded || error) return <EmptyNotice />;

  // NOTE: this should really be done by reselect and the data
  // returned by selector should already perform this map, as
  // that way it is memoized... but lazy this sunday morning
  // TRB 11/15/2020
  //
  const cityMap = {};
  cities.forEach((city) => {
    cityMap[city.geohash] = city;
  });

  return (
    <div className={classes.container}>
      {results.map((data) => {
        return (
          <ResultsCard
            key={data.id}
            cities={cityMap}
            departure={data}
            request={currentRequest}
          />
        );
      })}
    </div>
  );
};
