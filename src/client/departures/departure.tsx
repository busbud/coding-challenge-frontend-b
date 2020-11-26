import { React, styled } from '../dependencies';

const Container = styled.div`
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ededed;
  border-radius: 0.4rem;
  background-color: #fff;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  @media (min-width: 640px) {
    display: flex;
    flex-wrap: wrap;
  }

  > div {
    flex: 1 0 auto;
    display: block;
    padding: 0 0.8rem;
    box-sizing: border-box;

    @media (max-width: 1024px) {
      flex-basis: 0px;
      &:not(:last-of-type) {
        margin-bottom: 0.8rem;
      }
    }
    @media (min-width: 600px) and (max-width: 906px) {
      flex-basis: 50%;
    }

    > span {
      &:nth-child(1) {
        display: block;
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 0.5);

        b {
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
      }
      &:nth-child(2) {
        display: block;
        margin-top: 0.3rem;
      }
    }
  }
`;

export const Departure: React.FC<{
  locationName: string;
  arrivalTime: string;
  departureTime: string;
  price: string;
}> = React.memo(({ locationName, arrivalTime, departureTime, price }) => {
  return (
    <Container>
      <div>
        <span>
          <b>Location</b>
        </span>{' '}
        <span>{locationName}</span>
      </div>
      <div>
        <span>
          <b>Arrival</b>
        </span>
        <span>{arrivalTime}</span>
      </div>
      <div>
        <span>
          <b>Departure</b>
        </span>
        <span>{departureTime}</span>
      </div>
      <div>
        <span>
          <b>Total price</b>
        </span>
        <span>{price}</span>
      </div>
    </Container>
  );
});
