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
    origin: "dr5reg",
    destination: "f25dvk",
    outboundDate: "2018-08-02"
  };

  handleDate = event => {
    const value = event.target.value;
    // TODO check date format / undefined / string ...
    console.log(value);
    this.setState({ outbound_date: value });
  };

  sendSearch = () => {
    // TODO check state of form
    const { origin, destination, outboundDate } = this.state;
    this.props.askSearch(origin, destination, outboundDate);
  };

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <form noValidate>
              <Grid container spacing={24} className="travel-select__form-grid">
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="townFrom"
                    defaultValue="New-York City"
                    label={<Translate content="travel.search.selection.from" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="townTo"
                    defaultValue="Montréal"
                    label={<Translate content="travel.search.selection.to" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label={<Translate content="travel.search.selection.when" />}
                    type="date"
                    defaultValue="2018-08-02"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleDate}
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions className="travel-select__card-action">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={this.sendSearch}
            >
              <Translate content="travel.search.selection.search_button" />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

TravelSelection.propTypes = {
  askSearch: PropTypes.func.isRequired
};

export default TravelSelection;
