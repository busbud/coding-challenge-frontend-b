import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import component from './component';

export const mapDispatchToProps = (dispatch, { handleClose, currentLocale }) => {
  return {
    onChangeLocale(locale) {
      dispatch(changeLocale(locale));
      handleClose();
    },
  };
};

export const mapStateToProps = createStructuredSelector({
  currentLocale: makeSelectLocale(),
});

export const enhance = compose(
  withStateHandlers(
    ({ initialAnchorEl = null }) => ({
      anchorEl: initialAnchorEl,
    }),
    {
      handleMenu: ({ anchorEl }) => ({ target }) => ({
        anchorEl: target,
      }),
      handleClose: (_, { initialAnchorEl = null }) => () => ({
        anchorEl: initialAnchorEl,
      }),
    },
  ),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(component);
