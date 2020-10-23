import { shallow } from 'enzyme';
import BudButton from './BudButton';

describe('BudButton page', () => {
  let wrapper = shallow(<BudButton>Search</BudButton>);

  beforeEach(() => {
    wrapper = shallow(<BudButton>Search</BudButton>);
  });

  it('Should render correctly', () => {
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.contains('Search')).toBe(true);
  });

  it('Should show loading icon when loading prop is true', () => {
    expect(wrapper.find('svg').exists()).toBe(false);

    wrapper.setProps({ loading: true });

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('Should be disabled when loading prop is true', () => {
    expect(wrapper.find('button').props().disabled).toBeUndefined();

    wrapper.setProps({ loading: true });

    expect(wrapper.find('button').props().disabled).toBe(true);
  });
});
