import * as Constants from '../constants';

describe('services | api | constants', () => {
  it('should be defined', () => {
    // then
    expect(Constants).toBeDefined();
  });

  it('should match snapshot', () => {
    // then
    expect(Constants).toMatchSnapshot();
  });
});
