import React from "react";
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

const TravelSelection = () => (
  <div>
    <Card>
      <CardContent>
        <form noValidate>
          <Grid container spacing={24} className="travel-select__form-grid">
            <Grid item xs={12} sm={6}>
              <TextField
                id="townFrom"
                label={<Translate content="travel.search.selection.from" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="townTo"
                label={<Translate content="travel.search.selection.to" />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                label={<Translate content="travel.search.selection.when" />}
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions className="travel-select__card-action">
        <Button variant="contained" size="large" color="secondary">
          <Translate content="travel.search.selection.search_button" />
        </Button>
      </CardActions>
    </Card>
  </div>
);

export default TravelSelection;
