import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'
import './AppTopbar.scss'

export default class AppTopbar extends React.Component {
  render () {
    return (
      <div className="app-topbar">
        <Grid columns={2} verticalAlign={'middle'}>
          <Grid.Column key={0} textAlign={'left'}>
            <Link to="/">
              <Button color={'black'} size={'small'}>Home</Button>
            </Link>
          </Grid.Column>
          <Grid.Column key={1} textAlign={'right'}>
            <Button size={'mini'}>FR</Button>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
