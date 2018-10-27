import { connect } from 'react-redux';
import { Departures } from 'components';

const mapStateToProps = (state) => ({
  schedules: state.schedules
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Departures);
