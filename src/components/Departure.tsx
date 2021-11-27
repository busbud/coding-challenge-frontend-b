import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/system/Box";
import Dinero, { Currency } from "dinero.js";

interface Props {
  departureTime: string;
  arrivalTime: string;
  location: string;
  price: number;
  currency?: Currency;
}

export default function Departure(props: Props) {
  const { t } = useTranslation();
  const price = Dinero({
    amount: props.price,
    currency: props.currency || "USD",
  });

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container>
          <Grid item flexGrow={3} textAlign="left">
            <div>
              {t("Departure time: {{date}}", {
                date: format(parseISO(props.departureTime), "PPpp"),
              })}
            </div>
            <div>
              {t("Arrival time: {{date}}", {
                date: format(parseISO(props.arrivalTime), "PPpp"),
              })}
            </div>
            <div>
              {t("Location: {{location}}", { location: props.location })}
            </div>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />
          <Grid item flexGrow={1} alignSelf="center">
            <Box sx={{ fontSize: "2rem", fontWeight: 600 }}>
              {t("Price: {{price}}", { price: price.toFormat() })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
