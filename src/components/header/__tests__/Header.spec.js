import React from 'react';
import renderer from 'react-test-renderer';
import {header as Header} from '../Header';

const props = {
    i18n: {
        changeLanguage: () => {}
    }
}

describe('Header', () => {
    it('renders correctly', () => {
        const tree = renderer
          .create(<Header {...props} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
})
