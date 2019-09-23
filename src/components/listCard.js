import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../styles/list.scss';

const ListCard = (props) => (
  <Card className="listCard">
    <CardContent>
      <div className="listCard__upper">
        <div className="listCard__upper--operator">
          {props.operator.name}
        </div>
        <div className="listCard__upper--price">
          {props.price}
        </div>
      </div>

      <div className="listCard__lower">
        <div className="listCard__lower--schedule">
          <p>Depart</p>
          <p><span>{props.departureTime}</span>  at  {props.departureStation.name}</p>
        </div>

        <div className="listCard__lower--schedule">
          <p>Arrive</p>
          <p><span>{props.arrivalTime}</span>  at {props.arrivalStation.name} </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ListCard;
