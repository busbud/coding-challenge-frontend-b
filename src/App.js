import React from 'react';
import { Container, Col } from 'reactstrap';

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
}

export default App;
