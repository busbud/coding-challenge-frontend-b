import { React, styled } from '../dependencies';

const Header = styled.header`
  color: #fff;
  background-color: #127ccb;
  padding: 1rem;
  margin: 0 -1rem;
  line-height: 1;

  @media (min-width: 1024px) {
    border-radius: 0.4rem;
  }

  h1 {
    margin: 0;
  }
`;

const Container = styled.div`
  display: block;
  padding: 1rem 0;

  h3 {
    span {
      display: block;
      line-height: 1.6rem;

      &:not(:last-of-type) {
        margin-bottom: 0.2rem;
      }
    }
  }
`;

export const DepartureWelcome: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Welcome to Busbud</h1>
      </Header>
      <article>
        <h3>
          <span>Please stay safe.</span>
          <span>Travel responsibly.</span>
        </h3>

        <p>
          We miss connecting you with the world. During these times we remain
          dedicated to helping you travel safely.
        </p>
      </article>
    </Container>
  );
};
