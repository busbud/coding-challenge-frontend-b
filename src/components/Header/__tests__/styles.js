import styles from '../styles';

const theme = {
  spacing: {
    unit: 8,
  },
};

describe('component | Header | styles', () => {
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

    // then
    expect(css.toolbar.paddingTop).toBe(`${theme.spacing.unit}px`);
    expect(css.toolbar.paddingBottom).toBe(`${theme.spacing.unit}px`);
  });
});
