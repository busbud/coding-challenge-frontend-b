import * as React from 'react'

interface CurrencySwitcherProps {
  currencyChange: any
}

interface CurrencySwitcherState {
  currentCurrency: string
}

export default class CurrencySwitcher extends React.Component<CurrencySwitcherProps, CurrencySwitcherState> {
  constructor (props: CurrencySwitcherProps) {
    super(props)

    this.state = {
      currentCurrency: ''
    }
  }

  setCurrency = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const currency = target.value
    this.setState({ currentCurrency: currency }, () => {
      localStorage.setItem('currency', currency)
      this.props.currencyChange()
    })
  }

  componentDidMount () {
    const currency: any = localStorage.getItem('currency') ? localStorage.getItem('currency') : 'USD'
    this.setState({ currentCurrency: currency })
  }

  render () {
    return (
      <div className='select-wrapper'>
        <select onChange={this.setCurrency} value={this.state.currentCurrency}>
          <option value='USD'>USD</option>
          <option value='CAD'>CAD</option>
        </select>
      </div>
    )
  }
}
