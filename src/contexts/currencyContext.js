import { createContext } from 'react';

export default createContext({
  currency: '',
  changeCurrency: () => {},
});
