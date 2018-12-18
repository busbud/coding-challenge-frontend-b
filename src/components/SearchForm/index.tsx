import * as React from 'react'
import { Trans } from 'react-i18next'

interface SearchFormProps {
  buttonClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

interface SearchFormState {
  from: string,
  to: string,
  date: string,
  passengers: string
}

export default class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  constructor (props: SearchFormProps) {
    super(props)
    this.state = {
      from: 'New York',
      to: 'Montreal',
      date: '2019-08-02',
      passengers: '1 adult'
    }
  }

  render () {
    return (
      <section className='search'>
        <div className='search-container container'>
          <div className='row justify-content-center align-items-end'>
            <div className='col-lg-2'>
              <label htmlFor='from'>
                <Trans>Departure</Trans>
              </label>
              <input type='text' value={this.state.from} name='from' className='form-input search-from' aria-label='from' readOnly/>
            </div>
            <div className='col-lg-2'>
              <label htmlFor='to'><Trans>Arrival</Trans></label>
              <input type='text' value={this.state.to} name='to' className='form-input search-to' aria-label='to' readOnly/>
            </div>
            <div className='col-lg-3'>
              <label htmlFor='from'>Date</label>
              <input type='date' value={this.state.date} name='date' className='form-input' arial-label='date' readOnly/>
            </div>
            <div className='col-lg-2'>
              <label htmlFor='passenger'><Trans>Passengers</Trans></label>
              <input type='text' value={this.state.passengers} name='passengers' className='form-input' arial-label='passenger' readOnly/>
            </div>
            <div className='col-lg-2'>
              <button type='button' className='form-button' onClick={this.props.buttonClick}><Trans>search</Trans></button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
