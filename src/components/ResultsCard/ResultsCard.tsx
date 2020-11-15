import { enUS, fr } from "date-fns/locale";
import { format, formatDistance } from "date-fns";
import {
  TCityForSelection,
  TDeparture,
  TScheduleDepartureRequest,
} from "../../types";
import {
  useCardActionStyles,
  useCardContentStyles,
  useSnackbarStyles,
  useStyles,
} from "./ResultsCard.styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { PriceDisplay } from "../PriceDisplay";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

type TResultsCard = {
  cities: Record<string, TCityForSelection>;
  departure: TDeparture;
  request: TScheduleDepartureRequest;
};

const HIDE_TIMEOUT = 6000;
// The `Snackbar` element should be abstracted out to its
// own component, this would get us under the 80 line limit
// but for the sake of expediency, I'm bein' lazy!
// TRB 11/15/2020
// eslint-disable-next-line max-lines-per-function
export const ResultsCard = (
  props: TResultsCard
): React.ReactElement<typeof Card> => {
  const { cities, departure, request } = props;
  const classes = useStyles();
  const cardActionClasses = useCardActionStyles();
  const cardContentClases = useCardContentStyles();
  const snackbarClasses = useSnackbarStyles();
  const { i18n, t } = useTranslation();
  const [isMessageShown, setMessageShownState] = React.useState(false);

  const locales = {
    en: enUS,
    fr: fr,
  };

  const handleClose = React.useCallback(() => {
    setTimeout(() => {
      setMessageShownState(false);
    }, HIDE_TIMEOUT);
  }, [setMessageShownState]);

  const handleAddToCart = React.useCallback(() => {
    setMessageShownState(true);
  }, [setMessageShownState]);

  // NOTE: Details button disabled due to time constraints
  // but ultimately the intention was to show all the details
  // about the selected  route (terms, amenities, etc)
  // TRB 11/15/2020
  /*
      <Button color="secondary" size="small" variant="outlined">
        {t("details")}
      </Button>
      */
  const buttons = (
    <Button
      color="secondary"
      size="small"
      variant="outlined"
      onClick={handleAddToCart}
    >
      {t("purchase")}
    </Button>
  );
  const departureDate = new Date(departure.departure_time);
  const arrivalDate = new Date(departure.arrival_time);
  return (
    <Card className={classes.root} variant="outlined">
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={HIDE_TIMEOUT}
        ContentProps={{ classes: snackbarClasses }}
        message={t("finished")}
        open={isMessageShown}
        onClose={handleClose}
      />
      <CardContent classes={cardContentClases}>
        <Typography gutterBottom className={classes.title} color="secondary">
          {format(departureDate, "MMM do, yyyy", {
            locale: locales[i18n.language],
          })}
        </Typography>
        <Typography className={classes.date} color="secondary" variant="body2">
          {t("departingFrom", { city: cities[request.origin].name })}
          <br />
          <strong>
            {format(departureDate, "iii PPpp", {
              locale: locales[i18n.language],
            })}
          </strong>
        </Typography>
        <Typography className={classes.date} color="secondary" variant="body2">
          {t("arrivingAt", { city: cities[request.destination].name })}
          <br />
          <strong>
            {format(arrivalDate, "iii PPpp", {
              locale: locales[i18n.language],
            })}
          </strong>
        </Typography>
        <Typography className={classes.seats} color="secondary" variant="body2">
          {t("travelTime", {
            duration: formatDistance(departureDate, arrivalDate, {
              locale: locales[i18n.language],
            }),
          })}
        </Typography>
        <PriceDisplay price={departure.prices.total} request={request} />
        <Typography className={classes.seats} color="secondary" variant="body2">
          {t("availableSeats", { seats: departure.available_seats })}
        </Typography>
      </CardContent>
      <CardActions disableSpacing classes={cardActionClasses}>
        {buttons}
      </CardActions>
    </Card>
  );
};
