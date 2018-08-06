import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Icon } from 'semantic-ui-react'

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
    const formattedDate = this.props.date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    })

    return (
      <Accordion styled>
        <Accordion.Title
          active={isOpen}
          index={0}
          onClick={this.handleAccordionClick.bind(this)}
        >
          <Icon name='dropdown' />
          Trips from: {this.props.origin} to: {this.props.destination} for {formattedDate}
        </Accordion.Title>
        <Accordion.Content active={isOpen}>
          <ul>
            <li>Adults: {this.props.adults}</li>
          </ul>
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
