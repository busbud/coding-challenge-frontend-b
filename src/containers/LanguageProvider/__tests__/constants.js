import * as Constants from '../constants';

describe('containers | LanguageProvider | constants', () => {
  it('should be defined', () => {
    // then
    expect(Constants).toBeDefined();
  });

  it('should match snapshot', () => {
    // then
    expect(Constants).toMatchSnapshot();
  });
});
