import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import geohashData from "../data/geohash.json";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    cardsContainer: {
      padding: theme.spacing(1),
      flex: 1,
      flexDirection: "column",
    },
    cardRoot: {
      maxWidth: 600,
      margin: "1vmin",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

// TODO map the data
type Data = {
  locations?: Location[];
  complete: boolean;
  ttl: number;
};

type Location = {
  name: string;
  id: number;
  city_id: string;
  address: [];
  type: string;
  lat: number;
  lon: number;
  geohash: string;
};

const requestHeaders = {
  Accept: process.env.BUSBUD_ACCEPT_HEADER ?? "",
  "X-Busbud-Token": process.env.BUSBUD_API_TOKEN ?? "",
};

// TODO put these in corresponding handlers
const origin = geohashData.Québec; // where do you get geohash values?
const destination = geohashData.Montreal;

const SearchContainer = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2021-08-02T21:00:00")
  );

  const [intervalMs, setIntervalMs] = React.useState(1000);
  const [outBoundDate, setoutBoundDate] = React.useState<string>("2021-08-02");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    let iso = date?.toISOString() ?? "";
    iso = iso.substring(0, iso.indexOf("T"));
    console.log("setting date to:", iso);
    setoutBoundDate(iso);
  };

  const { isLoading, error, data, isFetching } = useQuery<Data, Error>(
    ["repoData", outBoundDate],
    () =>
      fetch(
        `https://napi.busbud.com/x-departures/${origin}/${destination}/${outBoundDate}`,
        {
          method: "get",
          headers: requestHeaders,
        }
      ).then((res) => res.json()),
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    }
  );

  let message = "";

  if (isLoading) message = "Loading...";

  if (error) message = "An error has occurred: " + error.message;

  const classes = useStyles();

  const handleChange = () => {};

  // const pureLocs = data?.locations?.map((loc: Loc) => {
  //   return loc.name || "";
  // });

  useEffect(() => {
    if (data?.ttl && !data.complete) {
      console.log("setting interval to:", data.ttl);
      setIntervalMs(data.ttl);
    } else {
      setIntervalMs(30000);
    }
  }, [data]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography component="div" style={{ height: "5vmin" }}>
          {isLoading || error ? message : isFetching ? "Updating..." : null}
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Destination pickers are locked to allow limited geohash values
                only.
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="name-native-disabled">Origin</InputLabel>
                <NativeSelect
                  value={"Québec"}
                  onChange={handleChange}
                  inputProps={{
                    name: "Origin",
                    id: "name-native-disabled",
                  }}
                >
                  <optgroup label="Origin">
                    <option value="Québec">Québec</option>
                  </optgroup>
                </NativeSelect>
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="name-native-disabled">
                  Destination
                </InputLabel>
                <NativeSelect
                  value={"Montréal"}
                  onChange={handleChange}
                  inputProps={{
                    name: "Destination",
                    id: "name-native-disabled",
                  }}
                >
                  <optgroup label="Destination">
                    <option value="Montréal">Montréal</option>
                  </optgroup>
                </NativeSelect>
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Departure Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            {/* // TODO display departure cards here */}
            <div className={classes.cardsContainer}>
              {data?.locations?.map((loc: Location) => {
                // console.log(loc);
                return (
                  <Card className={classes.cardRoot} key={loc.id}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          logo
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={loc.name}
                      subheader={loc.type}
                    />
                    {/* <CardMedia
                    className={classes.media}
                    image="/assets/2019bg-6.jpeg"
                    title="Paella dish"
                  /> */}
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {loc.address.map((addr, idx) => (
                          <span style={{ whiteSpace: "pre-wrap" }} key={idx}>
                            {addr}
                          </span>
                        ))}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Some text here</Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
            </div>
          </Grid>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </Container>
    </React.Fragment>
  );
};

export default SearchContainer;
