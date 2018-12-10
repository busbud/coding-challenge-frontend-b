import SearchAPI from '../api/search';

import { initResults, polledResults } from './factories';

/* eslint-disable */
export default function mockAPI() {
  spyOn(SearchAPI.prototype, "initialize").and.callFake(async () => initResults);
  spyOn(SearchAPI.prototype, "poll").and.callFake(async () => polledResults);
}
