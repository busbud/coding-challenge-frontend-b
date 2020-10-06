import React from "react";

import moment from "moment";

import "./DepartureCard.scss";
import { Card, Row, Col } from "react-bootstrap";

interface IDepartureCardProps {
  departureLocation: string;
  departureTime: string;
  arrivalLocation: string;
  arrivalTime: string;
  price: string;
}

const DepartureCard: React.FC<IDepartureCardProps> = ({
  departureLocation,
  departureTime,
  arrivalLocation,
  arrivalTime,
  price,
}) => {
  return (
    <Card
      className="m-3 departure-card"
      style={{ width: "14rem", height: "auto" }}
    >
      <Card.Body>
        <Row>
          <Col>
            <h5>{departureLocation}</h5>
            <p>{moment.utc(departureTime).format("LT")}</p>
          </Col>
          <Col>
            <h5>{arrivalLocation}</h5>
            <p>{moment.utc(arrivalTime).format("LT")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>{price}</label>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DepartureCard;
