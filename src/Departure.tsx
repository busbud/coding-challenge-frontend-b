import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/system/Box";

interface Props {
  departureTime: string;
  arrivalTime: string;
  location: string;
  price: number;
}

export default function Departure(props: Props) {
  const { t } = useTranslation();

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
          <Divider orientation="vertical" flexItem />
          <Grid item flexGrow={1}>
            <Box sx={{ fontSize: "2rem", fontWeight: 600 }}>
              {t("Price: {{price}}", { price: props.price })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
