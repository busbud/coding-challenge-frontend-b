import React, { PropTypes } from 'react';
import './LangToggler.scss';

class LangToggler extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick(e) { console.log('this',this);
    e.preventDefault();

    //define the next lang based on the current one
    let nextLang = this.props.lang == 'en' ? 'fr' : 'en';

    this.props.onClick(nextLang);
  }
  render() {

    return (
        <div className="lang-toggler">
            <a  className="lang-toggler__link"
                onClick={this.onClick.bind(this)}>
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