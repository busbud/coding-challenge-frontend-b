import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Accordion, Icon } from 'semantic-ui-react'
import './SearchDetails.scss'

class SearchDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleAccordionClick (e, { index }) {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    const { isOpen } = this.state

    return (
      <Accordion styled>
        <Accordion.Title
          active={isOpen}
          index={0}
          onClick={this.handleAccordionClick.bind(this)}
        >
          <Link to="/search-form" className="back-button">
            <Icon name='angle left' />
          </Link>
          {[
            'Trips from',
            this.props.origin,
            'to',
            this.props.destination,
            'for',
            moment(this.props.date).format('ll')
          ].join(' ')}
        </Accordion.Title>
        <Accordion.Content active={isOpen}>
          <Icon name='users' /> {this.props.adults} Adults
        </Accordion.Content>
      </Accordion>
    )
  }
}

SearchDetails.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  adults: PropTypes.number
}

export default SearchDetails
