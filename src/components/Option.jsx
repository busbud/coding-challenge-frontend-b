import React from 'react';

export function Option(props) {
  switch (props.type) {
    case 'select':
      return (
        <select
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        >
          {props.options.map(option => (
            <option value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      );
    case 'radio':
      return (
        <ul>
          {props.options.map(option => (
            <li value={option.value}>
              <label className="o-checkbox">
                <input
                  type="radio"
                  value={option.value}
                  checked={option.value === props.value}
                  onChange={e => props.onChange(e.target.value)}
                />
                {option.name}
              </label>
            </li>
          ))}
        </ul>
      );
    default:
      return <div />;
  }
}

Option.propTypes = {
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func,
  type: React.PropTypes.oneOf(['select', 'radio']),
};

Option.defaultProps = {
  onChange: () => {},
  type: 'select',
};
