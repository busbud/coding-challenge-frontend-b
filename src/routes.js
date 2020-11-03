import { makeLazy } from './utils/makeLazy';

export default [
  {
    path: '/',
    exact: true,
    name: 'home',
    component: makeLazy(() => import(
      './screens/Home'
    )),
  },
  {
    path: '/about',
    exact: true,
    name: 'about',
    component: makeLazy(() => import(
      './screens/About'
    )),
  },

];
