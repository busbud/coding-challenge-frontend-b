import React from "react";
// Third party libraries
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// Inner imports
import "./TravelList.css";

const TravelList = () => (
  <div className="travel-list">
    <div className="travel-list__container-center">
      <Paper className="travel-list__paper">
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{"Bla blabla"}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>{"Bla blabla"}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{"Bla blabla"}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  </div>
);

export default TravelList;
