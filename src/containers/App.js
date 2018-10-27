import { connect } from 'react-redux';
import { App } from 'components';
import { initializeSearchSchedules } from 'store/schedules';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  search: initializeSearchSchedules
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
