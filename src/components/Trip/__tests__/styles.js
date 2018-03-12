import { createMuiTheme } from 'material-ui/styles';
import styles from '../styles';

const theme = createMuiTheme({});

describe('component | Trip | styles', () => {
  it('should be defined', () => {
    // given
    const css = styles(theme);

    // then
    expect(css).toBeDefined();
  });

  it('should match snapshot', () => {
    // given
    const css = styles(theme);

    // then
    expect(css).toMatchSnapshot();
  });

  it('should have proper rules according to provided theme', () => {
    // given
    const css = styles(theme);
    const transition = css.expand.transition;

    // then
    expect(transition).toBe(
      theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    );
  });
});
