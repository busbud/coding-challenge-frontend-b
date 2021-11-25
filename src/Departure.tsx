import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface Props {
  departureTime: string;
  arrivalTime: string;
  location: string;
  price: number;
}

export default function Departure(props: Props) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
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
        <div>{t("Location: {{location}}", { location: props.location })}</div>
        <div>{t("Price: {{price}}", { price: props.price })}</div>
      </CardContent>
    </Card>
  );
}
