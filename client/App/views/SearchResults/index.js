import React from 'react'
import { Grid } from 'semantic-ui-react'
import SearchDetails from './components/SearchDetails'
import DeparturesList from './components/DeparturesList'
import './index.scss'

export default class SearchForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    console.log('SearchForm props', props)
  }

  render () {
    return (
      <Grid
        verticalAlign={'middle'}
        textAlign={'center'}
      >
        <Grid.Row>
          <Grid.Column mobile={15} tablet={9} largeScreen={6}>
            <SearchDetails />
            <DeparturesList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
