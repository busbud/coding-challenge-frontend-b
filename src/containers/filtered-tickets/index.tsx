// Packages
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { stringify } from 'query-string'
import { useTranslation } from 'react-i18next'

// Containers
import TravelFilter from 'containers/travel-filter'

// Helpers
import dynamicString from 'helpers/dynamic-string'

// Services
import { request } from 'services/api'

// Components
import Accordion from 'components/accordion'
import AccordionTrigger from './accordion-trigger'
import EmptyState from './empty-state'

// Styles
import * as L from 'layout'
import * as S from './styles'

// Constants
const URL = 'x-departures/${from}/${to}/${outboundDate}'

const queryfy = (
  { adult, child, senior, childAges, seniorAges },
  currency,
  lang
) => {
  const child_ages =
    child > 0 ? childAges.map(({ paxCount }) => paxCount).toString() : ''
  const senior_ages =
    senior > 0 ? seniorAges.map(({ paxCount }) => paxCount).toString() : ''
  const language = lang === 'en-US' ? 'en' : lang

  return {
    adult,
    child,
    senior,
    child_ages,
    senior_ages,
    currency,
    lang: language
  }
}

function FilteredTickets() {
  const [endpoint, setEndpoint] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currency, setCurrency] = useState('CAD')
  const [filters, setFilters] = useState({})
  const [response, setResponse] = useState({
    complete: false,
    departures: [],
    operators: []
  })
  const { t, i18n } = useTranslation()

  const { data } = useSWR(`${endpoint}?${stringify(filters)}`, request, {
    onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
      if (retryCount >= 1) return
      if (error.status === 404) return

      setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
    }
  })

  const { data: pollData } = useSWR(
    `${endpoint}/poll?${stringify(filters)}`,
    request,
    {
      onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
        if (retryCount >= 1) return
        if (error.status === 404) return

        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
      },
      refreshInterval: response.complete ? 0 : 3000,
      dedupingInterval: 0
    }
  )

  const handleSearch = async ({
    from,
    to,
    outboundDate,
    passengers,
    currency
  }) => {
    const lang = i18n.language

    setIsLoading(true)
    setResponse({
      complete: false,
      departures: [],
      operators: []
    })
    const query = queryfy(passengers, currency, lang)

    await setEndpoint(dynamicString(URL, { from, to, outboundDate }))
    await setFilters(query)
    await setCurrency(currency)
  }

  useEffect(() => {
    if (data?.complete) {
      const { complete, departures, operators } = data || {}
      setIsLoading(false)
      return setResponse({ complete, departures, operators })
    }

    if (pollData?.complete) {
      const { complete, departures, operators } = pollData || {}
      setResponse({ complete, departures, operators })
      setIsLoading(false)
    }
  }, [data, pollData])

  return (
    <>
      <TravelFilter onChange={handleSearch} />
      <L.Container>
        {isLoading && (
          <L.Box display="flex" alignItems="center" justifyContent="center">
            <L.Loading />
          </L.Box>
        )}
        {response.complete && !isLoading ? (
          <>
            {response.departures.map((item, i) => (
              <S.Wrapper key={i}>
                <Accordion
                  trigger={
                    <AccordionTrigger
                      currency={currency}
                      departure={item}
                      operator={response.operators.find(
                        ({ id }) => id === item.operator_id
                      )}
                    />
                  }
                >
                  <L.Box>
                    <S.Text margin="0 0.4rem">
                      {t('common.average_seat')} true
                    </S.Text>
                  </L.Box>
                </Accordion>
              </S.Wrapper>
            ))}
          </>
        ) : (
          <EmptyState isLoading={isLoading} />
        )}
      </L.Container>
    </>
  )
}

export default FilteredTickets
