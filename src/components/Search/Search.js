// @flow
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { get, set, values } from 'lodash/fp';
import { LocationSelector } from '../LocationSelector';
import { DatePicker } from '../DatePicker';
import { TravelerCountSelector } from '../TravelerCountSelector';
import type { LocationSuggestion, SearchFormParameters, SearchInformations } from '../../types';

// ---- TODO; Replace those fixtures by a real search location suggestion engine -- POC purpose only

import { suggestions as departureSuggestion } from '../LocationSelector/fixtures/origin-fixture';
import { suggestions as arrivalSuggestion } from '../LocationSelector/fixtures/arrival-fixture';

// ----

type Classes = {|
  search: string,
  yourJouney: string,
  travellingDates: string,
  searchForm: string,
  sectionTitle: string,
  travellersInformations: string,
  button: string,
|};

type Props = {|
  classes: Classes,
  onSearch: (searchInfos: SearchInformations) => void,
|};

type LocationInfo = LocationSuggestion & {|
  type: string,
|};

type Errors = {
  travellerSelectorErrored: boolean,
  departureDateError: boolean,
  locationSelectorError: boolean,
};

type State = {|
  searchInfos: SearchFormParameters,
  errors: Errors,
  isErrored: boolean,
  isPristine: boolean,
|};

type TravllerInfo = {|
  travellerCount: number,
  travellerType: string,
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
      errors: {
        travellerSelectorErrored: false,
        departureDateError: false,
        locationSelectorError: false,
      },
      isErrored: false,
      isPristine: true,
    };
  }

  hasErrors = (errors: Errors) => values(errors).some(item => item === true);

  handleTravelerCountChange = (travellerInfo: TravllerInfo) => {
    const { travellerCount, travellerType } = travellerInfo;
    const { errors } = this.state;
    const newErrors = set('travellerSelectorErrored', false, errors);

    const { searchInfos } = this.state;
    const newSerchInfos = set(`travellers[${travellerType}]`, travellerCount, searchInfos);
    this.setState({
      isPristine: false,
      searchInfos: newSerchInfos,
      errors: newErrors,
    });
  };

  handleLocationChange = (locationInfo: LocationInfo) => {
    const {
      value, type, geohash, label,
    } = locationInfo;

    const { errors } = this.state;
    const newErrors = set('locationSelectorError', false, errors);

    const { searchInfos } = this.state;
    const newSerchInfos = set(`locations[${type}]`, { value, geohash, label }, searchInfos);

    this.setState({
      searchInfos: newSerchInfos,
      isPristine: false,
      errors: newErrors,
    });
  };

  handleDepartureDateChange = (departureDate: string) => {
    const { searchInfos } = this.state;
    const { errors } = this.state;
    const newErrors = set('departureDateError', false, errors);
    const newSerchInfos = set('departureDate', departureDate, searchInfos);
    this.setState({
      isPristine: false,
      searchInfos: newSerchInfos,
      errors: newErrors,
    });
  };

  handleOnSearch = () => {
    const { travellers, locations, departureDate } = get('searchInfos', this.state);
    const errors = get('errors', this.state);
    const { onSearch } = this.props;

    let newErrors = errors;

    const { adult, senior } = travellers;

    if (adult === 0 && senior === 0) {
      newErrors = set('travellerSelectorErrored', true, newErrors);
    }

    if (!locations.departure || !locations.arrival) {
      newErrors = set('locationSelectorError', true, newErrors);
    }

    if (!departureDate) {
      newErrors = set('departureDateError', true, newErrors);
    }

    if (this.hasErrors(newErrors)) {
      this.setState({ errors: newErrors, isErrored: true });
    } else {
      const { adult: adultCount, child: childCount, senior: seniorCount } = travellers;
      const { departure, arrival } = locations;

      const searchInformations: SearchInformations = {
        adultCount,
        childCount,
        seniorCount,
        originGeohash: departure.geohash,
        arrivalGeohash: arrival.geohash,
        outboundDate: departureDate,
        travellersCount: adultCount + seniorCount + childCount,
      };

      onSearch(searchInformations);
    }
    this.setState({ searchInfos: { travellers, locations, departureDate } });
  };

  render() {
    const { classes } = this.props;
    const { travellerSelectorErrored, departureDateError, locationSelectorError } = get(
      'errors',
      this.state,
    );
    const { errors, isPristine } = this.state;

    return (
      <div>
        <div className={classes.searchForm}>
          <div className={classes.yourJouney}>
            <Typography className={classes.sectionTitle} variant="h6">
              Your Journey
            </Typography>
            <LocationSelector
              isErrored={locationSelectorError}
              onChange={value => this.handleLocationChange({ ...value, type: 'departure' })}
              suggestions={departureSuggestion}
              label="Departure"
            />
            <LocationSelector
              isErrored={locationSelectorError}
              suggestions={arrivalSuggestion}
              label="Arrival"
              onChange={value => this.handleLocationChange({ ...value, type: 'arrival' })}
            />
          </div>
          <div className={classes.travellingDates}>
            <Typography className={classes.sectionTitle} variant="h6">
              Travelling Date
            </Typography>
            <DatePicker
              isErrored={departureDateError}
              onChange={this.handleDepartureDateChange}
              label="Departure Time"
            />
          </div>
          <div className={classes.travellersInformations}>
            <Typography className={classes.sectionTitle} variant="h6">
              Travellers
            </Typography>
            <TravelerCountSelector
              isErrored={travellerSelectorErrored}
              travellerType="adult"
              onChange={this.handleTravelerCountChange}
            />
            <TravelerCountSelector
              isErrored={travellerSelectorErrored}
              travellerType="senior"
              onChange={this.handleTravelerCountChange}
            />
            <TravelerCountSelector
              isErrored={travellerSelectorErrored}
              travellerType="children"
              onChange={this.handleTravelerCountChange}
            />
          </div>
        </div>

        <Button
          disabled={this.hasErrors(errors) || isPristine}
          onClick={this.handleOnSearch}
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
