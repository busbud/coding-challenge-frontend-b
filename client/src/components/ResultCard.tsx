import React from "react";
import styled from "styled-components";

interface SearchResultType {
  departureTime: string;
  arrivalTime: string;
  destinationLocationName: string;
  originLocationName: string;
  prices: {
    currency: string;
    total: number;
  };
  language: string;
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 100px;
  align-items: center;
  padding: 0.5rem 2rem;
  border: 0.07rem solid lightgray;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  flex-wrap: wrap;

  .routes {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 1;
  }

  .routes > div:not(:last-child) {
    margin-bottom: 1rem;
  }

  .route {
    display: flex;
  }

  .route > div:not(:last-child) {
    margin-right: 2rem;
  }

  .time {
    word-break: keep-all;
  }

  .price {
    font-size: 1.5rem;
  }

  .price > span:not(:last-child) {
    margin-right: 0.5rem;
  }

  @media (max-width: 900px) {
    padding: 0.9rem;

    .price {
      font-size: 1.3rem;
    }

    .route {
      flex-direction: column;
    }
  }

  @media (max-width: 900px) {
    .price {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  }
`;

function ResultCard(props: SearchResultType) {
  return (
    <CardWrapper>
      <div className="routes">
        <div className="route origin">
          <div className="time">
            {new Date(props.departureTime).toLocaleString(props.language)}
          </div>
          <div>{props.originLocationName}</div>
        </div>
        <div className="route destination">
          <div className="time">
            {new Date(props.arrivalTime).toLocaleString(props.language)}
          </div>
          <div>{props.destinationLocationName}</div>
        </div>
      </div>
      <div className="price">
        <span>{props.prices.total}</span>
        <span>{props.prices.currency}</span>
      </div>
    </CardWrapper>
  );
}

export default ResultCard;
