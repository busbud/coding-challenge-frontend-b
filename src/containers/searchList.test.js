import React from 'react';
import SearchList from '../containers/searchList.js';
import SearchBox from '../components/searchBox.js';
import ListCard from '../components/listCard.js';
import { testTripInfo, testTripInfoNotCompleted, moreTestTripInfo,
  moreTestTripInfoNotCompleted } from '../utils/testHelper.js';
import { shallow, mount } from '../../setupTests';
import Api from '../utils/api.js';
import FunctionHelper from '../utils/functionHelper.js';

jest.mock('../utils/api.js', () => ({
  searchBus: jest.fn(),
  searchPoll: jest.fn(),
}));

describe('<SearchList /> container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchList />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should render <SearchBox /> component', () => {
    expect(wrapper.find(SearchBox).length).toBe(1);
  });

  test('should call clickSearch() after click button', () => {
    const clickSearch = jest.fn();
    const searchBox = shallow(<SearchBox clickSearch={clickSearch} />);

    searchBox.find('.searchBox__button').props().onClick();
    expect(clickSearch).toBeCalled();
  });

  test('should render listCard when search result not empty ', () => {
    wrapper.setState({ searchResult: testTripInfo })
    expect(wrapper.find(ListCard).length).toBeGreaterThan(0);
  });

  test('should update state searchReslt when call clickSearch()', async () => {
    Api.searchBus.mockImplementation(() => Promise.resolve({ data: testTripInfo }));
    await wrapper.instance().clickSearch();
    await wrapper.update();

    expect(Api.searchBus).toBeCalled();
    expect(wrapper.state().searchResult).toEqual(testTripInfo)
  });

  test('should update state searchResult when call clickSearch() and data reading not completed ', async () => {
    Api.searchBus.mockImplementationOnce(() => Promise.resolve({ data: testTripInfoNotCompleted }));
    Api.searchPoll.mockImplementationOnce(() => Promise.resolve({ data: moreTestTripInfo }));

    await wrapper.instance().clickSearch();
    await wrapper.update();

    const expected = FunctionHelper.mergeDeep(testTripInfoNotCompleted, moreTestTripInfo);
    expect(wrapper.state().searchResult).toEqual(expected);
   });
  
  test('should loop searchPoll api and update state searchResult when data reading not completed', async () => {
    Api.searchBus.mockImplementationOnce(() => Promise.resolve({ data: testTripInfoNotCompleted }));
    Api.searchPoll.mockImplementationOnce(() => Promise.resolve({ data: moreTestTripInfoNotCompleted }))
    Api.searchPoll.mockImplementationOnce(() => Promise.resolve({ data: moreTestTripInfo }));

    await wrapper.instance().clickSearch();
    await wrapper.update();

    const expected = FunctionHelper.mergeDeep(testTripInfoNotCompleted, moreTestTripInfoNotCompleted, moreTestTripInfo);
    expect(wrapper.state().searchResult).toEqual(expected);
  });
});
