// @flow
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FormWrapper } from './styledComponent';
import config from '../../config';

type Props = {
    onChange?: Function,
    onSubmit: Function,
}

const defaultFormData = {
  from: { ...config.originCity },
  to: { ...config.destinationCity },
  date: config.defaultSearchDate,
  adult: 1,
};

export function mapDates(reference, daysBefore, daysAfter, format = 'YYYY-MM-DD') {
  const days = [0, 1].map((item) => {
    const dates = [...Array(item === 0 ? daysBefore : daysAfter)].map((u, index) => {
      const date = item === 0 ? moment(reference).subtract(index, 'days') : moment(reference).add(index + 1, 'days');
      return date.format(format);
    });
    return item === 0 ? dates.reverse() : dates;
  });
  return days[0].concat(days[1]);
}

function Form(props: Props) {
  const { onChange, onSubmit } = props;
  const [formData, setFormData] = useState({ ...defaultFormData });
  const { t } = useTranslation();

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: JSON.parse(value),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const dates = mapDates(defaultFormData.date, 5, 10);

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <div>
        <p>{t('form_departure')}</p>
        <select id="from" onChange={handleChange} defaultValue={defaultFormData.from}>
          <option value={JSON.stringify(defaultFormData.from)}>
            {defaultFormData.from.name}
          </option>
          <option value={JSON.stringify(defaultFormData.from)}>
            {defaultFormData.to.name}
          </option>
        </select>
      </div>
      <div>
        <p>{t('form_arrival')}</p>
        <select id="to" onChange={handleChange} defaultValue={defaultFormData.to}>
          <option value={JSON.stringify(defaultFormData.to)}>
            {defaultFormData.to.name}
          </option>
          <option value={JSON.stringify(defaultFormData.from)}>
            {defaultFormData.from.name}
          </option>
        </select>
      </div>
      <div>
        <p>{t('form_date')}</p>
        <select id="date" onChange={handleChange}>
          {dates.map((date) => (
            <option
              key={date}
              value={JSON.stringify(date)}
              selected={date === formData.date ? 'selected' : ''}
            >
              {date}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>{t('form_adult')}</p>
        <select id="adult" onChange={handleChange} defaultValue={defaultFormData.adult}>
          {[...Array(5)].map((adult, index) => (
            <option
              key={`adult${index + 1}`}
              value={index + 1}
            >
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value={t('form_submit')} />
    </FormWrapper>
  );
}

Form.defaultProps = {
  onChange: () => {},
};

export default Form;
