import { connect } from 'react-redux';
import { fetchSchedule } from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  isFetching: state.search.isFetching,
  schedule: state.search.schedule
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
