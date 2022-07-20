import React from 'react';
import { Container, Hero } from './styles';

import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Container>
      <Header />
      <Hero src="./images/osheaga.svg" alt="hero" />
      <SearchBar />
    </Container>
  );
}

export default App;
