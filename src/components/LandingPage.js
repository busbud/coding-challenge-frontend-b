import React from "react";
import styled from "styled-components";

const LandingPage = ({ setShowDeparturesResult }) => {
  return (
    <LandingWrapper>
      <h4 className="center">Find your way to Osheaga with BusBud</h4>
      <button
        onClick={() => setShowDeparturesResult(true)}
        className="btn waves-effect waves-light"
      >
        SEARCH
        <i className="material-icons right">search</i>
      </button>
      <p>NY to MTL - 2nd of August 2020</p>
    </LandingWrapper>
  );
};

const LandingWrapper = styled.div`
  align-text: center;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default LandingPage;
