import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getActiveLanguage } from 'react-localize-redux';

import * as localesActions from '../actions/localesActions'

class Translation extends React.Component {
  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this)
    this.setClass = this.setClass.bind(this)
  }

  onClick(language) {
    this.props.localesActions.translate(language)
  }

  setClass(language) {
    if(language == this.props.currentLanguage){
      return 'bold'
    } else {
      return 'light'
    }
  }

  render(){
    return(
      <div className='translation'>
        <div className='flux right pdr-40'>
          <span className={this.setClass('fr')} onClick={() => this.onClick('fr')}>fr</span>
          <span> | </span>
          <span className={this.setClass('en')} onClick={() => this.onClick('en')}>en</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locales: state.locales,
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

function mapDispatchToProps(dispatch) {
  return {
    localesActions: bindActionCreators(localesActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translation)
