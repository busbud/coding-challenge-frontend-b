import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { injectIntl } from 'react-intl';
import styles from './styles';
import component from './component';

export const enhance = compose(injectIntl, withStyles(styles));

export default enhance(component);
