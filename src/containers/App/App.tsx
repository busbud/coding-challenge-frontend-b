import React from 'react';

import "./App.scss";
import { Container } from "react-bootstrap";

import Header from "../Header/Header";
import Presentation from "../../components/Presentation/Presentation";
import SearchSection from "../SearchSection/SearchSection";

const App: React.FC = () => {
  return ( 
      <Container fluid className="bosheaga-app p-0">
        <Header />
        <Presentation />
        <SearchSection />
      </Container>
  );
};

export default App;
