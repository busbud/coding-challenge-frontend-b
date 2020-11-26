import { React, styled } from '../dependencies';

const Container = styled.div`
  background-color: white;
`;

export const DepartureLocation: React.FC<{ name: string }> = ({ name }) => {
  return <Container>Location name: {name}</Container>;
};
