import { useTranslation } from "react-i18next";

interface Props {
  departureTime: string;
  arrivalTime: string;
  location: string;
  price: number;
}

export default function Departure() {
  const { t } = useTranslation();

  return (
    <div>
      <div>{t("Departure time: ")}</div>
      <div>{t("Arrival time: ")}</div>
      <div>{t("Location:")}</div>
      <div>{t("Price:")}</div>
    </div>
  );
}
