import { testTripInfo } from '../testHelper.js';

const api = {
  searchBus : async (attributes, params) => {
    console.log('hit mock api')
    return await Promise.resolve({ data: testTripInfo })
  }
};

export default api;
