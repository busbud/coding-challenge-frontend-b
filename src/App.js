import React from 'react';
import moment from 'moment';
import { Container, Col } from 'reactstrap';
import { I18n } from 'react-i18next';
import { translate } from 'react-i18next';

import LangSelect from './components/langSelect';
import SearchResults from './components/searchResults';
import SearchForm from './components/searchForm';
import DayNav from './components/dayNav';

class App extends React.Component {
  render () {
    return (
      <Container fluid className="app">
        <SearchForm {...this.props} />
        <SearchResults {...this.props} />
        <DayNav {...this.props} />
        <footer className="app-footer">
          <LangSelect {...this.props} />
        </footer>
      </Container>
    );
  }

  _updateLang (lang) {
    lang = lang.split('-')[0];
    let { i18n } = this.props;
    if (i18n.language !== lang) {
      this.props.i18n.changeLanguage(lang);
    }
  }

  componentDidMount () {
    if (this.props.match.params.lang) {
      this._updateLang(this.props.match.params.lang);
    }
  }

  componentWillReceiveProps (props) {
    if (props.match.params.lang) {
      this._updateLang(props.match.params.lang);
    }
  }
}

export default translate('translations')(App);
