'use strict';

var counterpart = require('counterpart');
var React = require('react');
var ReactDOM = require('react-dom');
var Schedule = require('../Schedule/Schedule');
var SearchButton = require('../SearchButton/SearchButton');
var Translate = require('react-translate-component');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
require('./AppContainer.less');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// registers the locales:
counterpart.registerTranslations('en', {
  greeting: {
    text: "Hello NYC! How about going to the Igloofest next weekend? Busbud is here to help you catch the bus.",
    button: "Search"
  },
  tooltip: {
    wifi: 'Wi-Fi',
    power: 'Power',
    tv: 'TV',
    legroom: 'Addition Leg Room',
    toilet: 'Toilet'
  }
});
counterpart.registerTranslations('fr', {
  greeting: {
    text: "Bonjour New York! Que diriez-vous d'aller à la prochaine fin de semaine Igloofest? Busbud est là pour vous aider à prendre le bus.",
    button: "Recherche"
  },
  tooltip: {
    wifi: 'Wi-Fi',
    power: 'Prises de courant',
    tv: 'Télévision',
    legroom: 'Espace supplémentaire pour les jambes',
    toilet: 'Toilettes'
  }
});
counterpart.registerTranslations("de", {
  greeting: {
    text: "Hallo NYC! Wie wäre es zum Igloofest kommenden Wochenende gehen? Busbud ist hier, Sie mit dem Bus helfen.",
    button: "Suche"
  },
  tooltip: {
    wifi: 'Internet',
    power: 'Steckdosen',
    tv: 'Fernsehen',
    legroom: 'Zusätzlicher Beinefreiheit',
    toilet: 'Toilette'
  }
});

var LocaleSwitcher = React.createClass({
  getInitialState: function() {
    return { language: "en" };
  },
  handleChange: function(event, index, value) {
    console.log("CHANGE");
    counterpart.setLocale(value);
    this.state.language = value;
    this.forceUpdate();
  },
  render: function() {
    return (
      <p>
        <div className="switchContainer">
        <SelectField
          value={this.state.language}
          onChange={this.handleChange}
          style={{
            "position": "absolute",
            "left": "10px",
            "top": "10px",
            color: "white"
          }}
          underlineStyle={{"color": "red"}}
          labelStyle={{"color": "white"}}
          hintStyle={{"color": "white"}}
          fullWidth={true}>
          <MenuItem value={"en"} primaryText="English"/>
          <MenuItem value={"de"} primaryText="Deutsch"/>
          <MenuItem value={"fr"} primaryText="Français"/>
        </SelectField>
        </div>
      </p>
    );
  }
});

var AppContainer = React.createClass({
  render: function() {
    return (
      <div className="AppContainer">
        <div id="textContainer">
          <LocaleSwitcher />
          <Translate
            content="greeting.text"
            style={{
              "margin-top": "100px",
              "margin-left": "auto",
              "margin-right": "auto",
              "width": "400px",
              color: "white"
            }}
            component="h1" />
          <SearchButton text={counterpart.translate('greeting.button', {})} child={<Translate content="greeting.button" />} />
        </div>
        <div id="scheduleContainer">
        </div>
      </div>
    );
  }
});

ReactDOM.render(<AppContainer />, document.getElementById('container'));
