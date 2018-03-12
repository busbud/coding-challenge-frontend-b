import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import { makeSelectError } from './selectors';
import styles from './styles';
import component from './component';

export const mapStateToProps = createStructuredSelector({
  hasError: makeSelectError(),
});

export const enhance = compose(withStyles(styles), connect(mapStateToProps, null));

export default enhance(component);
