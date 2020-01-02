import React from "react";
import styled from "styled-components";

import loader from "./../assets/images/loader.svg";

const Loader: React.FC = () => (
  <Container>
    <img src={loader} alt="loader" width={100} />
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
