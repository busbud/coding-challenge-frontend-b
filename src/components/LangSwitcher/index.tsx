import * as React from 'react'
import i18n from 'i18next'

interface LangSwitcherState {
  currentLang: string
}

export default class LangSwitch extends React.Component<any, LangSwitcherState> {
  constructor (props: any) {
    super(props)

    this.state = {
      currentLang: ''
    }
  }

  setLang = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const lang = target.value
    i18n.changeLanguage(lang)
    this.setState({ currentLang: lang })
  }

  componentDidMount () {
    const lang: any = localStorage.getItem('i18nextLng')
    this.setState({ currentLang: lang })
  }

  render () {
    return (
      <div className='select-wrapper'>
        <select onChange={this.setLang} value={this.state.currentLang}>
          <option value='fr'>Fr</option>
          <option value='en'>En</option>
        </select>
      </div>
    )
  }
}
