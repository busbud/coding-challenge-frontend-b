import {departures} from '../fixtures/data';

export default class Search {

  intialSearch() {
    return new Promise((resolve) => {
      resolve(departures);
    });
  }

  async pollSearch() {

  }

}
