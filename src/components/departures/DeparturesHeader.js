import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import moment from 'moment'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

class DeparturesHeader extends React.Component {
  constructor(props){
    super(props)

    this.departure = this.departure.bind(this)
    this.destination = this.destination.bind(this)
    this.background = this.background.bind(this)
  }

  departure(){
    return _.first(this.props.cities)
  }

  destination(){
    return _.last(this.props.cities)
  }

  background(){
    const styles = {
      backgroundImage: `url(${this.destination().hero_image_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    return styles
  }

  render(){
    const departure = this.departure()
    const destination = this.destination()

    return(
      <div className='departures-header cover' style={this.background()}>
        <div className='gradient'></div>
        <div className='flux f-24 departures-header__c'>
          <div className='departures-header__half'>
            <div className='departures-header__departure pdl-40'>
              <span className='f-12'>{this.props.translate('departure')}</span>
              <p className='pdl-15'>{departure.name}</p>
            </div>
            <div className='departures-header__separator'>
              <div className='departures-header__arrow cover'></div>
            </div>
            <div className='departures-header__arrival pdl-40'>
              <span className='f-12'>{this.props.translate('arrival')}</span>
              <p className='bold pdl-15'>{destination.name}</p>
            </div>
          </div>

          <div className='departures-header__half pdr-18'>
            <div className='right'>
              <span className='f-12'>Date</span>
              <p className='bold'>
                {moment('2018-08-02').lang(this.props.currentLanguage).format('LL')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(
  mapStateToProps
)(DeparturesHeader)
