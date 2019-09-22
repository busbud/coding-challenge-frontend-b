import React from 'react';
import SearchList from '../containers/searchList.js';
import SearchBox from '../components/searchBox.js';
import { testTripInfo, testTripInfoNotCompleted, moreTestTripInfo,
  moreTestTripInfoNotCompleted } from '../utils/testHelper.js';
import { shallow } from '../../setupTests';
import Api from '../utils/api.js';
import MergeDeep from '../utils/mergeHelper.js';

jest.mock('../utils/api.js', () => ({
  searchBus: jest.fn(),
  searchPoll: jest.fn(),
}));

describe('<SearchList /> container', () => {
  test('renders', () => {
    const wrapper = shallow(<SearchList />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should render <SearchBox /> component', () => {
    const wrapper = shallow(<SearchList />);
    expect(wrapper.find(SearchBox).length).toBe(1);
  });

  test('should call clickSearch() after click button', () => {
    const clickSearch = jest.fn();
    const searchBox = shallow(<SearchBox clickSearch={clickSearch} />);

    searchBox.find('.searchBox__button').props().onClick();
    expect(clickSearch).toBeCalled();
  });

  test('should update state searchReslt when call clickSearch()', async () => {
    const wrapper = shallow(<SearchList />);

    Api.searchBus.mockImplementation(() => Promise.resolve({ data: testTripInfo }));
    await wrapper.instance().clickSearch();
    await wrapper.update();

    expect(Api.searchBus).toBeCalled();
    expect(wrapper.state().searchResult).toEqual(testTripInfo)
  });

  test('should call getMoreData() after clickSearch() when data reading not completed', async () => {
    const wrapper = shallow(<SearchList />);
    const spy = jest.spyOn(wrapper.instance(), 'getMoreData');
    Api.searchBus.mockImplementation(() => Promise.resolve({ data: testTripInfoNotCompleted }));
    Api.searchPoll.mockImplementation(() => Promise.resolve({ data: moreTestTripInfo }));

    await wrapper.instance().clickSearch();
    await wrapper.update();
    expect(spy).toBeCalled();
  });

  test('should update state searchResult when call clickSearch() and data reading not completed ', async () => {
    const wrapper = shallow(<SearchList />);
    Api.searchBus.mockImplementation(() => Promise.resolve({ data: testTripInfoNotCompleted }));
    Api.searchPoll.mockImplementation(() => Promise.resolve({ data: moreTestTripInfo }));
    const expected = MergeDeep(testTripInfoNotCompleted, moreTestTripInfo);

    await wrapper.instance().clickSearch();
    await wrapper.update();

    expect(Api.searchPoll).toBeCalled();
    expect(wrapper.state().searchResult).toEqual(expected);
  });

  test('should loop searchPoll api and update state searchResult when data reading not completed', async () => {
    const wrapper = shallow(<SearchList />);

    Api.searchBus.mockImplementation(() => Promise.resolve({ data: testTripInfoNotCompleted }));
    Api.searchPoll
      .mockImplementationOnce(() => Promise.resolve({ data: moreTestTripInfoNotCompleted }))
      .mockImplementationOnce(() => Promise.resolve({ data: moreTestTripInfo }));

    const expected = MergeDeep(testTripInfoNotCompleted, moreTestTripInfoNotCompleted, moreTestTripInfo);

    await wrapper.instance().clickSearch();
    await wrapper.update();

    expect(Api.searchPoll).toBeCalledTimes(2);
    expect(wrapper.state().searchResult).toEqual(expected);
  });
});
