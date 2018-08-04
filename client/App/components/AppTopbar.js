import React from 'react'
import { Button } from 'semantic-ui-react'
import './AppTopbar.scss'

export default class AppTopbar extends React.Component {
  render () {
    return (
      <div className="app-topbar">
        <Button size={'mini'}>FR</Button>
      </div>
    )
  }
}
