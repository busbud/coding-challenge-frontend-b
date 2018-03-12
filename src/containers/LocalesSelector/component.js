import React from 'react';
import { func } from 'prop-types';
import { compose, map, curry, props, converge, nth } from 'ramda';
import IconButton from 'material-ui/IconButton';
import LanguageIcon from 'material-ui-icons/Language';
import Menu from 'material-ui/Menu';
import Locale from '../../components/Locale';
import { LOCALES } from '../App/constants';

const propTypes = {
  handleMenu: func.isRequired,
  handleClose: func.isRequired,
  onChangeLocale: func.isRequired,
};

const mapStateToPropsToLocale = curry((onClick, code) => ({ code, onClick }));
const mapLocale = map(Locale);

const LocaleList = compose(
  mapLocale,
  converge(map, [compose(mapStateToPropsToLocale, nth(1)), nth(0)]),
  props(['locales', 'handler', 'currentLocale']),
);

const Component = ({ anchorEl, handleMenu, handleClose, onChangeLocale }) => {
  const isOpen = Boolean(anchorEl);
  return (
    <div>
      <IconButton aria-owns={isOpen ? 'menu-appbar' : null} aria-haspopup="true" onClick={handleMenu} color="inherit">
        <LanguageIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <LocaleList locales={LOCALES} handler={onChangeLocale} />
      </Menu>
    </div>
  );
};

Component.propTypes = propTypes;

export default Component;
