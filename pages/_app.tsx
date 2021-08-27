import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

import { publicRuntimeConfig } from 'configs/envs';
import 'styles/globals.css';

if (publicRuntimeConfig.API_MOCKING) {
  const { initMsw } = require('mocks');
  initMsw();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      }}
      messages={pageProps.messages}
      now={new Date(pageProps.now)}
    >
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </NextIntlProvider>
  );
}
export default MyApp;
