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
// Inner imports
import "./TravelSelection.css";

/*
  URL exemple to get cities autocompletion
  https://napi.busbud.com/search?q=Mon&limit=5&lang=fr&locale=fr
*/
class TravelSelection extends Component {
  state = {
    origin: {
      name: "",
      sha: ""
    },
    destination: {
      name: "",
      sha: ""
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
          sha: defaultValue.townFromSHA
        },
        destination: {
          name: defaultValue.townTo,
          sha: defaultValue.townToSHA
        },
        outboundDate: defaultValue.date
      };
    }
  }

  getTownObjFromTownName(townName) {
    let townObj;

    if (townName === "Montréal") {
      townObj = {
        name: "Montréal",
        sha: "f25dvk"
      };
    } else if (townName === "New-York City") {
      townObj = {
        name: "New-York City",
        sha: "dr5reg"
      };
    } else {
      townObj = {
        name: townName,
        sha: ""
      };
    }

    return townObj;
  }

  handleDate = event => {
    const value = event.target.value;
    // TODO check date format / undefined / string ...
    console.log(value);
    this.setState({ outboundDate: value });
  };

  handleOriginUpdate = event => {
    console.log(event.target.value);
    const origin = this.getTownObjFromTownName(event.target.value);
    console.log(origin);
    this.setState({ origin });
  };

  handleDestinationUpdate = event => {
    console.log(event.target.value);
    const destination = this.getTownObjFromTownName(event.target.value);
    this.setState({ destination });
  };

  handleOutboundDateUpdate = event => {
    console.log(event.target.value);
    this.setState({ outboundDate: event.target.value });
  };

  sendSearch = event => {
    event.preventDefault();
    // TODO check state of form
    const { origin, destination, outboundDate } = this.state;
    this.props.askSearch(origin, destination, outboundDate);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <div>
        <Card>
          <form action="#" onSubmit={this.sendSearch}>
            <CardContent>
              <Grid container spacing={24} className="travel-select__form-grid">
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="townFrom"
                    required={true}
                    value={
                      defaultValue
                        ? defaultValue.townFrom
                        : this.state.origin.name
                    }
                    onChange={this.handleOriginUpdate}
                    inputProps={defaultValue ? { readOnly: "readonly" } : {}}
                    label={<Translate content="travel.search.selection.from" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="townTo"
                    required={true}
                    value={
                      defaultValue
                        ? defaultValue.townTo
                        : this.state.destination.name
                    }
                    onChange={this.handleDestinationUpdate}
                    inputProps={defaultValue ? { readOnly: "readonly" } : {}}
                    label={<Translate content="travel.search.selection.to" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    required={true}
                    label={<Translate content="travel.search.selection.when" />}
                    type="date"
                    value={
                      defaultValue ? defaultValue.date : this.state.outboundDate
                    }
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
  townFromSHA: PropTypes.string.isRequired,
  townTo: PropTypes.string.isRequired,
  townToSHA: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
});

TravelSelection.propTypes = {
  askSearch: PropTypes.func.isRequired,
  defaultValue: TravelSelectionDefaultValuePropTypes
};

export default TravelSelection;
