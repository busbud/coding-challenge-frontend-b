import { React, ReactQueryCacheProvider } from './dependencies';
import { DepartureLanding } from './departures';
import { GlobalStyle } from './global-styles';

export const App = () => {
  return (
    <ReactQueryCacheProvider>
      <GlobalStyle />
      <DepartureLanding />
    </ReactQueryCacheProvider>
  );
};
