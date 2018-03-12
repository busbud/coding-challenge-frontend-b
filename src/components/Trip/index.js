import { compose, withStateHandlers } from 'recompose';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import component from './component';

export const enhance = compose(
  withStateHandlers(
    ({ initialIsExpanded = false }) => ({
      isExpanded: initialIsExpanded,
    }),
    {
      toggleExpansion: ({ isExpanded }) => value => ({
        isExpanded: !isExpanded,
      }),
    },
  ),
  withStyles(styles),
);

export default enhance(component);
