import { React, styled } from './dependencies';

const Container = styled.div`
  h2 {
    color: rgba(255, 0, 0, 0.5);
  }
`;

export const DisplayError: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <header>{title}</header>
      <div>{children}</div>
    </Container>
  );
};
