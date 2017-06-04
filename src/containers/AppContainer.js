import { connect } from 'react-redux';
import { fetchSchedule } from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  currLanguage: state.search.currLanguage,
  isFetching: state.search.isFetching,
  departures: state.search.departures,
  searchFailed: state.search.searchFailed
});

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(fetchSchedule());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
