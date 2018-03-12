import { withStyles } from 'material-ui/styles';
import styles from './styles';
import component from './component';

export const enhance = withStyles(styles);

export default enhance(component);
