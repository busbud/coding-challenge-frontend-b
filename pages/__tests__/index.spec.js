import * as React from 'react'
import { shallow } from 'enzyme'
import HomePage from '../index'

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', function () {
      const wrap = shallow(<HomePage/>);
      expect(wrap.find('div.title').text()).toBe('Test');
    })
  })  
})