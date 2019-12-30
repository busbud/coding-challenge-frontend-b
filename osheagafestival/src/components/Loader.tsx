import React from "react";
import styled from "styled-components";

const Loader: React.FC = () => (
  <Container>
    <img src="./assets/images/loader.svg" alt="loader" width={100} />
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
