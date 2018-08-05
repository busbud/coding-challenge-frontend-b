import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class SearchDetails extends React.Component {
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
          <Icon name='dropdown' />
          Trips from: Source to: Destination for date: Foobar
        </Accordion.Title>
        <Accordion.Content active={isOpen}>
          <p>
            A dog is a type of domesticated animal. Known for its loyalty and
            faithfulness, it can be found as a welcome guest in many households
            across the world.
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}
