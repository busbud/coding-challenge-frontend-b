import React from 'react';
import PropTypes, { string } from 'prop-types';

import styles from './Dropdown.module.scss';

const Dropdown = (props) => {
  const { selectHandler, options, type, dropdownLabel } = props;

  const selectClass = [styles.select];

  switch (type) {
    case 'navbar':
      selectClass.push(styles.navbar);
      break;
    case 'sort':
      selectClass.push(styles.sort);
      break;
    default:
      break;
  }

  if (!options?.length) return null;

  const selectOptions = options.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  return (
    <form onChange={selectHandler}>
      {dropdownLabel && (
        <label for="dropdown" className={styles.label}>
          {dropdownLabel}
        </label>
      )}
      <select
        name="dropdown"
        className={selectClass.join(' ')}
        defaultValue={options[0]}
      >
        {selectOptions}
      </select>
    </form>
  );
};

Dropdown.propTypes = {
  selectHandler: PropTypes.func,
  options: PropTypes.arrayOf(string),
  type: PropTypes.string,
  dropdownLabel: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default Dropdown;
