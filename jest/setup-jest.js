// mocking lodash
import lodash from 'lodash';

global._ = lodash;

jest.mock('lodash/map');

// to avoid triggering navigation in tests
delete window.location;
window.location = { reload: jest.fn() };
