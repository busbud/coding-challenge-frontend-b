import React from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import "./ResultItem.css";

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departure_time: props.item.departure_time,
      arrival_time: props.item.arrival_time,
      location: props.item.location,
      price: props.item.price,
      currency: props.item.currency,
      currencySymbol: props.item.currencySymbol
    };
  }

  render() {
    return (
      <Card className="card-result">
        <CardContent>
          <Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div class="departure-card--body">
                  <div class="flex-shrink-1 flex-grow-1 flex-truncate-container">
                      <p class="departure-card--schedule">
                        <strong>{moment(this.state.departure_time).format('h:mm a')}</strong>
                        <span class="ml-1">
                            <span class="departure-card--schedule-city font-weight-500">{this.state.location}</span>
                        </span>
                      </p>
                      <p class="departure-card--schedule">
                        <strong>{moment(this.state.arrival_time).format('h:mm a')}</strong>
                      </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div class="departure-card--body">
                  <div class="departure-card--price text-right font-weight-bold">
                    {this.state.currencySymbol}{this.state.price/100}<small class="font-weight-bold align-text-bottom">{this.state.currency}</small>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
