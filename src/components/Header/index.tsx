import * as React from 'react'
import LangSwitcher from '../../components/LangSwitcher'
interface TopBarProps {
  onLangChange: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

export default class TopBar extends React.Component<TopBarProps, any> {
  constructor (props: TopBarProps) {
    super(props)
  }

  render () {
    return (
      <div className='header-top-bar'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-3 header-top-bar-logo'></div>
            <div className='col-md-9 header-top-bar-lang'>
              <LangSwitcher langChange={this.props.onLangChange}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
