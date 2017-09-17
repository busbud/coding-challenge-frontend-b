import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as localesActions from '../actions/localesActions'

class Translation extends React.Component {
  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(language) {
    this.props.localesActions.translate(language)
  }

  render(){
    return(
      <div className='translation'>
        <div className='flux right pdr-40'>
          <span onClick={() => this.onClick('fr')}>fr</span>
          <span> | </span>
          <span onClick={() => this.onClick('en')}>en</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locales: state.locales
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
