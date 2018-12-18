import * as React from 'react'

export default class TopBar extends React.Component {
  constructor (props: any) {
    super(props)
  }

  render () {
    return (
      <div className='header-top-bar'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-3 header-top-bar-logo'></div>
            <div className='col-md-9 header-top-bar-lang'>
              LANG Switcher
            </div>
          </div>
        </div>
      </div>
    )
  }
}
