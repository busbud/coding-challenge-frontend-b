export type DatePickerProps = {
    date?: string;
    onDateChange: (date: string) => void;
};

export type DateType = moment.Moment;
