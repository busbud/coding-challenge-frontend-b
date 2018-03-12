import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import { makeSelectStructuredDepartures } from '../App/selectors';
import component from './component';

export const mapStateToProps = createStructuredSelector({
  departures: makeSelectStructuredDepartures(),
});

export const enhance = compose(withStyles(styles), connect(mapStateToProps, null));

export default enhance(component);
