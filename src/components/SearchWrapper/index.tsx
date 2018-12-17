import * as React from 'react'
import Header from '../Header'
import SearchForm from '../SearchForm'

export default class SearchWrapper extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
  }

  render () {
    return(
      <React.Fragment>
        <Header/>
        <SearchForm/>
      </React.Fragment>
    )
  }
}
