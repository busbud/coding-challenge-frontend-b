import React from "react";
import "./Form.css";
import { useTranslation } from "react-i18next";
// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ handleSubmit, startDate, handleChange }) => {
  const { t } = useTranslation();

  return (
    <div className='form-wrapper'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-items'>
          <div className='input'>
            <label className='label'>{t("Leaving From")}: </label>
            <select className='dropdown'>
              <option>New York</option>
            </select>
          </div>
          <div className='input'>
            <label className='label'>{t("Arriving At")}: </label>
            <select className='dropdown'>
              <option>Montreal</option>
            </select>
          </div>
          <div className='date-picker'>
            <label className='label'>Date: </label>
            <DatePicker
              className='calendar'
              selected={startDate}
              onChange={handleChange}
            />
          </div>
          <input className='submit' type='submit' value={t("Submit")} />
        </div>
      </form>
    </div>
  );
};

export default Form;
