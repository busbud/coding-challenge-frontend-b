// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';
import {
  HeaderWrapper,
  RoutesWrapper,
  LangWrapper,
} from './styledComp';

type Props = {
    onLangItemClick: Function,
    routes: Array<String>,
    languages: Array<String>,
    onThemeSwitch: Function,
    isLightTheme: Boolean
}

function Header(props: Props) {
  const { t } = useTranslation();
  const {
    onLangItemClick,
    routes,
    languages,
    onThemeSwitch,
    isLightTheme,
  } = props;

  return (
    <HeaderWrapper>
      {routes.length >= 1 && (
        <RoutesWrapper>
          {routes.map((route) => {
            return (
              <Link key={route.name} to={route.path}>{t(`route_${route.name}`)}</Link>
            );
          })}
        </RoutesWrapper>
      )}
      {languages.length >= 1 && (
        <LangWrapper>
            {languages.map((lang) => {
              return (
                <button
                  type="button"
                  key={lang}
                  value={lang}
                  onClick={(e) => onLangItemClick(e)}
                >
                  {lang}
                </button>
              );
            })}
          <Toggle
            label="Dark mode"
            checked={!isLightTheme}
            onChange={(e) => onThemeSwitch(e)}
            isDarkModeToggle
          />
        </LangWrapper>
      )}
    </HeaderWrapper>
  );
}

export default Header;
