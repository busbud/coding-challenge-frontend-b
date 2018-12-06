import React from 'react';
import {Search} from '../api';
import SearchList from './SearchList';
import SearchHeader from './SearchHeader';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './searchContainer.less';

const definedDate = '2019-08-02';

class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.search = new Search('dr5reg', 'f25dvk', definedDate, {adult: 1});

    this.state = {
      results: [],
      loading: false,
      complete: false
    };
  }

  componentDidMount() {
    this.initalLoading();
  }

  initalLoading = async (lang) => {
    clearInterval(this.interval);

    const language = lang || this.props.i18n.language;

    this.setState({loading: true});
    const result = await this.search.intialSearch({lang: language});

    this.setState({...result, loading: false});

    let pending = false;

    this.interval = setInterval(async () => {
      if (!this.state.complete && !pending) {
        pending = true;
        const index = this.state.results.length;

        const pollSearch = await this.search.pollSearch({index, lang: language});
        const results = [...this.state.results, ...pollSearch.results];
        const complete = pollSearch.complete;

        pending = false;
        this.setState({results, complete});
      } else if (this.state.complete) {
        clearInterval(this.interval);
      }
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeLanguage = (event) => {
    const lng = event.currentTarget.value;

    this.props.i18n.changeLanguage(lng);
    this.initalLoading(lng);
  }

  render() {
    const {results, loading} = this.state;
    const {t, i18n} = this.props;
    const date = moment(definedDate).locale(i18n.language).format('dddd, MMMM Do YYYY');

    return (
      <div className={classes.container}>
        <SearchHeader changeLanguage={this.changeLanguage} date={date}/>
        {loading ? t('loading') : <SearchList results={results}/>}
      </div>
    );
  }
}

SearchContainer.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default (translate('translations')(SearchContainer));
