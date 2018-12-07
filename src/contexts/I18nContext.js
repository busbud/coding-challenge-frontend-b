import React from 'react';

const defaultI18nContext = {
    currentLanguage: 'en',
    _: () => {},
    changeLanguage: () => {}
};

const { Provider, Consumer} = React.createContext(defaultI18nContext);
export { Provider as I18nProvider};
export { Consumer as I18nConsumer};
