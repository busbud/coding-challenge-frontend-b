import React, {Component} from 'react';

import Header from './components/header';
import Search from './components/search';

export class Home extends Component {
  render() {
    return (
      <div className="nymo">
        <Header/>
        <main>
          <div className="wrapper">
            <p className="nymo-intro">
              It will be hot this summer in Montreal with the Osheaga festival! Your challenge is to build a microsite
              that allows a traveler from NYC to find one-way departure schedules for the festivals opening weekend.
              That is why we are glad to present you the <b>NyMo</b> service, which will provide you all kinds of bus
              tickets for this awesome event!
            </p>
            <Search/>
          </div>
        </main>
      </div>
    );
  }
}
