// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';
import { ReactComponent as FestivalLogo } from '../../assets/images/festival-logo.svg';
import {
  HeaderWrapper,
  RoutesWrapper,
  LangWrapper,
} from './styledComp';

type Props = {
    onLangItemClick: Function,
    currentLanguage: String,
    routes: Array<String>,
    languages: Array<String>,
    onThemeSwitch: Function,
    isDarkTheme: Boolean
}

function Header(props: Props) {
  const { t } = useTranslation();
  const {
    currentLanguage,
    onLangItemClick,
    routes,
    languages,
    onThemeSwitch,
    isDarkTheme,
  } = props;

  return (
    <HeaderWrapper>
      {routes.length >= 1 && (
        <RoutesWrapper>
          {routes.map((route) => {
            if (route.name === 'home') {
              return (
                <Link key={route.name} to={route.path}>
                  <FestivalLogo />
                  <h1>{t(`route_${route.name}`)}</h1>
                </Link>
              );
            }
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
                  className={currentLanguage === lang ? 'active' : ''}
                >
                  {lang}
                </button>
              );
            })}
          <Toggle
            label="Dark mode"
            checked={isDarkTheme}
            onChange={(e) => onThemeSwitch(e)}
            isDarkModeToggle
          />
        </LangWrapper>
      )}
    </HeaderWrapper>
  );
}

export default Header;
