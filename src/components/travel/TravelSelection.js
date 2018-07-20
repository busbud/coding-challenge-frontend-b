import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Translate from "react-translate-component";
// Components imports
import Autocomplete from "./Autocomplete";
// Inner imports
import "./TravelSelection.css";

class TravelSelection extends Component {
  state = {
    origin: {
      name: "",
      geohash: ""
    },
    destination: {
      name: "",
      geohash: ""
    },
    outboundDate: ""
  };

  constructor(props) {
    super();
    const defaultValue = props.defaultValue;
    if (defaultValue) {
      this.state = {
        origin: {
          name: defaultValue.townFrom,
          geohash: defaultValue.townFromGeohash
        },
        destination: {
          name: defaultValue.townTo,
          geohash: defaultValue.townToGeohash
        },
        outboundDate: defaultValue.date
      };
    }
  }

  handleOriginUpdate = event => {
    this.setState({
      origin: {
        name: event.target.value,
        geohash: "invalid"
      }
    });
  };

  handleDestinationUpdate = event => {
    this.setState({
      destination: {
        name: event.target.value,
        geohash: "invalid"
      }
    });
  };

  handleOutboundDateUpdate = event => {
    this.setState({ outboundDate: event.target.value });
  };

  sendSearch = event => {
    event.preventDefault();
    const { origin, destination, outboundDate } = this.state;
    this.props.askSearch(origin, destination, outboundDate);
  };

  townSelection = selectedTownInfo => {
    const { name, geohash, inputId } = selectedTownInfo;
    if (inputId === "townFrom") {
      this.setState({
        origin: {
          name,
          geohash
        }
      });
    } else if (inputId === "townTo") {
      this.setState({
        destination: {
          name,
          geohash
        }
      });
    } else {
      console.error(
        "Autocomplete init error. Check if 'inputId' is presnet in tag."
      );
    }
  };

  render() {
    const { defaultValue, searchDisable } = this.props;
    const { origin, destination, outboundDate } = this.state;
    return (
      <div>
        <Card>
          <form action="#" onSubmit={this.sendSearch} autoComplete="off">
            <CardContent>
              <Grid container spacing={24} className="travel-select__form-grid">
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="townFrom"
                    required={true}
                    value={defaultValue ? defaultValue.townFrom : origin.name}
                    onChange={this.handleOriginUpdate}
                    inputProps={defaultValue ? { readOnly: "readonly" } : {}}
                    label={<Translate content="travel.search.selection.from" />}
                  />
                  {defaultValue ? null : (
                    <Autocomplete
                      partialText={origin.name}
                      onSelection={this.townSelection}
                      inputId="townFrom"
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="townTo"
                    required={true}
                    value={
                      defaultValue ? defaultValue.townTo : destination.name
                    }
                    onChange={this.handleDestinationUpdate}
                    inputProps={defaultValue ? { readOnly: "readonly" } : {}}
                    label={<Translate content="travel.search.selection.to" />}
                  />
                  {defaultValue ? null : (
                    <Autocomplete
                      partialText={destination.name}
                      onSelection={this.townSelection}
                      inputId="townTo"
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    required={true}
                    label={<Translate content="travel.search.selection.when" />}
                    type="date"
                    value={defaultValue ? defaultValue.date : outboundDate}
                    onChange={this.handleOutboundDateUpdate}
                    inputProps={defaultValue ? { readOnly: "readonly" } : {}}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className="travel-select__card-action">
              <Button
                variant="contained"
                size="large"
                color="secondary"
                type="submit"
                disabled={searchDisable}
              >
                <Translate content="travel.search.selection.search_button" />
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

export const TravelSelectionDefaultValuePropTypes = PropTypes.shape({
  townFrom: PropTypes.string.isRequired,
  townFromGeohash: PropTypes.string.isRequired,
  townTo: PropTypes.string.isRequired,
  townToGeohash: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
});

TravelSelection.propTypes = PropTypes.shape({
  askSearch: PropTypes.func.isRequired,
  defaultValue: TravelSelectionDefaultValuePropTypes,
  searchDisable: PropTypes.bool
}).isRequired;

export default TravelSelection;
