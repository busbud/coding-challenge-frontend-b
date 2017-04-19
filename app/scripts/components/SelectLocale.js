import React from 'react';

function SelectLocale({ handleChange }) {
  return (
    <div className="selectLocale-wrapper">
      <select className="selectLocale" onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}
SelectLocale.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
};

export default SelectLocale;
