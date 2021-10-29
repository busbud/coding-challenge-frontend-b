import { useAppDispatch } from '../../../../app/hooks'
import { DepartureSearchParams } from '../../departuresAPI'
import {
  updateSearchParams,
  fetchDeparturesSearchAsync,
} from '../../departureSearchSlice'

import styles from './SearchBar.module.scss'

export interface SearchBarProps {
  searchParams: DepartureSearchParams
}

export const defaultCities: { [key: string]: string } = {
  f2m673: 'Québec',
  f25dvk: 'Montréal',
}

export function SearchBar({ searchParams }: SearchBarProps): JSX.Element {
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    dispatch(updateSearchParams({ ...searchParams, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(fetchDeparturesSearchAsync({ ...searchParams }))
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.fieldLabel} htmlFor="origin">
          Origin
        </label>
        <input
          className={styles.formField}
          id="origin"
          type="text"
          name="origin"
          defaultValue={defaultCities[searchParams.origin]}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.fieldLabel} htmlFor="destination">
          Destination
        </label>
        <input
          className={styles.formField}
          id="destination"
          type="text"
          name="destination"
          defaultValue={defaultCities[searchParams.destination]}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.fieldLabel} htmlFor="date">
          Date
        </label>
        <input
          className={styles.formField}
          id="date"
          type="date"
          name="date"
          defaultValue={searchParams.outboundDate}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.fieldLabel} htmlFor="adult">
          Passengers
        </label>
        <input
          className={styles.formField}
          id="adult"
          type="number"
          name="adult"
          defaultValue={searchParams.adult}
          onChange={handleChange}
        />
      </div>

      <button className={styles.searchBarBtn} type="submit">
        <span>🔍</span> Search
      </button>
    </form>
  )
}
