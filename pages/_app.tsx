import { appWithTranslation } from '@/i18n';
import SiteLayout from '@/layouts/SiteLayout';
import StoreProvider from '@/store';
import App from 'next/app';
import type { NextPage } from 'next';
import type { AppPropsType } from 'next/dist/next-server/lib/utils';
import '../styles/tailwind.css';

// eslint-disable-next-line @typescript-eslint/ban-types
const AppContainer: NextPage<AppPropsType, {}> = ({ Component, pageProps }) =>
  (
    <StoreProvider>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </StoreProvider>
  );

AppContainer.getInitialProps = async appContext =>
  ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(await App.getInitialProps(appContext as any)),
  });

export default appWithTranslation(AppContainer);
