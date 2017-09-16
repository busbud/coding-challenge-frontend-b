import React from 'react'
import _ from 'underscore'

import DepartureItem from './DepartureItem'

class DeparturesList extends React.Component {
  constructor(props){
    super(props)

    this.state = props
  }

  componentWillReceiveProps(nextProps){
    if(! (_.isEqual(this.state, nextProps))){
      this.setState({ departures: nextProps.departures })
    }
  }

  render(){
    const { departures } = this.state

    return(
      <div className='departures-list'>
        {
          _.map(departures, function(value, key){
            return(
              <DepartureItem key={key}
                             departure={value} />
            )
          })
        }
      </div>
    )
  }
}

// function mapStateToProps(stat){
//   return {
//     operatos
//   }
// }

export default DeparturesList
