import React, { Component }             from 'react'
import { connect }                      from 'react-redux'
import { setTranslations, setLanguage } from "redux-i18n"

// Fetch a translation JSON file from server
// Filename is reconstruct from desired lang
// TODO : get filename from config
function fetchTranslations(lang) {
  return fetch(`/translations/${lang}.json`)
    .then( response => {
      if (response.ok) { return response.json() }
      throw new Error(`Error ${response.status} - ${response.statusText}`)
    })
}

// Main function for retrieving translation file from server, updating the store
// and dispatching an action to update text across components
function getTranslations(lang) {
  return function (dispatch) {
    return fetchTranslations(lang)
      .then( trans => {
        // Add new translations to store
        dispatch(setTranslations(trans, { language: lang }))
        // Select new language
        dispatch(setLanguage(lang))
      }
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.availableLanguages = window.config.languages
  }

  handleClick(lang) {
    this.props.requestTranslations(lang)
  }

  render() {
    return (
      <header id="topbar">
        <img className="logo" src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" alt="Osheaga festival" />
        {this.availableLanguages.map( lang => (
          <button key={lang} onClick={() => this.handleClick(lang)}>{lang}</button>
        ))}
      </header>
    )
  }
}

const mapStateToProps = _ => ({})

const mapDispatchToProps = dispatch => {
  return {
    requestTranslations: lang => {
      dispatch(getTranslations(lang))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)