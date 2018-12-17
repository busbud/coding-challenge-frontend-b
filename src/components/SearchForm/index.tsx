import * as React from 'react'

interface SearchBarState {
  from: string,
  to: string,
  date: string,
  passengers: string
}

export default class SearchBar extends React.Component<any, SearchBarState> {
  constructor (props: any) {
    super(props)
    this.state = {
      from: 'New York',
      to: 'Montreal',
      date: '2019-08-02',
      passengers: '1 adult'
    }
  }

  render () {
    return(
      <section className='search'>
        <div className='search-container container'>
          <div className='row justify-content-center align-items-end'>
            <div className='col-md-2'>
              <label htmlFor='from'>
                From
              </label>
              <input type='text' value={this.state.from} name='from' className='form-input search-from' aria-label='from' readOnly/>
            </div>
            <div className='col-md-2'>
              <label htmlFor='to'>To</label>
              <input type='text' value={this.state.to} name='to' className='form-input search-to' aria-label='to' readOnly/>
            </div>
            <div className='col-md-3'>
              <label htmlFor='from'>Date</label>
              <input type='date' value={this.state.date} name='date' className='form-input' arial-label='date' readOnly/>
            </div>
            <div className='col-md-2'>
              <label htmlFor='passenger'>Passenger</label>
              <input type='text' value={this.state.passengers} name='passengers' className='form-input' arial-label='passenger' readOnly/>
            </div>
            <div className='col-md-2'>
              <button type='button' className='form-button'>Search</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
