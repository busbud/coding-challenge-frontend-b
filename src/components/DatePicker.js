import React from 'react';
import { useTranslation } from 'react-i18next';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './DatePicker.css'
import { useDataProvider } from '../contexts/SearchContext';

const WEEKDAYS_SHORT = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    rf: 'di_lu_ma_me_je_ve_sa'.split('_'),
    en: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
};
const MONTHS = {
    ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    en: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    fr: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_')
};
const FIRST_DAY_OF_WEEK = {
    ru: 1,
};
export const DatePicker = () => {
    const dataProv = useDataProvider();
    const { t, i18n } = useTranslation();
    return <div><DayPickerInput name="date"
        locale={i18n.language}
        months={MONTHS[i18n.language]}
        weekdaysShort={WEEKDAYS_SHORT[i18n.language]}
        firstDayOfWeek={FIRST_DAY_OF_WEEK[i18n.language]}
        onDayChange={
            day => dataProv.dispatch({
                type: "SET_SEARCH_PARAM",
                name: "date",
                value: day.toISOString().slice(0, 10)
            })
        } className="Search__input" placeholder={t("Departure date")} format="YYYY-MM-DD" />
    </div>

}
