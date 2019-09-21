import { testTripInfo, moreTestTripInfo } from '../testHelper.js';

const api = {
  searchBus : async (attributes, params) => {
    console.log('hit mock api')
    return await Promise.resolve({ data: testTripInfo })
  },
  searchPoll : async (attributes, params) => {
    console.log('hit mock api')
    return await Promise.resolve({ data: moreTestTripInfo })
  }
};

export default api;
