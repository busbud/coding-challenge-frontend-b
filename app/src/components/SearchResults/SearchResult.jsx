import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import IconMyLocation from "@material-ui/icons/MyLocation";
import IconLocationOn from "@material-ui/icons/LocationOn";
import IconDirectionsBus from "@material-ui/icons/DirectionsBus";

import searchResultStyle from "../../assets/jss/components/searchResultStyle";

function convertDuration(duration) {
  var hours = Math.floor(duration / 60);
  var minutes = duration % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}

function SearchResult(props) {
  const {
    classes,
    intl,
    duration,
    originCity,
    departTime,
    destinationCity,
    originDepot,
    destinationDepot,
    arriveTime,
    price,
    operatorLogo,
    operatorName,
  } = props;

  const buttonSelect = intl.formatMessage({ id: "select" });

  return (
    <Card className={classes.card}>
      <CardContent>
        <div>
          <div className={classes.logo}>
            <img
              src={operatorLogo}
              alt={operatorName}
              title={operatorName}
              width="130"
              height="25"
            />
          </div>
          <div className={classes.price}>${price}</div>
        </div>
        <div className={classes.result}>
          <div>
            <p>
              <span className={classes.icon + " " + classes.originHighlight}>
                <IconLocationOn />
              </span>
              <strong className={classes.time + " " + classes.originHighlight}>
                {departTime.substring(11, 20)}
              </strong>
              <span className={classes.location + " " + classes.origin}>
                <span>
                  {originCity} - {originDepot}
                </span>
              </span>
            </p>
            <p className={classes.destination}>
              <span className={classes.icon}>
                <IconMyLocation />
              </span>
              <strong className={classes.time}>
                {arriveTime.substring(11, 20)}
              </strong>
              <span className={classes.location}>
                <span>
                  {destinationCity} - {destinationDepot}
                </span>
              </span>
            </p>
          </div>
          <div className={classes.duration}>
            <IconDirectionsBus />
            {convertDuration(duration)}
          </div>
          <div className={classes.button}>
            <Button color="secondary" variant="contained">
              {buttonSelect}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

SearchResult.propTypes = {
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  logoTitle: PropTypes.string,
  price: PropTypes.string,
  departTime: PropTypes.string,
  originCity: PropTypes.string,
  originDepot: PropTypes.string,
  arriveTime: PropTypes.string,
  destinationCity: PropTypes.string,
  destinationDepot: PropTypes.string,
  duration: PropTypes.string,
  operatorLogo: PropTypes.string,
  operatorName: PropTypes.string,
};

export default injectIntl(withStyles(searchResultStyle)(SearchResult));
