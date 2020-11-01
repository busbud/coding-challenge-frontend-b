// @flow
import React from 'react';
import { ThemeProvider as SCTheme } from 'styled-components';
import theme from './theme';

type Props = {
    children: Node,
    themeStyle?: 'light' | 'dark'
}

function ThemeProvider({ children, themeStyle }:Props) {
  if (!React.Children.only(children)) {
    throw new Error('<ThemeProvider> returns its children when rendering, so it must only wrap a single child node as it may be used as the root of the render() method. (see https://www.styled-components.com/docs/advanced for more infos)');
  }
  return (
    <SCTheme
      theme={theme(themeStyle)}
    >
      {children}
    </SCTheme>
  );
}

ThemeProvider.defaultProps = {
  themeStyle: 'light',
};

export default ThemeProvider;
