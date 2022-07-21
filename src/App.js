import React, { useState } from 'react';
import { Container, Hero, Animation } from './styles';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TripCard from './components/TripCard';
import busAnimation from './animations/bus.json';

import Lottie from 'lottie-react';

function App() {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Header />
      <Hero src="./images/osheaga.svg" alt="hero" />
      <SearchBar setDepartures={setDepartures} setLoading={setLoading} />

      {loading && (
        <Animation>
          <Lottie animationData={busAnimation} loop={true} />
        </Animation>
      )}

      {departures.map((departure) => (
        <TripCard key={departure.id} departure={departure} />
      ))}
    </Container>
  );
}

export default App;
