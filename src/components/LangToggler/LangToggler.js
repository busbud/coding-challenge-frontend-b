import React, { PropTypes } from 'react';
import './LangToggler.scss';

class LangToggler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //define the next lang based on the current one
    let nextLang = this.props.lang == 'en' ? 'fr' : 'en';

    return (
        <div className="lang-toggler">
            <a  className="lang-toggler__link"
                onClick={(e) => {
                    e.preventDefault();
                    this.props.onClick(nextLang);
                }}>
                {this.props.lang}
            </a>
      </div>
    );
  }
}

LangToggler.propTypes = {
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default LangToggler;