import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import { enCA, frCA } from 'date-fns/esm/locale';

import "react-datepicker/dist/react-datepicker.css";

import "./DepartureDatePicker.scss";

registerLocale("en", enCA);
registerLocale("fr", frCA);

interface IDepartureDatePickerProps {
  date: Date;
  changeDate: ChangeDate;
}

type ChangeDate = (newDate: any) => void;

const beginingFestivalDate = new Date(2020, 9, 9);
const endFestivalDate = new Date(2020, 9, 11);

const DepartureDatePicker: React.FC<IDepartureDatePickerProps> = ({
  date,
  changeDate,
}) => {
  const [currentDate, setCurrentDate] = useState<any>(date);
  const { i18n } = useTranslation();

  return (
    <DatePicker
      selected={currentDate}
      minDate={beginingFestivalDate}
      maxDate={endFestivalDate}
      locale={i18n.language}
      onChange={(date) => {
        setCurrentDate(date);
        changeDate(date);
      }}
    />
  );
};

export default DepartureDatePicker;
