import PropTypes from "prop-types";

/**
 * NB This must be a class component and not a functional component
 */

class CustomDatePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          className="datepicker"
          type="text"
          value={this.props.value}
          onClick={this.props.onClick}
          readOnly
        />
        <style jsx>{`
          input {
            border-radius: 8px;
            font-size: 1rem;
            height: 48px;
            padding: 10px;
            width: 100%;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

CustomDatePicker.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default CustomDatePicker;
