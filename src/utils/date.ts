import moment from "moment";
import { DATE_FORMAT_LIST } from "@src/components/datePicker/DatePicker.constants";

export const getDefaultDate = (): string => moment().format(DATE_FORMAT_LIST);
