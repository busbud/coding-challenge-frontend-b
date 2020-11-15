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
  useStyles,
} from "./ResultsCard.styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { PriceDisplay } from "../PriceDisplay";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

type TResultsCard = {
  cities: Record<string, TCityForSelection>;
  departure: TDeparture;
  request: TScheduleDepartureRequest;
};

export const ResultsCard = (
  props: TResultsCard
): React.ReactElement<typeof Card> => {
  const { cities, departure, request } = props;
  const classes = useStyles();
  const cardActionClasses = useCardActionStyles();
  const cardContentClases = useCardContentStyles();
  const { i18n, t } = useTranslation();

  const locales = {
    en: enUS,
    fr: fr,
  };

  const departureDate = new Date(departure.departure_time);
  const arrivalDate = new Date(departure.arrival_time);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent classes={cardContentClases}>
        <Typography gutterBottom className={classes.title} color="secondary">
          {format(departureDate, "MMM co, yyyy", {
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
        <Button color="secondary" size="small" variant="outlined">
          {t("details")}
        </Button>
        <Button color="secondary" size="small" variant="outlined">
          {t("purchase")}
        </Button>
      </CardActions>
    </Card>
  );
};
