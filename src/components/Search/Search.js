// @flow
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import React, { Component } from 'react';
import set from 'lodash/fp/set';
import { LocationSelector } from '../LocationSelector';
import { DatePicker } from '../DatePicker';
import { TravelerCountSelector } from '../TravelerCountSelector';
import type { LocationSuggestion } from '../../types';

// ---- TODO; Replace those fixtures by a real search location suggestion engine -- POC purpose only

import { suggestions as departureSuggestion } from '../LocationSelector/fixtures/origin-fixture';
import { suggestions as arrivalSuggestion } from '../LocationSelector/fixtures/arrival-fixture';

// ----

type Classes = {|
  search: string,
  yourJouney: string,
  travellingDates: string,
  travellersInformations: string,
|};

type SearchInfos = {|
  travellers: {|
    child: number,
    adult: number,
    senior: number,
  |},
  locations: {
    arrival: LocationSuggestion,
    departure: LocationSuggestion,
  },
  departureDate: string,
|};

type Props = {|
  classes: Classes,
  onSearch: () => SearchInfos,
|};

type LocationInfo = LocationSuggestion & {|
  type: string,
|};

type State = {|
  searchInfos: SearchInfos,
|};

type TravllerInfo = {|
  travellerCount: number,
  travvellerTyper: string,
|};

const styles = theme => ({
  searchForm: {
    margin: '1.5rem',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  button: {
    marginTop: '16px',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
  },
  yourJouney: {
    [theme.breakpoints.up('lg')]: {
      width: '40%',
    },
    marginBottom: '16px',
  },
  travellingDates: {
    marginBottom: '16px',

    [theme.breakpoints.up('lg')]: {
      width: '20%',
      marginRight: '1.8rem',
      marginLeft: '1.8rem',
    },
  },

  travellersInformations: {
    [theme.breakpoints.up('lg')]: {
      width: '45%',
    },
  },
  sectionTitle: {
    marginBottom: '16px',
  },
});

class UnStyledSearch extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      searchInfos: {
        travellers: {
          child: 0,
          adult: 0,
          senior: 0,
        },
        locations: {
          arrival: null,
          departure: null,
        },
        departureDate: null,
      },
    };
  }

  handleTravelerCountChange = (travellerInfo: TravllerInfo) => {
    const { travellerCount, travellerType } = travellerInfo;
    const { searchInfos } = this.state;
    const newSerchInfos = set(`travellers[${travellerType}]`, travellerCount, searchInfos);
    this.setState({
      searchInfos: newSerchInfos,
    });
  };

  handleLocationChange = (locationInfo: LocationInfo) => {
    const {
      value, type, geohash, label,
    } = locationInfo;

    const { searchInfos } = this.state;
    const newSerchInfos = set(`locations[${type}]`, { value, geohash, label }, searchInfos);

    this.setState({
      searchInfos: newSerchInfos,
    });
  };

  handleDepartureDateChange = (departureDate: string) => {
    console.log(departureDate);
    const { searchInfos } = this.state;
    const newSerchInfos = set('departureDate', departureDate, searchInfos);
    this.setState({
      searchInfos: newSerchInfos,
    });
  };

  render() {
    const { classes, onSearch } = this.props;
    const { searchInfos } = this.state;
    return (
      <div>
        <div className={classes.searchForm}>
          <div className={classes.yourJouney}>
            <Typography className={classes.sectionTitle} variant="h6">
              Your Journey
            </Typography>
            <LocationSelector
              onChange={value => this.handleLocationChange({ ...value, type: 'departure' })}
              suggestions={departureSuggestion}
              label="Departure"
            />
            <LocationSelector
              suggestions={arrivalSuggestion}
              label="Arrival"
              onChange={value => this.handleLocationChange({ ...value, type: 'arrival' })}
            />
          </div>
          <div className={classes.travellingDates}>
            <Typography className={classes.sectionTitle} variant="h6">
              Travelling Date
            </Typography>
            <DatePicker onChange={this.handleDepartureDateChange} label="Departure Time" />
          </div>
          <div className={classes.travellersInformations}>
            <Typography className={classes.sectionTitle} variant="h6">
              Travellers
            </Typography>
            <TravelerCountSelector
              travellerType="adult"
              onChange={this.handleTravelerCountChange}
            />
            <TravelerCountSelector
              travellerType="senior"
              onChange={this.handleTravelerCountChange}
            />
            <TravelerCountSelector
              travellerType="children"
              onChange={this.handleTravelerCountChange}
            />
          </div>
        </div>

        <Button
          onClick={() => onSearch(searchInfos)}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Search
        </Button>
      </div>
    );
  }
}

export const Search = withStyles(styles)(UnStyledSearch);
