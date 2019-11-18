import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import App from './App';
import configureStore, { AppState } from './store';
import messages from './i18n/messages';
import { langSelector, Lang } from './store/lang';

export interface AugmentedWindow extends Window {
  __PRELOADED_STATE__?: string;
}

// eslint-disable-next-line no-underscore-dangle
const store = configureStore((window as AugmentedWindow).__PRELOADED_STATE__!);

function AppWrapper({ lang }: { lang: Lang }) {
  return (
    <IntlProvider key={lang} locale={lang} messages={messages[lang]}>
      <App />
    </IntlProvider>
  );
}

const mapStateToProps = (state: AppState) => ({
  lang: langSelector(state)
});

const ConnectedApp = connect(mapStateToProps)(AppWrapper);

function ComponentsTree() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    </BrowserRouter>
  );
}

hydrate(<ComponentsTree />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
