import React from 'react';
import ReactDom from 'react-dom';
import counterpart from 'counterpart';

const LanguageMenu = React.createClass({
  render: function() {
    return (
      <div id='language-fab'>
        <button id='language-selection' className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>
          <i className='material-icons'>translate</i>
        </button>
        <ul className='mdl-menu mdl-menu--top-right mdl-js-menu mdl-js-ripple-effect'
          for='language-selection'>
          <li className='mdl-menu__item' onClick={() => {this.handleChange('en')}}>English</li>
          <li className='mdl-menu__item' onClick={() => {this.handleChange('fr')}}>Français</li>
          <li className='mdl-menu__item' onClick={() => {this.handleChange('de')}}>Deutsch</li>
          <li className='mdl-menu__item' onClick={() => {this.handleChange('es')}}>Español</li>
        </ul>
      </div>
    )
  },

  handleChange: function(lang) {
    counterpart.setLocale(lang);
  }
});

export default LanguageMenu;