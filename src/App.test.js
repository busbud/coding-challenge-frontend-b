import React from 'react';
import App from './App';
import Header from './components/header.js';
import SearchList from './containers/searchList.js';
import { shallow } from '../setupTests';

test('renders without crashing', () => {
	const app = shallow(<App/>);
	expect(app.containsAnyMatchingElements([
    <div className="App">
      <Header />
      <SearchList />
    </div>
    ])
  ).toBeTruthy();
});
