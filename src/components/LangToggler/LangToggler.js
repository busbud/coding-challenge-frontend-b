import React, { PropTypes } from 'react';
import './LangToggler.scss';

class LangToggler extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick(e) {
    e.preventDefault();

    //define the next lang based on the current one
    let nextLang = this.props.lang == 'EN' ? 'FR' : 'EN';

    this.props.onClick(nextLang);
  }
  render() {

    return (
        <div className="lang-toggler">
            <button className="lang-toggler__link"
                role="button"
                onKeyDown={this.onClick.bind(this)}
                onClick={this.onClick.bind(this)}>
                {this.props.lang}
            </button>
      </div>
    );
  }
}

LangToggler.propTypes = {
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default LangToggler;