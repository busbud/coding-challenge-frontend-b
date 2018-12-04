import React from 'react';
import {Search} from '../api';
import SearchList from './SearchList';

export default class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.search = new Search('dr5reg', 'f25dvk', '2019-08-02', {adult: 1});

    this.state = {
      results: [],
      loading: false,
      complete: false
    };
  }

  async componentDidMount() {
    const result = await this.search.intialSearch();

    this.setState(result);

    this.interval = setInterval(async () => {
      if (!this.state.complete) {
        const index = this.state.results.length;

        const pollResult = await this.search.pollSearch(index);

        this.setState(pollResult);
      }
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    const {results} = this.state;

    return <div>Hello<SearchList results={results}/></div>;
  }
}
