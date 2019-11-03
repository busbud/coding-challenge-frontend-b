import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  padding: 10px;
  margin: 1px;
  flex-direction: column;
`;

const Card = styled.div`
  border-radius: 4px;
  box-shadow: 2px 5px 4px #555;
  background: white;
  padding: 5px;
  margin: 10px;
`;

export const TripList = () => {
  return (
    <ListContainer>
      <Card> Card Trip </Card>
      <Card> Card Trip </Card>
      <Card> Card Trip </Card>
    </ListContainer>
  );
};
