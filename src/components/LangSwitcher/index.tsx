import * as React from 'react'
import i18n from 'i18next'
import { Trans } from 'react-i18next'
interface LangSwitcherProps {
  langChange: any
}

interface LangSwitcherState {
  currentLang: string
}

export default class LangSwitcher extends React.Component<LangSwitcherProps, LangSwitcherState> {
  constructor (props: LangSwitcherProps) {
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
      this.props.langChange()
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
