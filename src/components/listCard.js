import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../styles/list.scss';

const ListCard = (props) => (
  <Card className="listCard">
    <CardContent>
      <div className="listCard__upper">
        <div>
          <Typography color="textSecondary" gutterBottom>
            {props.operator.name}
          </Typography>
        </div>
        <div className="listCard__upper--price">
          {props.price}
        </div>
      </div>

      <div className="listCard__lower">
        <div className="listCard__lower--schedule">
          <Typography variant="body2" component="p">
            Depart
          </Typography>
          <Typography variant="h5" component="h2">
            <span>{props.departureTime}</span> at {props.departureStation.name}
          </Typography>
        </div>

        <div className="listCard__lower--schedule">
          <Typography variant="body2" component="p">
            Arrive
          </Typography>
          <Typography variant="h5" component="h2">
            <span>{props.arrivalTime}</span>  at {props.arrivalStation.name}
          </Typography>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ListCard;
