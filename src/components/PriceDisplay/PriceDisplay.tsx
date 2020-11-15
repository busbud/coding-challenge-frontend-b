import React from "react";
import { TScheduleDepartureRequest } from "../../types";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

type TPriceDisplay = {
  price: number;
  request: TScheduleDepartureRequest;
};

const CENTS_TO_DOLLARS = 100;
export const PriceDisplay = (
  props: TPriceDisplay
): React.ReactElement<"div"> => {
  const { price, request } = props;

  const { i18n } = useTranslation();

  // NOTE: The price is stored in cents,
  const [dollars] = new Intl.NumberFormat(i18n.language, {
    currency: request.currency,
    style: "currency",
  })
    .format(price / CENTS_TO_DOLLARS)
    .split(".");

  return (
    <Typography color="secondary" variant="h2">
      {dollars}
    </Typography>
  );
};
