
import {toResults} from '../api';
import {intialSearch, departures} from '../fixtures/data';

test('should format search results correctly', async () => {

  const data = toResults(intialSearch, {language: 'en'});

  expect(data.results.length).toEqual(2);
  expect(data.complete).toEqual(false);
  expect(data.results[0]).toEqual(departures[0]);
  expect(data.results[1]).toEqual(departures[1]);

});
