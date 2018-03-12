import styles from '../styles';

describe('component | Logo | styles', () => {
  it('should be defined', () => {
    // then
    expect(styles).toBeDefined();
  });

  it('should match snapshot', () => {
    // then
    expect(styles).toMatchSnapshot();
  });
});
