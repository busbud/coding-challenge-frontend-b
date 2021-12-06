import DepartureClient from './client/DepartureClient';
import { Departures } from './components/Departures';
import DeparturesOnBoarding from './components/DeparturesOnBoarding';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React, { useCallback, useState } from 'react';

const ORIGIN_GEO_HASH = 'f2m673';
const DESTINATION_GEO_HASH = 'f25dvk';
const DEPARTURE_ORIGIN = 'Québec';
const DEPARTURE_DESTINATION = 'Montréal';
const DEPARTURE_DATE = new Date();
DEPARTURE_DATE.setDate(DEPARTURE_DATE.getDate() + 1);

function App() {
  const [isOnBoarding, setOnBoardingState] = useState<boolean>(true);
  const [departures, setDepartures] = useState<any>();

  const showDepartures = useCallback(async () => {
    setOnBoardingState(false);

    const fetchedDepartures = await DepartureClient.list(
      ORIGIN_GEO_HASH,
      DESTINATION_GEO_HASH,
      DEPARTURE_DATE,
    );

    setDepartures(fetchedDepartures);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height={40}
        bgcolor="#282c34"
        color="white"
      >
        <Typography variant="h6">Bus Buddy</Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center'"
        width="100%"
      >
        {departures ? <Departures departures={departures} /> : <div></div>}
      </Stack>

      <DeparturesOnBoarding
        onStart={showDepartures}
        open={isOnBoarding}
        origin={DEPARTURE_ORIGIN}
        destination={DEPARTURE_DESTINATION}
        date={DEPARTURE_DATE}
      />
    </>
  );
}

export default App;
