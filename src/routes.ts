import loadData, { LoadDataParams } from './helpers/api';
import Home from './screens/Home';
import Departures from './screens/Departures';
import NotFound from './screens/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/departures/:origin/:destination/:date',
    component: Departures,
    loadData: (params: LoadDataParams) => loadData(params)
  },
  {
    component: NotFound
  }
];

export default routes;
