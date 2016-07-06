import React, { PropTypes } from 'react';
import './CurrencyToggler.scss';

class CurrencyToggler extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick(e) {
    e.preventDefault();

    //define the next currency based on the current one
    let nextCurrency = this.props.currency == 'CAD' ? 'USD' : 'CAD';

    this.props.onClick(nextCurrency);
  }
  render() {

    return (
        <div className="currency-toggler">
            <button className="header-action currency-toggler__link"
                role="button"
                onKeyDown={this.onClick.bind(this)}
                onClick={this.onClick.bind(this)}>
                {this.props.currency}
            </button>
      </div>
    );
  }
}

CurrencyToggler.propTypes = {
    currency: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default CurrencyToggler;