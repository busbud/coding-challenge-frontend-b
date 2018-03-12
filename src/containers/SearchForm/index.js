import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns';
import { withStyles } from 'material-ui/styles';
import { makeSelectFetchingState, makeSelectOutboundDate } from '../App/selectors';
import { updateQuery, fetchDepartures } from '../App/actions';
import styles from './styles';
import component from './component';

export const mapDispatchToProps = (dispatch, props) => {
  return {
    onChange(date) {
      const outbound_date = format(new Date(date), 'YYYY-MM-DD');
      dispatch(updateQuery({ path: { outbound_date } }));
    },
    onSubmit(event) {
      if (event) event.preventDefault();
      dispatch(fetchDepartures());
    },
  };
};
export const mapStateToProps = createStructuredSelector({
  isFetching: makeSelectFetchingState(),
  outbound_date: makeSelectOutboundDate(),
});
export const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps));

export default enhance(component);
