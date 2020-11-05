import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import ThemeProvider from './index';
import i18n from '../../i18n';

export const WithState = ({ children, defaultState/* , ...props */ }) => {
  const [state, setState] = useState(defaultState);
  return children(state, setState);
};
export const storyWithThemeToggle = (storyFn) => (
  <I18nextProvider i18n={i18n}>
    <WithState defaultState>
      {(isDark, toggleTheme) => (
        <ThemeProvider
          themeStyle={isDark ? 'dark' : 'light'}
        >
          <div
            style={{
              background: isDark ? '#161616' : '#f1f1f1',
              height: '100%',
            }}
          >
            <button
              type="button"
              onClick={() => toggleTheme(!isDark)}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                color: isDark ? '#ffffff' : '#000000',
                background: !isDark ? '#ffffff' : '#000000',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                zIndex: 1000000,
              }}
            >
              {`${!isDark ? 'dark' : 'light'} mode`}
            </button>
            {storyFn()}
          </div>
        </ThemeProvider>
      )}
    </WithState>
  </I18nextProvider>
);

export default null;
