import * as React from 'react'
import i18n from 'i18next'
import { Trans } from 'react-i18next'
interface LangSwitchProps {
  langChange: any
}

interface LangSwitcherState {
  currentLang: string
}

export default class LangSwitch extends React.Component<LangSwitchProps, LangSwitcherState> {
  constructor (props: LangSwitchProps) {
    super(props)

    this.state = {
      currentLang: ''
    }
  }

  setLang = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const lang = target.value
    i18n.changeLanguage(lang)
    this.setState({ currentLang: lang }, () => {
      this.props.langChange(this.state.currentLang)
    })
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
