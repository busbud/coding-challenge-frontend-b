import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  pollDeparturesAsync,
  selectDeparturesData,
  selectDeparturesSearchParams,
  selectDepartureStatuses,
} from './departureSearchSlice'
import { SearchBar } from './components/SearchBar/SearchBar'
import { RouteCard } from './components/RouteCard/RouteCard'
import { Departure } from './types'

import styles from './DepartureSearch.module.scss'

export function DepartureSearch(): JSX.Element {
  const departuresData = useAppSelector(selectDeparturesData)
  const departureSearchParams = useAppSelector(selectDeparturesSearchParams)
  const departureStatuses = useAppSelector(selectDepartureStatuses)
  const dispatch = useAppDispatch()
  function getOperatorById(id: string): { name: string; logo_url: string } {
    return departuresData.operators.find((operator: any) => operator.id === id)
  }

  useEffect(() => {
    let interval: any = null
    if (departuresData.complete === false) {
      interval = setInterval(() => {
        dispatch(pollDeparturesAsync(departureSearchParams))
      }, 2000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, departuresData.complete, departureSearchParams])

  const isLoading = departureStatuses.status === 'loading'

  return (
    <div>
      <SearchBar searchParams={departureSearchParams} />

      {isLoading && <div className={styles.Loader}>🚌 Loading...</div>}

      {departuresData?.departures?.length > 0 && (
        <div>
          {departuresData.departures.map((dep: Departure) => (
            <RouteCard
              key={`${dep.id}-${dep.busbud_departure_id}`}
              departure={dep}
              locations={departuresData.locations}
              cities={departuresData.cities}
              operator={getOperatorById(dep.operator_id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
