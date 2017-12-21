import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LangSelect extends React.Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    this.props.changeLanguage(e.target.value);
  }

  render () {
    let lang = this.props.match.params.lang;
    return (
      <select onChange={this.handleChange} value={lang}>
        <option value="en-ca">English (Canada)</option>
        <option value="fr-ca">Français (Canada)</option>
      </select>
    );
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changeLanguage: (lang) => push(`/${lang}`)
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(LangSelect);
