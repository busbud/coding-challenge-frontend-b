import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './Layout';
import NotFound from './NotFound';
import SearchContainer from './search/SearchContainer';
import './App.scss';

class App extends Component {
  createLayout = (target) => {
      return (
          <Layout>
              {target}
          </Layout>
      );
  }

  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <Switch>
              <Route path='/' exact render={() => this.createLayout(<SearchContainer />)} />
              
              <Route render={() => this.createLayout(<NotFound />)} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
