import styles from '../styles';

describe('containers | SearchResults | styles', () => {
  it('should be defined', () => {
    // then
    expect(styles).toBeDefined();
  });

  it('should match snapshot', () => {
    // then
    expect(styles).toMatchSnapshot();
  });
});
