import React from "react";
// Third party libraries
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// Inner imports
import "./TravelSelection.css";

const TravelSelection = () => (
  <div>
    <form noValidate>
      <Grid container spacing={24} className="form-grid">
        <Grid item xs={12} sm={6}>
          <TextField id="townFrom" label="From" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="townTo" label="To" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="date"
            label="When"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
    </form>
  </div>
);

export default TravelSelection;
