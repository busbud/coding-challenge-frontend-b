import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React from 'react'
import { useDepartures, useInput } from '../../hooks'
import SearchResults from '../SearchResults/SearchResults'
import styles from './SearchQuery.module.css'

export default function SearchQuery() {
  const t = useTranslations('Main')
  const { locale } = useRouter()
  // set currency according to locale. Can be much more sophisticated here
  const currency =
    (locale &&
      {
        'en': 'USD',
        'fr': 'EUR',
        'pt': 'BRL'
      }[locale]) ??
    'USD'

  const { value: adults, bind: bindAdults } = useInput('1')
  const { departures, locations, dirty, search } = useDepartures()

  return (
    <>
      <div
        className={`${styles.form} ${
          departures.length > 0 || dirty
            ? styles.dropshadow
            : styles.roundedBottom
        }`}
      >
        <div className={styles.origin}>
          <label className={styles.label}>{t('origin', { locale })}</label>
          <div className={styles.input}>Québec</div>
        </div>
        <div className={styles.destination}>
          <label className={styles.label}>{t('destination', { locale })}</label>
          <div className={styles.input}>Montreal</div>
        </div>
        <div className={styles.passengers}>
          <label className={styles.label} htmlFor='passengers'>
            {t('passengers', { locale })}
          </label>

          <input
            id='passengers'
            className={styles.input}
            type='number'
            min={1}
            {...bindAdults}
          ></input>
        </div>
        <button
          className={styles.submitButton}
          onClick={() => {
            search('f2m673', 'f25dvk', '2021-09-14', {
              adult: +adults,
              currency
            })
          }}
        >
          {t('search', { locale })}
        </button>
      </div>
      <SearchResults
        locations={locations}
        departures={departures}
        loading={dirty}
      />
    </>
  )
}
