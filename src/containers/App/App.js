import React, { Component } from 'react'

import { Loader } from 'styled-icons/feather'

import Container from '../../components/Container'
import Departure from '../../components/Departure'
import Header from '../../components/Header'
import Locale from '../../components/Locale'

import {
  StyledDeparturesLength,
  StyledLoader
} from './styles'

class App extends Component {
  componentWillMount() {
    const { defaultParams, defaultQuery, getSchedules } = this.props

    getSchedules(defaultQuery, defaultParams)
  }


  handleChangeLocale = event => {
    const { defaultQuery, defaultParams, getSchedules, changeLocale, locales } = this.props;

    const locale = locales.find(locale => locale.lang === event.target.value)

    changeLocale(locale.currency, locale.lang)
    getSchedules(defaultQuery, defaultParams)
  }


  render() {
    const { cities, defaultQuery: { outbound_date }, departures, isLoading, locales, t } = this.props

    return (
      <>
        <Locale
          changeLocale={this.handleChangeLocale}
          locales={locales} />
        <Header date={outbound_date} />
        <Container>
          {isLoading
            ? <StyledLoader><Loader size={26} /></StyledLoader>
            : (departures.length
              ?
              <>
                <StyledDeparturesLength>{t('search.result.length', { count: departures.length })}</StyledDeparturesLength>
                {departures.map(departure => (
                  <Departure
                    cities={cities}
                    departure={departure}
                    key={departure.id} />
                ))}
              </>
              : <StyledDeparturesLength>{t('search.result.none')}</StyledDeparturesLength>
            )
          }
        </Container>
      </>
    )
  }
}

export default App
