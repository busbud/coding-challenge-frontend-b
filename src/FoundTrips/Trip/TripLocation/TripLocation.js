import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { format } from 'date-fns';
import './TripLocation.css';

class TripLocation extends Component {
  render() {
    return (
      <Grid verticalAlign="top" className={this.props.className}>
        <Grid.Column
          mobile={6}
          tablet={4}
          computer={4}
          textAlign="center"
          className={this.timeClassName()}
        >
          {formatTime(this.props.location.time)}
        </Grid.Column>
        <Grid.Column mobile={10} tablet={12} computer={12}>
          {this.props.location.name}
        </Grid.Column>
      </Grid>
    );
  }

  timeClassName() {
    const timeClassNames = ['TripLocation-time'];

    if (this.props.timeClassName) {
      timeClassNames.push(this.props.timeClassName);
    }

    return timeClassNames.join(' ');
  }
}

export default TripLocation;

function formatTime(dateTime) {
  return format(dateTime, 'HH:mm');
}
