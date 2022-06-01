import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "./components/PageContainer.tsx";

const AppWrapper = styled.div`
  padding: 2rem 5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <AppWrapper>
      <PageContainer />
    </AppWrapper>
  );
}

export default App;
